# **🧠 Arquitectura de Sistemas: El Límite entre Código Duro e IA**

En la construcción de este Comparador de Precios, adoptamos una postura de **Frugalidad Computacional**. Las llamadas a Inteligencia Artificial (LLMs) son costosas, lentas y no deterministas (pueden alucinar). El Código Duro (Python/JavaScript) es rápido, gratuito e infalible, pero es ciego ante el contexto.

A continuación, se define la frontera estricta de qué tecnología debe resolver qué problema en nuestra aplicación.

## **⚙️ TERRITORIO DEL CÓDIGO DURO (Scripts, Regex, Matemáticas)**

Todo lo que tenga una regla lógica medible, se resuelve con código tradicional. La IA **solo** se usa en el taller para escribir este código, nunca en producción para ejecutarlo.

| Tarea / Proceso | Razón de usar Código Duro | Implementación Actual |
| :---- | :---- | :---- |
| **Extracción de HTML a JSON** | Las etiquetas web (\<div\>, \<script\>) son estructuradas. | Script de Google Colab (BeautifulSoup). |
| **Extracción de Pesos/Tamanos** | Formatos predecibles (número \+ espacio \+ unidad: 500 ml). | Expresiones Regulares (Regex) en Python y JS. |
| **Cálculo de "Bang for your Buck"** | Matemáticas simples (Regla de Tres). | Función JavaScript local en el dispositivo. |
| **Escala de Colores (Semáforo)** | Comparación de percentiles de un flotante vs la media. | Lógica de if/else en JavaScript. |
| **Zonificación (Radios de C.P.)** | Búsqueda de prefijos numéricos (ej. 012\*). | Filtros y queries de base de datos locales. |

## **🤖 TERRITORIO DE LA IA (El "Workshop Protocol")**

La Inteligencia Artificial se reserva **exclusivamente** para tareas donde el código tradicional falla debido a la ambigüedad del lenguaje humano, el caos del mundo real, o la falta de esquemas estructurados.

### **1\. Etiquetado Semántico Avanzado**

* **El Problema:** El código duro no sabe que "Zote" es un jabón y no un dulce, a menos que escribamos una lista de 10,000 marcas a mano.  
* **Uso de la IA:** Procesar bases de datos crudas masivas para inyectarles campos "categoria" y "subtipo" precisos basándose en el contexto cultural mexicano.

### **2\. Resolución de Entidades (Deduplicación Difusa)**

* **El Problema:** Tienda A dice: *"Mayonesa McCormick con Limón 390g"*. Tienda B dice: *"Mayonesa c/limón Mccormick frasco 390 gr"*. Para el código duro (==), son dos productos distintos.  
* **Uso de la IA:** Correr un script en lote (Batch) donde la IA evalúe la base de datos y cree "IDs Universales" vinculando productos idénticos escritos de forma diferente por distintos supermercados.

### **3\. Procesamiento de Recibos y Etiquetas Físicas (OCR \+ NLP)**

* **El Problema:** En el futuro, el usuario querrá tomarle una foto al ticket de compra impreso, el cual está lleno de abreviaturas raras (ej. *"LECH ENT LAL 1L \- $25.00"*).  
* **Uso de la IA:** Usar un modelo multimodal (Visión \+ Lenguaje) para leer la imagen del ticket de papel, entender las abreviaturas de las cajeras, y devolver nuestro objeto JSON estructurado perfecto listos para entrar al *Local Storage*.

### **4\. Análisis de Sentimiento en Notas de Usuario**

* **El Problema:** Si combinamos bases de datos comunitarias, tendremos miles de notas. ("Está bueno", "Huele rancio", "Cambiaron la receta").  
* **Uso de la IA:** Resumir las opiniones comunitarias en "Pros" y "Contras" automáticos para mostrar en la tarjeta del producto, en lugar de hacer al usuario leer 50 comentarios.

### **5\. Traducción de Documentación (La Refinería)**

* Usar los *Blueprints* de sistema (como blueprint\_scraping\_workshop.md) para que sesiones aisladas de IA limpien datos sucios que se escapan de las habilidades de BeautifulSoup.