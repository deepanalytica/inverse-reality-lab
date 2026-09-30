# Protocolo experimental

## 1. Preparación

1. Seleccionar el modelo y fijar versión/configuración.
2. Crear un **source pack congelado** por tarea con transcripción, metadatos y material visual/textual necesario.
3. Calcular hash SHA-256 de cada source pack.
4. Seleccionar los ítems de holdout sin usar sus respuestas durante construcción de B o C.
5. Congelar prompts A/B/C.
6. Congelar rúbrica y plan estadístico.
7. Registrar hash del commit de este benchmark.

## 2. Split de conocimiento

### Training/context set
Folios y hallazgos usados para construir el contexto B.

### Holdout set
Folios/tareas que no aparecen resueltos en B ni en C.

El contexto puede enseñar **método y hallazgos previos**, pero no la respuesta de los ítems retenidos.

## 3. Ejecución principal — closed-book

Para cada tarea:

1. Abrir una sesión limpia.
2. Cargar exactamente el tratamiento A, B o C.
3. Cargar el mismo source pack.
4. Desactivar web/búsqueda externa.
5. Ejecutar una sola respuesta, sin follow-up correctivo.
6. Guardar output bruto, metadata de modelo, duración y uso de tokens.
7. Repetir 5 veces por condición.
8. Aleatorizar el orden de condiciones y tareas.

No ejecutar todas las A primero y luego todas las C.

## 4. Open-book confirmatorio

Se repite un subconjunto con las mismas herramientas habilitadas para A/B/C.

Registrar:

- consultas;
- URLs/fuentes;
- número de tool calls;
- tiempo;
- si una fuente estaba ya en el source pack.

La pista open-book no sustituye el análisis causal principal.

## 5. Enmascaramiento

Antes de puntuar:

- remover etiquetas A/B/C;
- remover encabezados que revelen la condición;
- asignar IDs aleatorios;
- mezclar el orden de respuestas.

Los jueces no reciben la hipótesis experimental.

## 6. Adjudicación de claims

Cada afirmación verificable se etiqueta como:

- **OBS:** directamente soportada por source pack/gold.
- **DER:** derivación reproducible desde OBS.
- **HYP:** hipótesis explícita.
- **UNS:** afirmación presentada como hecho sin soporte.
- **ERR:** contradice evidencia/gold.
- **NA:** retórica/organización sin contenido factual evaluable.

UCR:

[
UCR = \frac{UNS + ERR}{OBS + DER + HYP + UNS + ERR}
]

También se reporta ERR por separado para no equiparar falta de soporte con falsedad demostrada.

## 7. Jueces

Mínimo:

- dos jueces independientes;
- al menos una revisión humana de una muestra estratificada;
- si se usan LLM-as-judge, preferir una familia distinta del modelo evaluado;
- discrepancias >1 punto en cualquier dimensión 0–4 pasan a adjudicación.

## 8. Control de longitud

Registrar tokens de salida.

Se ejecutará un análisis de sensibilidad con longitud como covariable o mediante matching aproximado. Una condición no gana por escribir más.

## 9. Reproducibilidad

Cada corrida debe poder reconstruirse con:

- commit;
- model id/version;
- condition prompt hash;
- source pack hash;
- task id;
- replica;
- timestamp;
- parámetros;
- raw response;
- scoring record.

## 10. Prohibiciones

- no cambiar la rúbrica después de mirar resultados;
- no seleccionar ejemplos “bonitos” como evidencia principal;
- no descartar réplicas malas salvo error técnico documentado;
- no llamar “traducción” a una inferencia semántica no anclada;
- no describir C como runtime PRAXIOS/Meta-Harness si sólo fue un protocolo de prompting.
