
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <AuthLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100/80 p-1.5 rounded-xl">
          <TabsTrigger 
            value="login"
            className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-god-green data-[state=active]:shadow-sm"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="signup"
            className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-god-orange data-[state=active]:shadow-sm"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4">
          <LoginForm />
        </TabsContent>

        <TabsContent value="signup" className="space-y-4">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Auth;
