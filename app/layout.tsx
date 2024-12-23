import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Header } from "@/components/ui/header";
import { NavigationConfig } from "@/config/NavConfig";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
  openGraph: {
    images: '/opengraph-image.png',
  },
  twitter: {
    images: '/twitter-image.png',
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
      <span className="text-lg font-bold text-primary">E</span>
    </div>
    <span className="font-semibold">Echogy</span>
  </Link>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <Header 
              logo={<Logo />}
              mainNav={NavigationConfig.mainNav}
              actions={<HeaderAuth />}
            />
            {!hasEnvVars && <EnvVarWarning />}
            <div className="flex-1 w-full flex flex-col">
              <div className="flex flex-col gap-20 w-full max-w-7xl 2xl:max-w-screen-2xl px-2 sm:px-6 lg:px-4 mx-auto">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
