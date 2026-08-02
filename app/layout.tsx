import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as SonnerToaster } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { ApolloWrapper } from "@/components/apollo-provider";
import { AuthInitializer } from "@/components/auth-initializer";
import { ErrorBoundary } from "@/components/error-boundary";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "CO CRM - CultureOwl Patron Intelligence",
  description: "Contacts, segments, campaigns, and analytics for CultureOwl arts and culture organizations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <ApolloWrapper>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
              <AuthInitializer>
                {children}
                <Toaster />
                <SonnerToaster />
              </AuthInitializer>
            </ThemeProvider>
          </ApolloWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
