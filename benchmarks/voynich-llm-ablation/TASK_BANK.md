# Banco de tareas y política de holdout

## Principio

El benchmark no debe preguntar por descubrimientos que ya estén incluidos literalmente en el contexto B/C.

Los ítems finales se generan a partir de folios retenidos y source packs congelados.

## Familias

### F1 — Estructura de párrafo
Ejemplos de pregunta:

- ¿Existe un slot de entrada distinguible en estos párrafos?
- ¿La concentración de un tipo de glifo excede lo esperable por frecuencia global?
- ¿Qué contraejemplos reales aparecen?

### F2 — Morfología / familias de token
- detectar pares con/sin prefijo;
- distinguir transformación formal de equivalencia semántica;
- proponer segmentaciones rivales.

### F3 — Efectos posicionales
- inicio/fin de línea;
- inicio/fin de párrafo;
- dependencia entre posición y forma;
- separar efecto de escriba/Currier/sección.

### F4 — Etiqueta ↔ cuerpo
- medir solapamiento léxico local;
- construir controles de página emparejada;
- evitar asumir que una etiqueta es “nombre de planta” sin evidencia externa.

### F5 — Generalización y falsación
- aplicar una regla aprendida en training a folios nuevos;
- identificar dónde falla;
- decidir si el fallo exige descartar, restringir o reformular la hipótesis.

## Estudio principal

15 tareas, 3 por familia.

Cada tarea debe contener:

- `task_id`;
- folio(s);
- pregunta;
- source pack;
- gold/adjudication notes;
- dificultad estimada **antes** de la corrida;
- criterio de éxito;
- lista de trampas epistémicas conocidas.

## Selección

Los 15 ítems definitivos deben fijarse antes de ejecutar el estudio puntuable.

Si el repositorio permanece público durante la corrida:

- tools/web desactivados en closed-book;
- source pack local obligatorio;
- no permitir que el modelo consulte el repositorio;
- registrar el commit de selección.

## Pilot vs main

Los cinco ítems del piloto no se reutilizan en el estudio principal.

El piloto sirve para encontrar fallas del protocolo, no para estimar el efecto definitivo.
