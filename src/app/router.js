export const ROUTES = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "projects", label: "Projects", icon: "Grid" },
  { id: "analytics", label: "Analytics", icon: "Chart" },
  { id: "builder", label: "Builder", icon: "Tune" },
  { id: "case-studies", label: "Case Studies", icon: "Story" },
  { id: "resume", label: "Resume", icon: "Profile" },
  { id: "notes", label: "Notes", icon: "Notes" },
  { id: "backup", label: "Backup", icon: "Archive" },
  { id: "contact", label: "Contact", icon: "Mail" }
];

export function getRoute(id) {
  return ROUTES.find((route) => route.id === id) || ROUTES[0];
}
