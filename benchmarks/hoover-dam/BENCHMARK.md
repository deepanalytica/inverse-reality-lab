# IRL-Bench 003 — Hoover Dam

## Tipo de control

**Construcción masiva continua/discretizada, hidráulica, termodinámica y logística de cañón.**

Este benchmark es retrospectivo pseudo-ciego: la inferencia se formula desde el objeto terminal, la topografía del cañón, el material (hormigón masivo) y las leyes físicas; después se contrasta con la documentación del Bureau of Reclamation.

---

## 1. Entrada terminal permitida

IRL conoce:

- presa masiva de hormigón en Black Canyon;
- grandes estribos rocosos;
- río activo atravesando el emplazamiento;
- enorme volumen de hormigón;
- continuidad estructural final;
- restricciones de hidratación y difusión térmica del hormigón;
- acceso lateral muy limitado por las paredes del cañón.

Se ocultan inicialmente:

- túneles de desvío;
- ataguías;
- bloques/columnas de hormigonado;
- lifts de 5 ft;
- tuberías de enfriamiento;
- cableways;
- cangilones;
- secuencia histórica.

---

# 2. Predicción IRL A — el río debe desaparecer temporalmente del dominio de construcción

La presa ocupa precisamente el dominio por el cual fluye el río.

Sea

\[
\Omega_R(t)
\]

el dominio ocupado por el flujo y

\[
\Omega_D
\]

el volumen de obra/fundación.

Para excavar y construir en seco necesitamos

\[
\boxed{
\Omega_R(t)\cap\Omega_D\approx\varnothing
}
\]

durante una fase suficientemente larga.

El estado final no especifica cómo conseguirlo. El motor debe introducir una **topología hidráulica temporal**:

\[
\boxed{
\mathcal T_H=
\{\text{bypass hidráulico},\text{barreras temporales}\}
}
\]

con capacidad para el caudal extremo de diseño.

### Revelación histórica

El Bureau of Reclamation documenta cuatro túneles de desvío de 50 ft de diámetro terminados, dos por cada pared del cañón, junto con ataguías aguas arriba y abajo. El Colorado fue desviado por los túneles en noviembre de 1932.

**Resultado:** coincide la clase funcional inferida: bypass + aislamiento temporal.

---

# 3. Predicción IRL B — una colada monolítica continua debe ser rechazada térmicamente

El calor de hidratación introduce un término volumétrico:

\[
\rho c_p\frac{\partial T}{\partial t}
=
k\nabla^2T
+
\dot q_{\rm hyd}(t).
\]

Una escala de difusión térmica es

\[
\boxed{
t_d\sim\frac{L^2}{\alpha_T}
}
\]

con

\[
\alpha_T=\frac{k}{\rho c_p}.
\]

Para hormigón masivo, tomando sólo una escala orientativa

\[
\alpha_T\sim8.5\times10^{-7}\;{\rm m^2/s}
\]

y una distancia térmica característica de 60 m:

\[
t_d\sim134\ {\rm años}.
\]

No pretende reproducir el cálculo histórico exacto; demuestra la escala del problema.

La documentación oficial señala que los ingenieros estimaron que una presa vertida como bloque continuo habría tardado aproximadamente **125 años** en enfriarse hasta temperatura ambiente y que las tensiones térmicas la habrían fisurado gravemente.

### Inferencia IRL

La solución de mínimo riesgo térmico exige:

\[
\boxed{
\text{segmentación espacial}
+
\text{lifts pequeños}
+
\text{tiempo entre lifts}
}
\]

y probablemente enfriamiento activo si el plazo de construcción es corto.

---

# 4. Predicción IRL C — debe existir una red térmica temporal/sacrificial

Para reducir

\[
\Delta T
\]

y el gradiente

\[
\|\nabla T\|,
\]

IRL introduce un término de extracción:

\[
\rho c_p\frac{\partial T}{\partial t}
=
k\nabla^2T
+
\dot q_{\rm hyd}
-
q_{\rm cool}.
\]

La forma más directa de distribuir (q_{\rm cool}) dentro de una masa enorme es una red interna:

\[
\boxed{
\mathcal T_C=
\text{conductos temporales de enfriamiento}.
}
\]

### Revelación histórica

