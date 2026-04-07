import Link from "next/link";

type Props = {
  chapter: string;
  title: string;
  subtitle: string;
  pillBg?: string;   // hex background for the breadcrumb pill
  pillText?: string; // hex text color for the breadcrumb pill
  children: React.ReactNode;
};

export default function PageShell({ chapter, title, subtitle, pillBg = "#0057b7", pillText = "#fff", children }: Props) {
  return (
    <div className="min-h-screen" style={{ color: "var(--text)" }}>
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* breadcrumb + chapter label */}
        <header className="space-y-5">
          <div className="flex items-center gap-3">
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
              ← Overview
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold italic" style={{ background: pillBg, color: pillText }}>
              {title}
            </span>
          </div>

          <div className="space-y-3" style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              {chapter}
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--accent)" }}>
              {title}
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
              {subtitle}
            </p>
          </div>
        </header>

        {children}

        <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", fontFamily: "var(--mono)", fontSize: "11px" }}>
          <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            ← Back to overview
          </Link>
        </footer>

      </main>
    </div>
  );
}
