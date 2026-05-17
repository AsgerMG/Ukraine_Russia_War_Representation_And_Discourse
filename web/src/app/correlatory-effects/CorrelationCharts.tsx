"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { regressionDashboards, type RegressionDashboard } from "./regressionData";

type Pair = readonly [number, number];
type Bubble = readonly [string, number, number, number];
type ScatterPoint = {
  x: number;
  y: number;
  rawX: number;
  rawY: number;
};
type BubblePoint = {
  name: string;
  x: number;
  y: number;
  n: number;
};
type ChartTooltipProps<T> = {
  active?: boolean;
  payload?: Array<{ payload?: T }>;
};

const tooltipStyle = {
  background: "#08090b",
  border: "1px solid rgba(246,243,235,0.18)",
  borderRadius: 12,
  color: "#f6f3eb",
};

function blueAlpha(value: number) {
  return `rgba(0, 87, 183, ${0.12 + value * 0.76})`;
}

function useChartsReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return ready;
}

function ChartPlaceholder({ height }: { height: string }) {
  return (
    <div className={`${height} flex items-center justify-center rounded-2xl border border-dashed border-[color:var(--border)] bg-black/20`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">Chart loads in browser</p>
    </div>
  );
}

function toPairs(value: unknown): Pair[] {
  return Array.isArray(value) ? (value as Pair[]) : [];
}

function toBubbles(value: unknown): BubblePoint[] {
  return (Array.isArray(value) ? (value as Bubble[]) : []).map(([name, x, y, n]) => ({ name, x, y, n }));
}

function toDistribution(value: unknown) {
  return toPairs(value).map(([score, count]) => ({ score, count }));
}

function distributionData(dashboard: RegressionDashboard) {
  if (dashboard.id === "gamification") {
    return [toDistribution(dashboard.data.gamDistData), toDistribution(dashboard.data.ivDistData)] as const;
  }

  if (dashboard.id === "dehumanization") {
    return [toDistribution(dashboard.data.dDistData), toDistribution(dashboard.data.ivDistData)] as const;
  }

  return [toDistribution(dashboard.data.aDistData), toDistribution(dashboard.data.nfDistData)] as const;
}

function channelBubbles(dashboard: RegressionDashboard) {
  return dashboard.id === "aestheticization" ? toBubbles(dashboard.data.chData) : [];
}

function channelTitle(dashboard: RegressionDashboard) {
  return dashboard.id === "aestheticization" ? dashboard.channelTitle : "Channel bubble chart";
}

function scatterData(dashboard: RegressionDashboard) {
  return toPairs(dashboard.data.scatterRaw).map(([x, y], index) => ({
    rawX: x,
    rawY: y,
    // Deterministic jitter preserves the source scores while avoiding overplotting.
    x: x + (((index * 37) % 100) / 100 - 0.5) * 0.18,
    y: y + (((index * 53) % 100) / 100 - 0.5) * 0.18,
  }));
}

function meanData(dashboard: RegressionDashboard) {
  return dashboard.data.meanVals.map((mean, score) => ({
    score,
    mean,
    upper: dashboard.data.ciUpper[score],
    lower: dashboard.data.ciLower[score],
    count: dashboard.data.meanCounts[score],
    regression: dashboard.data.regLineY[score],
  }));
}

function KpiGrid({ dashboard }: { dashboard: RegressionDashboard }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {dashboard.kpis.map(([label, value, sub]) => (
        <article className="rounded-2xl border border-[color:var(--border)] bg-black/30 p-4" key={label}>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{label}</p>
          <p className="mt-2 font-serif text-3xl font-bold text-[color:var(--text)]">{value}</p>
          <p className="mt-1 text-xs leading-5 text-[color:var(--text-muted)]">{sub}</p>
        </article>
      ))}
    </div>
  );
}

