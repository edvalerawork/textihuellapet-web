const modal = document.getElementById("videoModal");
const openBtns = document.querySelectorAll("#openVideo, #openVideoBtn");
const closeBtn = document.getElementById("closeVideo");
const iframe = document.getElementById("videoFrame");

// TU VIDEO DE YOUTUBE
const videoURL =
  "https://www.youtube-nocookie.com/embed/SteYmUPLgbI?autoplay=1";

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
    iframe.src = videoURL;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});

// =========================
// SERVICES SLIDER
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".services-track");
  const cards = document.querySelectorAll(".service-card");
  const prevBtn = document.querySelector(".services-arrow.prev");
  const nextBtn = document.querySelector(".services-arrow.next");

  if (!track || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  }

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

  nextBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCards();

    if (currentIndex < cards.length - visibleCards) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    const visibleCards = getVisibleCards();

    if (currentIndex > cards.length - visibleCards) {
      currentIndex = Math.max(0, cards.length - visibleCards);
    }

    updateSlider();
  });

  updateSlider();
});
