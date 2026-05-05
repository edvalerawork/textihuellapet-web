// Inicializar funcionalidad del menú móvil
function initNavbar() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

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

  }
}