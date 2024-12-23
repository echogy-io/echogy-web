import { Message } from "@/components/form-message";
import { AuthFormClient } from "./auth-form-client";

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
  message?: Message;
  signInAction: (formData: FormData) => Promise<void>;
  signUpAction?: (formData: FormData) => Promise<void>;
  signInWithGithub: () => Promise<void>;
}

export function AuthForm(props: AuthFormProps) {
  return <AuthFormClient {...props} />;
}
