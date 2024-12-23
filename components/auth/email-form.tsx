'use client';

import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

interface EmailFormProps {
  type: 'sign-in' | 'sign-up';
  message?: Message;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function EmailForm({ type, message, onSubmit }: EmailFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      return;
    }
    const formData = new FormData(formRef.current);
    await onSubmit(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />

        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          {type === 'sign-in' && (
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          )}
        </div>

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={type === 'sign-in' ? 'current-password' : 'new-password'}
          placeholder="Your password"
          minLength={6}
          required
        />

        <Button type="submit" className="w-full">
          {type === 'sign-in' ? 'Sign in with Email' : 'Sign up with Email'}
        </Button>

        <FormMessage message={message} />
      </div>
    </form>
  );
}
