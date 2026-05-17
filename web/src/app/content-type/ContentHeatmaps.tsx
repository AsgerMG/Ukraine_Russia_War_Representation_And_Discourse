"use client";

import { useMemo, useState } from "react";
import { heatmaps, type HeatmapDatum } from "./heatmapData";

type Mode = "category" | "channel";

function cellColor(value: number) {
  const t = Math.min(value / 80, 1);
  return `rgba(0, 91, 187, ${0.06 + t * 0.84})`;
}

function shortMonth(month: string) {
  const [year, monthNumber] = month.split("-");
  return monthNumber === "01" || monthNumber === "07" ? `${year.slice(2)}-${monthNumber}` : "";
}

function HeatmapPanel({ heatmap }: { heatmap: HeatmapDatum }) {
  return (
    <figure className="figure m-0">
      <figcaption className="figure-cap flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <span>
          <strong>{heatmap.name}</strong>
          <span className="ml-2 text-[color:var(--text-muted)]">
            {heatmap.mode === "category" ? "category heatmap" : "channel heatmap"}
          </span>
        </span>
        <span className="text-[color:var(--text-muted)]">
          {heatmap.y.length} rows × {heatmap.x.length} months
        </span>
      </figcaption>

      <div className="overflow-x-auto">
        <div
          className="grid min-w-max gap-px font-mono text-[9px]"
          style={{ gridTemplateColumns: `minmax(128px, auto) repeat(${heatmap.x.length}, 14px)` }}
        >
          <div />
          {heatmap.x.map((month) => (
            <div key={month} className="h-7 -rotate-45 whitespace-nowrap text-[color:var(--text-muted)]" title={month}>
              {shortMonth(month)}
            </div>
          ))}
          {heatmap.y.map((label, rowIndex) => (
            <div className="contents" key={label}>
              <div className="sticky left-0 z-10 flex items-center bg-[color:var(--bg)] pr-3 text-right text-[color:var(--text-dim)]">
                {label}
              </div>
              {heatmap.z[rowIndex].map((value, colIndex) => {
                const safeValue = Number.isFinite(value) ? value : 0;
                return (
                  <div
                    key={`${label}-${heatmap.x[colIndex]}`}
                    className="h-5"
                    style={{ background: cellColor(safeValue) }}
                    title={`${label} · ${heatmap.x[colIndex]} · ${safeValue.toFixed(1)}%`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-b-2 pb-1 font-sans text-[0.8rem] font-semibold tracking-wide transition-colors"
      style={{
        color: active ? "var(--accent)" : "var(--text-muted)",
        borderColor: active ? "var(--accent)" : "transparent",
      }}
    >
      {children}
    </button>
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
    <section className="border-t border-[color:var(--rule-strong)] pt-9">
      <p className="kicker">The heatmaps</p>
      <h2 className="mt-3">Content composition, month by month</h2>
      <p className="prose mt-4">
        Twelve content categories and ten channels, drawn from the same export
        as the original dashboard. The category view compares channels within
        one content type. The channel view compares content types within one
        channel.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        <div className="flex items-center gap-6">
          <Toggle active={mode === "category"} onClick={() => chooseMode("category")}>
            Category view
          </Toggle>
          <Toggle active={mode === "channel"} onClick={() => chooseMode("channel")}>
            Channel view
          </Toggle>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {heatmapsForMode.map((heatmap) => {
            const isActive = selected.name === heatmap.name;
            return (
              <button
                type="button"
                key={heatmap.name}
                onClick={() => setSelectedName(heatmap.name)}
                className="font-sans text-[0.78rem] transition-colors"
                style={{
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {heatmap.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-9">
        <HeatmapPanel heatmap={selected} />
      </div>
    </section>
  );
}
