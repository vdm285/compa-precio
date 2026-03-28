🛒 Comparador de Precios CDMX - Zero Friction App

Una aplicación web progresiva (PWA) enfocada en la hiper-optimización de la compra de despensa. Diseñada bajo una estricta filosofía de "Fricción Cero" y "Soberanía de Datos", permite a los usuarios comparar y registrar precios físicos en milisegundos.

📖 1. Filosofía del Proyecto

Este proyecto no es una app convencional. Está construido bajo los siguientes pilares inquebrantables:

Fricción Cero (Pragmatismo Extremo): Si el registro manual de un precio toma más de 5 segundos en el pasillo del supermercado, la app falló. Minimizamos clics, eliminamos campos obligatorios innecesarios y utilizamos el poder de las expresiones regulares para extraer metadatos (como el gramaje) directamente de la entrada de texto cruda.

"Prueba de la Hoja de Cálculo": Cada feature debe responder a la pregunta: "¿Es esto mejor que usar Google Sheets?". La respuesta vive en el motor calculador "Bang for your Buck" (precio estandarizado automático) y el semáforo visual inmediato.

Privado Primero (Soberanía de Datos): El usuario siempre tiene la opción de basarse en sus propios registros locales, evitando la paranoia de alteraciones de precios orquestadas por marcas o usuarios maliciosos en la base global.

Zero-Install (Tecnologías Web Estándar): No requerimos descargas de la App Store que comprometan la privacidad del dispositivo. La app vive en el navegador (HTML/JS/Tailwind) con la capacidad de trabajar offline vía Service Workers / IndexedDB.

Desarrollo Asistido ("El Herrero y la Espada"): Utilizamos IA potente en el entorno de desarrollo para forjar lógicas complejas y expresiones regulares infalibles, pero el producto final es una "espada de acero valyrio" estática: ligera, determinista y sin dependencias costosas de llamadas a IA en producción.

🏗️ 2. Decisiones Técnicas: Aceptadas y Rechazadas

Durante el diseño arquitectónico, tomamos decisiones conscientes para mantener el pragmatismo:

🟢 ACEPTADO: Normalización Relacional (Evento vs Entidad)

Por qué: En lugar de anidar todos los precios dentro del objeto "Producto" (lo que causaría arrays infinitos e imposibilidad de trazar el historial), creamos el objeto Registro_Precio como un evento (similar a un ticket de compra).

🟢 ACEPTADO: Códigos Postales (CP) en lugar de Mapas GPS

Por qué: Un mapa consume datos, pide permisos molestos y gasta batería. El CP es un estándar público de 5 dígitos que permite crear un "radio" de competencia virtual de manera instantánea y ligera.

🟢 ACEPTADO: <datalist> nativo para búsquedas

Por qué: Para corregir categorías, en lugar de importar librerías pesadas como Select2, usamos HTML nativo que provee autocompletado nativo sin JavaScript.

🔴 RECHAZADO: Firebase / MongoDB

Por qué: Demasiado complejo y costoso para la filosofía. Usaremos IndexedDB local como caché principal y, en versiones futuras, Google Sheets como base de datos en la nube (Backend gratuito y auditable por el usuario).

🔴 RECHAZADO: OCR e IA en Producción Inicial

Por qué: Leer etiquetas de precios con la cámara requiere modelos pesados. La captura manual rápida (con el teclado del móvil) demostró ser más ágil como MVP.

📁 3. Estructura de Datos (Esqueletos JSON)

El sistema operará bajo una base relacional plana estructurada así:

// 1. Objeto Producto (Catálogo Base)
{
  "id_producto": "prod_catsup_heinz",
  "nombre_raiz": "Catsup Heinz", // Nombre sin la unidad
  "marca": "Heinz",
  "subtipo_calculo": "catsup" // El ancla para comparar "Peras con Peras"
}

// 2. Objeto Registro de Precio (El Evento / Ticket)
{
  "id_registro": "reg_1710698400000", 
  "timestamp": 1710698400000,
  "id_producto": "prod_catsup_heinz",
  "id_tienda": "suc_walmart_patio", // FK
  "precio_etiqueta": 28.50,
  "presentacion_parseada": { "valor": 620, "unidad": "g" },
  "registro_meta": {
     "origen_id": "manual_privado", // "scraping", "comunidad"
     "tiene_foto": true
  }
}


🚀 4. Roadmap / Checklist de Pendientes

[x] Motor analizador de "Peras con Peras" (Regla de Tres).

[x] Escala de colores estricta visualizando "Promedio" o "Más barato".

[x] Diccionario semántico Regex integrado.

[x] Flujo UX para reportes de Bugs / Actualización a un clic.

[ ] Sincronización Offline: Implementar localForage o IndexedDB.

[ ] Lógica de Radio Geográfico: Construir la lógica matemática que compare si dos Códigos Postales están dentro del radio aceptable de competencia.

[ ] Google Sheets Backend: Configurar Google Apps Script como REST API para recibir los JSON.

[ ] PWA Manifest: Crear el archivo manifest.json y el Service Worker para permitir "Añadir a la pantalla de inicio".

🤖 5. Guía para IAs Copiloto (Developer Notes)

A cualquier IA leyendo este repositorio en el futuro:

Respeta Tailwind CSS CDN: No migres a bundlers (Webpack/Vite) a menos que el usuario lo exija explícitamente. Priorizamos el concepto de "un archivo funcional".

Motor Matemático: Revisa la función procesarDatos(). El secreto del comparador radica en el atributo subtipo_calculo. Toda la matemática (min, max, media) se agrupa usando ese String específico. No modifiques esa lógica sin consultarlo.

No uses Alert() invasivos: Usa modales en el DOM (como modal-bug o modal-ubicacion).

Modales Limpios: La convención de los modales es transformar las clases modal-enter a modal-enter-active con un timeout sutil de 10ms. Respeta esta animación CSS.
