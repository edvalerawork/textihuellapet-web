// Esperar a que el contenido cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar contenedor principal
  const slidesContainer = document.querySelector(".slides-container");

  // Seleccionar slides originales
  const slides = document.querySelectorAll(".slide");

  // Seleccionar botones de navegación
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");

  // Clonar primer y último slide para efecto infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  // Insertar clones en el slider
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

  // Obtener todos los slides incluyendo clones
  const allSlides = document.querySelectorAll(".slide");

  let currentSlide = 1;
  const slideWidth = 100;

  // Posición inicial
  slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;

  // Mover al slide actual
  function moveToSlide() {
    slidesContainer.style.transition = "transform 0.8s ease-in-out";
    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;
  }

  // Avanzar al siguiente slide
  function nextSlide() {
    if (currentSlide >= allSlides.length - 1) return;

    currentSlide++;
    moveToSlide();
  }

  // Retroceder al slide anterior
  function prevSlide() {
    if (currentSlide <= 0) return;

    currentSlide--;
    moveToSlide();
  }

  // Reinicio invisible al llegar a clones
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

  // Evento botón siguiente
  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  // Evento botón anterior
  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }

  // Cambio automático de slides
  setInterval(nextSlide, 5000);
});
