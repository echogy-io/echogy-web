export type Message =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export function FormMessage({ message, className }: { message?: Message; className?: string }) {
  if (!message) return null;

  const isError = message.type === 'error';
  const borderColorClass = isError ? 'border-destructive-foreground' : 'border-foreground';
  const textColorClass = isError ? 'text-destructive-foreground' : 'text-foreground';

  return (
    <div className={`flex flex-col gap-2 w-full max-w-md text-sm ${className || ''}`}>
      <div className={`${textColorClass} border-l-2 ${borderColorClass} px-4`}>
        {message.message}
      </div>
    </div>
  );
}
