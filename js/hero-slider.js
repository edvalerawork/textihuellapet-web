// Esperar a que el contenido cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar contenedor principal
  const slidesContainer = document.querySelector(".slides-container");

  // Seleccionar slides originales
  const slides = document.querySelectorAll(".slide");

  // Seleccionar dots de navegación
  const dots = document.querySelectorAll(".hero-dot");

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

  // Actualizar dots activos
  function updateDots() {
    if (!dots.length) return;

    dots.forEach((dot) => dot.classList.remove("active"));

    let realIndex = currentSlide - 1;

    if (realIndex < 0) realIndex = slides.length - 1;
    if (realIndex >= slides.length) realIndex = 0;

    dots[realIndex].classList.add("active");
  }

  // Mover al slide actual
  function moveToSlide() {
    slidesContainer.style.transition = "transform 0.8s ease-in-out";
    slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}%)`;

    updateDots();
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

    updateDots();
  });

  // Evento dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index + 1;
      moveToSlide();
    });
  });

  // Cambio automático de slides
  setInterval(nextSlide, 5000);

  // Inicializar dots
  updateDots();
});
