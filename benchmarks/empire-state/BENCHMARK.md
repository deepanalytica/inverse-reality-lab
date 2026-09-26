# IRL-Bench 004 — Empire State Building

## Tipo de control

**Producción vertical industrializada, repetición, logística restringida y pipeline de oficios.**

Benchmark retrospectivo pseudo-ciego.

---

# 1. Entrada terminal

IRL conoce:

- skyscraper de acero de ~381 m / 102 pisos equivalentes;
- marco estructural de acero;
- estructura repetitiva en altura;
- envolvente y terminaciones posteriores al esqueleto;
- footprint urbano muy restringido;
- ~57.000–57.480 t de acero estructural;
- múltiples pisos casi repetitivos.

Se ocultan:

- cronología real;
- ritmo de 4.5 pisos/semana;
- derricks;
- staging externo;
- just-in-time;
- rutas de acero;
- maquinaria histórica.

---

# 2. Modelo pipeline simplificado

Dividimos la torre en cinco zonas verticales.

- (F): fundación;
- (S_i): acero estructural de zona (i);
- (C_i): cierre/envolvente de zona (i).

Restricciones:

\[
F\prec S_1\prec S_2\prec\cdots\prec S_5,
\]

\[
C_1\prec C_2\prec\cdots\prec C_5,
\]

y:

\[
S_i\prec C_i.
\]

El cierre puede ir detrás del frente de acero, pero nunca adelantarse a su soporte.

Con once macroeventos, sin restricciones:

\[
11!=39,916,800.
\]

Las intercalaciones válidas de las dos cadenas de cinco etapas son el número de Catalan:

\[
C_5
=
\frac{1}{6}{10\choose5}
=
42.
\]

Por tanto:

\[
\boxed{
1-\frac{42}{11!}
=
99.9998948\%
}
\]

del espacio serial se elimina en este pipeline grueso.

---

# 3. Predicción IRL A — producción modular prefabricada

El frame terminal contiene decenas de miles de toneladas distribuidas en miembros discretos y repetitivos.

Masa total:

\[
M_s\approx57,480\;{\rm t}.
\]

Promedio puramente agregado para 85 niveles estructurales principales:

\[
\bar M_{\rm floor}
\approx
\frac{57,480}{85}
\approx
676\;{\rm t/piso}.
\]

Una estrategia monolítica es imposible; la topología terminal exige una secuencia de miembros manufacturados y unidos.

### Inferencia

\[
\boxed{
\text{fabricación exterior}
+
\text{entrega secuenciada}
+
\text{erección modular}.
}
\]

### Revelación

Library of Congress y Skyscraper Museum documentan materiales prefabricados, steel fabricado a especificación, y transporte desde fabricantes/yard hacia la obra a medida que era requerido.

---

# 4. Predicción IRL B — inventario mínimo en una parcela urbana

El footprint terminal ocupa un sitio urbano denso. Si el throughput vertical es alto, almacenar en obra muchos pisos de acero genera:

\[
C_{\rm storage}
\propto
A_{\rm inventory}
\]

que entra rápidamente en conflicto con el área disponible.

El mínimo logístico favorece:

\[
\boxed{
I(t)\rightarrow\text{pequeño},
\qquad
Q_{\rm in}(t)\approx Q_{\rm erection}(t).
}
\]

Es una arquitectura **just-in-time** o de buffer externo.

### Revelación

El registro del Skyscraper Museum indica que el acero era enviado desde las plantas tan rápido como se fabricaba, almacenado fuera de Manhattan, transportado por agua y finalmente por camión al sitio según necesidad.

---

# 5. Predicción IRL C — múltiples frentes verticales solapados

Para terminar rápidamente una torre de 102 pisos, una cadena puramente serial

\[
S_1\to C_1\to I_1\to S_2\to\cdots
\]

es ineficiente.

IRL favorece un pipeline:

\[
\boxed{
\text{acero arriba}
\parallel
\text{envolvente más abajo}
\parallel
\text{MEP/interiores aún más abajo}.
}
\]

