"use client";

import * as React from "react";
import { Mail, Send, CheckCircle2, MapPin, Phone, MessageSquare } from "lucide-react";
import { GithubIcon } from "./icons";
import { Reveal } from "./reveal";
import { TextMaskReveal } from "./animated-text";

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
    <section id="contact" className="py-24 md:py-28 border-t border-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-7">
            <Reveal direction="left">
              <h2 className="font-montserrat text-xs uppercase tracking-widest font-bold text-accent mb-3.5">
                Get in Touch
              </h2>
              <TextMaskReveal
                as="h3"
                className="font-montserrat text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-[1.2]"
              >
                Let&apos;s build something exceptional together.
              </TextMaskReveal>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether you are launching an upcoming digital product, exploring a full-stack engineering hire, or seeking technical collaboration on web and mobile architectures, I welcome your message.
              </p>
            </Reveal>

            <div className="space-y-4 pt-2">
              <Reveal direction="left" delay={0.2}>
                <a
                  href="mailto:asareprosper143@gmail.com"
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Email</div>
                    <div className="font-montserrat text-sm font-bold text-foreground truncate">
                      asareprosper143@gmail.com
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.24}>
                <a
                  href="https://wa.me/233257560039"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">WhatsApp</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      025 756 0039
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.28}>
                <a
                  href="tel:+233505695047"
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Phone (Calls)</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      +233 50 569 5047 / 055 119 3833
                    </div>
                  </div>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.32}>
                <a
                  href="https://github.com/Psasare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 group shadow-xs"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
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

              <Reveal direction="left" delay={0.36}>
                <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Location & Base</div>
                    <div className="font-montserrat text-sm font-bold text-foreground">
                      Ho, Ghana
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.15}>
              <div className="p-8 sm:p-9 rounded-3xl border border-border bg-card shadow-xs">
                {submitted ? (
                  <div className="py-14 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-montserrat text-xl font-bold text-foreground">
                      Message Received!
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out, Prosper will review your message and reply promptly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-montserrat text-xs font-semibold uppercase tracking-wider hover:bg-muted transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-montserrat text-[11px] uppercase tracking-wider font-bold text-foreground">
                          Your Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-montserrat text-[11px] uppercase tracking-wider font-bold text-foreground">
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

                    <div className="space-y-2">
                      <label className="font-montserrat text-[11px] uppercase tracking-wider font-bold text-foreground">
                        Subject / Project Scope
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Web platform, mobile app development, or software engineering opening"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-montserrat text-[11px] uppercase tracking-wider font-bold text-foreground">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell me about your project, timeline, or engineering goals..."
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 mt-2"
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
