// Cargar dinámicamente la barra de navegación
fetch("components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Inicializar menú móvil después de cargar navbar
    initNavbar();
  });

// Cargar dinámicamente el pie de página
fetch("components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });
