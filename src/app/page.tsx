import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { LaunchTransition } from "@/components/launch-transition";
import { TypographicMarquee } from "@/components/animated-text";
import { TechHeroBackground } from "@/components/ui/tech-hero-background";

export default function Home() {
  return (
    <LaunchTransition>
      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        {/* Global Tech & Development Background Animation across the entire portfolio */}
        <TechHeroBackground />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <TypographicMarquee />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LaunchTransition>
  );
}
