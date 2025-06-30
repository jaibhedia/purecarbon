'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/Dashboard';
import OnboardingFlow from '@/components/OnboardingFlow';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function HomeContent() {
  const { user, loading, logout } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState(null);

  useEffect(() => {
    // Check if user is new and should see onboarding
    if (user && !showOnboarding) {
      const isNewUser = !localStorage.getItem('purecarbon_onboarded');
      if (isNewUser) {
        setShowOnboarding(true);
      }
    }
  }, [user]);

  const handleAuth = () => {
    setShowSignIn(true);
  };

  const handleOnboardingComplete = (data: any) => {
    setOnboardingData(data);
    setShowOnboarding(false);
    localStorage.setItem('purecarbon_onboarded', 'true');
    localStorage.setItem('purecarbon_user_data', JSON.stringify(data));
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('purecarbon_onboarded');
    localStorage.removeItem('purecarbon_user_data');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign in page
  if (showSignIn && !user) {
    return (
      <SignIn 
        onBack={() => setShowSignIn(false)} 
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />
    );
  }

  // Show sign up page
  if (showSignUp && !user) {
    return (
      <SignUp 
        onBack={() => setShowSignUp(false)} 
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    );
  }

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onAuth={handleAuth} />
          </motion.div>
        ) : showOnboarding ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <OnboardingFlow 
              onComplete={handleOnboardingComplete}
              onSkip={() => setShowOnboarding(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}