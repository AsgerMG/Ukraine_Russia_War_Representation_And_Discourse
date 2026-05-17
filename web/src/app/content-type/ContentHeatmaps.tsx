"use client";

import { useMemo, useState } from "react";
import { heatmaps, type HeatmapDatum } from "./heatmapData";

type Mode = "category" | "channel";

function cellColor(value: number) {
  const t = Math.min(value / 80, 1);
  return `rgba(0, 87, 183, ${0.08 + t * 0.82})`;
}

function shortMonth(month: string) {
  const [year, monthNumber] = month.split("-");
  return monthNumber === "01" || monthNumber === "07" ? `${year.slice(2)}-${monthNumber}` : "";
}

function HeatmapPanel({ heatmap, compact = false }: { heatmap: HeatmapDatum; compact?: boolean }) {
  return (
    <article className="rounded-3xl border border-[color:var(--border)] bg-black/35 p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">{heatmap.mode === "category" ? "Category" : "Channel"} heatmap</p>
          <h3 className="mt-1 font-serif text-2xl font-bold text-[color:var(--text)]">{heatmap.name}</h3>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
          {heatmap.y.length} rows x {heatmap.x.length} months
        </p>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid min-w-max gap-px font-mono text-[9px]"
          style={{ gridTemplateColumns: `minmax(${compact ? "88px" : "128px"}, auto) repeat(${heatmap.x.length}, ${compact ? "10px" : "14px"})` }}
        >
          <div />
          {heatmap.x.map((month) => (
            <div
              key={month}
              className="h-7 -rotate-45 whitespace-nowrap text-[color:var(--text-muted)]"
              title={month}
            >
              {shortMonth(month)}
            </div>
          ))}
          {heatmap.y.map((label, rowIndex) => (
            <div className="contents" key={label}>
              <div className="sticky left-0 z-10 flex items-center bg-[#08090b] pr-3 text-right text-[color:var(--text-dim)]">
                {label}
              </div>
              {heatmap.z[rowIndex].map((value, colIndex) => {
                const safeValue = Number.isFinite(value) ? value : 0;
                return (
                  <div
                    key={`${label}-${heatmap.x[colIndex]}`}
                    className={`${compact ? "h-4" : "h-5"} rounded-[2px] border border-black/20`}
                    style={{ background: cellColor(safeValue) }}
                    title={`${label} · ${heatmap.x[colIndex]} · ${safeValue.toFixed(1)}%`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ContentHeatmaps() {
  const [mode, setMode] = useState<Mode>("category");
  const heatmapsForMode = useMemo(() => heatmaps.filter((heatmap) => heatmap.mode === mode), [mode]);
  const [selectedName, setSelectedName] = useState(heatmapsForMode[0].name);
  const selected = heatmapsForMode.find((heatmap) => heatmap.name === selectedName) ?? heatmapsForMode[0];

  function chooseMode(nextMode: Mode) {
    const nextHeatmaps = heatmaps.filter((heatmap) => heatmap.mode === nextMode);
    setMode(nextMode);
    setSelectedName(nextHeatmaps[0].name);
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
        <p className="kicker">Native heatmaps · full migration</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-[color:var(--text)]">Channel content heatmaps</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-dim)]">
          This recreates the original HTML dashboard as React: 12 category heatmaps and 10 channel heatmaps, using the same Plotly export values. Category view compares channels within one content type. Channel view compares content types within one channel.
        </p>
      </div>

      <div className="rounded-3xl border border-[color:var(--border)] bg-black/30 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex rounded-full border border-[color:var(--border)] bg-black/30 p-1">
            {(["category", "channel"] as const).map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => chooseMode(option)}
                className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition"
                style={{
                  background: mode === option ? "var(--ukraine-yellow)" : "transparent",
                  color: mode === option ? "#07101f" : "var(--text-dim)",
                }}
              >
                {option === "category" ? "Category view" : "Channel view"}
              </button>
            ))}
          </div>

          <div className="flex max-w-3xl flex-wrap gap-2">
            {heatmapsForMode.map((heatmap) => (
              <button
                type="button"
                key={heatmap.name}
                onClick={() => setSelectedName(heatmap.name)}
                className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition"
                style={{
                  borderColor: selected.name === heatmap.name ? "var(--ukraine-yellow)" : "var(--border)",
                  color: selected.name === heatmap.name ? "var(--ukraine-yellow)" : "var(--text-muted)",
                  background: selected.name === heatmap.name ? "rgba(255,221,0,0.08)" : "transparent",
                }}
              >
                {heatmap.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <HeatmapPanel heatmap={selected} />

      <div className="hidden space-y-4 xl:block">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
          <p className="kicker">All {mode} heatmaps</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-dim)]">
            Desktop overview of every heatmap in the selected mode. Use the controls above for a larger, readable version.
          </p>
        </div>
        <div className="grid gap-4 2xl:grid-cols-2">
          {heatmapsForMode.map((heatmap) => (
            <HeatmapPanel key={heatmap.name} heatmap={heatmap} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