function EquationBox({ dashboard }: { dashboard: RegressionDashboard }) {
  return (
    <div className="rounded-3xl border border-[color:var(--ukraine-blue)]/70 bg-black/35 p-5 font-mono text-sm text-[color:var(--text-dim)]">
      <span className="text-[color:var(--text)]">{dashboard.equation}</span>
      <span className="mx-3 text-[color:var(--text-muted)]">|</span>
      <span>R = {dashboard.r}</span>
      <span className="mx-3 text-[color:var(--text-muted)]">|</span>
      <span>R² = {dashboard.r2}</span>
      <span className="mx-3 text-[color:var(--text-muted)]">|</span>
      <span>p {dashboard.p}</span>
    </div>
  );
}

function ChartCard({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <article className="rounded-3xl border border-[color:var(--border)] bg-black/35 p-4 sm:p-5">
      <p className="font-serif text-2xl font-bold text-[color:var(--text)]">{title}</p>
      {sub && <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">{sub}</p>}
      <div className="mt-5">{children}</div>
    </article>
  );
}

function ScatterTooltip({ active, payload, dashboard }: ChartTooltipProps<ScatterPoint> & { dashboard: RegressionDashboard }) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as Partial<ScatterPoint>;

  if (typeof point.rawX !== "number" || typeof point.rawY !== "number") return null;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-black/90 p-3 text-sm shadow-xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">Sampled image</p>
      <p className="mt-2 text-[color:var(--text)]">{dashboard.xLabel}: {point.rawX.toFixed(0)}</p>
      <p className="text-[color:var(--text)]">{dashboard.yLabel}: {point.rawY.toFixed(0)}</p>
    </div>
  );
}

function BubbleTooltip({ active, payload, dashboard }: ChartTooltipProps<BubblePoint> & { dashboard: RegressionDashboard }) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as Partial<BubblePoint>;

  if (!point.name || typeof point.x !== "number" || typeof point.y !== "number" || typeof point.n !== "number") return null;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-black/90 p-3 text-sm shadow-xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{point.name}</p>
      <p className="mt-2 text-[color:var(--text)]">{dashboard.xLabel}: {point.x.toFixed(2)}</p>
      <p className="text-[color:var(--text)]">{dashboard.yLabel}: {point.y.toFixed(2)}</p>
      <p className="text-[color:var(--text-muted)]">n = {point.n.toLocaleString()}</p>
    </div>
  );
}

function RegressionScatter({ dashboard }: { dashboard: RegressionDashboard }) {
  const ready = useChartsReady();
  const points = scatterData(dashboard);
  const regression = dashboard.data.regLineX.map((x, index) => ({ x, y: dashboard.data.regLineY[index] }));

  return (
    <ChartCard title="Scatter — 3,000 sampled images + regression line" sub="Each dot is one image. Yellow line is the OLS fit. Deterministic jitter is applied for legibility.">
      <div className="h-[330px]">
        {ready ? <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid stroke="rgba(246,243,235,0.12)" />
            <XAxis type="number" dataKey="x" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fill: "#b8b2a7", fontSize: 12 }} label={{ value: dashboard.xLabel, fill: "#b8b2a7", position: "insideBottom", offset: -4 }} />
            <YAxis type="number" dataKey="y" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fill: "#b8b2a7", fontSize: 12 }} label={{ value: dashboard.yLabel, angle: -90, fill: "#b8b2a7", position: "insideLeft" }} />
            <Tooltip content={<ScatterTooltip dashboard={dashboard} />} />
            <Scatter data={points} fill="#0057b7" opacity={0.34} />
            <Scatter data={regression} line={{ stroke: "#ffdd00", strokeWidth: 3 }} shape={() => null} />
          </ScatterChart>
        </ResponsiveContainer> : <ChartPlaceholder height="h-full" />}
      </div>
    </ChartCard>
  );
}

