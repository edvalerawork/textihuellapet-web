// Slider de productos
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".products-track");
  const cards = document.querySelectorAll(".product-card");
  const prevBtn = document.querySelector(".products-arrow.prev");
  const nextBtn = document.querySelector(".products-arrow.next");

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
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const moveAmount = cardWidth + gap;

    track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
  }

  // Botón siguiente con loop
  nextBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    const maxIndex = cards.length - visibleCards;

    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }

    updateSlider();
  });

  // Botón anterior con loop
  prevBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    const maxIndex = cards.length - visibleCards;

    if (currentIndex <= 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex--;
    }

    updateSlider();
  });

  // Variables para drag y swipe
  let isDragging = false;
  let startPos = 0;

  track.addEventListener("mousedown", dragStart);
  track.addEventListener("touchstart", dragStart, { passive: true });

  track.addEventListener("mouseup", dragEnd);
  track.addEventListener("mouseleave", dragEnd);
  track.addEventListener("touchend", dragEnd);

  track.addEventListener("mousemove", dragMove);
  track.addEventListener("touchmove", dragMove, { passive: true });

  // Iniciar arrastre
  function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    track.style.cursor = "grabbing";
  }

  // Movimiento durante arrastre
  function dragMove(e) {
    if (!isDragging) return;

    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;

    if (Math.abs(diff) > 50) {
      const visibleCards = getVisibleCards();
      const maxIndex = cards.length - visibleCards;

      if (diff < 0) {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      } else {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      }

      isDragging = false;
      updateSlider();
    }
  }

  // Finalizar arrastre
  function dragEnd() {
    isDragging = false;
    track.style.cursor = "grab";
  }

  // Obtener posición horizontal
  function getPositionX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  // Ajuste responsive
  window.addEventListener("resize", () => {
    const visibleCards = getVisibleCards();
    const maxIndex = cards.length - visibleCards;

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateSlider();
  });

  // Inicializar slider
  updateSlider();
});
