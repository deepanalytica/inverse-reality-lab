# Topología de espacios constructivos y negativos

## 1. Pregunta

Una estructura terminada contiene información tanto en su materia como en los espacios que la materia deja libres.

En Khufu, cámaras, corredores, pozos, galerías y anomalías de densidad forman un sistema espacial cuya conectividad cambia según:

- escala geométrica;
- estado constructivo;
- accesibilidad;
- cierres;
- umbral de densidad.

IRL estudia ese sistema mediante topología algebraica y computacional.

---

# 2. Espacio topológico de materia

Sea \(D\subset\mathbb R^3\) el dominio de estudio.

El dominio material es:

\[
M_\tau\subset D.
\]

La estructura material discretizada puede representarse como complejo cubical o simplicial:

\[
K_\tau^+.
\]

---

# 3. Espacio topológico negativo

Definimos:

\[
V_\tau
=
D\setminus M_\tau.
\]

Su discretización es:

\[
K_\tau^-.
\]

El espacio negativo contiene:

- exterior;
- cámaras;
- corredores;
- shafts;
- vacíos de construcción;
- anomalías aún no interpretadas.

El objetivo es conservar identidad arquitectónica además de conectividad geométrica.

---

# 4. Exterior como subespacio distinguido

Sea:

\[
E_\tau\subset V_\tau
\]

la región exterior.

La pareja:

\[
(V_\tau,E_\tau)
\]

permite utilizar homología relativa:

\[
H_k(V_\tau,E_\tau).
\]

Esto evita tratar el exterior y un recinto interior como entidades equivalentes sólo porque un corredor los conecta.

---

# 5. Filtración morfológica por despeje

Sea:

\[
d_M(x,\tau)
=
\inf_{y\in M_\tau}\|x-y\|.
\]

Definimos:

\[
V_{\tau,r}
=
\{
x\in V_\tau:
d_M(x,\tau)\ge r
\}.
\]

Cuando \(r\) aumenta, desaparecen primero conexiones estrechas.

Esto permite que una cámara grande mantenga identidad topológica aunque un corredor pequeño deje de pertenecer al espacio accesible para esa escala.

---

# 6. Betti numbers

Para cada \(V_{\tau,r}\):

\[
\beta_k(\tau,r)
=
\dim H_k(V_{\tau,r}).
\]

Interpretación en 3D:

\[
\beta_0:
\text{componentes},
\]

\[
\beta_1:
\text{túneles/ciclos},
\]

\[
\beta_2:
\text{cavidades}.
\]

La interpretación debe considerar exterior y fronteras del dominio.

---

# 7. Persistencia

Una característica topológica tiene persistencia:

\[
\operatorname{pers}(i)
=
d_i-b_i.
\]

Rasgos de gran persistencia sobreviven a un rango amplio de escalas.

La utilidad para arqueología computacional es separar:

- espacios grandes y estructuralmente definidos;
- conexiones estrechas;
- ruido de escaneo;
- cambios de discretización.

---

# 8. Estabilidad

Para funciones adecuadas \(f,g\), la estabilidad de persistencia establece:

\[
d_B(D(f),D(g))
\le
\|f-g\|_\infty.
\]

Por tanto, pequeñas perturbaciones geométricas producen cambios controlados en el diagrama bajo las hipótesis del teorema.

Esta propiedad hace atractiva la persistencia para nubes de puntos, mallas y volúmenes con error instrumental.

---

# 9. Zigzag persistence para construcción

Una obra puede añadir y retirar accesos temporales. Una reconstrucción inversa puede abrir o fusionar espacios.

La secuencia correcta puede tener flechas en ambos sentidos:

\[
V_0
\hookrightarrow
V_{01}
\hookleftarrow
V_1
\hookrightarrow
V_{12}
\hookleftarrow
V_2.
\]

Aplicando homología:

\[
H_k(V_0)
\rightarrow
H_k(V_{01})
\leftarrow
H_k(V_1)
\rightarrow
H_k(V_{12})
\leftarrow
H_k(V_2).
\]

Esto permite seguir identidad de rasgos aunque la familia no sea una filtración monótona.

---

# 10. Persistencia multiparámetro

Un segundo escenario utiliza dos umbrales monotónicos, por ejemplo:

