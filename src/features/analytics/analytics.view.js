import { state } from "../../app/store.js";
import { escapeHtml } from "../../shared/utils/escape.js";
import { getProjectScore, getWorkspaceStats } from "../../shared/utils/score.js";

export function AnalyticsView() {
  const stats = getWorkspaceStats(state.projects);
  const categoryMap = state.projects.reduce((map, project) => {
    map[project.category] = (map[project.category] || 0) + 1;
    return map;
  }, {});
  const stackMap = state.projects.flatMap((project) => project.stack).reduce((map, tech) => {
    map[tech] = (map[tech] || 0) + 1;
    return map;
  }, {});

  return `
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Analytics</p><h2>Portfolio intelligence</h2><p>Understand category spread, stack coverage, readiness scores, and launch gaps.</p></div>
      <div class="metric-grid">
        <article class="metric-card"><strong>${stats.total}</strong><span>Projects</span></article>
        <article class="metric-card"><strong>${stats.avg}%</strong><span>Avg Health</span></article>
        <article class="metric-card"><strong>${stats.stacks}</strong><span>Technologies</span></article>
        <article class="metric-card"><strong>${stats.categories}</strong><span>Categories</span></article>
      </div>
      <div class="analytics-grid">
        <article class="glass-card"><h3>Project Health</h3>${state.projects.map((project) => Bar(project.name, getProjectScore(project))).join("")}</article>
        <article class="glass-card"><h3>Categories</h3>${Object.entries(categoryMap).map(([label, value]) => Bar(label, value * 20)).join("")}</article>
        <article class="glass-card wide"><h3>Tech Stack Coverage</h3><div class="chip-row large">${Object.entries(stackMap).map(([tech, count]) => `<span>${escapeHtml(tech)} · ${count}</span>`).join("")}</div></article>
      </div>
    </section>
  `;
}

function Bar(label, value) {
  const width = Math.min(100, Math.max(6, value));
  return `<div class="bar-row"><div><strong>${escapeHtml(label)}</strong><span>${value}</span></div><div class="progress-track"><span style="width:${width}%"></span></div></div>`;
}
