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
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:gap-12 lg:py-16">

        {/* breadcrumb + chapter label */}
        <header className="space-y-5 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
              ← Overview
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold italic" style={{ background: pillBg, color: pillText }}>
              {title}
            </span>
          </div>

          <div className="space-y-3" style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }}>
            <p className="kicker">
              {chapter}
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,7vw,4rem)", fontWeight: 700, lineHeight: 1.05, color: "var(--accent)" }}>
              {title}
            </h1>
            <p style={{ maxWidth: "680px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
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
