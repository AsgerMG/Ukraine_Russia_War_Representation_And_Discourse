import Link from "next/link";

type Props = {
  kicker: string;
  title: string;
  standfirst: string;
  meta?: string[];
  children: React.ReactNode;
};

export default function PageShell({ kicker, title, standfirst, meta, children }: Props) {
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 lg:py-16">
        <nav className="font-sans text-[0.78rem] font-medium tracking-wide text-[color:var(--text-muted)]">
          <Link href="/" className="transition-colors hover:text-[color:var(--text)]">
            Picturing the War
          </Link>
        </nav>

        <header className="mt-9 border-b border-[color:var(--rule-strong)] pb-9">
          <p className="kicker">{kicker}</p>
          <h1 className="mt-4">{title}</h1>
          <p className="lede mt-5 max-w-[46ch]">{standfirst}</p>

          {meta && meta.length > 0 && (
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[0.75rem] tracking-wide text-[color:var(--text-muted)]">
              {meta.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="h-3 w-px bg-[color:var(--rule-strong)]" />}
                  {item}
                </span>
              ))}
            </p>
          )}
        </header>

        <div className="mt-12 flex flex-col gap-16">{children}</div>

        <footer className="mt-24 border-t border-[color:var(--rule)] pt-7">
          <Link
            href="/"
            className="font-sans text-[0.8rem] font-semibold text-[color:var(--text-dim)] transition-colors hover:text-[color:var(--text)]"
          >
            ← Back to the front page
          </Link>
          <p className="mt-3 font-sans text-[0.72rem] text-[color:var(--text-muted)]">
            Picturing the War. Visual representation and discourse on Telegram, 2022 to 2026.
          </p>
        </footer>
      </main>
    </div>
  );
}
