
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSignUpClick = () => {
    setActiveTab('signup');
    setShowForm(true);
  };

  const handleLoginClick = () => {
    setActiveTab('login');
    setShowForm(true);
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  return (
    <AuthLayout>
      {!showForm ? (
        <>
          <Button 
            onClick={handleSignUpClick}
            className="w-full max-w-xs py-6 text-xl bg-god-orange hover:bg-orange-600 text-white rounded-full"
          >
            Sign up
          </Button>
          <Button 
            onClick={handleLoginClick}
            variant="ghost" 
            className="text-white text-xl hover:text-god-orange"
          >
            Log in
          </Button>
        </>
      ) : (
        <div className="w-full max-w-md space-y-6 bg-white/90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-auto" onClick={handleBackClick}>
              Back
            </Button>
            <h2 className="text-2xl font-bold mx-auto">
              {activeTab === 'login' ? 'Log In' : 'Sign Up'}
            </h2>
          </div>
          
          {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      )}
    </AuthLayout>
  );
};

export default Auth;
