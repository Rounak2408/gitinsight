import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { RepoDetailPage } from './pages/RepoDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { CareerFitPage } from './pages/CareerFitPage';
import { JdAnalyzerPage } from './pages/JdAnalyzerPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { InterviewPage } from './pages/InterviewPage';
import { MockInterviewSessionPage } from './pages/MockInterviewSessionPage';
import { HistoryPage } from './pages/HistoryPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing & Auth Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Application Shell Routes */}
          <Route
            path="/dashboard"
            element={
              <AppShell>
                <DashboardPage />
              </AppShell>
            }
          />
          <Route
            path="/analyzer"
            element={
              <AppShell>
                <AnalyzerPage />
              </AppShell>
            }
          />
          <Route
            path="/repositories"
            element={
              <AppShell>
                <RepositoriesPage />
              </AppShell>
            }
          />
          <Route
            path="/repositories/:id"
            element={
              <AppShell>
                <RepoDetailPage />
              </AppShell>
            }
          />
          <Route
            path="/skills"
            element={
              <AppShell>
                <SkillsPage />
              </AppShell>
            }
          />
          <Route
            path="/career"
            element={
              <AppShell>
                <CareerFitPage />
              </AppShell>
            }
          />
          <Route
            path="/jd-analyzer"
            element={
              <AppShell>
                <JdAnalyzerPage />
              </AppShell>
            }
          />
          <Route
            path="/roadmap"
            element={
              <AppShell>
                <RoadmapPage />
              </AppShell>
            }
          />
          <Route
            path="/interview"
            element={
              <AppShell>
                <InterviewPage />
              </AppShell>
            }
          />
          <Route
            path="/interview/session"
            element={
              <AppShell>
                <MockInterviewSessionPage />
              </AppShell>
            }
          />
          <Route
            path="/history"
            element={
              <AppShell>
                <HistoryPage />
              </AppShell>
            }
          />
          <Route
            path="/reports"
            element={
              <AppShell>
                <ReportsPage />
              </AppShell>
            }
          />
          <Route
            path="/settings"
            element={
              <AppShell>
                <SettingsPage />
              </AppShell>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
