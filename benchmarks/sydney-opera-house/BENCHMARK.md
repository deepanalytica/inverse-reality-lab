# IRL-Bench 005 — Sydney Opera House

## Tipo de control

**Geometría generativa, prefabricación, ensamblaje segmental, postensado y soporte temporal de una forma compleja.**

Benchmark retrospectivo pseudo-ciego.

---

# 1. Entrada terminal

IRL conoce:

- podium masivo;
- diez grandes velas/roof sails;
- superficies curvas de familia común;
- ribs de hormigón prefabricado;
- segmentación visible/constructiva;
- continuidad estructural final de cada rib;
- más de un millón de tiles;
- repetición geométrica considerable.

Se ocultan:

- la historia de la “spherical solution”;
- ensayos previos;
- moldes;
- fábrica on-site;
- postensado;
- erection arches;
- rail-mounted cranes;
- secuencia histórica.

---

# 2. Predicción IRL A — buscar un generador geométrico común

En vez de modelar cada shell como superficie independiente (S_j), IRL compara una familia libre con un generador común.

Para una esfera:

\[
\boxed{
\min_{\mathbf c,R}
\sum_{j,k}
\left(
\|\mathbf x_{jk}-\mathbf c\|-R
\right)^2
}
\]

donde (mathbf x_{jk}) son puntos de todas las shells.

Si el residuo de un único ((\mathbf c,R)) permanece pequeño, el principio MDL/Bayes favorece:

\[
\boxed{
\text{una geometría generadora común}
}
\]

frente a diez superficies arbitrarias.

### Revelación histórica

Arup/Sydney Opera House documentan que se estudiaron doce esquemas y finalmente las diez velas se derivaron de **segmentos de una misma esfera de 75 m de diámetro**.

**Resultado:** el terminal posee una compresión geométrica que apunta directamente hacia una familia de fabricación reutilizable.

---

# 3. Predicción IRL B — la geometría común debe convertirse en moldes repetibles

Si todas las familias de ribs comparten curvatura:

\[
\kappa(s)\in\mathcal K_{\rm small}
\]

en lugar de una función diferente para cada pieza, el costo de formwork disminuye:

\[
C_{\rm form}
\approx
N_{\rm mould}C_m
+
N_{\rm cast}C_c.
\]

Un sistema de pocas familias de molde domina frente a:

\[
N_{\rm mould}\approx N_{\rm components}.
\]

### Revelación histórica

Arup informa que la geometría esférica permitió **mass production on site** de ribs prefabricados. IStructE señala que los más de 200 ribs pudieron construirse usando alrededor de una docena de perfiles.

**Resultado:** coincide la inferencia de estandarización geométrica.

---

# 4. Predicción IRL C — un rib segmentado requiere compresión longitudinal

El estado terminal contiene un arco/rib continuo construido desde elementos discretos.

Sea el rib:

\[
R=
\bigcup_{i=1}^{n}S_i.
\]

Las juntas:

\[
J_i=S_i\cap S_{i+1}
\]

no deben abrir bajo las combinaciones de carga relevantes.

Una forma directa es imponer fuerza de compresión:

\[
\boxed{
N_{\rm pre}>N_{\rm tensile,demand}
}
\]

de manera que:

\[
\sigma_n(J_i)\lesssim0
\]

en servicio.

### Inferencia

\[
\boxed{
\text{postensado/precompresión longitudinal}
}
\]

es una clase natural para convertir piezas discretas en un rib estructural continuo.

### Revelación histórica

Las ribs se construyeron con segmentos precast match-cast y se hicieron continuas mediante **post-tensioned steel strands**.

---

# 5. Predicción IRL D — debe existir un soporte temporal curvo y ajustable

Antes de completar y postensar un rib, sus segmentos individuales no forman aún el arco autosustentado final.

Por tanto existe una fase:

\[
\mathcal S_{\rm incomplete}
\]

para la cual:

\[
\mathrm{Stable}
(\mathcal S_{\rm incomplete})
=
\text{false}
\]

sin soporte adicional.

El soporte temporal debe además adaptarse a ribs de distintas longitudes manteniendo la misma curvatura.

