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
type ScatterPoint = { x: number; y: number; rawX: number; rawY: number };
type BubblePoint = { name: string; x: number; y: number; n: number };
type ChartTooltipProps<T> = { active?: boolean; payload?: Array<{ payload?: T }> };

const GRID = "rgba(236,231,218,0.1)";
const TICK = "#ada697";
const BLUE = "#005bbb";
const GOLD = "#ffd700";

const tooltipStyle = {
  background: "#1a1814",
  border: "1px solid rgba(236,231,218,0.2)",
  borderRadius: 3,
  color: "#ece7da",
  fontFamily: "var(--sans)",
  fontSize: 12,
};

function blueAlpha(value: number) {
  return `rgba(0, 91, 187, ${0.1 + value * 0.74})`;
}

function useChartsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  return ready;
}

function ChartPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center border border-dashed border-[color:var(--rule)]">
      <p className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
        Chart loads in the browser
      </p>
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

/* ---- flat editorial primitives ------------------------------------ */

function Figure({ title, sub, children }: { title: string; sub?: string; children: ReactNode }) {
  return (
    <figure className="figure m-0">
      <figcaption className="figure-cap">
        <strong>{title}</strong>
        {sub && <span className="mt-1 block normal-case tracking-normal text-[color:var(--text-muted)]">{sub}</span>}
      </figcaption>
      {children}
    </figure>
  );
}

function StatRow({ dashboard }: { dashboard: RegressionDashboard }) {
  return (
    <dl className="index-list">
      {dashboard.kpis.map(([label, value, sub]) => (
        <div
          key={label}
          className="flex flex-col gap-1 border-b border-[color:var(--rule)] py-4 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <dt className="font-sans text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)] sm:w-40 sm:shrink-0">
            {label}
          </dt>
          <dd className="flex flex-wrap items-baseline gap-x-4">
            <span className="stat-figure text-[1.6rem]">{value}</span>
            <span className="text-[0.95rem] text-[color:var(--text-dim)]">{sub}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Equation({ dashboard }: { dashboard: RegressionDashboard }) {
  return (
    <p className="border-l-2 border-[color:var(--accent-soft)] pl-4 font-mono text-[0.92rem] text-[color:var(--text-dim)]">
      <span className="text-[color:var(--text)]">{dashboard.equation}</span>
      <span className="mx-3 text-[color:var(--text-muted)]">·</span>R = {dashboard.r}
      <span className="mx-3 text-[color:var(--text-muted)]">·</span>R² = {dashboard.r2}
      <span className="mx-3 text-[color:var(--text-muted)]">·</span>p {dashboard.p}
    </p>
  );
}

function ScatterTooltip({ active, payload, dashboard }: ChartTooltipProps<ScatterPoint> & { dashboard: RegressionDashboard }) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as Partial<ScatterPoint>;
  if (typeof point.rawX !== "number" || typeof point.rawY !== "number") return null;
  return (
    <div className="border border-[color:var(--rule-strong)] bg-[#1a1814] p-3 text-sm">
      <p className="font-sans text-[0.66rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">Sampled image</p>
      <p className="mt-1.5 text-[color:var(--text)]">{dashboard.xLabel}: {point.rawX.toFixed(0)}</p>
      <p className="text-[color:var(--text)]">{dashboard.yLabel}: {point.rawY.toFixed(0)}</p>
    </div>
  );
}

function BubbleTooltip({ active, payload, dashboard }: ChartTooltipProps<BubblePoint> & { dashboard: RegressionDashboard }) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload as Partial<BubblePoint>;
  if (!point.name || typeof point.x !== "number" || typeof point.y !== "number" || typeof point.n !== "number") return null;
  return (
    <div className="border border-[color:var(--rule-strong)] bg-[#1a1814] p-3 text-sm">
      <p className="font-sans text-[0.66rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{point.name}</p>
      <p className="mt-1.5 text-[color:var(--text)]">{dashboard.xLabel}: {point.x.toFixed(2)}</p>
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
    <Figure
      title="Scatter of 3,000 sampled images with the regression line"
      sub="Each dot is one image. The gold line is the OLS fit. A deterministic jitter is applied so points do not overplot."
    >
      <div className="h-[330px]">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid stroke={GRID} />
              <XAxis type="number" dataKey="x" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fill: TICK, fontSize: 12 }} label={{ value: dashboard.xLabel, fill: TICK, position: "insideBottom", offset: -4 }} />
              <YAxis type="number" dataKey="y" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fill: TICK, fontSize: 12 }} label={{ value: dashboard.yLabel, angle: -90, fill: TICK, position: "insideLeft" }} />
              <Tooltip content={<ScatterTooltip dashboard={dashboard} />} />
              <Scatter data={points} fill={BLUE} opacity={0.3} />
              <Scatter data={regression} line={{ stroke: GOLD, strokeWidth: 2.5 }} shape={() => <></>} />
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder />
        )}
      </div>
    </Figure>
  );
}

