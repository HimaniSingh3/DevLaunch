const HEALTH_WEIGHTS = {
  readme: 20,
  license: 10,
  screenshots: 15,
  demo: 15,
  issues: 10,
  roadmap: 15,
  deployed: 15
};

export function getProjectScore(project) {
  return Object.entries(HEALTH_WEIGHTS).reduce((score, [key, weight]) => {
    return score + (project.health?.[key] ? weight : 0);
  }, 0);
}

export function getHealthLabel(score) {
  if (score >= 85) return "Launch Ready";
  if (score >= 65) return "Almost Ready";
  if (score >= 45) return "Needs Polish";
  return "Early Stage";
}

export function getWorkspaceStats(projects) {
  const total = projects.length;
  const categories = new Set(projects.map((project) => project.category)).size;
  const stacks = new Set(projects.flatMap((project) => project.stack)).size;
  const avg = Math.round(projects.reduce((sum, project) => sum + getProjectScore(project), 0) / total);
  const completed = projects.filter((project) => project.status === "Completed").length;
  return { total, categories, stacks, avg, completed };
}
