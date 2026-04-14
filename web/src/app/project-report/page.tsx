import Link from "next/link";

export default function ProjectReportPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text)", display: "flex", flexDirection: "column" }}>

      {/* ── slim header bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
          ← Overview
        </Link>
        <span style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 700, color: "var(--accent)", fontStyle: "italic" }}>
          Picturing the War
        </span>
        <a
          href="/project-report.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-dim)", padding: "6px 16px", borderRadius: "99px", textDecoration: "none" }}
        >
          Open full view ↗
        </a>
      </div>

      {/* ── full-bleed iframe ── */}
      <div style={{ flex: 1, position: "relative", minHeight: "0" }}>
        <iframe
          src="/project-report.html"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          title="Picturing the War — Visual Representation on Telegram, 2022–2026"
        />
      </div>

    </div>
  );
}
