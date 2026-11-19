import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Prosper Shaibu Asare | Full-Stack Engineering, Web Design & Mobile App Development",
  description:
    "Portfolio of Prosper Shaibu Asare — Full-Stack Software Engineer specializing in modern web design, scalable backend systems, and cross-platform mobile application development.",
  keywords: [
    "Prosper Shaibu Asare",
    "Portfolio",
    "Full-Stack Engineering",
    "Web Designing",
    "Mobile Application Development",
    "Next.js",
    "React Native",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col selection:bg-accent/20 selection:text-foreground">
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
