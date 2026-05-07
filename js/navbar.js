// Inicializar funcionalidad del menú móvil
function initNavbar() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Menú móvil desplegable
  if (menuToggle && mobileMenu) {
    // Evento para abrir o cerrar menú
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");

      // Cambiar icono entre hamburguesa y cerrar
      const icon = menuToggle.querySelector("i");

      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Cerrar menú móvil automáticamente al cambiar a escritorio
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        mobileMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Detectar página actual para resaltar enlace activo
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Seleccionar todos los enlaces del navbar
  const navLinks = document.querySelectorAll(
    ".nav-left a, .nav-right a, .mobile-menu a",
  );

  navLinks.forEach((link) => {
    // Eliminar active previo
    link.classList.remove("active");

    // Obtener destino del enlace
    const linkPage = link.getAttribute("href");

    // Activar enlace correspondiente
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}