Hoover fue construido en unas 215 columnas/bloques; el hormigón se colocaba en lifts de 5 ft. Se embebieron más de 582–590 millas de tubería de acero y se circuló primero agua enfriada por aire y después agua refrigerada. Tras enfriar, las tuberías/juntas eran cerradas o inyectadas.

**Resultado:** la clase de ontología térmica latente coincide.

---

# 5. Predicción IRL D — el monolito final debe nacer desde juntas temporales

Segmentar para enfriar introduce discontinuidades:

\[
\Gamma_J
=
\bigcup_j J_j.
\]

Pero el estado final exige transmisión de esfuerzo aproximadamente monolítica.

Entonces la historia necesita un operador posterior:

\[
\boxed{
\mathcal G:
\Gamma_J
\rightarrow
\text{junta cerrada/integrada}.
}
\]

### Revelación histórica

Las columnas tenían keyways verticales/horizontales. Después del enfriamiento y contracción se inyectaba grout en las juntas para unir la estructura en un monolito.

**Resultado:** coincide la secuencia
segmentación → enfriamiento → contracción → grouting.

---

# 6. Predicción IRL E — la logística óptima en un cañón profundo es aérea

El área de colocación se mueve en planta y altura y está flanqueada por paredes abruptas. Una red terrestre pura tiene alto costo topográfico.

Definimos costo de entrega:

\[
C_{\rm del}
=
\int
\left[
\lambda_d ds+
\lambda_z |dz|+
\lambda_q q_{\rm delay}
\right].
\]

Una solución aérea transversal reduce el costo de acceso a muchos puntos del volumen:

\[
\boxed{
\text{red aérea móvil sobre el cañón}.
}
\]

### Revelación histórica

Se emplearon cableways sobre el cañón, incluyendo cinco cableways temporales de 20 t con torres móviles para el hormigón de la presa. Los buckets principales tenían 8 yd³.

Para un hormigón de escala

\[
\rho\approx2400\;{\rm kg/m^3},
\]

un bucket de 8 yd³ contiene aproximadamente

\[
V_b=6.116\;{\rm m^3},
\]

\[
m_b\approx14.68\;{\rm t},
\]

\[
W_b\approx144\;{\rm kN},
\]

coherente con una cableway de 20 t.

---

# 7. Chequeo de throughput

El Bureau registra un peak de aproximadamente

\[
10,462\;{\rm yd^3/día}.
\]

Con buckets de 8 yd³:

\[
N_b\approx1308\;\text{buckets/día}.
\]

Si cinco cableways temporales compartieran uniformemente ese peak:

\[
\approx262\;\text{viajes/cableway/día}
\]

o:

\[
\approx10.9\;\text{viajes/hora}
\]

en operación continua, equivalente a una escala media de ciclo de

\[
\boxed{5.5\;\text{minutos}}
\]

por cableway.

No es una reconstrucción operacional exacta; es un sanity check de que la capacidad documentada y la tasa máxima pertenecen a la misma escala física.

---

# 8. Residuo de nueva física

Definimos como antes:

\[
\mathbf F_X
=
\mathbf F_{\rm req}
-
\sum_k\mathbf F_{{\rm known},k}.
\]

Una vez incorporados:

- bypass hidráulico;
- ataguías;
- excavación de fundación;
- bloques/lifts;
- enfriamiento interno;
- grouting;
- cableways;
- trenes/batch plants,

existe una trayectoria documentada bajo mecánica y termodinámica convencionales.

\[
\boxed{
\mathbf F_X^\star\approx0.
}
\]

---

# 9. Resultado metodológico distintivo

Hoover añade algo que Golden Gate y Eiffel no habían probado:

\[
\boxed{
\text{el terminal puede exigir no sólo estructuras temporales,
sino también una red interna sacrificial de control térmico.}
}
\]

Además muestra que un objeto final aparentemente monolítico puede haber requerido ser **deliberadamente no monolítico durante su génesis**.

---

# Fuentes principales

- U.S. Bureau of Reclamation, Hoover Dam concrete construction:
  https://www.usbr.gov/lc/hooverdam/history/essays/concrete.html
- Bureau history:
  https://www.usbr.gov/history/hoover.html
- Diversion tunnels:
  https://www.usbr.gov/lc/hooverdam/history/essays/tunnels.html
- Cofferdams:
  https://www.usbr.gov/lc/hooverdam/history/essays/coffer.html
- Dam FAQ:
  https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html
