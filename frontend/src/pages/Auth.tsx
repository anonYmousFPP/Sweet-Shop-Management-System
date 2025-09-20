import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Candy } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-primary rounded-full shadow-glow">
              <Candy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-sweet bg-clip-text text-transparent">
            Sweet Shop
          </h1>
          <p className="text-muted-foreground mt-2">
            Your gateway to the sweetest treats
          </p>
        </div>

        {/* Auth Forms */}
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Made with 💖 for sweet lovers everywhere</p>
        </div>
      </div>
    </div>
  );
}