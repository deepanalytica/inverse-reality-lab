# Decision Gate — IRL-ADV-002

## Estados

### RED — no evidencia de mejora

Se activa si:

- C no reduce errores ni mejora exactitud;
- C sólo aumenta longitud/complejidad;
- C empeora precisión materialmente;
- C no supera B de forma consistente.

Conclusión permitida: **el benchmark no demuestra valor incremental del harness**.

### AMBER — señal parcial

Se activa si:

- C mejora trazabilidad/falsación pero no exactitud/UCR;
- el efecto depende de una sola familia;
- intervalos son amplios;
- la ventaja desaparece al controlar longitud.

Conclusión permitida: **hay señal de disciplina metodológica, aún no de mejora robusta de fiabilidad**.

### GREEN — apoyo dentro del dominio

Requiere simultáneamente:

- mejora C vs A en ≥3/5 métricas primarias;
- al menos UCR o exactitud entre las mejoras;
- no inferioridad factual;
- C>B en ≥3 familias;
- patrón robusto a sensibilidad;
- coste/latencia reportados;
- ausencia de fuga evidente.

Conclusión permitida:

> En IRL-ADV-002, para este modelo, configuración y tareas Voynich, el contexto más el harness protocolizado mejoró métricas específicas de fiabilidad epistémica frente al baseline.

### BLUE — generalización

**No puede alcanzarse con este experimento.**

Exige replicaciones en otros dominios, otros modelos y, por separado, ejecución instrumentada del runtime real cuando corresponda.

## Autoridad final

Decision Room no convierte una métrica en una verdad ontológica. Su función es limitar qué afirmaciones quedan autorizadas por la evidencia disponible.
