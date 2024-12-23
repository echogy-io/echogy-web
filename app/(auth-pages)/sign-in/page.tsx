import { signInAction, signInWithGithub } from "@/app/actions";
import { Message } from "@/components/form-message";
import { AuthFormClient } from "@/components/auth/auth-form-client";

interface PageProps {
  searchParams: Promise<{
    message?: string;
    type?: string;
  }>;
}

export default async function SignIn({ searchParams }: PageProps) {
  const params = await searchParams;
  const messageObj: Message | undefined = params?.message
    ? {
        type: (params.type as "success" | "error") || "error",
        message: params.message,
      }
    : undefined;

  return (
    <AuthFormClient
      type="sign-in"
      message={messageObj}
      signInAction={signInAction}
      signInWithGithub={signInWithGithub}
    />
  );
}
