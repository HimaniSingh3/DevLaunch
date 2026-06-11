import { downloadFile } from "./download.js";
import { escapeHtml, slugify } from "./escape.js";
import { getProjectScore, getHealthLabel } from "./score.js";

export function exportWorkspace(workspace) {
  downloadFile("devlaunch-workspace.json", JSON.stringify(workspace, null, 2), "application/json");
}

export function exportResume(profile, skills, timeline) {
  const skillItems = skills.map((skill) => `<li>${escapeHtml(skill.name)} - ${skill.level}%</li>`).join("");
  const timelineItems = timeline.map((item) => `<li><strong>${escapeHtml(item.date)}</strong> - ${escapeHtml(item.title)}: ${escapeHtml(item.text)}</li>`).join("");
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(profile.name)} Resume</title><style>body{font-family:Inter,system-ui,sans-serif;max-width:860px;margin:40px auto;padding:24px;line-height:1.7;color:#111827}h1{font-size:42px;margin-bottom:0}.muted{color:#64748b}.card{border:1px solid #e5e7eb;border-radius:18px;padding:18px;margin:16px 0}</style></head>
<body><h1>${escapeHtml(profile.name)}</h1><p class="muted">${escapeHtml(profile.role)}</p><p>${escapeHtml(profile.resumeSummary)}</p><div class="card"><h2>Skills</h2><ul>${skillItems}</ul></div><div class="card"><h2>Timeline</h2><ul>${timelineItems}</ul></div><p>GitHub: ${escapeHtml(profile.github)}</p></body></html>`;
  downloadFile(`${slugify(profile.name)}-resume.html`, html, "text/html");
}

export function generateIssue(project) {
  return `## Improve ${project.name}\n\n### Summary\nEnhance ${project.name} by improving project polish, documentation, screenshots, deployment readiness, and user experience.\n\n### Current Health\n- Score: ${getProjectScore(project)}/100\n- Status: ${getHealthLabel(getProjectScore(project))}\n\n### Checklist\n- [ ] Add or improve README\n- [ ] Confirm LICENSE exists\n- [ ] Add screenshots\n- [ ] Add live demo link\n- [ ] Create roadmap items\n- [ ] Review responsive design\n- [ ] Verify production build\n\n### Project Notes\n${project.notes || "Add project notes here."}`;
}

export function exportPublicPortfolio(workspace) {
  const { profile, projects, skills } = workspace;
  const projectCards = projects.map((project) => `<article><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.tagline)}</p><p><strong>${project.category}</strong> - ${getProjectScore(project)}/100</p><a href="${escapeHtml(project.repo)}">Repository</a></article>`).join("");
  const skillTags = skills.map((skill) => `<span>${escapeHtml(skill.name)}</span>`).join("");
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(profile.name)} Portfolio</title><style>body{margin:0;font-family:Inter,system-ui,sans-serif;background:#0f172a;color:#f8fafc}.wrap{width:min(1120px,calc(100% - 32px));margin:auto;padding:56px 0}.hero{padding:72px 0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}article{padding:22px;border:1px solid rgba(255,255,255,.16);border-radius:22px;background:rgba(255,255,255,.08)}a{color:#67e8f9}.skills{display:flex;flex-wrap:wrap;gap:10px}.skills span{padding:8px 12px;border-radius:999px;background:#312e81}</style></head><body><main class="wrap"><section class="hero"><h1>${escapeHtml(profile.name)}</h1><h2>${escapeHtml(profile.role)}</h2><p>${escapeHtml(profile.headline)}</p><a href="${escapeHtml(profile.github)}">GitHub Profile</a></section><section><h2>Projects</h2><div class="grid">${projectCards}</div></section><section><h2>Skills</h2><div class="skills">${skillTags}</div></section></main></body></html>`;
  downloadFile("public-portfolio.html", html, "text/html");
}

export function exportCaseStudy(project) {
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(project.name)} Case Study</title><style>body{font-family:Inter,system-ui,sans-serif;max-width:900px;margin:40px auto;padding:24px;line-height:1.8;color:#111827}.badge{display:inline-block;padding:6px 10px;border-radius:999px;background:#eef2ff;color:#3730a3;margin:4px}</style></head><body><h1>${escapeHtml(project.name)} Case Study</h1><p>${escapeHtml(project.tagline)}</p><h2>Problem</h2><p>${escapeHtml(project.name)} was built to solve a focused frontend/productivity problem with a clean JavaScript experience.</p><h2>Features</h2>${project.features.map((feature) => `<span class="badge">${escapeHtml(feature)}</span>`).join("")}<h2>Stack</h2>${project.stack.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join("")}<h2>Outcome</h2><p>Health Score: ${getProjectScore(project)}/100 - ${getHealthLabel(getProjectScore(project))}</p><p>Repository: ${escapeHtml(project.repo)}</p></body></html>`;
  downloadFile(`${slugify(project.name)}-case-study.html`, html, "text/html");
}
