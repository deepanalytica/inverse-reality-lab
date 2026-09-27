# Matemática avanzada de Inverse Reality Laboratory

## Propósito

Este documento reúne la formulación matemática de IRL en un nivel adecuado para revisión por matemática aplicada, física, ingeniería, arqueología computacional y ciencias de datos.

Cada sección distingue entre:

- **fundamento establecido**: matemática o física existente;
- **derivación IRL**: consecuencia obtenida al aplicar fundamentos establecidos al problema;
- **integración propuesta**: combinación específica del laboratorio;
- **hipótesis de investigación**: componente que requiere validación adicional.

La pregunta general es:

\[
\boxed{
P(H,\Theta,X_T\mid Y,\mathcal L,\mathcal C)
}
\]

donde:

- \(H\) es una historia constructiva;
- \(\Theta\) contiene parámetros físicos y geométricos;
- \(X_T\) es el estado terminal original;
- \(Y\) reúne observaciones presentes;
- \(\mathcal L\) representa leyes y modelos físicos;
- \(\mathcal C\) representa contexto arqueológico y restricciones externas.

---

# 1. Espacio de estados

Un estado físico se representa como:

\[
X_t=
\left(
G_t,
M_t,
V_t,
C_t,
L_t,
D_t,
A_t,
Q_t
\right),
\]

con:

- \(G_t\): geometría;
- \(M_t\): materia;
- \(V_t\): espacio negativo;
- \(C_t\): contactos;
- \(L_t\): estado de carga;
- \(D_t\): daño;
- \(A_t\): accesibilidad;
- \(Q_t\): procedencia y atributos materiales.

La evolución directa puede expresarse como:

\[
X_{t+\Delta t}
=
F(X_t,u_t,\eta_t),
\]

donde \(u_t\) son acciones de construcción y \(\eta_t\) representa perturbaciones o incertidumbre.

El operador de observación es:

\[
Y
=
\mathcal O(X_{\mathrm{now}})
+
\varepsilon.
\]

La primera inversión reconstruye el estado original terminado:

\[
P(X_T\mid Y).
\]

La segunda reconstruye historias:

\[
P(H,\Theta\mid X_T,Y,\mathcal L,\mathcal C).
\]

---

# 2. Problema inverso bayesiano

## 2.1 Posterior

Para una historia \(H\) y parámetros \(\Theta\):

\[
\boxed{
p(H,\Theta\mid Y)
=
\frac{
p(Y\mid H,\Theta)\,
p(H,\Theta)
}{
p(Y)
}.
}
\]

La evidencia marginal es:

\[
p(Y)
=
\sum_H
\int
p(Y\mid H,\Theta)
p(H,\Theta)
\,d\Theta.
\]

Esta cantidad permite comparar familias de modelos sin reducir todo a una única estimación puntual.

## 2.2 Posterior predictivo

Una hipótesis adquiere contenido empírico cuando produce observaciones futuras:

\[
p(Y_{\mathrm{new}}\mid Y)
=
\sum_H
\int
p(Y_{\mathrm{new}}\mid H,\Theta)
p(H,\Theta\mid Y)
\,d\Theta.
\]

IRL utiliza este paso para transformar una historia compatible en una hipótesis contrastable.

## 2.3 Identificabilidad

Dos historias \(H_i,H_j\) son observacionalmente indistinguibles bajo una familia de mediciones \(\mathcal M\) cuando:

\[
p(Y_{\mathcal M}\mid H_i)
\approx
p(Y_{\mathcal M}\mid H_j).
\]

La conclusión apropiada es entonces una clase de equivalencia:

