import { state, selectedProject } from "../../app/store.js";
import { escapeHtml } from "../../shared/utils/escape.js";
import { getProjectScore, getHealthLabel } from "../../shared/utils/score.js";

export function CaseStudiesView() {
  const project = selectedProject();
  const score = getProjectScore(project);
  return `
    <section class="section-block">
      <div class="section-heading split"><div><p class="eyebrow">Case Study Generator</p><h2>${escapeHtml(project.name)}</h2><p>${escapeHtml(project.tagline)}</p></div><button class="btn btn-primary" data-export-case-study="${project.id}">Export Case Study</button></div>
      <div class="toolbar"><select class="input" data-case-project>${state.projects.map((item) => `<option value="${item.id}" ${item.id === project.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select></div>
      <div class="case-grid">
        <article class="glass-card"><h3>Project Summary</h3><p>${escapeHtml(project.notes)}</p><p><strong>Category:</strong> ${escapeHtml(project.category)}</p><p><strong>Status:</strong> ${escapeHtml(project.status)}</p><p><strong>Health:</strong> ${score}/100 · ${getHealthLabel(score)}</p></article>
        <article class="glass-card"><h3>Features</h3><ul class="clean-list">${project.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul></article>
        <article class="glass-card wide"><h3>Launch Checklist</h3><div class="check-grid">${Object.entries(project.health).map(([key, value]) => `<label class="check-row"><input type="checkbox" data-health-key="${key}" data-health-project="${project.id}" ${value ? "checked" : ""}/><span>${escapeHtml(labelize(key))}</span></label>`).join("")}</div></article>
      </div>
    </section>
  `;
}

function labelize(value) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
