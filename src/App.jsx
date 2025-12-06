import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { BotStatusPage } from './pages/BotStatusPage';
import { TaskAllocationPage } from './pages/TaskAllocationPage';
import { TaskQueuePage } from './pages/TaskQueuePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MapPage } from './pages/MapPage';
import { ThreeSim } from './pages/ThreeSim';
import { useAuthStore } from './state/authStore';

/**
 * Main App Component
 * Sets up routing and protected routes
 */
function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bots"
            element={
              <ProtectedRoute>
                <BotStatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/allocate"
            element={
              <ProtectedRoute>
                <TaskAllocationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/queue"
            element={
              <ProtectedRoute>
                <TaskQueuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/3d"
            element={
              <ProtectedRoute>
                <ThreeSim />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

