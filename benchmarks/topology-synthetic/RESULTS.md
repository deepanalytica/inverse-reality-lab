# IRL Topology Synthetic Benchmark v1.2

## Objetivo

Validar la estrategia de topología cubical antes de aplicarla a geometría arqueológica.

El benchmark utiliza Python estándar y objetos voxelizados con tipo de homotopía conocido.

## Método

Para un conjunto de voxels \(K\):

1. \(\beta_0\) se calcula mediante componentes 6-conectadas;
2. la característica de Euler se calcula como

\[
\chi=N_0-N_1+N_2-N_3;
\]

3. \(\beta_2\) se obtiene contando componentes acotadas del complemento;
4. se recupera

\[
\beta_1=\beta_0+\beta_2-\chi.
\]

## Casos y resultado esperado

| Caso | Tipo | \((\beta_0,\beta_1,\beta_2)\) |
|---|---|---|
| bloque sólido | bola | \((1,0,0)\) |
| dos bloques | dos componentes | \((2,0,0)\) |
| shell hueca | esfera | \((1,0,1)\) |
| toro sólido | ciclo | \((1,1,0)\) |

La implementación de referencia produce PASS en los cuatro casos.

El script queda versionado para ejecución reproducible junto con el resto de controles del repositorio.

## Alcance

El benchmark valida el cálculo sobre geometrías sintéticas conocidas.

La aplicación a Khufu requiere voxelización documentada, elección consistente de conectividad, tratamiento del exterior, análisis de resolución, propagación de incertidumbre y comparación con software TDA de referencia.
