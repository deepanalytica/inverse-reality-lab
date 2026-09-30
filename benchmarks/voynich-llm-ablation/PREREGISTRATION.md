# Prerregistro — IRL-ADV-002

**Fecha de diseño:** 2026-09-30  
**Estado:** congelar antes de la primera corrida puntuable.

## RQ1

¿El contexto acumulado del proyecto mejora la fiabilidad epistémica respecto de una sesión genérica del mismo modelo?

Comparación primaria: **B vs A**.

## RQ2

¿Agregar un protocolo explícito de PRAXIOS/Meta-Harness/Decision Room sobre el mismo contexto produce una mejora adicional?

Comparación primaria: **C vs B**.

## RQ3

¿C reduce errores epistémicos respecto del baseline completo?

Comparación confirmatoria: **C vs A**.

## Hipótesis

### H1 — unsupported claims
[
UCR_C < UCR_B < UCR_A
]

### H2 — trazabilidad
[
T_C > T_B \ge T_A
]

### H3 — falsación
[
F_C > F_B > F_A
]

### H4 — exactitud
C no debe ganar sólo por ser más cauteloso. Se exige que su exactitud factual sea al menos no inferior a A y B, y preferentemente mayor.

### H5 — utilidad/coste
La mejora, si existe, debe reportarse junto con latencia, tokens y coste. Una condición que duplique calidad a un coste 20× puede ser científicamente interesante pero operacionalmente distinta.

## Variables independientes

- condición: A, B, C.
- pista: closed-book / open-book.
- familia de tarea.
- réplica.

## Variables controladas

- modelo y versión;
- effort/reasoning mode;
- temperatura/top-p cuando sean configurables;
- system prompt base, salvo el tratamiento definido;
- source pack;
- herramientas;
- timeout;
- límite máximo de tokens;
- formato de salida;
- fecha/ventana de ejecución tan estrecha como sea posible.

## Endpoints primarios

No se combinarán para declarar éxito:

- UCR;
- exactitud factual 0–4;
- trazabilidad 0–4;
- falsación 0–4;
- control de hipótesis 0–4.

## Endpoints secundarios

- calibración 0–4;
- detección/corrección de error 0–4;
- contradicciones internas;
- citas incorrectas;
- número de hipótesis alternativas reales;
- latencia;
- tokens;
- coste;
- índice ERS secundario normalizado.

## Criterio mínimo de éxito del harness

C se considera apoyado **en este benchmark y este dominio** sólo si:

1. C mejora sobre A en al menos 3 de 5 endpoints primarios;
2. una de esas mejoras debe ser UCR o exactitud;
3. C no empeora exactitud factual de forma material;
4. el patrón C>B aparece en al menos 3 familias de tareas, no sólo en una;
5. el intervalo bootstrap de la diferencia principal no está centrado en un efecto trivial;
6. la ventaja sobrevive al análisis excluyendo las tareas con mayor desacuerdo entre jueces.

No se generalizará fuera del Voynich sin nuevos dominios.

## Criterios de fracaso

El resultado se considerará nulo o negativo si:

- C sólo produce respuestas más largas;
- aumenta la cantidad de advertencias pero no reduce afirmaciones falsas;
- mejora trazabilidad a costa de exactitud;
- la ventaja desaparece al controlar longitud/tokens;
- B explica toda la mejora y C no aporta ganancia incremental;
- los jueces pueden inferir sistemáticamente la condición por estilo y eso domina la puntuación.

## Congelación

Cualquier cambio posterior a este archivo debe quedar en una nueva versión del benchmark y no sustituir silenciosamente el prerregistro original.
