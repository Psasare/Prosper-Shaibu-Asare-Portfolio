"use client";

import * as React from "react";
import { Mail, Send, CheckCircle2, MapPin, Phone } from "lucide-react";
import { GithubIcon } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left">
              <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3">
                Get in Touch
              </h2>
              <p className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                Let&apos;s build something exceptional together.
              </p>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Have an upcoming web project, mobile app, software engineering contract, or technical infrastructure need? Feel free to reach out directly.
              </p>
            </Reveal>

            <div className="space-y-3.5 pt-2">
              <Reveal direction="left" delay={0.2}>
                <a
                  href="mailto:asareprosper143@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Email</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      asareprosper143@gmail.com
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.25}>
                <a
                  href="tel:+233505695047"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Phone & WhatsApp</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      +233 50 569 5047 / 055 119 3833
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.3}>
                <a
                  href="https://github.com/Psasare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">GitHub</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      github.com/Psasare
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.35}>
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Location & Education</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      Accra, Ghana &bull; Univ. of Ghana, Legon
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.15}>
              <div className="p-8 rounded-3xl border border-border bg-card shadow-xs">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-montserrat text-xl font-bold text-foreground">
                      Message Received!
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto">
                      Thank you for reaching out, Prosper will review your message and reply as soon as possible.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-montserrat text-xs font-semibold uppercase tracking-wider hover:bg-muted transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-montserrat text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                          Your Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-montserrat text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-montserrat text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                        Subject / Focus Area
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Web design, mobile app, full-stack opening, or IT infrastructure"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-montserrat text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me about your project, timeline, or requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
