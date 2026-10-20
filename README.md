# Reino Código

Plataforma para aprender a programar jugando, pensada para niños. Todo el sitio está en español.

## Cómo ejecutarlo con XAMPP

1. Copia la carpeta `misTablas` dentro de `htdocs` (por ejemplo `C:\xampp\htdocs\misTablas`).
2. Abre el Panel de control de XAMPP y pulsa **Start** junto a **Apache**.
3. Entra a <http://localhost/misTablas/>.

## Estructura

```
misTablas
├── index.html            ← Etapa 1: ingreso del estudiante
└── Sistema
    ├── index.html        ← página a la que se llega después de ingresar
    ├── CSS
    ├── IMAGEN
    │   ├── fondo.mp4     ← tu video de fondo (tú lo añades)
    │   └── avatares      ← tus sprite sheets (tú los añades)
    └── JS
```

## Cómo poner tus archivos

**Video de fondo:** guárdalo como `misTablas/Sistema/IMAGEN/fondo.mp4`. Si el archivo no existe, la página muestra un fondo de estrellas.

**Avatares:** copia tus sprite sheets a `misTablas/Sistema/IMAGEN/avatares/` y edita la lista en `Sistema/JS/avatares.js` (nombre del archivo y número de cuadros). Cada hoja debe ser una tira horizontal con todos los cuadros del mismo tamaño. Mientras no existan los archivos, se ven personajes de relleno.

## Cómo funcionan los perfiles

No hay contraseñas. Un perfil es el nombre, el avatar y las lecciones terminadas, y se guarda en el navegador de esa computadora. El panel lateral **Continuar** muestra los perfiles con al menos 1 lección terminada.

El botón "Marcar una lección como terminada (prueba)" de `Sistema/index.html` es temporal: sirve para probar ese panel hasta que existan las lecciones.
