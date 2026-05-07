// Slider de servicios
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".services-track");
  const cards = document.querySelectorAll(".service-card");
  const prevBtn = document.querySelector(".services-arrow.prev");
  const nextBtn = document.querySelector(".services-arrow.next");

  // Verificar existencia de elementos
  if (!track || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  // Detectar cantidad de tarjetas visibles según pantalla
  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

  // Actualizar posición del slider
  function updateSlider() {
    const visibleCards = getVisibleCards();
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const moveAmount = cardWidth + gap;

    track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

    // Estado de botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - visibleCards;

    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";

    prevBtn.style.cursor = prevBtn.disabled ? "default" : "pointer";
    nextBtn.style.cursor = nextBtn.disabled ? "default" : "pointer";
  }

  // Botón siguiente
  nextBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();

    if (currentIndex < cards.length - visibleCards) {
      currentIndex++;
      updateSlider();
    }
  });

  // Botón anterior
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  // Ajuste responsive
  window.addEventListener("resize", () => {
    const visibleCards = getVisibleCards();

    if (currentIndex > cards.length - visibleCards) {
      currentIndex = Math.max(0, cards.length - visibleCards);
    }

    updateSlider();
  });

  // Inicializar slider
  updateSlider();
});