# Condiciones experimentales

La pregunta de usuario y el source pack son idénticos. Sólo cambia el prefacio experimental.

## A — Baseline genérico

**Tratamiento**

> Analiza el material proporcionado y responde la pregunta. Distingue con claridad lo que puedas sostener con la evidencia disponible. No uses fuentes externas salvo que la corrida esté marcada como open-book.

No se entrega memoria del proyecto ni vocabulario IRL.

## B — Contexto acumulado

A recibe además un bloque de contexto congelado construido exclusivamente desde el training/context set:

> Estás continuando un programa de investigación sobre el Manuscrito Voynich. El proyecto ha trabajado con transcripción EVA/ZL, posición de tokens, gallows, variantes Currier, manos, estructura de párrafos, etiquetas y familias léxicas. Se han observado regularidades locales y se evita convertir correlaciones en traducciones semánticas sin anclas independientes. Usa estos antecedentes sólo como contexto metodológico e histórico; la tarea actual pertenece a un holdout y debe resolverse con el source pack entregado.

El contexto completo usado en cada versión debe guardarse y hashearse.

## C — Contexto + harness protocolizado

C recibe exactamente B y además:

> Aplica el siguiente ciclo antes de responder:
>
> **1. OBSERVE** — enumera sólo observaciones directamente sostenidas por el source pack.  
> **2. REASON** — separa derivaciones de observaciones; no introduzcas semántica no anclada.  
> **3. PROPOSE** — formula al menos dos hipótesis competidoras cuando exista ambigüedad real.  
> **4. FALSIFY** — para cada hipótesis relevante indica qué evidencia del holdout la debilita o qué predicción la haría fallar.  
> **5. VERIFY** — revisa cada afirmación central contra el material disponible y marca incertidumbre.  
> **6. DECISION ROOM** — clasifica las conclusiones como OBSERVADO, DERIVADO, HIPÓTESIS o RECHAZADO.  
> **7. ANSWER** — entrega una respuesta concisa, trazable y proporcional a la evidencia.
>
> No presentes este ciclo como un runtime externo ejecutándose dentro del modelo. Es un protocolo experimental inspirado en PRAXIOS, Meta-Harness y Decision Room.

## Formato común obligatorio

Todas las condiciones deben terminar con:

```text
Conclusiones principales:
- ...

Nivel de confianza:
- claim_1: 0–100
- claim_2: 0–100

Qué podría falsar la conclusión:
- ...
```

El formato común evita que C gane simplemente porque se le pide producir una estructura más fácil de evaluar.
