'use client'
import { Message } from "@/components/form-message";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/form-message";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

interface AuthFormClientProps {
  type: 'sign-in' | 'sign-up';
  message?: Message;
  signInAction: (formData: FormData) => Promise<void>;
  signUpAction?: (formData: FormData) => Promise<void>;
  signInWithGithub: () => Promise<void>;
}

export function AuthFormClient({
  type,
  message,
  signInAction,
  signUpAction,
  signInWithGithub,
}: AuthFormClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = () => {
    try {
      setIsLoading(true);
      signInWithGithub();
    } catch (error) {
      console.error('GitHub login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(event.currentTarget);
      if (type === 'sign-in') {
         signInAction(formData);
      } else if (signUpAction) {
        signUpAction(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {type === 'sign-in' ? 'Sign in' : 'Create an account'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {type === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}
            <Link
              className="font-medium text-primary hover:underline"
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>

        {message && <FormMessage message={message} />}

        <Button
          className="w-full"
          variant="outline"
          type="button"
          onClick={handleGithubLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          )}
          {isLoading ? 'Connecting...' : 'Continue with GitHub'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === 'sign-in' && (
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            )}
            {type === 'sign-in' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </div>
    </Card>
  );
}
