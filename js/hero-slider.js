// Esperar a que el contenido cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar contenedor principal
  const slidesContainer = document.querySelector(".slides-container");

  // Seleccionar slides originales
  const slides = document.querySelectorAll(".slide");

  // Seleccionar dots de navegación
  const dots = document.querySelectorAll(".hero-dot");

  if (!slidesContainer || slides.length === 0) return;

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

  // Variables para drag / swipe
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = -slideWidth * currentSlide;
  let prevTranslate = currentTranslate;
  let animationID;

  // Variable autoplay
  let autoSlide;

  // Posición inicial
  slidesContainer.style.transform = `translateX(${currentTranslate}%)`;

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
  function moveToSlide(smooth = true) {
    slidesContainer.style.transition = smooth
      ? "transform 0.6s ease-in-out"
      : "none";

    currentTranslate = -slideWidth * currentSlide;
    prevTranslate = currentTranslate;

    slidesContainer.style.transform = `translateX(${currentTranslate}%)`;

    updateDots();
  }

  // Avanzar al siguiente slide (siempre infinito)
  function nextSlide() {
    currentSlide++;
    moveToSlide();
  }

  // Retroceder al slide anterior (siempre infinito)
  function prevSlide() {
    currentSlide--;
    moveToSlide();
  }

  // Reinicio invisible al llegar a clones
  slidesContainer.addEventListener("transitionend", () => {
    if (allSlides[currentSlide].id === "first-clone") {
      currentSlide = 1;
      moveToSlide(false);
    }

    if (allSlides[currentSlide].id === "last-clone") {
      currentSlide = allSlides.length - 2;
      moveToSlide(false);
    }
  });

  // Evento dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index + 1;
      moveToSlide();
      startAutoSlide();
    });
  });

  // Cambio automático de slides (más lento para mejor experiencia)
  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 7000);
  }

  // Detener autoplay
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Obtener posición para mouse o touch
  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  // Iniciar arrastre
  function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    slidesContainer.style.transition = "none";

    stopAutoSlide();

    animationID = requestAnimationFrame(animation);
  }

  // Movimiento durante arrastre
  function dragMove(event) {
    if (!isDragging) return;

    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;

    currentTranslate = prevTranslate + (diff / window.innerWidth) * 100;
  }

  // Finalizar arrastre con loop infinito
  function dragEnd() {
    if (!isDragging) return;

    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    // Sensibilidad swipe
    if (movedBy < -15) {
      currentSlide++;
    } else if (movedBy > 15) {
      currentSlide--;
    }

    moveToSlide();

    startAutoSlide();
  }

  // Animación en tiempo real
  function animation() {
    slidesContainer.style.transform = `translateX(${currentTranslate}%)`;

    if (isDragging) requestAnimationFrame(animation);
  }

  // Eventos para escritorio
  slidesContainer.addEventListener("mousedown", dragStart);
  slidesContainer.addEventListener("mousemove", dragMove);
  slidesContainer.addEventListener("mouseup", dragEnd);
  slidesContainer.addEventListener("mouseleave", () => {
    if (isDragging) dragEnd();
  });

  // Eventos para móviles
  slidesContainer.addEventListener("touchstart", dragStart, {
    passive: true,
  });

  slidesContainer.addEventListener("touchmove", dragMove, {
    passive: true,
  });

  slidesContainer.addEventListener("touchend", dragEnd);

  // Pausar autoplay al pasar mouse
  slidesContainer.addEventListener("mouseenter", stopAutoSlide);

  // Reanudar autoplay al salir
  slidesContainer.addEventListener("mouseleave", startAutoSlide);

  // Inicializar dots
  updateDots();

  // Iniciar slider automático
  startAutoSlide();
});
