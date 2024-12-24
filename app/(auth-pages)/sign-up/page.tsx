import { signUpAction, signInWithGithub } from "@/app/actions";
import { Message } from "@/components/form-message";
import {AuthFormClient} from "@/components/auth/auth-form-client";


export const runtime = 'edge';

interface PageProps {
  searchParams: Promise<{
    message?: string;
    error?: boolean;
  }>;
}

export default async function SignUp({ searchParams }: PageProps) {
  const params = await searchParams;
  const message: Message | undefined = params.message
    ? {
        type: params.error ? "error" : "success",
        message: params.message,
      }
    : undefined;

  return (
    <AuthFormClient
      type="sign-up"
      message={message}
      signInAction={signUpAction}
      signInWithGithub={signInWithGithub}
    />
  );
}
