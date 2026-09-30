# IRL Adversarial Study 002 — Voynich LLM Context/Harness Ablation

**ID:** IRL-ADV-002  
**Estado:** prerregistrado / no ejecutado  
**Dominio:** Manuscrito Voynich  
**Objetivo:** medir si el contexto acumulado y un protocolo explícito inspirado en PRAXIOS + Meta-Harness + Decision Room mejoran la fiabilidad epistémica de un mismo LLM frente a una línea base genérica.

## Pregunta central

¿La mejora percibida al trabajar con un contexto de investigación sostenido y un harness metodológico puede medirse de forma reproducible, o sólo cambia el estilo de la respuesta?

Este benchmark separa tres condiciones:

- **A — Baseline genérico:** mismo modelo, misma pregunta, mismo paquete de evidencia, sin contexto previo del proyecto ni protocolo IRL.
- **B — Contexto:** A + contexto acumulado del proyecto Voynich, limitado a material de entrenamiento y sin revelar la respuesta de los ítems retenidos.
- **C — Contexto + harness protocolizado:** B + instrucciones explícitas de observación, separación evidencia/inferencia, hipótesis competidoras, falsación, verificación, trazabilidad y Decision Room.

> Importante: C mide una **aplicación protocolizada** de principios PRAXIOS/Meta-Harness/Decision Room en el prompt y el flujo de trabajo. No debe describirse como prueba de que el runtime externo de PRAXIOS o Meta-Harness esté ejecutándose dentro del modelo, salvo que una corrida futura use y registre realmente ese runtime.

## Diseño

La comparación usa el **mismo modelo, versión, esfuerzo de razonamiento, temperatura/configuración y disponibilidad de herramientas** entre condiciones. Sólo cambia el tratamiento experimental.

Dos pistas:

1. **Closed-book:** todas las condiciones reciben el mismo source pack congelado; web y búsqueda externa desactivadas.
2. **Open-book confirmatoria:** mismas herramientas para A/B/C, con todos los tool calls registrados.

La pista closed-book es la principal para inferencia causal.

## Tamaño

### Piloto
5 tareas × 3 condiciones × 3 réplicas = **45 respuestas**.

### Estudio principal
15 tareas retenidas × 3 condiciones × 5 réplicas = **225 respuestas**.

Las 15 tareas se distribuyen en cinco familias: estructura de párrafo, morfología/tokenización, efectos posicionales, relación etiqueta-cuerpo y generalización/falsación entre folios.

## Endpoints primarios

1. **Unsupported Claim Rate (UCR):** afirmaciones factuales no sostenidas / afirmaciones factuales totales.
2. **Exactitud factual:** escala 0–4 contra evidencia y gold adjudicado.
3. **Trazabilidad:** escala 0–4.
4. **Calidad de falsación:** escala 0–4.
5. **Control de hipótesis:** escala 0–4.

No se declarará superioridad global por una impresión estilística. Las métricas se analizan individualmente; un índice compuesto es sólo secundario.

## Archivos

- [PREREGISTRATION.md](PREREGISTRATION.md) — hipótesis y criterios congelados antes de correr el benchmark.
- [PROTOCOL.md](PROTOCOL.md) — procedimiento paso a paso.
- [CONDITIONS.md](CONDITIONS.md) — prompts y tratamientos A/B/C.
- [TASK_BANK.md](TASK_BANK.md) — familias de problemas y política de holdout.
- [RUBRIC.md](RUBRIC.md) — rúbrica ciega.
- [ANALYSIS_PLAN.md](ANALYSIS_PLAN.md) — estadística y criterios de decisión.
- [DATA_SCHEMA.md](DATA_SCHEMA.md) — formato de registro.
- [THREATS_TO_VALIDITY.md](THREATS_TO_VALIDITY.md) — amenazas y controles.
- [DECISION_GATE.md](DECISION_GATE.md) — qué evidencia permitiría afirmar mejora.
- [manifest.json](manifest.json) — configuración versionada.
- [analyze.py](analyze.py) — análisis reproducible.
- [RESULTS.md](RESULTS.md) — reservado para resultados; actualmente sin datos.

## Regla de interpretación

El benchmark prueba:

[
\text{LLM} + \text{contexto} + \text{disciplina metodológica}
]

frente al mismo LLM sin esas capas.

No prueba por sí solo aumento de “inteligencia”, conciencia, capacidad fundamental del modelo ni validez general de PRAXIOS en todos los dominios.