IRL predice:

\[
\boxed{
\text{estructura temporal curva + ajustable/reutilizable}.
}
\]

### Revelación histórica

Heritage NSW documenta un **supporting telescopic steel arch** desarrollado por Hornibrook: cada rib se armaba con segmentos soportados entre la estructura ya completada y este arco telescópico; después se tensionaba el rib y se repetía el proceso.

Éste es un match extremadamente fuerte de **ontología temporal desaparecida**.

---

# 6. Predicción IRL E — fábrica local y levantamiento repetitivo

La estructura tiene miles de segmentos pesados de alta repetición y geometría controlada.

Transportarlos desde gran distancia como piezas grandes penaliza:

\[
C_{\rm transport}\propto
N\,m\,d.
\]

Una fábrica próxima al frente minimiza handling y permite match-casting:

\[
\boxed{
\text{precast on-site / near-site}.
}
\]

### Revelación histórica

Arup y Sydney Opera House documentan producción masiva de ribs en sitio y levantamiento por grúas. Fuentes de la propia Opera House describen una fábrica on-site y dos grúas montadas sobre rieles que se retiraban hacia el puerto conforme quedaban las sails terminadas.

---

# 7. Predicción IRL F — el revestimiento también debe modularizarse

Más de un millón de tiles sobre superficies curvas hacen ineficiente instalar cada tile individualmente en altura.

IRL agrupa la superficie en unidades:

\[
\mathcal C=
\bigcup_j C_j
\]

compatibles con la geometría repetida.

### Revelación histórica

Se fabricaron:

\[
4,228
\]

chevrons de tiles utilizando:

\[
26
\]

beds con forma de chevron.

Promedio puramente productivo:

\[
\boxed{
4,228/26\approx162.6
}
\]

unidades por bed.

En total:

\[
1,056,006
\]

tiles cubren el techo.

Otra vez el objeto complejo fue construido mediante **compresión de variedad geométrica**.

---

# 8. Evento terminal verificable

El Sydney Opera House documenta que la instalación del último segmento precast de las shells —el segmento nº 2.194— el 17 de enero de 1967 marcó efectivamente la culminación de Stage Two.

Esto proporciona ground truth directo para la ontología segmental del benchmark.

---

# 9. Fuerza residual

Una vez introducidos:

- generador esférico;
- moldes repetitivos;
- precast;
- postensado;
- telescopic erection arch;
- grúas;
- factory on-site,

el estado terminal es alcanzable mediante mecánica convencional documentada.

\[
\boxed{
\mathbf F_X^\star\approx0.
}
\]

---

# 10. Resultado distintivo

Sydney agrega una capacidad nueva a IRL:

\[
\boxed{
\text{el terminal puede revelar el algoritmo geométrico de fabricación.}
}
\]

No sólo inferimos “qué soporte temporal faltaba”, sino que una gran variedad aparente de formas puede reducirse a un **generador matemático común**, y ese generador explica por qué la obra se vuelve manufacturable.

La secuencia conceptual recuperada es:

\[
\boxed{
\text{geometría común}
\rightarrow
\text{repetición de moldes}
\rightarrow
\text{segmentación}
\rightarrow
\text{soporte temporal}
\rightarrow
\text{postensado}
\rightarrow
\text{estructura autosustentada}.
}
\]

---

# Fuentes principales

- Sydney Opera House — The spherical solution:
  https://www.sydneyoperahouse.com/our-story/the-spherical-solution
- Arup — Designing the Sydney Opera House:
  https://www.arup.com/projects/designing-the-sydney-opera-house/
- Heritage NSW — construction difficulties:
  https://apps.environment.nsw.gov.au/dpcheritageapp/ViewHeritageItemDetails.aspx?ID=5054880
- Sydney Opera House — completion / Peter Hall:
  https://www.sydneyoperahouse.com/our-story/peter-hall-and-completion-opera-house
- UNESCO nomination dossier:
  https://whc.unesco.org/uploads/nominations/166rev.pdf
- Institution of Structural Engineers case study:
  https://www.istructe.org/resources/case-study/sydney-opera-house-50-years-on/
