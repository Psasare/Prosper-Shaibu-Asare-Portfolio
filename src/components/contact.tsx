"use client";

import * as React from "react";
import { Mail, Send, CheckCircle2, MapPin } from "lucide-react";
import { GithubIcon } from "./icons";

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate swift client validation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 border-t border-border/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-primary">
              Get in Touch
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Let&apos;s build something exceptional together.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Have an upcoming product, 3D experience, or engineering opening? Feel free to reach out directly or send a message.
            </p>

            <div className="space-y-4 pt-4">
              <a
                href="mailto:prosper.shaibu.asare@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">Email Me</div>
                  <div className="text-sm font-semibold text-foreground">
                    Connect via Email
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/Psasare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">GitHub</div>
                  <div className="text-sm font-semibold text-foreground">
                    github.com/Psasare
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">Location & Work Style</div>
                  <div className="text-sm font-semibold text-foreground">
                    Remote & Worldwide Collaboration
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-lg shadow-black/5">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Thank you for reaching out. I will get back to you promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-primary hover:underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/90">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground/90">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/90">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Project Inquiry / Engineering Role"
                      className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground/90">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your project, timeline, or scope..."
                      className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/80 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md shadow-primary/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
