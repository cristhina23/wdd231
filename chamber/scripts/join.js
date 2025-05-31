// Establecer el timestamp al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    const now = new Date();
    timestampInput.value = now.toISOString();
  }

  // Mapeo de botones con sus respectivos modales
  const modalMap = {
    "modal-np-card": "modal-np",
    "modal-bronze-card": "modal-bronze",
    "modal-silver-card": "modal-silver",
    "modal-gold-card": "modal-gold"
  };

  // Agrega evento a cada botón de "More Info"
  Object.entries(modalMap).forEach(([triggerId, modalId]) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);

    if (trigger && modal) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        modal.showModal();
      });

      // Cerrar el modal desde su botón
      const closeBtn = modal.querySelector(".close-modal");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.close());
      }
    }
  });
});
