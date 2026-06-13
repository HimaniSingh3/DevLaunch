import { state } from "../../app/store.js";
import { escapeHtml } from "../../shared/utils/escape.js";

export function BuilderView() {
  return `
    <section class="section-block">
      <div class="section-heading"><p class="eyebrow">Portfolio Builder</p><h2>Customize your public profile</h2><p>Edit hero text, profile details, accent color, skills, and featured project strategy.</p></div>
      <div class="builder-grid">
        <form class="glass-card form-card" data-profile-form>
          <label>Name<input class="input" name="name" value="${escapeHtml(state.profile.name)}" /></label>
          <label>Role<input class="input" name="role" value="${escapeHtml(state.profile.role)}" /></label>
          <label>Headline<textarea class="input textarea" name="headline">${escapeHtml(state.profile.headline)}</textarea></label>
          <label>Location<input class="input" name="location" value="${escapeHtml(state.profile.location)}" /></label>
          <label>GitHub<input class="input" name="github" value="${escapeHtml(state.profile.github)}" /></label>
          <label>Accent<input class="input color-input" name="accent" type="color" value="${escapeHtml(state.profile.accent)}" /></label>
          <button class="btn btn-primary" type="submit">Save Profile</button>
        </form>
        <article class="glass-card preview-card" style="--preview-accent:${escapeHtml(state.profile.accent)}">
          <p class="eyebrow">Live Preview</p>
          <h2>${escapeHtml(state.profile.name)}</h2>
          <h3>${escapeHtml(state.profile.role)}</h3>
          <p>${escapeHtml(state.profile.headline)}</p>
          <div class="chip-row">${state.skills.slice(0, 6).map((skill) => `<span>${escapeHtml(skill.name)}</span>`).join("")}</div>
        </article>
      </div>
    </section>
  `;
}
