import { ROUTES } from "./router.js";
import { state, saveState, setView, setSelectedProject, updateProfile, upsertProject, resetState } from "./store.js";
import { HomeView } from "../features/home/home.view.js";
import { ProjectsView } from "../features/projects/projects.view.js";
import { AnalyticsView } from "../features/analytics/analytics.view.js";
import { BuilderView } from "../features/builder/builder.view.js";
import { ResumeView } from "../features/resume/resume.view.js";
import { CaseStudiesView } from "../features/case-studies/caseStudies.view.js";
import { NotesView } from "../features/notes/notes.view.js";
import { BackupView } from "../features/backup/backup.view.js";
import { ContactView } from "../features/contact/contact.view.js";
import { CommandPalette } from "../features/command-palette/commandPalette.view.js";
import { Toast, showToast } from "../shared/ui/toast.js";
import { Modal, openModal, closeModal } from "../shared/ui/modal.js";
import { escapeHtml } from "../shared/utils/escape.js";
import { createId } from "../shared/utils/id.js";
import { generateIssue, exportWorkspace, exportResume, exportPublicPortfolio, exportCaseStudy } from "../shared/utils/exporters.js";

let rootElement;

export function createApp(root) {
  rootElement = root;
  render();
  bindGlobalEvents();
}

function render() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.documentElement.style.setProperty("--accent", state.profile.accent);
  rootElement.innerHTML = `
    <div class="app-shell">
      ${Sidebar()}
      <div class="app-main">
        ${Topbar()}
        <main class="page">${CurrentView()}</main>
      </div>
      ${CommandPalette()}
      ${Modal()}
      ${Toast()}
    </div>
  `;
  bindEvents();
}

function Sidebar() {
  return `
    <aside class="sidebar-shell">
      <a class="brand" href="#" data-view="home">
        <img src="/logo.svg" alt="DevLaunch" />
        <span><strong>DevLaunch</strong><small>Portfolio OS</small></span>
      </a>
      <nav class="side-nav">
        ${ROUTES.map((route) => `<button class="${state.settings.activeView === route.id ? "active" : ""}" data-view="${route.id}"><span>${route.icon}</span>${route.label}</button>`).join("")}
      </nav>
      <div class="sidebar-footer"><button class="btn btn-soft" data-toggle-command>Command Palette</button></div>
    </aside>
  `;
}

function Topbar() {
  return `
    <header class="topbar">
      <div><p class="eyebrow">${escapeHtml(activeLabel())}</p><h1>${escapeHtml(state.profile.name)}'s Launch Hub</h1></div>
      <div class="topbar-actions">
        <button class="btn btn-soft" data-toggle-theme>${state.settings.theme === "dark" ? "Light" : "Dark"} Mode</button>
        <button class="btn btn-primary" data-export-public>Export Portfolio</button>
      </div>
    </header>
  `;
}

function activeLabel() {
  return ROUTES.find((route) => route.id === state.settings.activeView)?.label || "Home";
}

function CurrentView() {
  const views = {
    home: HomeView,
    projects: ProjectsView,
    analytics: AnalyticsView,
    builder: BuilderView,
    "case-studies": CaseStudiesView,
    resume: ResumeView,
    notes: NotesView,
    backup: BackupView,
    contact: ContactView
  };
  const view = views[state.settings.activeView] || HomeView;
  return view();
}

