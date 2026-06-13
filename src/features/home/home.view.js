import { state } from "../../app/store.js";
import { getWorkspaceStats, getProjectScore, getHealthLabel } from "../../shared/utils/score.js";
import { escapeHtml } from "../../shared/utils/escape.js";

export function HomeView() {
  const stats = getWorkspaceStats(state.projects);
  const featured = state.projects.filter((project) => project.featured).slice(0, 3);
  return `
    <section class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Developer Portfolio Operating System</p>
        <h1>${escapeHtml(state.profile.name)}</h1>
        <h2>${escapeHtml(state.profile.role)}</h2>
        <p>${escapeHtml(state.profile.headline)}</p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-view="projects">Explore Projects</button>
          <button class="btn btn-soft" data-view="builder">Customize Portfolio</button>
          <button class="btn btn-soft" data-export-public>Export Public Portfolio</button>
        </div>
      </div>
      <div class="hero-panel glass-card">
        <div class="code-window">
          <div class="dots"><span></span><span></span><span></span></div>
          <pre><code>const devLaunch = {
  creator: "${escapeHtml(state.profile.name)}",
  projects: ${stats.total},
  averageHealth: "${stats.avg}%",
  mission: "Launch portfolio faster"
};</code></pre>
        </div>
      </div>
    </section>

    <section class="metric-grid">
      <article class="metric-card"><strong>${stats.total}</strong><span>Total Projects</span></article>
      <article class="metric-card"><strong>${stats.completed}</strong><span>Completed</span></article>
      <article class="metric-card"><strong>${stats.categories}</strong><span>Categories</span></article>
      <article class="metric-card"><strong>${stats.avg}%</strong><span>Average Health</span></article>
    </section>

    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Featured Launches</p><h2>Portfolio highlights</h2></div>
      <div class="project-grid">
        ${featured.map((project) => `
          <article class="project-card">
            <div class="project-card-top"><span>${escapeHtml(project.category)}</span><strong>${getProjectScore(project)}%</strong></div>
            <h3>${escapeHtml(project.name)}</h3>
            <p>${escapeHtml(project.tagline)}</p>
            <div class="chip-row">${project.stack.slice(0, 4).map((tech) => `<span>${escapeHtml(tech)}</span>`).join("")}</div>
            <small>${getHealthLabel(getProjectScore(project))}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
