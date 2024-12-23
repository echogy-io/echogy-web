"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useState } from "react";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
  children: React.ReactNode;
};

export function SubmitButton({
  children,
  pendingText = "Loading...",
  onClick,
  ...props
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button 
      {...props} 
      onClick={handleClick}
      disabled={isLoading || props.disabled}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? pendingText : children}
    </Button>
  );
}
