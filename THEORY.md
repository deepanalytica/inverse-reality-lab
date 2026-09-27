# Teoría completa — Inverse Reality Laboratory v1.2

## Idea central

Inverse Reality Laboratory reconstruye procesos de formación a partir de objetos terminados.

\[
P(H,\Theta,X_T\mid Y,\mathcal L,\mathcal C)
\]

resume el problema: inferir historias \(H\), parámetros \(\Theta\) y estado terminal original \(X_T\) a partir de observaciones \(Y\), leyes/modelos \(\mathcal L\) y contexto \(\mathcal C\).

El laboratorio principal es la Gran Pirámide de Khufu. Cinco estructuras modernas documentadas funcionan como controles retrospectivos.

## Dos inversiones

Primero se reconstruye el estado original terminado:

\[
Y_{\mathrm{now}}\rightarrow P(X_T\mid Y_{\mathrm{now}}).
\]

Luego se reconstruyen historias:

\[
X_T\rightarrow P(H,\Theta\mid X_T,Y).
\]

## Cronología como orden parcial

\[
P=(E,\prec).
\]

Una historia serial compatible es una extensión lineal. La versión v1.2 añade el politopo:

\[
\mathcal O(P)=\{\mathbf t\in[0,1]^n:t_i\le t_j\text{ si }e_i\prec e_j\}.
\]

## Materia y espacio negativo

\[
\mathcal A_\tau=(K_\tau^+,K_\tau^-).
\]

\(K^+\) representa materia y \(K^-\) cámaras, corredores, galerías, shafts y otros espacios.

## Topología

Para espacio libre \(V_\tau\) y exterior \(E_\tau\):

\[
H_k(V_\tau,E_\tau)
\]

describe homología relativa.

Con:

\[
d_M(x,\tau)=\operatorname{dist}(x,M_\tau),
\]

se define:

\[
V_{\tau,r}=\{x\in V_\tau:d_M(x,\tau)\ge r\}.
\]

A \(\tau\) fijo, \(r\) induce una filtración. Cuando la evolución constructiva abre y cierra conexiones, se usa:

\[
H_k(V_0)\leftrightarrow H_k(V_1)\leftrightarrow\cdots\leftrightarrow H_k(V_n).
\]

## Accesibilidad

Una pieza rígida se mueve en:

\[
SE(3).
\]

\[
\mathcal C_{\mathrm{free}}=\{q:B(q)\cap M=\varnothing\}.
\]

Una colocación requiere una trayectoria continua compatible con geometría, fuerza y soporte.

## Mecánica

\[
\nabla\cdot\sigma+\rho g=0.
\]

Contacto:

\[
g_n\ge0,\quad \lambda_n\ge0,\quad g_n\lambda_n=0.
\]

Fricción:

\[
\|\lambda_t\|\le\mu\lambda_n.
\]

## Ontología temporal

Infraestructura temporal desaparecida se representa mediante \(\mathcal T\): rampas, andamios, pasarelas, moldes y soportes.

## Inferencia

\[
p(H,\Theta\mid Y)\propto p(Y\mid H,\Theta)p(H,\Theta).
\]

El sistema conserva alternativas observacionalmente equivalentes.

## Predicción

\[
H\rightarrow\widehat Y_H.
\]

Cada hipótesis debe producir observaciones contrastables.

## Diseño experimental

\[
d^\star=\arg\max_d\operatorname{EIG}(d).
\]

IRL puede proponer qué medición reduciría más incertidumbre.

## Residual

\[
F_X=F_{\mathrm{req}}-\sum_kF_{\mathrm{known},k}.
\]

Se evalúa después de revisar identificabilidad, ontología temporal, mecánica e incertidumbre.

## Dashboard 3D/4D

\[
4D=3D+\text{estado causal/inferencial}.
\]

La interfaz muestra qué existe, qué evidencia lo respalda, qué condiciones preceden a cada estado, qué hipótesis permanecen y qué observaciones las discriminarían.

## Estado v1.2

Implementado: paper, matemática avanzada, topología formal, dashboard, grafo topológico, filtración de despeje del grafo, hipótesis trazables, cinco benchmarks, estudio adversarial y validación semántica automática.

Siguiente etapa: complejos cubicales 3D, homología relativa volumétrica, persistencia, zigzag, contactos y posterior espacial.
