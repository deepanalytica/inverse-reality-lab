# Especificación de simulación — IRL v1.2

## Pirámide ideal

\[
a=230.36\ \mathrm m,\qquad H=146.6\ \mathrm m.
\]

\[
V=\frac{a^2H}{3},\qquad M=\rho V.
\]

## Slider causal

\[
p\in[0,1]
\]

representa progreso inferencial desde el estado terminal hacia preparación del sitio. No representa una fecha histórica directa.

## Masa baseline

Para fracción de altura \(u\):

\[
M_{\le}(u)=M[1-(1-u)^3].
\]

Presión media:

\[
\bar p=\frac{M_{\le}g}{a^2}.
\]

## Espacios internos

Cada volumen contiene id, nombre, estado epistemológico, geometría, evidencia, explicación y alcance.

## Muografía

El visor muestra Big Void, North Face Corridor, detectores esquemáticos y líneas de visión. El forward model completo de transmisión queda para una fase posterior.

## Fuerzas

Las flechas actuales representan gravedad y transferencia de carga de referencia. El solver posterior calculará:

\[
\nabla\cdot\sigma+\rho g=0.
\]

## Bloques proxy

\[
m_i=\rho_iw_id_ih_i.
\]

Sirven para validar esquema de datos e interacción antes de incorporar geometría individual real.

## Grafo topológico

Una arista \(e\) permanece activa si:

\[
r\le c_e.
\]

Se calcula:

\[
\beta_0^{graph}=c,
\]

\[
\beta_1^{graph}=|E|-|V|+c.
\]

También se calcula alcanzabilidad desde el exterior.

Estas cantidades describen el grafo y permanecen separadas de la homología volumétrica.

## Validación automática

En cada deploy se ejecuta:

1. comprobación sintáctica de JavaScript;
2. validación de JSON;
3. validador semántico de datos;
4. compilación LaTeX;
5. publicación del PDF;
6. despliegue de Pages.
