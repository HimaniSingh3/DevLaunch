import { state } from "../../app/store.js";
import { escapeHtml } from "../../shared/utils/escape.js";

export function BackupView() {
  const size = new Blob([JSON.stringify(state)]).size;
  return `
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Backup Center</p><h2>Protect your portfolio workspace</h2><p>Export, import, reset, or publish your DevLaunch data.</p></div>
      <div class="backup-grid">
        <article class="glass-card"><h3>Workspace JSON</h3><p>Download a complete backup of projects, profile, notes, skills, and settings.</p><button class="btn btn-primary" data-export-workspace>Export JSON</button></article>
        <article class="glass-card"><h3>Import Backup</h3><p>Restore DevLaunch from a previously exported JSON file.</p><input class="input" type="file" accept="application/json" data-import-workspace /></article>
        <article class="glass-card"><h3>Public Portfolio</h3><p>Generate a standalone HTML portfolio page from your current workspace.</p><button class="btn btn-primary" data-export-public>Export Portfolio HTML</button></article>
        <article class="glass-card danger-zone"><h3>Reset Workspace</h3><p>Restore the default DevLaunch project data.</p><button class="btn btn-danger" data-reset-workspace>Reset Data</button></article>
      </div>
      <p class="muted">Current workspace size: ${escapeHtml(formatBytes(size))}</p>
    </section>
  `;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}
