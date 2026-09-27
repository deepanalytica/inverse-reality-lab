# IRL Mineral Systems Benchmark — Chuquicamata, Escondida y El Teniente

## Objetivo

Este benchmark prueba si la arquitectura inversa de IRL puede reconstruir relaciones causales conocidas en tres sistemas porfídicos chilenos bien documentados.

Los tres casos se usan como **controles retrospectivos de calibración**. No constituyen todavía una validación ciega independiente porque los depósitos y su literatura son conocidos durante la curación del dataset.

## Dos experimentos por depósito

### 1. Reconstruction

El motor recibe observaciones estandarizadas de litología, estructuras, alteración, brechas, magnetismo y sobreimpresión supergénica. No recibe el grafo causal usado como ground truth.

### 2. Exploration proxy

Se eliminan observaciones que entregan información demasiado directa sobre mineralización o cronología mineral, incluyendo vetas de mena específicas, blanket de calcosina y algunos indicadores tardíos.

El propósito es medir cuánto del grafo causal sobrevive cuando el input se parece más a una etapa de exploración.

## Métrica

Para aristas causales:

\[
P=\frac{|E_p\cap E_t|}{|E_p|},
\qquad
R=\frac{|E_p\cap E_t|}{|E_t|},
\qquad
F_1=\frac{2PR}{P+R}.
\]

El benchmark guarda el ground truth dentro del dataset, pero `inferMineralSystem()` recibe solamente `observation_set`. Un test automático modifica el ground truth y confirma que la inferencia no cambia.

## Resultado preliminar v0.1

| Control | Reconstruction P | Reconstruction R | Reconstruction F1 | Exploration-proxy P | Exploration-proxy R | Exploration-proxy F1 |
|---|---:|---:|---:|---:|---:|---:|
| Chuquicamata | 1.000 | 0.769 | 0.870 | 1.000 | 0.385 | 0.556 |
| Escondida | 1.000 | 0.769 | 0.870 | 1.000 | 0.462 | 0.632 |
| El Teniente | 1.000 | 0.714 | 0.833 | 1.000 | 0.357 | 0.526 |
| **Media** | **1.000** | **0.751** | **0.858** | **1.000** | **0.401** | **0.571** |

Los valores son un **regression benchmark de causalidad**, no una medida de capacidad predictiva sobre depósitos desconocidos.

## Lectura de los tres controles

### Chuquicamata

IRL recupera una arquitectura dominada por control estructural del sistema de Falla Oeste, emplazamiento de intrusivos, alteración potásica temprana, brechamiento/fracturamiento como foco de sulfuros, sobreimpresión sericítica, etapa tardía de mayor sulfuración, enriquecimiento supergénico y deformación post-mineral.

El control es particularmente útil porque el yacimiento conserva una historia de deformación que destruye la simplificación `profundidad = tiempo` y obliga a trabajar con un orden parcial de eventos.

### Escondida

IRL recupera la localización estructural en el sistema de fallas de Domeyko, emplazamiento en un contexto dilatacional, alteración potásica temprana, sobreimpresiones clorita-sericita y cuarzo-sericita, etapa argílica avanzada/de alta sulfuración, control de brechas, enriquecimiento supergénico y señal magnética modificada por alteración.

El modo exploration-proxy retiene parte importante de la arquitectura intrusiva-hidrotermal pero pierde información sobre enriquecimiento y focos de mena cuando se retiran observaciones directas.

### El Teniente

IRL recupera la relación entre intrusiones félsicas, stockwork cuarzo-anhidrita, alteración potásica, etapa hidrotermal principal, geometría radial/concentrica relacionada con estrés local, formación de la Brecha Braden, fallamiento tardío y modificación del registro magnético.

Es el caso que más exige incorporar geometría 3D y dinámica de esfuerzos; un grafo causal sin geometría sería insuficiente.

## Qué demuestra y qué falta

El resultado muestra que el formalismo puede representar y recuperar relaciones causales conocidas de sistemas minerales complejos.

Para convertirlo en un **benchmark de exploración predictiva**, el siguiente nivel requiere datos espaciales crudos y un protocolo ciego:

1. congelar reglas e hiperparámetros;
2. enmascarar identidad del depósito y geometría de mena;
3. usar grids magnéticos/gravimétricos, geología, estructuras, alteración espectral, geoquímica y topografía;
4. producir un campo 3D de probabilidad antes de revelar sondajes/orebody;
5. medir distancia al cuerpo, intersección volumétrica, calibración probabilística y ganancia de información.

## Archivos

- `data/mineral_benchmarks.json`: observaciones y ground truth segregados;
- `scripts/mineral_inverse_benchmark.mjs`: motor determinista;
- `data/mineral_benchmark_results.json`: resultado generado en CI;
- `runtime/tests/mineral-benchmark.test.mjs`: tests contra leakage y regresión.

## Fuentes base

- Berger et al. (2008), USGS, *Preliminary Model of Porphyry Copper Deposits*.
- Ossandón et al. (2001), *Geology of the Chuquicamata Mine: A Progress Report*.
- Padilla-Garza et al. (2001), *Geology of the Escondida Porphyry Copper Deposit*.
- Minera Escondida Technical Report Summary (2022).
- Cannell et al. (2005), *Geology, Mineralization, Alteration, and Structural Evolution of the El Teniente Porphyry Cu-Mo Deposit*.
- Astudillo et al., trabajos de mineralogía magnética y paleomagnetismo en Chuquicamata y El Teniente.
