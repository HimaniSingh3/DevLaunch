export const initialWorkspace = {
  profile: {
    name: "Himani Singh",
    role: "Frontend Developer and JavaScript Project Creator",
    headline: "Building polished JavaScript projects with clean UI, strong structure, and practical features.",
    location: "India",
    github: "https://github.com/HimaniSingh3",
    email: "himani@example.com",
    accent: "#6366f1",
    resumeSummary: "Frontend-focused developer creating practical JavaScript tools, dashboards, builders, and learning apps with responsive design and local-first features."
  },
  skills: [
    { name: "JavaScript", level: 92, category: "Language" },
    { name: "HTML", level: 95, category: "Frontend" },
    { name: "CSS", level: 90, category: "Frontend" },
    { name: "Vite", level: 84, category: "Tooling" },
    { name: "Responsive Design", level: 88, category: "UI" },
    { name: "localStorage", level: 86, category: "Browser API" },
    { name: "Project Architecture", level: 82, category: "Engineering" }
  ],
  projects: [
    {
      id: "makerscript",
      name: "MakerScript",
      tagline: "A JavaScript script generator for makers and creative developers.",
      category: "Generator",
      status: "Completed",
      featured: false,
      repo: "https://github.com/HimaniSingh3/MakerScript",
      demo: "",
      stack: ["HTML", "CSS", "JavaScript", "Vite"],
      features: ["Script templates", "Code preview", "Copy support", "Download JS files", "Theme toggle"],
      health: { readme: true, license: true, screenshots: false, demo: false, issues: true, roadmap: true, deployed: false },
      notes: "Useful for quickly generating starter JavaScript snippets."
    },
    {
      id: "formpilot",
      name: "FormPilot",
      tagline: "A responsive JavaScript form builder and validator.",
      category: "Builder",
      status: "Completed",
      featured: false,
      repo: "https://github.com/HimaniSingh3/FormPilot",
      demo: "",
      stack: ["HTML", "CSS", "JavaScript", "Vite", "localStorage"],
      features: ["Form builder", "Validation", "Live preview", "Code export", "Local save"],
      health: { readme: true, license: true, screenshots: false, demo: false, issues: true, roadmap: true, deployed: false },
      notes: "Strong project for demonstrating form logic and export workflows."
    },
    {
      id: "js-frontern",
      name: "JS-Frontern",
      tagline: "A frontend component gallery, snippet toolkit, and UI playground.",
      category: "Toolkit",
      status: "Completed",
      featured: false,
      repo: "https://github.com/HimaniSingh3/JS-Frontern",
      demo: "",
      stack: ["HTML", "CSS", "JavaScript", "Vite"],
      features: ["Component gallery", "Live preview", "Code viewer", "Favorites", "Snippet generator"],
      health: { readme: true, license: true, screenshots: false, demo: false, issues: true, roadmap: true, deployed: false },
      notes: "A reusable frontend showcase for practicing component patterns."
    },
    {
      id: "snapboard",
      name: "SnapBoard",
      tagline: "A dashboard builder for organizing widgets in a beautiful workspace.",
      category: "Dashboard",
      status: "Completed",
      featured: true,
      repo: "https://github.com/HimaniSingh3/SnapBoard",
      demo: "",
      stack: ["HTML", "CSS", "JavaScript", "Vite", "localStorage"],
      features: ["Multiple boards", "Widgets", "Kanban", "Habit tracker", "JSON export", "Command palette"],
      health: { readme: true, license: true, screenshots: false, demo: false, issues: true, roadmap: true, deployed: false },
      notes: "A complete productivity workspace with strong dashboard features."
    },
    {
      id: "skilltrail",
      name: "SkillTrail",
      tagline: "A learning productivity app for roadmaps, goals, quizzes, and certificates.",
      category: "Learning",
      status: "Completed",
      featured: true,
      repo: "https://github.com/HimaniSingh3/SkillTrail",
      demo: "",
      stack: ["HTML", "CSS", "JavaScript", "Vite", "PWA"],
      features: ["Roadmaps", "Milestones", "Flashcards", "Quizzes", "Analytics", "Certificate export"],
      health: { readme: true, license: true, screenshots: false, demo: false, issues: true, roadmap: true, deployed: false },
      notes: "A premium learning OS project with analytics and study tools."
    },
    {
      id: "devlaunch",
      name: "DevLaunch",
      tagline: "A local-first developer portfolio operating system.",
      category: "Portfolio OS",
      status: "In Progress",
      featured: true,
      repo: "https://github.com/HimaniSingh3/DevLaunch",
      demo: "",
      stack: ["HTML", "CSS", "JavaScript", "Vite", "PWA"],
      features: ["Portfolio builder", "Health scoring", "Case studies", "Resume builder", "Backup center", "Public export"],
      health: { readme: true, license: true, screenshots: false, demo: false, issues: true, roadmap: true, deployed: false },
      notes: "The main hub that connects all portfolio projects."
    }
  ],
  timeline: [
    { title: "Started building JavaScript portfolio tools", date: "2026", text: "Created practical frontend projects focused on utilities and builders." },
    { title: "Expanded into dashboards and productivity apps", date: "2026", text: "Built SnapBoard and SkillTrail with advanced local-first features." },
    { title: "Launched DevLaunch", date: "2026", text: "Created a portfolio OS to manage projects, readiness, exports, and case studies." }
  ],
  notes: [
    { id: "note-1", title: "Portfolio priority", body: "Add screenshots and live demo links for every completed project.", tag: "Launch" },
    { id: "note-2", title: "Project polish", body: "Keep README files short, visual, and recruiter-friendly.", tag: "Docs" }
  ],
  achievements: [
    { title: "5+ JavaScript Projects", unlocked: true },
    { title: "Local-First Apps", unlocked: true },
    { title: "PWA Foundation", unlocked: true },
    { title: "Portfolio OS", unlocked: true }
  ],
  settings: {
    theme: "dark",
    activeView: "home",
    selectedProjectId: "devlaunch",
    query: "",
    category: "All",
    commandOpen: false
  }
};
