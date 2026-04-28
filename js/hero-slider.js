// Espera a que el contenido cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el contenedor de slides
  const slidesContainer = document.querySelector(".slides-container");

  // Selecciona todos los slides originales
  const slides = document.querySelectorAll(".slide");

  // Selecciona botones
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");

  // Clonar primer y último slide
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  // Insertar clones
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

  // Obtener todos los slides incluyendo clones
  const allSlides = document.querySelectorAll(".slide");

  let currentSlide = 1;
  const slideWidth = 100;

  // Posición inicial
  slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;

  // Mostrar slide
  function moveToSlide() {
    slidesContainer.style.transition = "transform 0.8s ease-in-out";
    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;
  }

  // Siguiente
  function nextSlide() {
    if (currentSlide >= allSlides.length - 1) return;
    currentSlide++;
    moveToSlide();
  }

  // Anterior
  function prevSlide() {
    if (currentSlide <= 0) return;
    currentSlide--;
    moveToSlide();
  }

  // Reset invisible cuando llega a clones
  slidesContainer.addEventListener("transitionend", () => {
    if (allSlides[currentSlide].id === "first-clone") {
      slidesContainer.style.transition = "none";
      currentSlide = 1;
      slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;
    }

    if (allSlides[currentSlide].id === "last-clone") {
      slidesContainer.style.transition = "none";
      currentSlide = allSlides.length - 2;
      slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;
    }
  });

  // Eventos botones
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Auto slide
  setInterval(nextSlide, 5000);
});
