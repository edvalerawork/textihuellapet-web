// Modal de video
const modal = document.getElementById("videoModal");
const openBtns = document.querySelectorAll("#openVideo, #openVideoBtn");
const closeBtn = document.getElementById("closeVideo");
const iframe = document.getElementById("videoFrame");

const videoURL =
  "https://www.youtube-nocookie.com/embed/SteYmUPLgbI?autoplay=1";

// Ejecutar solo si existe en la página
if (modal && closeBtn && iframe && openBtns.length) {

  // Abrir modal
  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
      iframe.src = videoURL;
    });
  });

  // Cerrar modal con botón
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";
  });

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = "";
    }
  });

}