# Plan de análisis

## Unidad de análisis

Una respuesta completa de un modelo a una tarea en una condición y réplica.

Estructura jerárquica:

[
response \subset replicate \subset task \subset family
]

Las condiciones se comparan dentro de las mismas tareas.

## Análisis descriptivo

Por condición:

- media, mediana y dispersión de cada score 0–4;
- UCR;
- error rate;
- longitud;
- latencia;
- tokens;
- coste;
- desacuerdo entre jueces.

## Comparaciones principales

- B − A: efecto de contexto.
- C − B: efecto incremental del harness.
- C − A: efecto total.

Para métricas 0–4 y UCR se reportarán diferencias medias pareadas por tarea con **bootstrap estratificado por task_id** (10.000 remuestreos cuando se ejecute el análisis final).

También se reportará una prueba de permutación por condición dentro de tarea. Los p-values, si se usan, serán secundarios a tamaño de efecto e intervalos.

## Multiplicidad

Las cinco métricas primarias se reportan por separado. Si se realizan pruebas formales, corrección Holm para la familia confirmatoria.

## Sensibilidad

Repetir análisis:

1. excluyendo outputs con fallo técnico;
2. excluyendo tareas con desacuerdo de adjudicación alto;
3. ajustando por longitud/tokens;
4. por familia de tarea;
5. sólo closed-book;
6. sólo primera réplica;
7. con mediana por task_id en vez de cada réplica.

## Índice secundario ERS

Sólo para visualización:

[
ERS = 0.25A + 0.20T + 0.20F + 0.15H + 0.10C + 0.10E
]

donde cada componente está normalizado de 0 a 1:

- A = exactitud;
- T = trazabilidad;
- F = falsación;
- H = control de hipótesis;
- C = calibración;
- E = detección/corrección.

Se reporta también **ERS-UCR**, definido como:

[
ERS_{adj}=clip(ERS - 0.25\,UCR, 0, 1)
]

Este índice **no** sustituye los endpoints primarios.

## No inferioridad factual

Para evitar que C “gane” siendo excesivamente conservador, la exactitud de C debe conservarse. La interpretación final reportará cualquier trade-off entre cautela y capacidad de responder.

## Generalización

Ningún resultado permite afirmar eficacia universal. Una replicación futura debe usar al menos:

- otro dominio histórico/filológico;
- un dominio científico;
- un dominio operacional con decisiones;
- otro modelo/familia de modelos.
