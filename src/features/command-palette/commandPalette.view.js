import { ROUTES } from "../../app/router.js";
import { state } from "../../app/store.js";
import { escapeHtml } from "../../shared/utils/escape.js";

export function CommandPalette() {
  const commands = [
    ...ROUTES.map((route) => ({ label: `Go to ${route.label}`, action: "view", value: route.id })),
    { label: "Export Workspace JSON", action: "export-workspace", value: "" },
    { label: "Export Public Portfolio", action: "export-public", value: "" },
    { label: "Open GitHub Profile", action: "github", value: state.profile.github }
  ];
  return `
    <div class="command-backdrop ${state.settings.commandOpen ? "open" : ""}" data-command-backdrop>
      <div class="command-card">
        <div class="command-header"><strong>Command Palette</strong><small>Ctrl + K</small></div>
        <div class="command-list">
          ${commands.map((cmd) => `<button data-command-action="${cmd.action}" data-command-value="${escapeHtml(cmd.value)}">${escapeHtml(cmd.label)}</button>`).join("")}
        </div>
      </div>
    </div>
  `;
}
