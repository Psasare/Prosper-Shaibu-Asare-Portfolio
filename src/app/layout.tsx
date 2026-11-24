import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const wetzlar = localFont({
  src: "./fonts/YWFT-Wetzlar-Grotesk-Regular.otf",
  variable: "--font-wetzlar",
  display: "swap",
});

const mondique = localFont({
  src: "./fonts/Mondique-Regular.otf",
  variable: "--font-mondique",
  display: "swap",
});

const natux = localFont({
  src: "./fonts/YWFT-Natux-Regular.otf",
  variable: "--font-natux",
  display: "swap",
});

const garadone = localFont({
  src: "./fonts/YWFT-Garadone-Regular.otf",
  variable: "--font-garadone",
  display: "swap",
});

const ultramagnetic = localFont({
  src: "./fonts/YWFT-Ultramagnetic-Expanded.otf",
  variable: "--font-ultramagnetic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prosper Shaibu Asare | Full-Stack Engineering, Web Design & Mobile App Development",
  description:
    "Portfolio of Prosper Shaibu Asare - Full-Stack Software Engineer specializing in modern web design, scalable backend systems, and cross-platform mobile application development.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${wetzlar.variable} ${mondique.variable} ${natux.variable} ${garadone.variable} ${ultramagnetic.variable}`}
    >
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
