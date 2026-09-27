# Obligaciones de prueba y verificación — IRL v1.2

Este documento separa resultados establecidos de afirmaciones que IRL debe demostrar, verificar numéricamente o mantener como hipótesis.

## P0 — Geometría ideal

\[
V=\frac{a^2H}{3},\qquad
\Gamma_M(u)=(1-u)^3,
\]

\[
U=\frac14MgH,\qquad
\Gamma_G(u)=1-6u^2+8u^3-3u^4.
\]

Estado: derivación cerrada para el baseline ideal.

## P1 — Filtración por despeje

\[
V_{\tau,r}
=
\{x\in V_\tau:d_M(x,\tau)\ge r\}.
\]

Debe cumplirse:

\[
r_1\le r_2
\Rightarrow
V_{\tau,r_2}\subseteq V_{\tau,r_1}.
\]

Estado: consecuencia directa de la definición.

## P2 — Dimensión temporal

No se asume monotonicidad en \(\tau\).

Obligación: construir mapas de comparación mediante inclusiones, intersecciones o uniones que formen una secuencia zigzag bien definida.

## P3 — Homología relativa

\[
H_k(V_\tau,E_\tau).
\]

Obligación: definir el subespacio exterior \(E_\tau\) de manera reproducible y estudiar sensibilidad a la frontera del dominio.

## P4 — Politopo de orden

\[
\mathcal O(P)
=
\{\mathbf t\in[0,1]^n:t_i\le t_j\text{ si }e_i\prec e_j\}.
\]

El resultado:

\[
\operatorname{Vol}(\mathcal O(P))=\frac{e(P)}{n!}
\]

es matemática establecida.

Obligación IRL: justificar el poset inferido y sus relaciones tipadas.

## P5 — Compresión causal

\[
C_P=1-\frac{e(P)}{n!}.
\]

Estado: métrica descriptiva propuesta.

Obligación: evaluar sensibilidad a granularidad y evitar interpretarla como probabilidad histórica.

## P6 — Identificabilidad descriptiva

\[
I_{\mathrm{IRL}}
=
1-\frac{\mathsf H(H\mid Y)}{\log n}.
\]

Estado: resumen descriptivo.

Obligación: acompañar la métrica con la distribución posterior y calibración.

## P7 — Accesibilidad

\[
\gamma\subset
\mathcal C_{\mathrm{free}}
\cap
\mathcal C_{\mathrm{force}}
\cap
\mathcal C_{\mathrm{support}}.
\]

Obligación: especificar geometría, obstáculos, fuerza y soporte.

## P8 — Mecánica

\[
\nabla\cdot\sigma+\rho g=0.
\]

Obligación: definir materiales, fronteras y tolerancias antes de descartar una historia.

## P9 — Bayes

\[
p(H,\Theta\mid Y)
\propto
p(Y\mid H,\Theta)p(H,\Theta).
\]

Obligación: explicitar priors, likelihoods y posterior predictive checks.

## P10 — EIG

\[
\operatorname{EIG}(d).
\]

Obligación: definir diseños, observación, costo y estimador.

## P11 — Fuerza residual

\[
F_X=F_{\mathrm{req}}-\sum_kF_{\mathrm{known},k}.
\]

Obligación: demostrar estabilidad frente a ontología, granularidad, incertidumbre y mecanismos convencionales.

## Regla de publicación

Una proposición IRL pasa de propuesta a resultado cuando:

1. se define formalmente;
2. se implementa;
3. pasa tests sintéticos;
4. se evalúa sensibilidad;
5. se reproduce desde datos versionados;
6. se contrasta contra un baseline.
