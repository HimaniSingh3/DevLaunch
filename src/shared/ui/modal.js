export function Modal() {
  return `<div class="modal-backdrop" data-modal hidden><div class="modal-card" data-modal-content></div></div>`;
}

export function openModal(content) {
  const modal = document.querySelector("[data-modal]");
  const body = document.querySelector("[data-modal-content]");
  if (!modal || !body) return;
  body.innerHTML = content;
  modal.hidden = false;
}

export function closeModal() {
  const modal = document.querySelector("[data-modal]");
  if (modal) modal.hidden = true;
}
