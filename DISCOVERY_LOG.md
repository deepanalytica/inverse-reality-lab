# Desarrollo del modelo

Este documento presenta cómo evolucionó Inverse Reality Laboratory desde la pregunta inicial hasta el modelo actual. Cada etapa resume el problema identificado, la herramienta incorporada y la función que cumple dentro del laboratorio.

---

## Etapa 1 — De “¿cómo se construyó?” a la inversión desde el estado terminal

Pregunta inicial:

> ¿Cómo pudo construirse la Gran Pirámide?

Reformulación:

> Si la pirámide ya existe terminada, ¿qué tenía que ser verdadero inmediatamente antes de ese estado?

Esto convierte la narrativa en un problema inverso:

\[
X_T
\rightarrow
P(X_{T-\Delta t}\mid X_T,E).
\]

---

## Etapa 2 — La pirámide actual no es el estado terminal original

El monumento presente ha sufrido pérdida de revestimiento, erosión, fracturas, sales, excavaciones y alteraciones humanas.

Por tanto hay dos inversiones:

\[
Y_{\mathrm{now}}
\rightarrow
X_{\mathrm{as-built}}
\]

y después:

\[
X_{\mathrm{as-built}}
\rightarrow
\text{historia constructiva}.
\]

---

## Etapa 3 — La altura no es tiempo histórico

Una primera animación inversa por capas horizontales mostró que:

\[
z\neq t.
\]

Se necesita una superficie local:

\[
h(x,y,t)
\]

y finalmente un campo de nacimiento:

\[
T_b(x,y,z),
\]

porque frentes distintos pudieron avanzar simultáneamente.

---

## Etapa 4 — La Cámara del Rey produce un orden parcial

Una cámara no puede “desaparecer” simplemente cuando el frente inverso alcanza su piso. Antes deben retirarse las estructuras posteriores que dependen de ella.

Esto introdujo conos de dependencia, aristas tipadas, máximos inversos y cronologías como órdenes parciales.

---

## Etapa 5 — El vacío también es un objeto

Una cámara es una región que tuvo que permanecer libre de material mientras se construía su entorno.

Surge la ontología dual:

\[
\mathcal K^+
\quad\text{y}\quad
\mathcal K^-.
\]

Materia y no-materia diseñada pasan a ser entidades de primer nivel.

---

## Etapa 6 — Masa ausente contrafactual

Para vincular espacios negativos con densidad se definió:

\[
m^\ominus
=
-\int_V\rho_{\mathrm{ref}}\,dV.
\]

Representa un déficit de masa respecto de un sólido de referencia y se utiliza para relacionar espacios vacíos con mediciones de densidad.

---

## Etapa 7 — Corrección de “gravedad inversa”

La expresión inicial podía sugerir:

\[
\mathbf g\rightarrow-\mathbf g.
\]

La corrección fue mantener la gravedad ordinaria y usar sólo contabilidad inversa:

\[
\Delta U^-=-\Delta U^+.
\]

---

## Etapa 8 — La fricción impide invertir literalmente la dinámica

La construcción real disipa energía. La reconstrucción inversa se formula como búsqueda de estados anteriores compatibles con la física ordinaria.

La pregunta operativa pasa a ser:

> ¿Qué estados predecesores, evolucionados hacia adelante bajo física normal, son compatibles con el terminal?

---

## Etapa 9 — La topología ordinaria no basta

Una cámara conectada por corredores pertenece al mismo componente conexo del vacío.

Se introduce:

\[
d_M(x)=\operatorname{dist}(x,M)
\]

y:

\[
V_{\tau,r}
=
\{
x:d_M(x,\tau)\ge r
\}.
\]

Las cámaras grandes pueden persistir cuando conexiones estrechas desaparecen.

---

## Etapa 10 — La mecánica se convierte en filtro histórico

Los estados intermedios deben satisfacer:

\[
\nabla\cdot\sigma+\rho g=0
\]

además de contacto y estabilidad.

Una secuencia geométricamente posible puede ser eliminada por inviabilidad estructural.

---

## Etapa 11 — El acceso vive en espacio de configuraciones

Una pieza rígida necesita una trayectoria en:

\[
SE(3),
\]

no sólo una línea en 3D.

Esto convierte accesibilidad y orientación en generadores de precedencia.

---

## Etapa 12 — La litología permite inferir procedencia

Las propiedades de un bloque pueden producir:

\[
P(q_j\mid\ell_i).
\]

Combinadas con canteras, rutas y capacidad logística, las distribuciones terminales restringen fuentes posibles.

---

## Etapa 13 — La construcción es también una red de flujo

Se distingue:

\[
\text{posible}
\neq
\text{escalable}.
\]

Aparecen capacidades, buffers, cuellos de botella y throughput global.

---

## Etapa 14 — Vaidya introduce accesibilidad local/global

Los horizontes de Vaidya muestran que una condición global puede restringir una frontera causal anterior.

La comparación con Vaidya se utiliza como herramienta metodológica para estudiar accesibilidad local y global:

