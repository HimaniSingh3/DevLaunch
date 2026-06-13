import { state } from "../../app/store.js";
import { escapeHtml } from "../../shared/utils/escape.js";

export function ContactView() {
  return `
    <section class="section-block contact-block">
      <div class="glass-card contact-card">
        <p class="eyebrow">Contact</p>
        <h2>Let visitors find your work fast.</h2>
        <p>${escapeHtml(state.profile.name)} is building polished JavaScript projects and portfolio tools.</p>
        <div class="contact-actions">
          <a class="btn btn-primary" href="${escapeHtml(state.profile.github)}" target="_blank" rel="noreferrer">GitHub Profile</a>
          <button class="btn btn-soft" data-copy-profile>Copy Profile Summary</button>
        </div>
      </div>
    </section>
  `;
}
