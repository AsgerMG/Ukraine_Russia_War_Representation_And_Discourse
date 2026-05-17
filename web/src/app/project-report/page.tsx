import Link from "next/link";

export default function ProjectReportPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <header className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 sm:p-8">
        <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
          ← Overview
        </Link>
        <div className="mt-8 space-y-4">
          <p className="kicker">Full text</p>
          <h1 className="font-serif text-[clamp(2.4rem,9vw,5rem)] font-bold leading-none tracking-[-0.04em] text-[color:var(--text)]">
            Project report
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-dim)]">
            The long-form report remains available as a dedicated document view. It is no longer embedded inside the website, so the conference path stays clean and mobile-friendly.
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Scope", "More than 24,000 sampled visual observations across ten Telegram channels."],
          ["Method", "AI-assisted annotation across content type, violence, framing and aesthetic dimensions."],
          ["Argument", "Shared visual grammar, divergent political and documentary uses."],
        ].map(([title, text]) => (
          <article className="stat-card" key={title}>
            <h2 className="font-serif text-xl font-bold text-[color:var(--text)]">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-dim)]">{text}</p>
          </article>
        ))}
      </section>

      <a href="/project-report.html" target="_blank" rel="noopener noreferrer" className="button-primary">
        Open full report
      </a>
    </main>
  );
}
