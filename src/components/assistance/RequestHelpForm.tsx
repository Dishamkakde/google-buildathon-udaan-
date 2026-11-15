import React, { useState } from 'react';
import {
  Mic,
  Send,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  Heart,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { AssistanceCategory } from '../../types';
import { useUDAAN } from '../../context/UDAANContext';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceAssistanceModal } from './VoiceAssistanceModal';
import { speechService } from '../../services/speechService';

const ASSISTANCE_CATEGORIES: { id: AssistanceCategory; labelEn: string; labelKn: string; labelHi: string; icon: string }[] = [
  { id: 'food_water', labelEn: 'Food & Drinking Water', labelKn: 'ಆಹಾರ ಮತ್ತು ಕುಡಿಯುವ ನೀರು', labelHi: 'भोजन और पीने का पानी', icon: '🍲' },
  { id: 'emergency_shelter', labelEn: 'Emergency Night Shelter', labelKn: 'ತುರ್ತು ರಾತ್ರಿ ಆಶ್ರಯ', labelHi: 'आपातकालीन रैन बसेरा', icon: '🏠' },
  { id: 'medical_support', labelEn: 'Medical Evaluation & Wound Care', labelKn: 'ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ / ಗಾಯದ ಆರೈಕೆ', labelHi: 'चिकित्सा सहायता और घाव की देखभाल', icon: '🩺' },
  { id: 'clothing_hygiene', labelEn: 'Clean Clothing & Hygiene', labelKn: 'ಬಟ್ಟೆ ಮತ್ತು ಸ್ವಚ್ಛತೆ ಸಾಮಗ್ರಿ', labelHi: 'वस्त्र और स्वच्छता किट', icon: '👕' },
  { id: 'elderly_care', labelEn: 'Elderly Support & Mobility', labelKn: 'ಹಿರಿಯ ನಾಗರಿಕರ ನೆರವು', labelHi: 'बुजुर्ग देखभाल और सहायता', icon: '🧓' },
  { id: 'child_protection', labelEn: 'Child Protection Referral', labelKn: 'ಮಕ್ಕಳ ಸಂರಕ್ಷಣೆ ಸಹಾಯ', labelHi: 'बाल सुरक्षा एवं सहायता', icon: '🧒' },
  { id: 'identity_docs', labelEn: 'Aadhaar / ID Card Assistance', labelKn: 'ಆಧಾರ್ ಮತ್ತು ಗುರುತಿನ ಚೀಟಿ', labelHi: 'आधार एवं पहचान पत्र सहायता', icon: '🪪' },
  { id: 'skill_development', labelEn: 'Skill Training & Livelihood', labelKn: 'ಕೌಶಲ್ಯ ತರಬೇತಿ ಮತ್ತು ಜೀವನೋಪಾಯ', labelHi: 'कौशल प्रशिक्षण और आजीविका', icon: '💼' },
  { id: 'rehabilitation', labelEn: 'Long-Term Rehabilitation', labelKn: 'ದೀರ್ಘಕಾಲೀನ ಪುನರ್ವಸತಿ', labelHi: 'दीर्घकालिक पुनर्वास योजना', icon: '🌱' }
];

const BENGALURU_LOCATIONS = [
  { zone: 'Majestic / KSR Hub', lat: 12.9778, lng: 77.5713 },
  { zone: 'Kalasipalya / KR Market', lat: 12.9629, lng: 77.5768 },
  { zone: 'Shivajinagar / Cantonment', lat: 12.9863, lng: 77.6047 },
  { zone: 'Yeshwanthpur Junction', lat: 13.0238, lng: 77.5505 },
  { zone: 'Koramangala / Dairy Circle', lat: 12.9352, lng: 77.6245 },
  { zone: 'Peenya Industrial Area', lat: 13.0285, lng: 77.5195 },
  { zone: 'Whitefield / KR Puram Hub', lat: 12.9698, lng: 77.7499 },
  { zone: 'Malleshwaram / Rajajinagar', lat: 13.0031, lng: 77.5643 }
];