function MeanLine({ dashboard }: { dashboard: RegressionDashboard }) {
  const ready = useChartsReady();
  return (
    <Figure title={dashboard.meanTitle} sub={dashboard.meanSub}>
      <div className="h-[330px]">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={meanData(dashboard)}>
              <CartesianGrid stroke={GRID} />
              <XAxis type="number" dataKey="score" domain={[0, 10]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} tick={{ fill: TICK, fontSize: 12 }} />
              <YAxis type="number" domain={[0, 10]} tick={{ fill: TICK, fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="upper" stroke={BLUE} strokeOpacity={0.3} dot={false} />
              <Line type="monotone" dataKey="lower" stroke={BLUE} strokeOpacity={0.3} dot={false} />
              <Line type="monotone" dataKey="regression" stroke={GOLD} strokeWidth={2} dot={false} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="mean" stroke={BLUE} strokeWidth={2.5} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder />
        )}
      </div>
    </Figure>
  );
}

function DistributionChart({ title, data }: { title: string; data: ReturnType<typeof toDistribution> }) {
  const ready = useChartsReady();
  return (
    <Figure title={`Distribution of ${title}`}>
      <div className="h-[240px]">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke={GRID} vertical={false} />
              <XAxis type="category" dataKey="score" tick={{ fill: TICK, fontSize: 12 }} />
              <YAxis tick={{ fill: TICK, fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(236,231,218,0.04)" }} />
              <Bar dataKey="count" fill={BLUE} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder />
        )}
      </div>
    </Figure>
  );
}

function BubbleChart({ title, sub, data, dashboard }: { title: string; sub?: string; data: ReturnType<typeof toBubbles>; dashboard: RegressionDashboard }) {
  const ready = useChartsReady();
  return (
    <Figure title={title} sub={sub}>
      <div className="h-[360px]">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid stroke={GRID} />
              <XAxis type="number" dataKey="x" name={dashboard.xLabel} domain={[0, 8]} tick={{ fill: TICK, fontSize: 12 }} />
              <YAxis type="number" dataKey="y" name={dashboard.yLabel} domain={[0, 8]} tick={{ fill: TICK, fontSize: 12 }} />
              <ZAxis dataKey="n" range={[80, 900]} />
              <Tooltip content={<BubbleTooltip dashboard={dashboard} />} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={data}>
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.name.includes("drone") || item.name.includes("propaganda") || item.name.includes("composite") ? GOLD : BLUE}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder />
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[0.7rem] text-[color:var(--text-muted)]">
        {data.map((item) => (
          <span key={item.name}>
            {item.name} {item.x.toFixed(2)} / {item.y.toFixed(2)}
          </span>
        ))}
      </div>
    </Figure>
  );
}

