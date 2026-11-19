import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6 p-8 rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-foreground">404</h1>
          <h2 className="text-lg font-semibold text-foreground/90">Page Not Found</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-md shadow-primary/25 hover:opacity-90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
