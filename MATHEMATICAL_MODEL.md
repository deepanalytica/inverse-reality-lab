# Modelo matemático — Inverse Reality Laboratory v1.2

## Función de este documento

Este archivo ofrece una lectura compacta del modelo. La formulación completa, con homología relativa, zigzag persistence, politopos de orden, identificabilidad y diseño experimental, está en [ADVANCED_MATHEMATICS.md](ADVANCED_MATHEMATICS.md).

IRL reconstruye historias de formación mediante:

\[
\boxed{
P(H,\Theta,X_T\mid Y,\mathcal L,\mathcal C)
}
\]

donde \(H\) representa historias constructivas, \(\Theta\) parámetros, \(X_T\) el estado terminal original y \(Y\) la evidencia.

---

## 1. Geometría ideal de referencia

Para una pirámide cuadrada de lado \(a\), altura \(H\) y coordenada normalizada \(u=z/H\):

\[
A(z)=a^2(1-u)^2,
\]

\[
V=\frac{a^2H}{3}.
\]

La fracción de masa ideal situada por encima de \(u\) es:

\[
\boxed{
\Gamma_M(u)=(1-u)^3.
}
\]

La energía potencial total es:

\[
U=\frac14MgH.
\]

La fracción de potencial situada por encima de \(u\) es:

\[
\boxed{
\Gamma_G(u)
=
1-6u^2+8u^3-3u^4.
}
\]

Estas ecuaciones son baselines geométricos. La cronología histórica requiere más variables.

---

## 2. Estado físico

\[
X_t=
(G_t,M_t,V_t,C_t,L_t,D_t,A_t,Q_t).
\]

El modelo directo es:

\[
X_{t+\Delta t}=F(X_t,u_t,\eta_t).
\]

La observación presente es:

\[
Y=\mathcal O(X_{\mathrm{now}})+\varepsilon.
\]

---

## 3. Orden parcial constructivo

\[
P=(E,\prec).
\]

\(e_i\prec e_j\) significa que \(e_i\) debe ocurrir antes que \(e_j\).

Una cronología serial compatible pertenece a:

\[
\mathcal L(P).
\]

El politopo de orden es:

\[
\mathcal O(P)
=
\{
\mathbf t\in[0,1]^n:
t_i\le t_j
\text{ si }e_i\prec e_j
\}.
\]

Su volumen satisface:

\[
\operatorname{Vol}(\mathcal O(P))
=
\frac{|\mathcal L(P)|}{n!}.
\]

Esto permite medir cuánto restringen las dependencias el espacio de cronologías.

---

## 4. Materia y espacio negativo

\[
\mathcal A_\tau
=
(K_\tau^+,K_\tau^-).
\]

\(K^+\) representa materia y \(K^-\) espacio arquitectónico disponible.

La masa ausente de referencia de un volumen \(V\) es:

\[
m^\ominus(V)
=
-\int_V\rho_{\mathrm{ref}}(x)\,dV.
\]

Sirve para relacionar vacíos con observaciones de densidad.

---

## 5. Topología

Para espacio libre \(V_\tau\) y exterior \(E_\tau\):

\[
H_k(V_\tau,E_\tau)
\]

describe homología relativa.

Con distancia a materia:

\[
d_M(x,\tau)
=
\operatorname{dist}(x,M_\tau),
\]

definimos:

\[
V_{\tau,r}
=
\{
x\in V_\tau:
d_M(x,\tau)\ge r
\}.
\]

A \(\tau\) fijo esto produce una filtración en \(r\).

La evolución temporal puede requerir zigzag:

\[
H_k(V_0)
\leftrightarrow
H_k(V_1)
\leftrightarrow
\cdots
\leftrightarrow
H_k(V_n).
\]

La formulación completa está en [TOPOLOGY.md](TOPOLOGY.md).

---

## 6. Accesibilidad

Una pieza rígida se mueve en:

\[
SE(3).
\]

El espacio libre es:

\[
\mathcal C_{\mathrm{free}}
=
\{
q:
B(q)\cap M=\varnothing
\}.
\]

La colocación exige una trayectoria:

\[
\gamma:[0,1]\to\mathcal C_{\mathrm{free}}
\]

compatible además con fuerza y soporte.

---

## 7. Mecánica

Equilibrio:

\[
\nabla\cdot\sigma+\rho g=0.
\]

Contacto unilateral:

\[
g_n\ge0,\qquad
\lambda_n\ge0,\qquad
g_n\lambda_n=0.
\]

Fricción:

\[
\|\lambda_t\|
\le
\mu\lambda_n.
\]

---

## 8. Inferencia

\[
p(H,\Theta\mid Y)
\propto
p(Y\mid H,\Theta)p(H,\Theta).
\]

El posterior predictivo permite contrastar historias:

\[
p(Y_{\mathrm{new}}\mid Y)
=
\sum_H\int
p(Y_{\mathrm{new}}\mid H,\Theta)
p(H,\Theta\mid Y)\,d\Theta.
\]

---

## 9. Diseño experimental

\[
\operatorname{EIG}(d)
=
\mathbb E
\left[
D_{\mathrm{KL}}
(
p(H,\Theta\mid Y,Y_d)
\|
p(H,\Theta\mid Y)
)
\right].
\]

La medición prioritaria es:

\[
d^\star
=
\arg\max_d\operatorname{EIG}(d)
\]

sujeta a costo y viabilidad.

---

## 10. Fuerza residual

\[
F_X
=
F_{\mathrm{req}}
-
\sum_kF_{\mathrm{known},k}.
\]

Se calcula después de revisar identificabilidad, ontología temporal, mecánica, parámetros y evidencia.

---

## 11. Implementación

La versión v1.2 ya implementa:

- geometría paramétrica;
- estados causales;
- masa y presión de baseline;
- hipótesis trazables;
- grafo topológico;
- filtración por despeje sobre el grafo;
- \(\beta_0^{graph}\) y \(\beta_1^{graph}\);
- validación semántica automatizada.

La fase siguiente implementará complejos cubicales 3D, homología relativa volumétrica, persistencia/zigzag, contactos y posterior espacial.
