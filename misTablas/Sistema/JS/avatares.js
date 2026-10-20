/*
 * avatares.js — lista de avatares seleccionables.
 *
 * CÓMO PONER TUS SPRITE SHEETS
 * 1. Copia cada imagen a  Sistema/IMAGEN/avatares/
 * 2. En la lista de abajo, cambia "sprite" por el nombre de tu archivo
 *    y "cuadros" por cuántos cuadros (frames) tiene la hoja.
 *
 * La hoja debe ser una tira horizontal: todos los cuadros en una sola fila,
 * del mismo tamaño. El ancho de cada cuadro se calcula solo
 * (ancho de la imagen ÷ cuadros). Si el archivo no existe, se muestra el
 * personaje de relleno dibujado con código.
 */
(function (global) {
  "use strict";

  var AVATARES = [
    { id: "personaje-1", nombre: "Personaje 1", sprite: "IMAGEN/avatares/personaje-1.png", cuadros: 4,
      colores: { pelo: "#7a4dff", piel: "#f6d3b3", cuerpo: "#2fb8d6", piernas: "#2a1a6e" }, forma: 0 },
    { id: "personaje-2", nombre: "Personaje 2", sprite: "IMAGEN/avatares/personaje-2.png", cuadros: 4,
      colores: { pelo: "#ff3b7f", piel: "#d9a47c", cuerpo: "#ffd34d", piernas: "#3a2aa8" }, forma: 1 },
    { id: "personaje-3", nombre: "Personaje 3", sprite: "IMAGEN/avatares/personaje-3.png", cuadros: 4,
      colores: { pelo: "#e8e2ff", piel: "#f1c9a5", cuerpo: "#ff3b7f", piernas: "#150d3a" }, forma: 2 },
    { id: "personaje-4", nombre: "Personaje 4", sprite: "IMAGEN/avatares/personaje-4.png", cuadros: 4,
      colores: { pelo: "#2fb8d6", piel: "#8d5a3b", cuerpo: "#7a4dff", piernas: "#0b0721" }, forma: 1 },
    { id: "personaje-5", nombre: "Personaje 5", sprite: "IMAGEN/avatares/personaje-5.png", cuadros: 4,
      colores: { pelo: "#ffd34d", piel: "#f6d3b3", cuerpo: "#3a2aa8", piernas: "#6fe8ff" }, forma: 0 },
    { id: "personaje-6", nombre: "Personaje 6", sprite: "IMAGEN/avatares/personaje-6.png", cuadros: 4,
      colores: { pelo: "#3c2a8f", piel: "#c98f66", cuerpo: "#e8e2ff", piernas: "#ff3b7f" }, forma: 2 }
  ];

  // Las dos filas de arriba cambian según la forma del pelo ("h" = pelo).
  var FORMAS_PELO = [
    ["...hhhh...", "..hhhhhh.."],
    ["..h....h..", "..hhhhhh.."],
    [".....h....", "...hhhh..."]
  ];

  // Cuerpo común: s = piel, e = ojo, b = cuerpo, l = piernas.
  var CUERPO = [
    "..hssssh..",
    "..sesses..",
    "..ssssss..",
    "...bbbb...",
    ".bbbbbbbb.",
    ".sbbbbbbs.",
    ".sbbbbbbs.",
    "..bbbbbb..",
    "..ll..ll..",
    "..ll..ll..",
    ".lll..lll."
  ];

  function buscar(id) {
    for (var i = 0; i < AVATARES.length; i++) {
      if (AVATARES[i].id === id) return AVATARES[i];
    }
    return null;
  }

  // Personaje de relleno: pixeles dibujados como SVG.
  function crearRelleno(avatar) {
    var filas = FORMAS_PELO[avatar.forma].concat(CUERPO);
    var c = avatar.colores;
    var mapa = { h: c.pelo, s: c.piel, e: "#0b0721", b: c.cuerpo, l: c.piernas };
    var rects = "";
    for (var y = 0; y < filas.length; y++) {
      for (var x = 0; x < filas[y].length; x++) {
        var color = mapa[filas[y][x]];
        if (color) rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + color + '"/>';
      }
    }
    var envoltura = document.createElement("span");
    envoltura.className = "avatar-relleno";
    envoltura.innerHTML =
      '<svg viewBox="0 0 10 ' + filas.length + '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' +
      rects + "</svg>";
    return envoltura;
  }

  /*
   * Crea el avatar listo para insertar en la página.
   *   base:   carpeta que contiene IMAGEN/ vista desde la página actual
   *           ("Sistema/" desde misTablas/index.html, "" desde Sistema/index.html)
   *   altoPx: alto con que se muestra
   */
  function crear(avatar, base, altoPx) {
    var contenedor = document.createElement("span");
    contenedor.className = "avatar";
    contenedor.style.setProperty("--alto-avatar", altoPx + "px");

    var relleno = crearRelleno(avatar);
    contenedor.appendChild(relleno);

    var ruta = base + avatar.sprite;
    var imagen = new Image();
    imagen.onload = function () {
      var anchoCuadro = imagen.naturalWidth / avatar.cuadros;
      var escala = altoPx / imagen.naturalHeight;
      var hoja = document.createElement("span");
      hoja.className = "sprite";
      hoja.style.setProperty("--cuadros", avatar.cuadros);
      hoja.style.setProperty("--ancho-cuadro", anchoCuadro * escala + "px");
      hoja.style.setProperty("--alto-cuadro", altoPx + "px");
      hoja.style.backgroundImage = 'url("' + ruta + '")';
      contenedor.replaceChild(hoja, relleno);
    };
    imagen.src = ruta; // si no existe, se queda el personaje de relleno
    return contenedor;
  }

  global.Avatares = { lista: AVATARES, buscar: buscar, crear: crear };
})(window);
