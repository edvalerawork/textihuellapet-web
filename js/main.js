// Modal de video
const modal = document.getElementById("videoModal");
const openBtns = document.querySelectorAll("#openVideo, #openVideoBtn");
const closeBtn = document.getElementById("closeVideo");
const iframe = document.getElementById("videoFrame");

// URL del video
const videoURL =
  "https://www.youtube-nocookie.com/embed/SteYmUPLgbI?autoplay=1";

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

// Slider de servicios
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".services-track");
  const cards = document.querySelectorAll(".service-card");
  const prevBtn = document.querySelector(".services-arrow.prev");
  const nextBtn = document.querySelector(".services-arrow.next");

  if (!track || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  // Detectar tarjetas visibles
  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

  // Actualizar slider
  function updateSlider() {
    const visibleCards = getVisibleCards();
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const moveAmount = cardWidth + gap;

    track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;

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

  updateSlider();
});

// Slider de productos
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".products-track");
  const cards = document.querySelectorAll(".product-card");
  const prevBtn = document.querySelector(".products-arrow.prev");
  const nextBtn = document.querySelector(".products-arrow.next");

  if (!track || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  // Detectar tarjetas visibles
  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

  // Actualizar slider
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

  updateSlider();
});