Esta estructura de precedencia permite que el tiempo total se aproxime al máximo de los ritmos de las etapas, no a su suma.

### Revelación

El edificio completo se ejecutó entre marzo de 1930 y mayo de 1931; la documentación oficial registra aproximadamente 4.5 pisos por semana y archivos fotográficos muestran simultáneamente hoisting, riveting/welding y otros oficios.

---

# 6. Predicción IRL D — los dispositivos de levante deben “saltar” con el frente

Un derrick permanente al nivel de calle tendría un costo creciente de alcance y control con la altura.

La estructura recién construida ofrece una plataforma para reposicionar:

\[
z_{\rm derrick}(t)
\approx
z_{\rm steel-front}(t)-\Delta z.
\]

Por tanto:

\[
\boxed{
\text{derricks móviles/jumping}
}
\]

es una clase altamente favorecida.

### Revelación

El Smithsonian conserva una fotografía/registro titulada explícitamente **“Preparing to jump the derrick two stories up on the Empire State Building — 1930”**.

El álbum Starrett documenta nueve derricks en el primer setup.

---

# 7. Sanity check de capacidad

Con una escala media agregada:

\[
676\;{\rm t/piso}
\]

y derricks históricos de 20–30 t descritos en documentación técnica secundaria, el mínimo teórico de picks a capacidad máxima sería aproximadamente:

\[
676/30\approx22.5
\]

a:

\[
676/20\approx33.8
\]

picks/piso.

No pretende reproducir el rigging real: simplemente muestra que **varios derricks trabajando en paralelo** pertenecen a la escala de throughput necesaria para un frame que podía avanzar alrededor de un piso por día en periodos pico.

---

# 8. Predicción IRL E — deformación acumulada debe ser controlada

Una torre de acero de cientos de metros acumula compresión elástica en columnas:

\[
\delta
=
\sum_i
\frac{N_iL_i}{E_iA_i}.
\]

Si diferentes columnas tienen cargas distintas:

\[
\Delta\delta_{ij}
=
\delta_i-\delta_j.
\]

Para mantener pisos y fachadas dentro de tolerancia, construcción/detallado deben compensar estas diferencias.

### Revelación

El archivo de Starrett Brothers & Eken preservado por el Skyscraper Museum contiene explícitamente **Empire State Building compression of steel notes and table, 1931**, con observaciones por piso de acortamiento de columnas.

Esto es una coincidencia particularmente interesante: el objeto alto final exige controlar una variable geométrica que no es evidente en una fotografía del edificio acabado.

---

# 9. Fuerza residual

Con:

- miembros prefabricados;
- staging externo/JIT;
- múltiples derricks;
- jumping derricks;
- pipeline de trades;
- control de deformación,

hay una trayectoria convencional documentada.

\[
\boxed{
\mathbf F_X^\star\approx0.
}
\]

---

# 10. Resultado distintivo

Empire State añade al benchmark:

\[
\boxed{
\text{la velocidad extrema puede reconstruirse como una topología de pipeline,
no como una fuerza extraordinaria.}
}
\]

El cuello de botella no se resuelve “levantando más fuerte”, sino disminuyendo espera, inventario y serialización.

---

# Fuentes principales

- Empire State Building official history:
  https://www.esbnyc.com/about/history
- Library of Congress — May 1 / Empire State:
  https://www.loc.gov/item/today-in-history/may-01/
- NYPL construction photographs:
  https://digitalcollections.nypl.org/collections/photographs-of-the-empire-state-building-under-construction
- Skyscraper Museum construction archive:
  https://www.skyscraper.org/empire-state-building-construction/
- Skyscraper Museum steel activity sheet:
  https://old.skyscraper.org/EDUCATION/lesson_plans/L3_Activity3.pdf
- Smithsonian jumping derrick:
  https://www.si.edu/es/object/archives/components/sova-nmah-ac-0360-ref39