> la accesibilidad global puede contener información no disponible localmente.

---

## Etapa 15 — Kerr introduce bifurcaciones de accesibilidad

Para geodésicas nulas ecuatoriales:

\[
R(r;b)\ge0.
\]

En la condición crítica:

\[
R=0,
\qquad
\partial_rR=0,
\]

aparece una separatriz que puede cambiar la conectividad del conjunto permitido.

---

## Etapa 16 — Objeto definido por complemento

La abstracción común pasa a ser:

\[
N_{\mathcal R}
=
\Omega
\setminus
\mathrm{Accessible}_{\mathcal R}(\Omega).
\]

Esto permite compartir una interfaz matemática entre dominios físicos distintos y conservar las leyes propias de cada uno.

---

## Etapa 17 — Se incorpora el motor contrafactual

Cada historia candidata debe producir evidencia predicha:

\[
H
\rightarrow
\widehat Y_H.
\]

Una historia sólo gana valor científico si puede entrar en conflicto con observaciones reales.

---

## Etapa 18 — Se incorpora la no-identificabilidad como resultado

Si múltiples historias sobreviven:

\[
P(H_1,H_2,\ldots\mid Y),
\]

el resultado correcto es mantenerlas, no forzar una única narración.

La siguiente pregunta es qué medición maximiza la discriminación entre ellas.

---

## Etapa 19 — Los benchmarks revelan ontologías temporales desaparecidas

Golden Gate, Torre Eiffel, Hoover Dam, Empire State Building y Sydney Opera House mostraron que una reconstrucción puede necesitar entidades que ya no sobreviven en el objeto final.

Esto motivó:

\[
\mathcal T
\]

como ontología temporal latente.

---

## Etapa 20 — El estudio adversarial corrige las primeras interpretaciones

Las primeras corridas tendían a presentar algunas coincidencias como recuperación del mecanismo histórico exacto.

La ablación mostró que eso era demasiado fuerte.

Sobre 25 clases de proceso:

- geometría sola recupera 1;
- terminal completo recupera 4 y favorece 11;
- + sitio/acceso/física de dominio recupera 10 y favorece 9;
- sólo al añadir schedule, precisión y logística las 25 resultan recuperables bajo las reglas actuales.

Se introduce la jerarquía:

\[
I0\rightarrow I1\rightarrow I2\rightarrow I3,
\]

desde orden causal grueso hasta implementación histórica exacta.

Y la regla:

\[
\boxed{
\text{evidencia faltante}
\not\Rightarrow
\text{fuerza desconocida}.
}
\]

---

## Etapa 21 — La fuerza residual pasa a ser una variable posterior

Se formaliza:

\[
\mathbf F_X
=
\mathbf F_{\mathrm{req}}
-
\sum_k\mathbf F_{\mathrm{known},k}.
\]

Pero un residuo puede provenir de ontología gruesa, modularidad omitida, infraestructura temporal faltante, parámetros incorrectos o evidencia insuficiente.

Por tanto:

\[
\boxed{
\mathbf F_X\neq0
\not\Rightarrow
\text{nueva física}.
}
\]

---

## Etapa 22 — Compensación gravitatoria y campo elástico-helicoidal quedan como controles contrafactuales

Se introduce:

\[
\mathbf g_{\mathrm{eff}}
=
-(1-\alpha)g\hat{\mathbf z}
\]

para cuantificar una compensación gravitatoria hipotética si un residual robusto sobreviviera.

Y una familia elástico-helicoidal:

\[
\xi(r,\phi,z)
=
r-r_0-b\phi+\lambda z,
\]

\[
U_{\mathrm{SE}}
=
\frac12k\xi^2,
\]

\[
\mathbf F_{\mathrm{SE}}
=
-\nabla U_{\mathrm{SE}}.
\]

Estos modelos se mantienen como familias contrafactuales falsables para cuantificar escenarios hipotéticos cuando exista un residual físico bien caracterizado.

---

## Síntesis actual

IRL trata el objeto terminado como:

\[
\boxed{
\text{geometría}
+
\text{materia}
+
\text{espacio negativo}
+
\text{cargas}
+
\text{contactos}
+
\text{procedencia}
+
\text{accesibilidad}
+
\text{historia posterior}
+
\text{contexto}
+
\text{evidencia}
}
\]

y busca:

\[
\boxed{
P(
\text{historias constructivas}
\mid
\text{objeto terminal},
\text{evidencia},
\text{leyes},
\text{contexto}
).
}
\]

El protocolo final es:

\[
\boxed{
\text{CHECK IDENTIFIABILITY}
\rightarrow
\text{CAUSAL ORDER}
\rightarrow
\text{TEMPORARY ONTOLOGY}
\rightarrow
\text{CONVENTIONAL PROCESSES}
\rightarrow
\text{RESIDUAL}.
}
\]

La Gran Pirámide sigue siendo el laboratorio arqueológico principal, pero el objetivo no es producir una narración única: es eliminar historias, conservar alternativas cuando los datos no discriminan y proponer nuevas observaciones que reduzcan la incertidumbre.
