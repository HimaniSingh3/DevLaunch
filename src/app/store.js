import { initialWorkspace } from "../data/workspace.js";
import { readStorage, writeStorage } from "../shared/utils/storage.js";

export const STORAGE_KEY = "devlaunch-v3-workspace";

export const state = readStorage(STORAGE_KEY, initialWorkspace);

export function saveState() {
  writeStorage(STORAGE_KEY, state);
}

export function resetState() {
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, structuredClone(initialWorkspace));
  saveState();
}

export function setView(view) {
  state.settings.activeView = view;
  saveState();
}

export function updateProfile(profile) {
  state.profile = { ...state.profile, ...profile };
  saveState();
}

export function selectedProject() {
  return state.projects.find((project) => project.id === state.settings.selectedProjectId) || state.projects[0];
}

export function setSelectedProject(projectId) {
  state.settings.selectedProjectId = projectId;
  saveState();
}

export function upsertProject(updatedProject) {
  const index = state.projects.findIndex((project) => project.id === updatedProject.id);
  if (index >= 0) {
    state.projects[index] = { ...state.projects[index], ...updatedProject };
  } else {
    state.projects.push(updatedProject);
  }
  saveState();
}
