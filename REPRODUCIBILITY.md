# Reproducibilidad — Inverse Reality Laboratory v1.2

## Arquitectura

El sitio se despliega con GitHub Pages y utiliza HTML, CSS, JavaScript, Three.js, MathJax, Markdown, JSON y LaTeX.

## Fuentes de verdad

- data/khufu.json: geometría y estados causales;
- data/hypotheses.json: hipótesis;
- data/sources.json: fuentes;
- data/topology.json: grafo topológico;
- data/monuments.json: programa comparativo;
- paper/main.tex: paper canónico;
- EPISTEMIC_STATUS.md: ledger epistemológico.

## Validación automática

El workflow ejecuta:

1. compilación LaTeX;
2. publicación del PDF;
3. comprobación sintáctica de JavaScript;
4. validación JSON;
5. validación semántica;
6. validación estructural del sitio;
7. despliegue GitHub Pages.

## Versionado

Una modificación científica debe actualizar versión, release note, estado epistemológico cuando cambie alcance y fuentes cuando incorpore datos nuevos.

## Determinismo

Los cálculos deterministas del dashboard dependen de JSON versionado.

Los futuros algoritmos Monte Carlo deberán registrar seed, número de muestras, versión, tolerancias y hardware cuando afecte resultados.

## Dependencias

Las dependencias web deben usar versiones fijadas. La preservación a largo plazo puede incorporar hashes de integridad o vendorización de dependencias críticas.
