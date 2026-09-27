# Esquema de datos IRL 3D/4D

## Entidad geométrica

\[
E_i=\{id,label,kind,status,geometry,evidence,explanation\}.
\]

Los estados admitidos son observed, published, derived, inferred, hypothesis, counterfactual y unknown.

Las geometrías de v1.1 incluyen box, inclinedBox, stack, point y searchVolume.

El marco local usa x este-oeste, y vertical y z norte-sur.

## Estado causal

\[
S_t=\{p,H_t,B_t,C_t,E_t\}
\]

donde p es posición normalizada del slider, H_t es fracción de altura visible, B_t describe el estado inmediatamente anterior, C_t las condiciones requeridas y E_t la evidencia.

## Hipótesis

\[
H=\{summary,evidence,deductions,predictions,discriminators\}.
\]

Cada hipótesis debe producir al menos una predicción contrastable y una observación discriminante.

## Bloque proxy

\[
B_i=\{course,position,width,depth,height,density,mass\}
\]

con:

\[
m_i=\rho_iw_id_ih_i.
\]

Los bloques proxy sirven para simulación y selección visual. Su estatus es paramétrico hasta disponer de levantamiento real bloque-a-bloque.

## Fuente

\[
R=\{id,type,title,publisher,year,url,doi,relevance\}.
\]

Las entidades del visor sólo citan identificadores presentes en el registro de fuentes.

## Próxima extensión

El esquema está preparado para mallas por bloque, tensor de tensiones, contactos, litología, cronología posterior, muografía volumétrica, radar/ERT/GPR, posterior bayesiano espacial y persistencia topológica.


## Esquema topológico v1.2

El archivo data/topology.json define:

\[
T=\{nodes,edges,formalObjects\}.
\]

Cada arista contiene un radio de despeje proxy \(c_e\). Para un valor \(r\), permanece activa si \(r\le c_e\).

El dataset distingue expresamente grafo de conectividad de complejo volumétrico. El segundo se incorporará en una versión posterior.
