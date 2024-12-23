'use server';

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type AuthRedirectParams = {
  path: string;
  message: string;
  type: 'error' | 'success';
};

function redirectWithMessage({ path, message, type }: AuthRedirectParams) {
  return redirect(`${path}?message=${encodeURIComponent(message)}&type=${type}`);
}

export async function signInAction(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirectWithMessage({
      path: '/sign-in',
      message: error.message,
      type: 'error'
    });
  }

  return redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return redirectWithMessage({
      path: '/sign-up',
      message: error.message,
      type: 'error'
    });
  }

  return redirectWithMessage({
    path: '/sign-in',
    message: 'Check email to continue sign in process',
    type: 'success'
  });
}

export async function signInWithGithub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error("GitHub OAuth error:", error);
    return redirectWithMessage({
      path: '/sign-in',
      message: error.message,
      type: 'error'
    });
  }

  return redirect(data?.url || "/");
}

export async function forgotPasswordAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return redirectWithMessage({
      path: '/forgot-password',
      message: error.message,
      type: 'error'
    });
  }

  return redirectWithMessage({
    path: '/forgot-password',
    message: 'Check your email to continue',
    type: 'success'
  });
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return redirectWithMessage({
      path: '/reset-password',
      message: 'Password and confirm password are required',
      type: 'error'
    });
  }

  if (password !== confirmPassword) {
    return redirectWithMessage({
      path: '/reset-password',
      message: 'Passwords do not match',
      type: 'error'
    });
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return redirectWithMessage({
      path: '/reset-password',
      message: error.message,
      type: 'error'
    });
  }

  return redirectWithMessage({
    path: '/sign-in',
    message: 'Password updated successfully',
    type: 'success'
  });
}

export async function signOutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    return redirectWithMessage({
      path: '/',
      message: error.message,
      type: 'error'
    });
  }

  return redirectWithMessage({
    path: '/sign-in',
    message: 'Signed out successfully',
    type: 'success'
  });
}
