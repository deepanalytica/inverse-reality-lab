# IRL v1.2 — Formalización topológica y auditoría científica

Fecha: 26 de septiembre de 2026.

## Cambios principales

- matemática avanzada consolidada en español;
- homología relativa respecto del exterior;
- filtración por despeje;
- corrección formal de la dimensión temporal mediante zigzag persistence;
- persistencia multiparámetro como extensión para geometría + densidad;
- grafos de Reeb y transiciones críticas;
- politopo de orden para cronologías parciales;
- métrica descriptiva de compresión causal;
- diseño experimental mediante Expected Information Gain;
- grafo topológico interactivo en el dashboard;
- validación semántica automatizada de datasets;
- datos de pasajes internos ampliados;
- registro de fuentes matemáticas;
- paper actualizado a Preprint v1.2.

## Corrección matemática relevante

La familia:

\[
(\tau,r)\mapsto V_{\tau,r}
\]

sólo se denomina bifiltración cuando existe monotonicidad adecuada en ambos parámetros.

La reconstrucción constructiva puede abrir y cerrar conexiones. Por ello, la dimensión temporal se representa mediante:

\[
H_k(V_0)
\leftrightarrow
H_k(V_1)
\leftrightarrow
\cdots
\leftrightarrow
H_k(V_n).
\]

## Validación de producción

GitHub Actions verifica:

- sintaxis JavaScript;
- JSON;
- integridad semántica;
- referencias de evidencia;
- hipótesis con predicciones y discriminadores;
- orden de estados causales;
- integridad del grafo topológico;
- compilación LaTeX;
- despliegue Pages.

## Siguiente gate

La siguiente versión científica debe incorporar un complejo cubical 3D y ejecutar homología relativa/persistente sobre geometría volumétrica, seguido de benchmark sintético con ground truth topológico.
