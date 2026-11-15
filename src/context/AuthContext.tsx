import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatarInitials: string;
  organisationId?: string;
  organisationName?: string;
  assignedZone?: string;
  isVerified: boolean;
}

const DEMO_USERS: Record<UserRole, UserProfile> = {
  administrator: {
    id: 'user-admin-01',
    name: 'Dr. Vivek Menon',
    role: 'administrator',
    email: 'admin.operations@udaan-network.org',
    avatarInitials: 'VM',
    isVerified: true
  },
  ngo_partner: {
    id: 'user-ngo-01',
    name: 'Prashanth Kumar',
    role: 'ngo_partner',
    email: 'field@samarthanam.org',
    avatarInitials: 'PK',
    organisationId: 'org-samarthanam',
    organisationName: 'Samarthanam Trust for Human Welfare',
    isVerified: true
  },
  volunteer: {
    id: 'user-vol-01',
    name: 'Ananya Deshpande',
    role: 'volunteer',
    email: 'ananya.d@udaan-network.org',
    avatarInitials: 'AD',
    assignedZone: 'Majestic / KSR Hub',
    isVerified: true
  },
  beneficiary: {
    id: 'user-ben-01',
    name: 'Ramesh Rao (Beneficiary)',
    role: 'beneficiary',
    email: 'beneficiary.portal@udaan-network.org',
    avatarInitials: 'RR',
    isVerified: true
  },
  social_worker: {
    id: 'user-sw-01',
    name: 'Kavitha Ramesh (MSW)',
    role: 'social_worker',
    email: 'kavitha.r@udaan-network.org',
    avatarInitials: 'KR',
    isVerified: true
  }
};

interface AuthContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  availableRoles: { role: UserRole; label: string; description: string }[];
  isAuthenticated: boolean;
  logout: () => void;
  loginAs: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('udaan_active_role') as UserRole;
    return DEMO_USERS[saved] || DEMO_USERS.administrator;
  });

  const availableRoles: { role: UserRole; label: string; description: string }[] = [
    {
      role: 'beneficiary',
      label: 'Beneficiary Dashboard',
      description: 'Submit assistance requests with Conversational AI, track active case, view matched services & rehabilitation'
    },
    {
      role: 'ngo_partner',
      label: 'NGO / Service Provider Dashboard',
      description: 'Manage organisation capacity (beds/meals), view matched requests, accept or reject referrals with explanation'
    },
    {
      role: 'volunteer',
      label: 'Volunteer Dashboard',
      description: 'View assigned assistance tasks, accept dispatches, update task progress, view completed activities'
    },
    {
      role: 'administrator',
      label: 'Administrator Dashboard',
      description: 'Overall platform statistics, user roles, NGO verification, Humanitarian Digital Twin, What-If simulation'
    }
  ];

  const switchRole = (role: UserRole) => {
    const newUser = DEMO_USERS[role] || DEMO_USERS.administrator;
    setCurrentUser(newUser);
    localStorage.setItem('udaan_active_role', role);
  };

  const loginAs = (role: UserRole) => {
    switchRole(role);
  };

  const logout = () => {
    switchRole('beneficiary');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        switchRole,
        availableRoles,
        isAuthenticated: true,
        logout,
        loginAs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
