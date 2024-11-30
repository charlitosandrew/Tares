import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/loading-screen';
import { Navbar } from '@/components/layout/navbar';
import { HomePage } from '@/pages/home';
import { TasksPage } from '@/pages/tasks';
import { RewardsPage } from '@/pages/rewards';
import { SettingsPage } from '@/pages/settings';
import { Toaster } from '@/components/ui/toaster';
import { routes } from '@/lib/routes';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.tasks} element={<TasksPage />} />
              <Route path={routes.rewards} element={<RewardsPage />} />
              <Route path={routes.settings} element={<SettingsPage />} />
              <Route path="*" element={<Navigate to={routes.home} replace />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Navbar />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}