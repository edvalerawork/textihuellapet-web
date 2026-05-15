// Esperar a que cargue todo el contenido
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar botones de filtro
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Seleccionar elementos de galería
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Validación básica
  if (!filterButtons.length || !galleryItems.length) return;

  // Recorrer botones
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover estado activo de todos
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Activar actual
      this.classList.add("active");

      // Obtener filtro seleccionado
      const filterValue = this.getAttribute("data-filter");

      // Filtrar elementos
      galleryItems.forEach((item) => {
        // Mostrar todos
        if (filterValue === "all") {
          item.classList.remove("hide");
        }
        // Mostrar coincidencias
        else if (item.classList.contains(filterValue)) {
          item.classList.remove("hide");
        }
        // Ocultar no coincidentes
        else {
          item.classList.add("hide");
        }
      });
    });
  });
});
