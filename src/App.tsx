import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { UDAANProvider } from './context/UDAANContext';

import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { GuidedDemoModal } from './components/demo/GuidedDemoModal';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { GetHelpPage } from './pages/public/GetHelpPage';
import { ReportNeedPage } from './pages/public/ReportNeedPage';
import { FindResourcesPage } from './pages/public/FindResourcesPage';
import { VolunteerPage } from './pages/public/VolunteerPage';
import { PartnerWithUsPage } from './pages/public/PartnerWithUsPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Dashboard Pages
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { BeneficiaryDashboard } from './pages/dashboard/BeneficiaryDashboard';
import { NGODashboard } from './pages/dashboard/NGODashboard';
import { VolunteerDashboard } from './pages/dashboard/VolunteerDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { CityIntelligencePage } from './pages/dashboard/CityIntelligencePage';
import { AssistanceCasesPage } from './pages/dashboard/AssistanceCasesPage';
import { AICoordinatorPage } from './pages/dashboard/AICoordinatorPage';
import { ResourcesPage } from './pages/dashboard/ResourcesPage';
import { OrganisationsPage } from './pages/dashboard/OrganisationsPage';
import { RehabilitationPage } from './pages/dashboard/RehabilitationPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-udaan-offwhite">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <UDAANProvider>
            <div className="relative font-sans text-slate-800 antialiased selection:bg-udaan-blue selection:text-white min-h-screen">
              <DemoBanner />
              <GuidedDemoModal />

              <Routes>
                {/* Public Website Routes (Section 3) */}
                <Route
                  path="/"
                  element={
                    <PublicLayout>
                      <LandingPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PublicLayout>
                      <AboutPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/how-it-works"
                  element={
                    <PublicLayout>
                      <HowItWorksPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/get-help"
                  element={
                    <PublicLayout>
                      <GetHelpPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/report-need"
                  element={
                    <PublicLayout>
                      <ReportNeedPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/find-resources"
                  element={
                    <PublicLayout>
                      <FindResourcesPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/volunteer"
                  element={
                    <PublicLayout>
                      <VolunteerPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/partner-with-us"
                  element={
                    <PublicLayout>
                      <PartnerWithUsPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicLayout>
                      <LoginPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicLayout>
                      <RegisterPage />
                    </PublicLayout>
                  }
                />

                {/* Role-Based Dashboard Command Routes (Section 3 & 12) */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="beneficiary" element={<BeneficiaryDashboard />} />
                  <Route path="ngo" element={<NGODashboard />} />
                  <Route path="volunteer" element={<VolunteerDashboard />} />
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="city-intelligence" element={<CityIntelligencePage />} />
                  <Route path="assistance-cases" element={<AssistanceCasesPage />} />
                  <Route path="ai-coordinator" element={<AICoordinatorPage />} />
                  <Route path="resources" element={<ResourcesPage />} />
                  <Route path="organisations" element={<OrganisationsPage />} />
                  <Route path="rehabilitation" element={<RehabilitationPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </UDAANProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
