import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Shield, Candy } from 'lucide-react';

export function Header() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Candy className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Sweet Shop
              </h1>
              <p className="text-sm text-muted-foreground">
                Your sweetest dreams come true
              </p>
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{user.username}</span>
                {isAdmin && (
                  <>
                    <Shield className="h-4 w-4 text-primary ml-2" />
                    <span className="text-primary font-medium">Admin</span>
                  </>
                )}
              </div>
              
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}