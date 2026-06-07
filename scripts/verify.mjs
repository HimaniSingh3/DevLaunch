import { existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "package.json",
  "vite.config.js",
  ".gitignore",
  "LICENSE",
  "README.md",
  "public/logo.svg",
  "public/manifest.webmanifest",
  "public/sw.js",
  "src/main.js",
  "src/app/App.js",
  "src/app/router.js",
  "src/app/store.js",
  "src/features/projects/projects.view.js",
  "src/features/analytics/analytics.view.js",
  "src/features/builder/builder.view.js",
  "src/features/resume/resume.view.js",
  "src/features/case-studies/caseStudies.view.js",
  "src/features/backup/backup.view.js",
  "src/features/notes/notes.view.js",
  "src/shared/utils/exporters.js",
  "src/styles/base.css"
];

const missing = requiredFiles.filter((file) => !existsSync(file));

if (missing.length) {
  console.error("Missing required files:");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log("DevLaunch verification passed. All required files are present.");
