/* sistema.js — página principal del sistema */
(function () {
  "use strict";

  var perfil = Almacen.sesionActual();

  // Sin perfil activo no se puede entrar: vuelve a la página de ingreso.
  if (!perfil) {
    window.location.replace("../index.html");
    return;
  }

  var saludo = document.getElementById("saludo");
  var progreso = document.getElementById("progreso");
  var contenedorAvatar = document.getElementById("jugador-avatar");

  function pintar() {
    var avatar = Avatares.buscar(perfil.avatar) || Avatares.lista[0];
    saludo.textContent = "¡Hola, " + perfil.nombre + "!";
    var n = perfil.leccionesCompletadas || 0;
    progreso.textContent =
      n === 0 ? "Aún no has terminado ninguna lección."
      : n === 1 ? "Has terminado 1 lección."
      : "Has terminado " + n + " lecciones.";

    contenedorAvatar.textContent = "";
    var dibujo = Avatares.crear(avatar, "", 96);
    dibujo.style.setProperty("--animacion", "running");
    contenedorAvatar.appendChild(dibujo);
  }

  document.getElementById("marcar-leccion").addEventListener("click", function () {
    var actualizado = Almacen.actualizarPerfil(perfil.id, {
      leccionesCompletadas: (perfil.leccionesCompletadas || 0) + 1
    });
    if (actualizado) {
      perfil = actualizado;
      pintar();
    }
  });

  document.getElementById("salir").addEventListener("click", function () {
    Almacen.cerrarSesion();
    window.location.href = "../index.html";
  });

  pintar();
})();
