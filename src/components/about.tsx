import * as React from "react";
import { Terminal, Code2, Rocket, Smartphone } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Terminal,
      title: "Clean Architecture",
      text: "Writing modular, testable, and maintainable code built with TypeScript and resilient system patterns.",
    },
    {
      icon: Smartphone,
      title: "Mobile & Responsive",
      text: "Crafting fluid cross-platform mobile apps and responsive web interfaces designed for intuitive human touch.",
    },
    {
      icon: Code2,
      title: "User-Centered Thinking",
      text: "Every interaction, animation curve, and breakpoint is tuned for real human accessibility and speed.",
    },
    {
      icon: Rocket,
      title: "Adaptive & Iterative",
      text: "Rapid prototyping, continuous delivery, and staying ahead of emerging development tools and engineering practices.",
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
              About Me
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Passionate about full-stack engineering, web design, and mobile solutions.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I am a Software Engineer specializing in full-stack engineering, modern web designing, and mobile application development. My approach combines robust backend systems with refined, accessible user interfaces.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Whether building resilient healthcare platforms, developing machine learning computer vision systems, or engineering mobile applications, I focus on delivering seamless end-to-end user experiences that perform flawlessly across both light and dark environments.
            </p>
          </div>

          {/* Pillars grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md space-y-2.5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