function bindGlobalEvents() {
  document.addEventListener("keydown", (event) => {
    const isCommand = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
    if (isCommand) {
      event.preventDefault();
      state.settings.commandOpen = !state.settings.commandOpen;
      saveState();
      render();
    }
    if (event.key === "Escape") {
      state.settings.commandOpen = false;
      saveState();
      closeModal();
      render();
    }
  });
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((element) => {
    element.addEventListener("click", () => {
      setView(element.dataset.view);
      state.settings.commandOpen = false;
      saveState();
      render();
    });
  });

  document.querySelector("[data-toggle-theme]")?.addEventListener("click", () => {
    state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
    saveState();
    showToast("Theme updated");
    render();
  });

  document.querySelector("[data-toggle-command]")?.addEventListener("click", () => {
    state.settings.commandOpen = true;
    saveState();
    render();
  });

  document.querySelector("[data-search]")?.addEventListener("input", (event) => {
    state.settings.query = event.target.value;
    saveState();
    render();
  });

  document.querySelector("[data-category]")?.addEventListener("change", (event) => {
    state.settings.category = event.target.value;
    saveState();
    render();
  });

  document.querySelector("[data-profile-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    updateProfile({
      name: form.get("name"),
      role: form.get("role"),
      headline: form.get("headline"),
      location: form.get("location"),
      github: form.get("github"),
      accent: form.get("accent")
    });
    showToast("Profile updated");
    render();
  });

  document.querySelectorAll("[data-select-project]").forEach((button) => {
    button.addEventListener("click", () => {
      setSelectedProject(button.dataset.selectProject);
    });
  });

  document.querySelector("[data-case-project]")?.addEventListener("change", (event) => {
    setSelectedProject(event.target.value);
    render();
  });

  document.querySelectorAll("[data-health-key]").forEach((input) => {
    input.addEventListener("change", () => {
      const project = state.projects.find((item) => item.id === input.dataset.healthProject);
      if (!project) return;
      project.health[input.dataset.healthKey] = input.checked;
      upsertProject(project);
      showToast("Launch checklist updated");
      render();
    });
  });

  document.querySelectorAll("[data-open-issue]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = state.projects.find((item) => item.id === button.dataset.openIssue);
      if (!project) return;
      openModal(`
        <div class="modal-header"><h2>Generated GitHub Issue</h2><button class="icon-btn" data-close-modal>Close</button></div>
        <pre class="code-box"><code>${escapeHtml(generateIssue(project))}</code></pre>
        <button class="btn btn-primary" data-copy-issue="${project.id}">Copy Issue</button>
      `);
      bindModalEvents();
    });
  });

  document.querySelectorAll("[data-export-case-study]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = state.projects.find((item) => item.id === button.dataset.exportCaseStudy);
      exportCaseStudy(project);
      showToast("Case study exported");
    });
  });

  document.querySelector("[data-export-workspace]")?.addEventListener("click", () => {
    exportWorkspace(state);
    showToast("Workspace exported");
  });

  document.querySelectorAll("[data-export-public]").forEach((button) => {
    button.addEventListener("click", () => {
      exportPublicPortfolio(state);
      showToast("Public portfolio exported");
    });
  });

  document.querySelector("[data-export-resume]")?.addEventListener("click", () => {
    exportResume(state.profile, state.skills, state.timeline);
    showToast("Resume exported");
  });

  document.querySelector("[data-import-workspace]")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      Object.keys(state).forEach((key) => delete state[key]);
      Object.assign(state, imported);
      saveState();
      showToast("Workspace imported");
      render();
    } catch {
      showToast("Invalid backup file");
    }
  });

  document.querySelector("[data-reset-workspace]")?.addEventListener("click", () => {
    resetState();
    showToast("Workspace reset");
    render();
  });

  document.querySelector("[data-copy-profile]")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(`${state.profile.name} - ${state.profile.role}\n${state.profile.headline}\n${state.profile.github}`);
    showToast("Profile summary copied");
  });

  document.querySelector("[data-add-note]")?.addEventListener("click", () => {
    state.notes.unshift({ id: createId("note"), title: "New launch note", body: "Write a useful project note here.", tag: "New" });
    saveState();
    showToast("Note added");
    render();
  });

  document.querySelectorAll("[data-command-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleCommand(button.dataset.commandAction, button.dataset.commandValue);
    });
  });

  document.querySelector("[data-command-backdrop]")?.addEventListener("click", (event) => {
    if (event.target.matches("[data-command-backdrop]")) {
      state.settings.commandOpen = false;
      saveState();
      render();
    }
  });
}

function bindModalEvents() {
  document.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);
  document.querySelector("[data-copy-issue]")?.addEventListener("click", async (buttonEvent) => {
    const project = state.projects.find((item) => item.id === buttonEvent.target.dataset.copyIssue);
    await navigator.clipboard.writeText(generateIssue(project));
    showToast("Issue copied");
  });
}

function handleCommand(action, value) {
  if (action === "view") setView(value);
  if (action === "export-workspace") exportWorkspace(state);
  if (action === "export-public") exportPublicPortfolio(state);
  if (action === "github") window.open(value, "_blank", "noreferrer");
  state.settings.commandOpen = false;
  saveState();
  render();
}
