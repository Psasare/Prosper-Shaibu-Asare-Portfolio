import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Prosper Shaibu Asare | Software Engineer & Creative Developer",
  description:
    "Portfolio of Prosper Shaibu Asare — Full-stack Software Engineer specializing in modern web applications, interactive 3D experiences, and high-performance software architecture.",
  keywords: [
    "Prosper Shaibu Asare",
    "Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Spline 3D",
    "Creative Developer",
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