function MeanLine({ dashboard }: { dashboard: RegressionDashboard }) {
  const ready = useChartsReady();

  return (
    <ChartCard title={dashboard.meanTitle} sub={dashboard.meanSub}>
      <div className="h-[330px]">
        {ready ? <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={meanData(dashboard)}>
            <CartesianGrid stroke="rgba(246,243,235,0.12)" />
            <XAxis type="number" dataKey="score" domain={[0, 10]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} tick={{ fill: "#b8b2a7", fontSize: 12 }} />
            <YAxis type="number" domain={[0, 10]} tick={{ fill: "#b8b2a7", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="upper" stroke="#0057b7" strokeOpacity={0.35} dot={false} />
            <Line type="monotone" dataKey="lower" stroke="#0057b7" strokeOpacity={0.35} dot={false} />
            <Line type="monotone" dataKey="regression" stroke="#ffdd00" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="mean" stroke="#0057b7" strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer> : <ChartPlaceholder height="h-full" />}
      </div>
    </ChartCard>
  );
}

function DistributionChart({ title, data }: { title: string; data: ReturnType<typeof toDistribution> }) {
  const ready = useChartsReady();

  return (
    <ChartCard title={`Distribution — ${title}`}>
      <div className="h-[240px]">
        {ready ? <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(246,243,235,0.12)" vertical={false} />
            <XAxis type="category" dataKey="score" tick={{ fill: "#b8b2a7", fontSize: 12 }} />
            <YAxis tick={{ fill: "#b8b2a7", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" fill="#0057b7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer> : <ChartPlaceholder height="h-full" />}
      </div>
    </ChartCard>
  );
}

function BubbleChart({ title, sub, data, dashboard }: { title: string; sub?: string; data: ReturnType<typeof toBubbles>; dashboard: RegressionDashboard }) {
  const ready = useChartsReady();

  return (
    <ChartCard title={title} sub={sub}>
      <div className="h-[380px]">
        {ready ? <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid stroke="rgba(246,243,235,0.12)" />
            <XAxis type="number" dataKey="x" name={dashboard.xLabel} domain={[0, 8]} tick={{ fill: "#b8b2a7", fontSize: 12 }} />
            <YAxis type="number" dataKey="y" name={dashboard.yLabel} domain={[0, 8]} tick={{ fill: "#b8b2a7", fontSize: 12 }} />
            <ZAxis dataKey="n" range={[80, 900]} />
            <Tooltip content={<BubbleTooltip dashboard={dashboard} />} cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data}>
              {data.map((item) => (
                <Cell key={item.name} fill={item.name.includes("drone") || item.name.includes("propaganda") || item.name.includes("composite") ? "#ffdd00" : "#0057b7"} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer> : <ChartPlaceholder height="h-full" />}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {data.map((item) => (
          <span className="rounded-full border border-[color:var(--border)] px-2 py-1 font-mono text-[10px] text-[color:var(--text-muted)]" key={item.name}>
            {item.name}: {item.x.toFixed(2)} / {item.y.toFixed(2)}
          </span>
        ))}
      </div>
    </ChartCard>
  );
}

function Matrix({ dashboard }: { dashboard: RegressionDashboard }) {
  const labels = dashboard.data.corrLabels;
  return (
    <ChartCard title="Correlation Heatmap — All 5 Scores" sub="The same score matrix from the original dashboards, rendered as a native React heatmap.">
      <div className="overflow-x-auto">
        <div className="grid min-w-[620px] grid-cols-[130px_repeat(5,minmax(0,1fr))] gap-1 text-center font-mono text-[10px]">
          <div />
          {labels.map((label) => <div key={label} className="text-[color:var(--text-muted)]">{label}</div>)}
          {dashboard.data.corrMatrix.map((row, rowIndex) => (
            <div className="contents" key={labels[rowIndex]}>
              <div className="flex items-center text-left text-[color:var(--text-muted)]">{labels[rowIndex]}</div>
              {row.map((value, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="rounded-lg px-2 py-3 text-white" style={{ background: blueAlpha(value) }}>
                  {value.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

function CompareBox({ dashboard }: { dashboard: RegressionDashboard }) {
  if (!("compare" in dashboard)) return null;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dashboard.compare.map(([title, rLabel, r, r2Label, r2, slopeLabel, slope]) => (
        <article className="rounded-3xl border border-[color:var(--border)] bg-black/30 p-5" key={title}>
          <h3 className="font-serif text-xl font-bold text-[color:var(--text)]">{title}</h3>
          {[[rLabel, r], [r2Label, r2], [slopeLabel, slope]].map(([label, value]) => (
            <div className="mt-4" key={label}>
              <div className="flex justify-between font-mono text-xs text-[color:var(--text-muted)]"><span>{label}</span><span>{value}</span></div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[color:var(--ukraine-yellow)]" style={{ width: value.endsWith("%") ? value : `${Number(value.replace("+", "")) * 80}%` }} />
              </div>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}

function Findings({ dashboard }: { dashboard: RegressionDashboard }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dashboard.findings.map(([question, answer]) => (
        <article className="rounded-3xl border border-[color:var(--border)] bg-black/30 p-5" key={question}>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--ukraine-yellow)]">{question}</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-dim)]">{answer}</p>
        </article>
      ))}
    </div>
  );
}

function DashboardSection({ dashboard }: { dashboard: RegressionDashboard }) {
  const [primaryDist, secondaryDist] = distributionData(dashboard);
  const contentData = toBubbles(dashboard.data.ctData);
  const frameData = toBubbles(dashboard.data.frameData);
  const channelData = channelBubbles(dashboard);

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 sm:p-8">
        <p className="kicker">Regression analysis</p>
        <h2 className="mt-3 font-serif text-[clamp(2.2rem,7vw,4.7rem)] font-bold leading-none tracking-[-0.04em] text-[color:var(--text)]">
          {dashboard.title}
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-[color:var(--text-dim)]">{dashboard.subtitle}</p>
      </div>

      <EquationBox dashboard={dashboard} />
      <KpiGrid dashboard={dashboard} />
      <CompareBox dashboard={dashboard} />

      <div className="grid gap-5 xl:grid-cols-2">
        <RegressionScatter dashboard={dashboard} />
        <MeanLine dashboard={dashboard} />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <DistributionChart title={dashboard.distX} data={primaryDist} />
        <DistributionChart title={dashboard.distY} data={secondaryDist} />
      </div>

      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
        <p className="kicker">Breakdown by category</p>
        <h3 className="mt-2 font-serif text-3xl font-bold text-[color:var(--text)]">{dashboard.breakTitle}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--text-dim)]">{dashboard.breakSub}</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <BubbleChart title={dashboard.ctTitle} data={contentData} dashboard={dashboard} />
        <BubbleChart title={dashboard.frameTitle} data={frameData} dashboard={dashboard} />
      </div>

      {channelData.length > 0 && (
        <BubbleChart title={channelTitle(dashboard)} data={channelData} dashboard={dashboard} />
      )}

      <Matrix dashboard={dashboard} />

      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
        <p className="kicker">Key findings</p>
        <h3 className="mt-2 font-serif text-3xl font-bold text-[color:var(--text)]">Answering the research questions</h3>
      </div>
      <Findings dashboard={dashboard} />
    </section>
  );
}

export default function CorrelationCharts() {
  return (
    <div className="space-y-16">
      <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 sm:p-8">
        <p className="kicker">Native dashboard migration</p>
        <h2 className="mt-3 font-serif text-[clamp(2.3rem,8vw,5.2rem)] font-bold leading-none tracking-[-0.045em] text-[color:var(--text)]">
          Three regression dashboards
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-[color:var(--text-dim)]">
          This page recreates the original correlatory HTML dashboards directly in React: sampled scatterplots, OLS lines, score distributions, content-type and frame-type bubble charts, correlation matrices, model comparisons, and the original research findings.
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        {regressionDashboards.map((dashboard) => (
          <a className="chapter-card min-h-0" href={`#${dashboard.id}`} key={dashboard.id}>
            <p className="kicker">{dashboard.id}</p>
            <h3 className="mt-3 font-serif text-2xl font-bold text-[color:var(--text)]">R = {dashboard.r}</h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--text-dim)]">{dashboard.title}</p>
          </a>
        ))}
      </div>

      {regressionDashboards.map((dashboard) => (
        <div id={dashboard.id} key={dashboard.id}>
          <DashboardSection dashboard={dashboard} />
        </div>
      ))}
    </div>
  );
}
