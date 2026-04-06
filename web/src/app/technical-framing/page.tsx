import Link from "next/link";
import VisualAnalysis from "./VisualAnalysis";

export default function TechnicalFramingPage() {
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
            <span className="rounded-full bg-[#ffe789] px-3 py-1 text-xs font-semibold italic text-zinc-900">
              Technical framing
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Technical framing
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            How image-production modes — drone POV, soldier POV, civilian recording,
            professional production, composite/meme and screenshot — shift across ten
            Russian-language Telegram channels between February 2022 and December 2025.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              n = 24,559 images
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              10 Telegram channels
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              Feb 2022 – Dec 2025
            </span>
          </div>
        </header>

        {/* ── stat summary ── */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Drone POV peak", value: "12%", sub: "H1 2024 — up from 3.4% in 2022" },
            { label: "Gamification score", value: "×2.2", sub: "0.84 → 1.83 over the study period" },
            { label: "Drone dehumanisation", value: "5.04", sub: "vs corpus-wide 2.06 in H2 2025" },
          ].map(s => (
            <div key={s.label}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {s.label}
              </p>
              <p className="text-3xl font-bold text-zinc-900">{s.value}</p>
              <p className="text-xs text-zinc-500">{s.sub}</p>
            </div>
          ))}
        </section>

        {/* ── interactive charts ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0057b8] text-xs font-bold text-white">
              1
            </span>
            <h2 className="text-base font-semibold text-zinc-900">
              Frame type analysis
            </h2>
          </div>
          <VisualAnalysis />
        </section>

        {/* ── interpretation ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd700] text-xs font-bold text-zinc-900">
              2
            </span>
            <h2 className="text-base font-semibold text-zinc-900">
              Interpretation
            </h2>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4 text-sm leading-relaxed text-zinc-700">
            <p>
              The data reveal a structural shift in how the war is technically
              framed over time. The early dominance of civilian recording — raw,
              ground-level, often chaotic footage — gives way to a more
              mediated set of production modes. Drone POV tripled across the
              corpus and became the defining visual register for a subset of
              militarily-oriented channels, while screenshot and professional
              production grew in the commentary-aggregator channels.
            </p>
            <p>
              This divergence is not merely aesthetic. The annotation scores
              show that drone footage consistently scores higher on gamification
              and dehumanisation than any other frame type. By H2 2025, drone
              POV images score 6.04 on gamification (out of 7) compared to a
              corpus-wide average of ~1.7 — suggesting that the drone aesthetic
              imports the visual grammar of first-person games into the
              representation of lethal force.
            </p>
            <p>
              The plateau of scores in 2025 may reflect content normalisation:
              audiences — and producers — become accustomed to the register,
              reducing its marked quality, even as its prevalence remains high.
            </p>
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