function Matrix({ dashboard }: { dashboard: RegressionDashboard }) {
  const labels = dashboard.data.corrLabels;
  return (
    <Figure title="Correlation matrix across all five scores" sub="The same score matrix as the original dashboards, rendered natively.">
      <div className="overflow-x-auto">
        <div className="grid min-w-[620px] grid-cols-[130px_repeat(5,minmax(0,1fr))] gap-1 text-center font-sans text-[0.7rem]">
          <div />
          {labels.map((label) => (
            <div key={label} className="text-[color:var(--text-muted)]">{label}</div>
          ))}
          {dashboard.data.corrMatrix.map((row, rowIndex) => (
            <div className="contents" key={labels[rowIndex]}>
              <div className="flex items-center text-left text-[color:var(--text-muted)]">{labels[rowIndex]}</div>
              {row.map((value, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="px-2 py-3 text-[#10100e]" style={{ background: blueAlpha(value) }}>
                  {value.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Figure>
  );
}

function CompareBox({ dashboard }: { dashboard: RegressionDashboard }) {
  if (!("compare" in dashboard)) return null;
  return (
    <Figure title="The models side by side">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse font-sans text-[0.85rem]">
          <thead>
            <tr className="border-b border-[color:var(--rule-strong)] text-left text-[color:var(--text-muted)]">
              <th className="py-2.5 font-semibold">Model</th>
              <th className="font-semibold">Pearson R</th>
              <th className="font-semibold">R²</th>
              <th className="font-semibold">Slope β₁</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.compare.map(([title, , r, , r2, , slope]) => (
              <tr key={title} className="border-b border-[color:var(--rule)]">
                <td className="py-2.5 text-[color:var(--text)]">{title}</td>
                <td className="text-[color:var(--text-dim)]">{r}</td>
                <td className="text-[color:var(--text-dim)]">{r2}</td>
                <td className="text-[color:var(--text-dim)]">{slope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Figure>
  );
}

function Findings({ dashboard }: { dashboard: RegressionDashboard }) {
  return (
    <div>
      <p className="kicker">Answering the research questions</p>
      <dl className="index-list mt-5">
        {dashboard.findings.map(([question, answer]) => (
          <div key={question} className="border-b border-[color:var(--rule)] py-6">
            <dt className="text-[1.15rem] font-bold text-[color:var(--text)]">{question}</dt>
            <dd className="mt-2 max-w-[64ch] text-[1.02rem] leading-7 text-[color:var(--text-dim)]">{answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function DashboardSection({ dashboard, index }: { dashboard: RegressionDashboard; index: number }) {
  const [primaryDist, secondaryDist] = distributionData(dashboard);
  const contentData = toBubbles(dashboard.data.ctData);
  const frameData = toBubbles(dashboard.data.frameData);
  const channelData = channelBubbles(dashboard);
  const ordinals = ["Model one", "Model two", "Model three"];

  return (
    <section className="border-t border-[color:var(--rule-strong)] pt-9">
      <p className="kicker">{ordinals[index] ?? "Model"}</p>
      <h2 className="mt-3 max-w-[20ch] text-[clamp(1.7rem,4vw,2.5rem)]">{dashboard.title}</h2>
      <p className="prose mt-4">{dashboard.subtitle}</p>

      <div className="mt-8 flex flex-col gap-10">
        <Equation dashboard={dashboard} />
        <StatRow dashboard={dashboard} />
        <CompareBox dashboard={dashboard} />

        <div className="grid gap-10 xl:grid-cols-2">
          <RegressionScatter dashboard={dashboard} />
          <MeanLine dashboard={dashboard} />
        </div>

        <div className="grid gap-10 xl:grid-cols-2">
          <DistributionChart title={dashboard.distX} data={primaryDist} />
          <DistributionChart title={dashboard.distY} data={secondaryDist} />
        </div>

        <div>
          <p className="kicker">Breakdown by category</p>
          <h3 className="mt-3 text-[1.4rem]">{dashboard.breakTitle}</h3>
          <p className="prose mt-3">{dashboard.breakSub}</p>
        </div>

        <div className="grid gap-10 xl:grid-cols-2">
          <BubbleChart title={dashboard.ctTitle} data={contentData} dashboard={dashboard} />
          <BubbleChart title={dashboard.frameTitle} data={frameData} dashboard={dashboard} />
        </div>

        {channelData.length > 0 && (
          <BubbleChart title={channelTitle(dashboard)} data={channelData} dashboard={dashboard} />
        )}

        <Matrix dashboard={dashboard} />
        <Findings dashboard={dashboard} />
      </div>
    </section>
  );
}

export default function CorrelationCharts() {
  return (
    <div className="flex flex-col gap-16">
      <div className="prose dropcap">
        <p>
          The five continuous annotation scores do not move on their own. Read
          one against another with ordinary least squares, and the network
          starts to show its shape: which images carry ideology, which carry
          violence, and where the two coincide. Three targeted models are set
          out below, each with its scatter, its mean curve, its distributions
          and the breakdown by content and frame.
        </p>
      </div>

      <nav className="index-list">
        {regressionDashboards.map((dashboard, i) => (
          <a key={dashboard.id} href={`#${dashboard.id}`} className="index-row group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-7">
            <span className="shrink-0 font-sans text-[0.74rem] uppercase tracking-[0.12em] text-[color:var(--accent)] sm:w-28">
              Model {["one", "two", "three"][i]}
            </span>
            <span>
              <span className="text-[1.15rem] font-bold text-[color:var(--text)] transition-colors group-hover:text-[color:var(--accent)]">
                {dashboard.title}
              </span>
              <span className="mt-1 block font-sans text-[0.8rem] text-[color:var(--text-muted)]">
                R = {dashboard.r}
              </span>
            </span>
          </a>
        ))}
      </nav>

      {regressionDashboards.map((dashboard, i) => (
        <div id={dashboard.id} key={dashboard.id} className="scroll-mt-6">
          <DashboardSection dashboard={dashboard} index={i} />
        </div>
      ))}
    </div>
  );
}