\[
[H]_{\mathcal M}
=
\{
H':
p(Y_{\mathcal M}\mid H')
\approx
p(Y_{\mathcal M}\mid H)
\}.
\]

La identificabilidad es por tanto una propiedad conjunta de modelo, observaciones y resolución.

---

# 3. Historia constructiva como orden parcial

Sea:

\[
P=(E,\prec)
\]

un conjunto finito de eventos con relación de precedencia.

Si:

\[
e_i\prec e_j,
\]

el evento \(e_i\) debe preceder a \(e_j\).

Una historia serial compatible es una extensión lineal:

\[
\pi\in\mathcal L(P).
\]

El número:

\[
e(P)=|\mathcal L(P)|
\]

mide cuántos órdenes totales permanecen compatibles con las precedencias del grafo.

## 3.1 Politopo de orden

Para \(n=|E|\), asociamos a cada evento una coordenada temporal normalizada:

\[
\mathbf t=(t_1,\ldots,t_n)\in[0,1]^n.
\]

El politopo de orden de Stanley es:

\[
\boxed{
\mathcal O(P)
=
\{
\mathbf t\in[0,1]^n:
t_i\le t_j
\text{ si }
e_i\prec e_j
\}.
}
\]

Su volumen satisface:

\[
\boxed{
\operatorname{Vol}(\mathcal O(P))
=
\frac{e(P)}{n!}.
}
\]

Esto aporta a IRL una medida continua de **compresión causal**: cuánto reduce un conjunto de precedencias el espacio normalizado de cronologías.

Definimos como métrica descriptiva:

\[
\boxed{
C_P
=
1-\frac{e(P)}{n!}.
}
\]

\(C_P\) es una medida del grafo elegido, no una probabilidad histórica.

---

# 4. Complejos de materia y espacio negativo

IRL utiliza dos complejos acoplados:

\[
\mathcal A_\tau
=
\left(
K^+_\tau,
K^-_\tau
\right).
\]

\(K^+_\tau\) representa la materia y \(K^-_\tau\) el espacio arquitectónico disponible.

En una discretización voxel/cubical:

\[
K^+_\tau
=
\{
\sigma:
\rho_\tau(\sigma)\ge\rho_c
\},
\]

y:

\[
K^-_\tau
=
D\setminus K^+_\tau.
\]

La utilidad de esta separación es seguir tanto la incorporación de materia como la preservación de cámaras, corredores, huecos de obra y regiones aún no caracterizadas.

---

# 5. Homología y números de Betti

Para un complejo \(K\), la homología:

\[
H_k(K;\mathbb F)
\]

resume clases topológicas de dimensión \(k\).

En tres dimensiones:

- \(\beta_0=\operatorname{rank}H_0\): componentes conexas;
- \(\beta_1=\operatorname{rank}H_1\): ciclos o túneles;
- \(\beta_2=\operatorname{rank}H_2\): cavidades cerradas.

Los números de Betti son:

\[
\beta_k=\dim H_k(K;\mathbb F).
\]

En un grafo de conectividad, el primer número de Betti se reduce a:

\[
\boxed{
\beta_1^{\mathrm{graph}}
=
|E|-|V|+\beta_0^{\mathrm{graph}}.
}
\]

El dashboard v1.2 muestra esta cantidad únicamente como **proxy de conectividad del grafo**, separada de la homología volumétrica.

---

# 6. Homología relativa: interior frente a exterior

Un problema clave es que una cámara conectada por un corredor estrecho pertenece al mismo componente del aire exterior.

Sea \(V_\tau\) el espacio libre y \(E_\tau\subset V_\tau\) la región exterior accesible.

La homología relativa:

\[
\boxed{
H_k(V_\tau,E_\tau)
}
\]

permite estudiar estructura interna respecto del exterior.

Esta construcción es especialmente útil para distinguir:

- espacio exterior;
- pasajes;
- recintos interiores;
- cavidades que se vuelven independientes bajo una escala geométrica.

---

# 7. Filtración por despeje

Definimos la distancia a materia:

\[
d_M(x,\tau)
=
\operatorname{dist}(x,K^+_\tau).
\]

Para un radio \(r\ge0\):

\[
\boxed{
V_{\tau,r}
=
\{
x\in K^-_\tau:
d_M(x,\tau)\ge r
\}.
}
\]

Interpretación: \(V_{\tau,r}\) contiene puntos por los que cabe una esfera de radio \(r\) sin intersectar materia.

A \(\tau\) fijo:

\[
r_1\le r_2
\quad\Rightarrow\quad
V_{\tau,r_2}
\subseteq
V_{\tau,r_1}.
\]

Esto produce una filtración válida en \(r\).

Permite estudiar cuándo un corredor estrecho deja de conectar dos recintos mientras una cámara grande continúa persistiendo.

---

# 8. Persistencia topológica

Aplicando homología a la filtración:

\[
H_k(V_{\tau,r_1})
\rightarrow
H_k(V_{\tau,r_2})
\rightarrow
\cdots
\]

se obtienen intervalos de persistencia.

Una característica con intervalo:

\[
[b_i,d_i)
\]

aparece en \(b_i\) y desaparece en \(d_i\).

IRL utiliza esta idea para distinguir rasgos robustos de detalles dependientes de una escala concreta.

Para funciones tame \(f,g\), la estabilidad clásica de diagramas de persistencia proporciona, bajo sus hipótesis:

\[
d_B(D(f),D(g))
\le
\|f-g\|_\infty.
\]

Esto es relevante porque un método destinado a trabajar con escáneres y reconstrucciones geométricas debe controlar sensibilidad al ruido.

---

# 9. Corrección importante: tiempo inverso y zigzag persistence

Una familia temporal sólo constituye una bifiltración ordinaria si existe monotonicidad de inclusiones en ambos parámetros.

Durante una reconstrucción constructiva, un espacio puede:

- abrirse;
- cerrarse;
- conectarse;
- separarse;
- fusionarse con el exterior.

Por tanto, en general:

\[
V_{\tau_i,r}
\nsubseteq
V_{\tau_{i+1},r}
\]

y tampoco necesariamente ocurre la inclusión contraria.

La herramienta matemática apropiada es una sucesión zigzag:

\[
\boxed{
V_{0,r}
\leftrightarrow
V_{1,r}
\leftrightarrow
\cdots
\leftrightarrow
V_{n,r}
}
\]

que induce:

\[
H_k(V_{0,r})
\leftrightarrow
H_k(V_{1,r})
\leftrightarrow
\cdots
\leftrightarrow
H_k(V_{n,r}).
\]

Esta corrección eleva el formalismo IRL: la expresión \((\tau,r)\mapsto V_{\tau,r}\) debe llamarse **familia de dos parámetros** en general, y **bifiltración** sólo cuando las inclusiones requeridas están demostradas.

---

# 10. Persistencia multiparámetro

Cuando existen dos parámetros monótonos, por ejemplo:

- radio de despeje \(r\);
- umbral de densidad \(\rho_c\);

podemos definir:

\[
\mathcal V_{r,\rho_c}
=
\{
x:
d_M(x)\ge r,
\ \rho(x)<\rho_c
\}.
\]

Entonces:

\[
(r,\rho_c)
\mapsto
H_k(\mathcal V_{r,\rho_c})
\]

forma un módulo de persistencia multiparámetro bajo la orientación de inclusiones apropiada.

En este régimen, un barcode unidimensional deja de ser un invariante completo; se requieren invariantes o aproximaciones adecuados a persistencia multiparámetro.

---

# 11. Grafos de Reeb y teoría de Morse

Para una función escalar:

\[
f:X\rightarrow\mathbb R,
\]

el grafo de Reeb identifica puntos que pertenecen a la misma componente conexa de un conjunto de nivel:

\[
f^{-1}(c).
\]

En IRL pueden estudiarse funciones como:

- altura;
- distancia al exterior;
- despeje;
- densidad;
- probabilidad posterior de vacío.

Un cambio topológico suele asociarse a valores críticos. En un modelo suave:

\[
\nabla f(x^\star)=0.
\]

En una formulación implícita:

\[
\Phi(x;\lambda)=0,
\qquad
\nabla_x\Phi(x;\lambda)=0
\]

marca un candidato a transición crítica.

Los grafos de Reeb sirven como compresión de la estructura topológica del espacio 3D.

---

# 12. Espacio de configuraciones y accesibilidad

Para una pieza rígida:

\[
q=(R,p)\in SE(3),
\]

donde \(R\in SO(3)\) es orientación y \(p\in\mathbb R^3\) posición.

Sea \(B(q)\) el volumen ocupado por la pieza transformada.

El espacio libre es:

\[
\boxed{
\mathcal C_{\mathrm{free}}(t)
=
\{
q\in SE(3):
B(q)\cap M(t)=\varnothing
\}.
}
\]

Una colocación requiere una curva:

\[
\gamma:[0,1]\rightarrow\mathcal C_{\mathrm{free}}(t)
\]

con:

\[
\gamma(0)=q_{\mathrm{source}},
\qquad
\gamma(1)=q_{\mathrm{target}}.
\]

IRL añade restricciones de fuerza y soporte:

\[
\gamma(s)\in
\mathcal C_{\mathrm{free}}
\cap
\mathcal C_{\mathrm{force}}
\cap
\mathcal C_{\mathrm{support}}.
\]

Así, accesibilidad deja de significar únicamente “existe un hueco geométrico”.

---

# 13. Mecánica cuasiestática y contacto

En el volumen material:

\[
\nabla\cdot\sigma+\rho g=0.
\]

Para contacto unilateral:

\[
g_n\ge0,
\qquad
\lambda_n\ge0,
\qquad
g_n\lambda_n=0.
\]

Fricción de Coulomb:

\[
\|\lambda_t\|
\le
\mu\lambda_n.
\]

Un estado intermedio es mecánicamente admisible cuando existe un campo de tensiones/contactos que satisface equilibrio y restricciones materiales con los parámetros considerados.

Definimos:

\[
\mathcal F_{\mathrm{mech}}(X)
=
\begin{cases}
1,& \exists\,(\sigma,\lambda)\text{ admisibles},\\
0,& \text{en otro caso}.
\end{cases}
\]

Esta función actúa como gate de historias.

---

# 14. Frente inverso admisible

Sea \(\operatorname{Max}(P_\tau)\) el conjunto de eventos máximos del poset todavía presente.

El frente:

\[
\boxed{
\mathcal A^-(X_\tau)
=
\{
e\in\operatorname{Max}(P_\tau):
G_eS_eA_eM_eE_e=1
\}
}
\]

integra:

- \(G_e\): geometría;
- \(S_e\): estabilidad;
- \(A_e\): accesibilidad;
- \(M_e\): compatibilidad material/mecánica;
- \(E_e\): compatibilidad con evidencia.

El siguiente estado es una distribución:

\[
P(X_{\tau+\Delta\tau}\mid X_\tau,Y),
\]

no una única transición determinista.

---

# 15. Medida de reducción del espacio de historias

Sea:

\[
\mathcal H_0
\]

el conjunto inicial de historias y:

\[
\mathcal H_j
=
\{
H\in\mathcal H_{j-1}:g_j(H)=1
\}
\]

el conjunto superviviente después del gate \(j\).

Definimos reducción:

\[
R_j
=
1-
\frac{
\mu(\mathcal H_j)
}{
\mu(\mathcal H_{j-1})
}.
\]

La medida \(\mu\) puede ser:

- conteo discreto;
- volumen del politopo de orden;
- masa probabilística posterior;
- medida Monte Carlo.

La pregunta experimental central de IRL puede expresarse como:

\[
\boxed{
\text{¿cuánto reduce cada modalidad el espacio de historias?}
}
\]

---

# 16. Entropía e identificabilidad

Para un conjunto discreto de historias:

\[
\mathcal H=\{H_1,\ldots,H_n\},
\]

la entropía posterior es:

\[
\mathsf H(H\mid Y)
=
-\sum_i
p_i\log p_i.
\]

Como resumen descriptivo normalizado:

\[
I_{\mathrm{IRL}}
=
1-
\frac{
\mathsf H(H\mid Y)
}{
\log n
}.
\]

Interpretación:

- cercano a 0: muchas historias mantienen peso comparable;
- cercano a 1: el posterior está muy concentrado.

\(I_{\mathrm{IRL}}\) es una métrica propuesta de comunicación y debe acompañarse de la distribución completa.

---

# 17. Diseño experimental y Expected Information Gain

Para una medición candidata \(d\):

\[
\boxed{
\operatorname{EIG}(d)
=
\mathbb E_{Y_d}
\left[
D_{\mathrm{KL}}
\left(
p(H,\Theta\mid Y,Y_d,d)
\|
p(H,\Theta\mid Y)
\right)
\right].
}
\]

El diseño siguiente se selecciona mediante:

\[
d^\star
=
\arg\max_d
\operatorname{EIG}(d)
\]

sujeto a costo, seguridad y viabilidad.

En Khufu puede utilizarse para comparar:

- nuevas posiciones muográficas;
- escaneo geométrico;
- muestreo litológico;
- geofísica subsuperficial;
- inspecciones de juntas o fracturas.

---

# 18. Fuerza residual y jerarquía de explicación

La fuerza residual:

\[
F_X
=
F_{\mathrm{req}}
-
\sum_kF_{\mathrm{known},k}
\]

es una cantidad dependiente del modelo.

El protocolo formal es:

\[
\boxed{
\text{Identificabilidad}
\rightarrow
\text{ontología}
\rightarrow
\text{mecánica}
\rightarrow
\text{procesos temporales}
\rightarrow
\text{incertidumbre}
\rightarrow
F_X.
}
\]

Un residual adquiere interés físico cuando permanece estable frente a perturbaciones razonables de:

\[
\Theta,
\quad
\mathcal T,
\quad
Y,
\quad
\text{granularidad}.
\]

---

# 19. Sensibilidad y robustez

Para una salida \(q=f(\theta)\), sensibilidad local:

\[
S_i
=
\frac{\partial q}{\partial\theta_i}.
\]

En régimen probabilístico:

\[
\operatorname{Var}(q\mid Y)
\]

debe propagarse desde incertidumbres geométricas, materiales y observacionales.

Para una conclusión categórica \(C\), IRL debe informar:

\[
P(C\mid Y)
\]

o al menos su estabilidad bajo un conjunto documentado de escenarios.

---

# 20. Jerarquía matemática de implementación

La arquitectura completa queda separada en cinco capas:

### Nivel A — geometría

\[
G,\rho,V,d_M.
\]

### Nivel B — topología

\[
K^\pm,H_k,\beta_k,\text{Reeb},\text{persistence}.
\]

### Nivel C — causalidad constructiva

\[
P=(E,\prec),\mathcal O(P),\mathcal L(P).
\]

### Nivel D — física

\[
\sigma,\lambda,\gamma\subset SE(3),W,U.
\]

### Nivel E — inferencia

\[
p(H,\Theta\mid Y),\mathsf H,\operatorname{EIG}.
\]

Una afirmación de alto nivel debe ser trazable hasta cantidades de las capas inferiores.

---

# 21. Qué calcula hoy el dashboard y qué queda por implementar

## Implementado

- geometría paramétrica;
- estados causales discretos;
- masa y presión de baseline;
- grafo de conectividad;
- filtración por despeje sobre el grafo;
- \(\beta_0^{\mathrm{graph}}\) y \(\beta_1^{\mathrm{graph}}\);
- hipótesis y evidencia;
- procedencia;
- bloques proxy.

## Próxima implementación numérica

- complejos cubicales 3D;
- homología relativa volumétrica;
- zigzag persistence entre estados;
- diagramas de persistencia;
- tensor de tensiones;
- contactos;
- planificación \(SE(3)\);
- posterior espacial de vacíos;
- EIG para sensores.

---

# 22. Criterio de rigor

IRL considera completa una afirmación cuantitativa cuando incluye:

\[
\boxed{
\text{definición}
+
\text{dato}
+
\text{operador}
+
\text{incertidumbre}
+
\text{fuente}
+
\text{prueba de sensibilidad}
+
\text{predicción}
}
\]

Este criterio está incorporado en el protocolo de revisión v1.2.