\[
(r,\rho_c).
\]

Entonces:

\[
V_{r,\rho_c}
=
\{
x:
d_M(x)\ge r,
\rho(x)\le\rho_c
\}.
\]

La topología se convierte en una función de dos parámetros:

\[
(r,\rho_c)
\mapsto
H_k(V_{r,\rho_c}).
\]

Este modelo es pertinente cuando se combinan geometría y densidad muográfica.

---

# 11. Grafo de Reeb

Sea:

\[
f:V\rightarrow\mathbb R.
\]

El grafo de Reeb colapsa cada componente conexa de cada conjunto de nivel \(f^{-1}(c)\) a un punto.

Funciones útiles:

- altura;
- distancia al exterior;
- despeje;
- densidad;
- probabilidad posterior de vacío.

Resultado:

\[
\operatorname{Reeb}(V,f)
\]

produce una descripción compacta de ramificaciones, fusiones y recintos.

---

# 12. Relación con teoría de Morse

Para una función suave \(f\), cambios topológicos se asocian a valores críticos.

En un punto crítico:

\[
\nabla f(x^\star)=0.
\]

En una formulación de frontera:

\[
\Phi(x;\lambda)=0,
\qquad
\nabla_x\Phi(x;\lambda)=0.
\]

IRL utiliza esta estructura para localizar estados donde cambia la clase de accesibilidad.

---

# 13. Dualidad de Alexander como herramienta conceptual

Para subconjuntos compactos suficientemente regulares de \(S^3\), la dualidad de Alexander relaciona la cohomología de la materia con la homología del complemento.

En forma reducida:

\[
\widetilde H_i(S^3-K)
\cong
\widetilde H^{2-i}(K).
\]

Su utilidad potencial es relacionar información de la estructura material con información del espacio que la rodea.

La aplicación concreta a Khufu requiere un dominio y condiciones de frontera definidos cuidadosamente.

---

# 14. Nerve theorem para fusión de observaciones espaciales

Si una familia de conjuntos:

\[
\mathcal U=\{U_i\}
\]

forma una buena cobertura, con intersecciones finitas contractibles, el nervio:

\[
N(\mathcal U)
\]

tiene el mismo tipo de homotopía que:

\[
\bigcup_iU_i.
\]

Esto ofrece una vía para combinar:

- celdas de escaneo;
- regiones de confianza;
- conos muográficos;
- segmentos geométricos;

sin exigir inicialmente una malla global perfecta.

---

# 15. Topología de accesibilidad

Dado un agente o bloque de tamaño \(r\), definimos:

\[
A_r
=
\{
x:
\text{existe un camino admisible desde el exterior hasta }x
\}.
\]

El complemento:

\[
N_r
=
D\setminus A_r
\]

es un objeto de inaccesibilidad a esa escala.

Esta definición conecta directamente topología y construcción.

---

# 16. Implementación v1.2

El dashboard incorpora una primera aproximación basada en grafo:

- nodos = espacios interiores;
- aristas = conexiones;
- parámetro \(r\) = radio de despeje proxy;
- componentes = \(\beta_0^{graph}\);
- ciclos = \(\beta_1^{graph}\).

Esta capa sirve para explicar y verificar la lógica.

La versión volumétrica posterior debe utilizar:

1. voxelización;
2. complejo cubical;
3. homología relativa;
4. persistencia;
5. zigzag entre estados;
6. comparación con evidencia.

---

# 17. Resultado esperado

La topología no pretende fechar por sí sola un evento.

Su función es generar restricciones como:

> para que el recinto \(C\) tenga esta identidad topológica en el estado \(t\), determinadas fronteras y conexiones deben existir o haber dejado de existir.

Eso se traduce en precedencias adicionales del poset constructivo.


# 18. Benchmark cubical sintético

Antes de aplicar homología a Khufu, IRL prueba el procedimiento sobre complejos voxelizados con resultados conocidos.

El benchmark cubre:

\[
(1,0,0),\quad(2,0,0),\quad(1,0,1),\quad(1,1,0),
\]

correspondientes a una bola, dos componentes, una shell con cavidad y un toro sólido.

El cálculo está en scripts/topology_synthetic.py y los resultados esperados en benchmarks/topology-synthetic/RESULTS.md.
