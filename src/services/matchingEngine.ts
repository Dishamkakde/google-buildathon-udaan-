import { AssistanceCategory, MatchedResource, ResourceItem, BeneficiaryRequest } from '../types';

/**
 * Calculates Haversine distance in kilometers between two geo-coordinates
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

export function matchResourcesForRequest(
  request: BeneficiaryRequest,
  availableResources: ResourceItem[]
): MatchedResource[] {
  const matches: MatchedResource[] = [];
  const reqLat = request.approximateLocation.lat || 12.9778;
  const reqLng = request.approximateLocation.lng || 77.5713;
  const requestedCategories = new Set(request.categories);

  for (const resource of availableResources) {
    const isCategoryMatch = requestedCategories.has(resource.category);
    if (!isCategoryMatch) continue;

    const distance = calculateHaversineDistance(
      reqLat,
      reqLng,
      resource.location.lat,
      resource.location.lng
    );

    let score = 50;
    const reasons: string[] = [];
    const missing: string[] = [];

    // Proximity factor (up to +25 points)
    if (distance <= 1.0) {
      score += 25;
      reasons.push(`Very close proximity (${distance} km)`);
    } else if (distance <= 3.0) {
      score += 18;
      reasons.push(`Nearby location (${distance} km)`);
    } else if (distance <= 7.0) {
      score += 10;
      reasons.push(`Within reachable transit distance (${distance} km)`);
    } else {
      score += 3;
      reasons.push(`Distanced (${distance} km) - transit assistance may be required`);
    }

    // Capacity factor (up to +15 points)
    if (resource.availableCapacity > 10) {
      score += 15;
      reasons.push(`Ample verified capacity (${resource.availableCapacity} ${resource.unit})`);
    } else if (resource.availableCapacity > 0) {
      score += 10;
      reasons.push(`Active capacity verified (${resource.availableCapacity} ${resource.unit} remaining)`);
    } else {
      score -= 20;
      missing.push('Currently at maximum capacity; waitlist only');
    }

    // Verification factor (up to +10 points)
    if (resource.verifiedStatus === 'verified') {
      score += 10;
      reasons.push('Verified partner organization with active ground protocol');
    } else {
      missing.push('Partner verification pending administrative audit');
    }

    // Accessibility matching
    if (request.accessibilityNeeds) {
      const lowerNeeds = request.accessibilityNeeds.toLowerCase();
      const hasWheelchair = resource.accessibilityFeatures.some(f =>
        f.toLowerCase().includes('wheelchair') || f.toLowerCase().includes('ramp') || f.toLowerCase().includes('elevator')
      );
      if (lowerNeeds.includes('wheelchair') || lowerNeeds.includes('mobility') || lowerNeeds.includes('walk')) {
        if (hasWheelchair) {
          score += 10;
          reasons.push('Specialized mobility & wheelchair accessibility verified');
        } else {
          missing.push('May lack dedicated ramp or ground floor accommodation');
        }
      }
    }

    // Category-specific bonus
    if (request.description.toLowerCase().includes('elderly') && resource.name.toLowerCase().includes('elderly')) {
      score += 8;
      reasons.push('Specialized geriatric care unit suited for senior citizens');
    }

    // Clamp score between 10 and 99
    const finalScore = Math.min(Math.max(score, 15), 99);

    matches.push({
      resource: {
        ...resource,
        distanceKm: distance
      },
      matchScore: finalScore,
      matchReasons: reasons,
      missingRequirements: missing,
      proximityKm: distance,
      status: 'recommended'
    });
  }

  // Sort descending by matchScore
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
