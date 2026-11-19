import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Prosper Shaibu Asare | Web Designing & Mobile Application Development",
  description:
    "Portfolio of Prosper Shaibu Asare — Specializing in modern web designing, intuitive UI/UX, and high-performance cross-platform mobile application development.",
  keywords: [
    "Prosper Shaibu Asare",
    "Portfolio",
    "Web Designing",
    "Mobile Application Development",
    "Next.js",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
