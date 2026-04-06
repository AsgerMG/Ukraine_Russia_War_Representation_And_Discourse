import Link from "next/link";

export default function ImpliedViolencePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* ── page header ── */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-zinc-400 transition hover:text-zinc-600"
            >
              ← Overview
            </Link>
            <span className="text-zinc-200">/</span>
            <span className="rounded-full bg-[#c5e0ff] px-3 py-1 text-xs font-semibold italic text-zinc-900">
              Implied violence
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Implied violence
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            How violence is suggested, obscured or made visible through language,
            imagery and platform constraints across ten Russian-language Telegram
            channels — February 2022 to December 2025.
          </p>
        </header>

        {/* ── overview ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0057b8] text-xs font-bold text-white">
              1
            </span>
            <h2 className="text-base font-semibold text-zinc-900">
              Overview
            </h2>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-sm leading-relaxed text-zinc-700 space-y-3">
            <p>
              Use this page to unpack how violence appears directly versus being
              hinted at or kept off-screen. You might compare different outlet
              policies, content warnings and visual strategies, supported by
              annotated examples.
            </p>
          </div>
        </section>

        {/* ── violence analysis embed ── */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd700] text-xs font-bold text-zinc-900">
                2
              </span>
              <div>
                <h2 className="text-base font-semibold text-zinc-900">
                  Violence on the front
                </h2>
                <p className="text-xs text-zinc-500">
                  Interactive D3 analysis of violence imagery across the corpus
                </p>
              </div>
            </div>
            <a
              href="/violence.html"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
            >
              Open full view ↗
            </a>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-md"
            style={{ height: "600px" }}
          >
            <iframe
              src="/violence.html"
              className="absolute inset-0 h-full w-full"
              title="Violence on the Front — Telegram War Imagery Analysis"
              loading="lazy"
            />
          </div>
        </section>

        <footer className="border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          <Link href="/" className="underline underline-offset-2">
            Back to overview
          </Link>
        </footer>

      </main>
    </div>
  );
}