interface RequestHelpFormProps {
  onSuccess?: (caseId: string) => void;
  defaultRole?: 'self' | 'volunteer' | 'citizen';
}

export const RequestHelpForm: React.FC<RequestHelpFormProps> = ({
  onSuccess,
  defaultRole = 'self'
}) => {
  const { submitAssistanceRequest } = useUDAAN();
  const { currentLanguage, setLanguage, t } = useLanguage();

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [identifierName, setIdentifierName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedZone, setSelectedZone] = useState(BENGALURU_LOCATIONS[0].zone);
  const [landmark, setLandmark] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<AssistanceCategory[]>(['food_water', 'emergency_shelter']);
  const [description, setDescription] = useState('');
  const [immediateDanger, setImmediateDanger] = useState(false);
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [reportedByRole, setReportedByRole] = useState<'self' | 'volunteer' | 'citizen'>(defaultRole);
  const [reporterName, setReporterName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  const toggleCategory = (cat: AssistanceCategory) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleVoiceTranscript = (text: string, lang: 'en' | 'kn' | 'hi') => {
    setDescription(text);
    setLanguage(lang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && selectedCategories.length === 0) return;

    setIsSubmitting(true);
    const locObj = BENGALURU_LOCATIONS.find(l => l.zone === selectedZone) || BENGALURU_LOCATIONS[0];

    try {
      const createdCase = await submitAssistanceRequest({
        identifierName: isAnonymous ? 'Anonymous Individual' : identifierName || 'Beneficiary in Need',
        isAnonymous,
        preferredLanguage: currentLanguage,
        contactMethod: contactMethod || 'In person field contact',
        approximateLocation: {
          lat: locObj.lat,
          lng: locObj.lng,
          zone: locObj.zone,
          landmark: landmark || 'Near transit node',
          address: `${landmark ? landmark + ', ' : ''}${locObj.zone}, Bengaluru`
        },
        categories: selectedCategories.length > 0 ? selectedCategories : ['food_water'],
        description: description || 'Emergency assistance requested.',
        immediateDanger,
        accessibilityNeeds,
        reportedByRole,
        reporterName: reportedByRole === 'self' ? 'Self-Reported' : reporterName || 'Field Reporter'
      });

      setSubmittedCaseId(createdCase.id);
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess(createdCase.id);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (submittedCaseId) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 text-center space-y-4 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-udaan-navy">
          Assistance Request Received & Analyzed
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Case ID: <strong className="text-udaan-blue font-mono">{submittedCaseId}</strong> has been processed by the UDAAN Multi-Agent System. Nearby verified shelters, food points and healthcare units have been matched.
        </p>
        <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 border border-blue-200">
          A nearby field coordinator or verified partner NGO will review this case and initiate immediate outreach.
        </div>
        <button
          onClick={() => {
            setSubmittedCaseId(null);
            setDescription('');
          }}
          className="px-6 py-2.5 bg-udaan-navy text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
      {/* Top Banner: Low-barrier Guarantee */}
      <div className="p-3.5 bg-udaan-teal-soft/80 border border-udaan-teal/30 rounded-xl flex items-start gap-2.5 text-xs text-slate-700">
        <ShieldCheck className="w-4 h-4 text-udaan-teal shrink-0 mt-0.5" />
        <div>
          <strong className="text-udaan-navy">Zero Barrier Humanitarian Guarantee:</strong>
          <p className="text-slate-600 text-[11px] mt-0.5">
            {t.noIdentificationNeeded}
          </p>
        </div>
      </div>

      {/* Voice Assistant Launcher */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-udaan-red text-white flex items-center justify-center shadow-sm">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-udaan-navy">Prefer to Speak Instead of Type?</h4>
            <p className="text-xs text-slate-500">
              Speak in Kannada, Hindi, or English. Our AI will understand and transcribe your need.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setVoiceModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-udaan-red hover:bg-red-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Start Voice Intake</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Reporting Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">Who is submitting this request?</label>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setReportedByRole('self')}
              className={`p-2.5 rounded-xl border font-medium transition ${
                reportedByRole === 'self'
                  ? 'bg-udaan-blue-soft text-udaan-blue border-udaan-blue'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              I need help (Self)
            </button>
            <button
              type="button"
              onClick={() => setReportedByRole('volunteer')}
              className={`p-2.5 rounded-xl border font-medium transition ${
                reportedByRole === 'volunteer'
                  ? 'bg-udaan-blue-soft text-udaan-blue border-udaan-blue'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              Field Volunteer
            </button>
            <button
              type="button"
              onClick={() => setReportedByRole('citizen')}
              className={`p-2.5 rounded-xl border font-medium transition ${
                reportedByRole === 'citizen'
                  ? 'bg-udaan-blue-soft text-udaan-blue border-udaan-blue'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              Concerned Citizen
            </button>
          </div>
        </div>

        {/* Reporter Name if on behalf */}
        {reportedByRole !== 'self' && (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 block">Reporter Name / Contact (Optional):</label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder="e.g. Ananya Deshpande, Volunteer ID #vol-001"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>
        )}

        {/* Beneficiary Name / Anonymous */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700">Preferred Name or Identifier:</label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-udaan-blue focus:ring-0"
                />
                <span>Stay Anonymous</span>
              </label>
            </div>
            <input
              type="text"
              disabled={isAnonymous}
              value={isAnonymous ? '' : identifierName}
              onChange={(e) => setIdentifierName(e.target.value)}
              placeholder={isAnonymous ? 'Anonymous' : 'e.g. Ramesh Rao or alias'}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none disabled:bg-slate-100 disabled:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Phone or Contact (Optional):</label>
            <input
              type="text"
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              placeholder="e.g. Friend's phone or 'Near station subway'"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>
        </div>

        {/* Location Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Bengaluru Area / Zone:</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none bg-white font-medium"
            >
              {BENGALURU_LOCATIONS.map((loc) => (
                <option key={loc.zone} value={loc.zone}>
                  {loc.zone}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Nearby Landmark / Location:</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Platform 10 Exit Subway, Sangolli Rayanna Station"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>
        </div>

        {/* Assistance Categories */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            What assistance is needed? (Select all that apply):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {ASSISTANCE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              const label =
                currentLanguage === 'kn'
                  ? cat.labelKn
                  : currentLanguage === 'hi'
                  ? cat.labelHi
                  : cat.labelEn;

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                    isSelected
                      ? 'bg-udaan-navy text-white border-udaan-navy shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="font-medium text-[11px] leading-tight">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700">Brief Description of Circumstances:</label>
            <button
              type="button"
              onClick={() => setVoiceModalOpen(true)}
              className="text-[11px] text-udaan-blue hover:underline flex items-center gap-1"
            >
              <Mic className="w-3 h-3 text-udaan-red" />
              <span>Voice Dictation</span>
            </button>
          </div>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='e.g. "Elderly person sitting on pavement, hasn&#39;t eaten since yesterday, has a swollen leg laceration and cannot walk easily."'
            className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none leading-relaxed"
          />
        </div>

        {/* Accessibility & Danger Checks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Accessibility Needs (Optional):</label>
            <input
              type="text"
              value={accessibilityNeeds}
              onChange={(e) => setAccessibilityNeeds(e.target.value)}
              placeholder="e.g. Wheelchair ramp, impaired vision, elderly handrail"
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <div>
                <strong className="text-red-900 block text-xs">Immediate Danger Alert?</strong>
                <span className="text-[10px] text-red-700">Severe physical threat or acute medical emergency</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={immediateDanger}
              onChange={(e) => setImmediateDanger(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || (!description.trim() && selectedCategories.length === 0)}
          className="w-full py-3.5 bg-udaan-navy hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing with Gemini Multi-Agent System...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-udaan-teal" />
              <span>{t.submitRequest}</span>
            </>
          )}
        </button>
      </div>

      <VoiceAssistanceModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscriptComplete={handleVoiceTranscript}
      />
    </form>
  );
};
