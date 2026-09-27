# Registro de fuentes del modelo Khufu

Este documento resume las fuentes que alimentan el dashboard 3D/4D. El registro operativo se encuentra también en data/sources.json.

| ID | Fuente | Función dentro del modelo |
|---|---|---|
| S1 | [Nature 2017](https://www.nature.com/articles/nature24647) | Big Void; longitud mínima publicada de 30 m; tres tecnologías de muones. |
| S2 | [Nature Communications 2023](https://www.nature.com/articles/s41467-023-36351-0) | North Face Corridor; aproximadamente 9 m de longitud y sección cercana a 2 × 2 m. |
| S3 | [Digital Giza / Harvard](https://giza.fas.harvard.edu/giza3d/) | Giza 3D y tour/modelo de Khufu. |
| S4 | [Digital Giza / Harvard](https://giza.fas.harvard.edu/mapsandplans/53527/full/) | Secciones de Khufu y cinco cámaras superiores. |
| S5 | [Digital Giza / Harvard](https://giza.fas.harvard.edu/mapsandplans/53525/full/) | Planta y sección de la Cámara del Rey. |
| S6 | [AERA](https://aeraweb.org/great-pyramid-quarry/) | Cantera de Khufu, extracción y comparación de volúmenes. |
| S7 | [AERA](https://aeraweb.org/wp-content/uploads/2022/08/aeragram13_2.pdf) | Mediciones históricas y modernas de la base. |
| S8 | [Petrie / Digital Giza](https://giza.fas.harvard.edu/pubdocs/551/full/) | Survey histórico y documentación de Giza. |
| S9 | [Scientific Reports 2026](https://www.nature.com/articles/s41598-026-48805-8) | Caracterización material no destructiva de superficies interiores. |

## Política de procedencia

Cada entidad del visor referencia uno o más identificadores de este registro.

La geometría de visualización se clasifica como:

- publicada, cuando procede de una fuente geométrica identificable;
- paramétrica, cuando IRL genera una representación de trabajo;
- inferida, cuando deriva de restricciones del modelo;
- hipótesis, cuando representa una alternativa pendiente de discriminación.

## Digital Giza

Digital Giza constituye la referencia institucional 3D principal del proyecto para el plateau y Khufu. IRL mantiene una geometría paramétrica propia para poder asociar cada volumen con evidencia, estados causales y cálculos reproducibles.

## Muografía

El Big Void y el North Face Corridor se muestran como volúmenes de evidencia instrumental. La existencia de ambos cuenta con publicaciones revisadas por pares. El volumen exacto del Big Void continúa abierto; la visualización representa una envolvente de trabajo basada en la longitud mínima publicada.

## Bloques

El dashboard utiliza bloques proxy para demostrar el esquema bloque-a-bloque y calcular masa estimada. Un inventario geométrico completo de cada bloque real se incorporará cuando exista un dataset de levantamiento adecuado y reutilizable.
