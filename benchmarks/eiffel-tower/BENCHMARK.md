# IRL-Bench 002 — Torre Eiffel

## Objetivo

Aplicar el marco **Inverse Reality Laboratory (IRL)** a una estructura cuya construcción está extraordinariamente documentada y comprobar si, desde la ontología terminal, la mecánica, la topología y las restricciones de ensamblaje, el modelo recupera clases correctas de secuencia y tecnología.

Este benchmark es **retrospectivo y pseudo-ciego**: la fase de inferencia se formula usando solamente atributos del objeto terminado y principios físicos, y luego se contrasta con la cronología oficial. No es un experimento humano preregistrado ni totalmente ciego.

---

# 1. Capa de entrada terminal

Se permite al motor conocer del objeto terminado:

- cuatro pilares principales;
- estructura metálica reticulada que converge progresivamente;
- primera planta a ~57 m;
- segunda planta a ~115 m;
- estructura superior/summit;
- estructura metálica total ≈7.300 t;
- 18.038 piezas de hierro;
- ≈2.500.000 remaches;
- base cuadrada de ~125 m;
- presencia de guías/recorridos verticales asociados a los ascensores.

No se entregan inicialmente:

- fechas;
- grúas;
- andamios;
- gatos hidráulicos;
- cajas de arena;
- prefabricación en taller;
- bulones provisionales;
- número/tipo de trabajadores.

---

# 2. Ontología estructural gruesa

Definimos:

- (F_i): cimentación del pilar (i), (i=1,dots,4);
- (L_i): tramo inferior inclinado del pilar (i);
- (B_1): cierre/estructura de la primera planta;
- (U_i): continuación superior del pilar (i) entre primera y segunda planta;
- (B_2): cierre/estructura de la segunda planta;
- (S): superestructura final hasta la cima.

Restricciones mínimas:

[
F_iprec L_i
]

para cada pilar,

[
L_1,L_2,L_3,L_4prec B_1,
]

[
B_1prec U_i,
]

[
U_1,U_2,U_3,U_4prec B_2,
]

[
B_2prec S.
]

Esta representación permite trabajo paralelo en los cuatro pilares.

---

# 3. Compresión del espacio cronológico

El modelo contiene 15 macroentidades.

Sin restricciones:

[
15!
=
1,307,674,368,000
]

órdenes seriales posibles.

El poset anterior permite:

[
60,480
]

extensiones lineales.

Reducción:

[
oxed{
1-rac{60,480}{15!}
=
99.999995375%
}
]

del espacio serial.

Este número no es una medida de “precisión histórica”. Mide cuánto orden temporal está codificado por la topología de soporte del objeto final.

---

# 4. Predicción 1 — ensamblaje modular

La estructura metálica terminal tiene masa total

[
M_{m Fe}approx7.3	imes10^6 {m kg}
]

y

[
N_p=18,038
]

piezas.

Escala media de masa por pieza:

[
ar m
=
rac{M_{m Fe}}{N_p}
approx
405 {m kg}.
]

Peso medio:

[
ar W
approx
3.97 {m kN}.
]

El peso de toda la estructura metálica tratada absurdamente como una pieza única sería

[
W_{m mono}
=
M_{m Fe}g
approx
71.6 {m MN}.
]

La descomposición terminal reduce la escala de levantamiento por un factor del orden de

[
rac{M_{m Fe}}{ar m}
approx
18,038.
]

### Inferencia IRL

Una solución de bajo esfuerzo máximo favorece:

[
oxed{
	ext{fabricación modular de piezas pequeñas}
+
	ext{ensamblaje incremental}
}
]

en vez de elevación monolítica.

---

# 5. Predicción 2 — prefabricación y control dimensional fuera del frente principal

La estructura final contiene:

[
18,038
]

piezas y aproximadamente

[
2.5	imes10^6
]

remaches.

Escala media:

[
rac{2.5	imes10^6}{18,038}
approx
139
]

remaches por pieza terminal, entendida sólo como métrica global.

Una obra con miles de piezas repetidas, agujeros de unión y cierres geométricos sensibles a error acumulado tiene un costo elevado si cada elemento debe medirse, cortarse y perforarse desde cero en altura.

Un funcional esquemático puede escribirse:

[
J
=
lambda_L F_{max}
+
lambda_E N_{m operaciones de campo}
+
lambda_Q |mathbf e_{m fit}|^2.
]

La reducción de (J) favorece piezas previamente calculadas, trazadas, perforadas y comprobadas antes de llegar al frente de montaje.

### Inferencia IRL

[
oxed{
	ext{prefabricación de alta precisión}
}
]

es una clase de proceso altamente favorecida.

No se puede inferir desde el estado terminal si el taller estaba exactamente en Levallois-Perret; eso requiere evidencia histórica.

---

# 6. Predicción 3 — sistema de levante que asciende con la obra

Un sistema de izado situado sólo en el suelo tendría que aumentar continuamente:

- altura de alcance;
- brazo;
- cable;
- momento flector;
- infraestructura temporal.

Pero la propia torre en crecimiento genera una estructura vertical resistente disponible.

Definimos un costo conceptual:

[
C_{m lift}
=
C_{m estructura temporal}
+
C_{m alcance}
+
C_{m reposicionamiento}.
]

Para alturas crecientes,

[
C_{m ground}(z)
]

crece mucho más rápidamente que un sistema apoyado en la estructura ya construida:

[
C_{m climb}(z).
]

### Inferencia IRL

El mínimo favorece:

[
oxed{
	ext{sistema de izado pequeño y repetitivo que asciende con los pilares}.
}
]

---

# 7. Predicción 4 — topología temporal de soporte en el primer cierre

Los cuatro pilares inferiores son ramas inclinadas que deben converger geométricamente hacia el primer gran nivel horizontal.

Sea

[
mathbf q
=
(q_1,q_2,q_3,q_4)
]

el estado geométrico de los cuatro extremos de rama.

El cierre requiere:

[
oxed{
mathbf g(mathbf q)=0
}
]

para un vector de restricciones de coincidencia, nivel, distancia y orientación.

Con errores de fabricación/montaje (oldsymbolepsilon),

[
mathbf r
=
mathbf g(mathbf q+oldsymbolepsilon)

eq0.
]

Si existe un conjunto de actuadores temporales (mathbf u),

[
mathbf g(mathbf q+oldsymbolepsilon+mathbf Bmathbf u)
approx
mathbf r+mathbf Jmathbf u.
]

La corrección mínima en norma es

[
oxed{
mathbf u^star
=
-mathbf J^+mathbf r
}
]

donde (mathbf J^+) es la pseudoinversa.

### Inferencia IRL

Para cerrar cuatro ramas altas e inclinadas con precisión, el modelo predice:

[
oxed{
	ext{soportes temporales}
+
	ext{grados de libertad ajustables}
}
]

antes de rigidizar definitivamente el primer nivel.

Ésta es una predicción de un objeto/proceso **no presente en la torre terminada**.

---

# 8. Predicción 5 — fijaciones provisionales antes del remachado definitivo

Un remache definitivo no puede utilizarse como único mecanismo para mantener libremente dos piezas desalineadas mientras se busca la coincidencia de todos los agujeros.

Sea (deltamathbf q) el error relativo de pose.

La inserción del conjunto de remaches exige una condición de tolerancia:

[
|P_hdeltamathbf q|
<
c_h
]

para clearance (c_h).

Antes de la contracción del remache caliente debe existir alguna restricción temporal:

[
oxed{
mathcal C_{m temp}
}
]

que mantenga las piezas dentro de la tolerancia.

### Inferencia IRL

El modelo predice:

[
oxed{
	ext{pernos/bulones/clamps temporales}
prec
	ext{fijación permanente por remache}.
}
]

No puede identificar la geometría exacta del bulón sólo desde el objeto final.

---

# 9. Revelación histórica

La documentación oficial de la Torre Eiffel informa:

1. las fundaciones comenzaron el 26 de enero de 1887;
2. el montaje metálico comenzó el 1 de julio de 1887;
3. el cierre de las grandes vigas del primer nivel se completó el 7 de diciembre de 1887;
4. la segunda planta fue construida en julio de 1888;
5. la cima de 300 m se alcanzó en marzo de 1889.

La secuencia es compatible con el poset inferido.

---

# 10. Contraste de mecanismo — prefabricación

La documentación oficial describe:

- ~18.000 piezas calculadas y dibujadas;
- ~700 planos de ingeniería;
- ~3.600 planos de taller;
- piezas trazadas, cortadas y perforadas en los talleres Eiffel;
- piezas preensambladas antes de ir a obra;
- aproximadamente dos tercios de los ~2.500.000 remaches instalados en fábrica;
- piezas defectuosas devueltas al taller.

Resultado:

[
oxed{
	ext{predicción de prefabricación}
longrightarrow
	ext{coincide con la clase histórica}.
}
]

---

# 11. Contraste de mecanismo — grúas ascendentes

La documentación oficial registra pequeñas grúas a vapor montadas en los pilares.

Capacidad documentada aproximada:

[
3 {m t}
]

por grúa.

Fuerza estática equivalente:

[
F_{m crane}
approx
3,000g
approx
29.4 {m kN}.
]

Comparada con la masa media terminal por pieza:

[
rac{3,000}{405}
approx
7.4.
]

La comparación es sólo de escala; las piezas y preensamblajes reales no tienen todos la misma masa.

Las grúas ascendían con la torre utilizando las guías destinadas posteriormente a los ascensores.

Resultado:

[
oxed{
	ext{lifting autoascendente inferido}
longrightarrow
	ext{clase histórica correcta}.
}
]

---

# 12. Contraste de mecanismo — cierre y ajuste del primer nivel

IRL predice una topología temporal de soporte y ajuste.

La historia documenta:

- múltiples andamios provisionales de madera;
- soportes mayores para las grandes vigas del primer nivel;
- cajas de arena ajustables;
- gatos/cilindros hidráulicos en la base;
- regulación final con precisión milimétrica;
- sustitución posterior de los dispositivos por calzos permanentes.

Resultado:

[
oxed{
	ext{hidden temporary support + adjustment}
longrightarrow
	ext{confirmado como clase de proceso}.
}
]

Éste es el resultado más fuerte del benchmark.

El objeto terminado no contiene las cajas de arena ni los gatos, pero su geometría de cierre y sus tolerancias hacen razonable inferir una fase temporal ajustable.

---

# 13. Contraste — fijación provisional

IRL predice fijaciones temporales antes del cierre definitivo de remaches.

La documentación oficial indica que las piezas se fijaban provisionalmente con bulones y luego esos bulones eran sustituidos por remaches calientes.

Resultado:

[
oxed{
	ext{temporary fastener}
longrightarrow
	ext{historical provisional bolts}.
}
]

Este es un segundo caso de recuperación de una **ontología temporal desaparecida**.

---

# 14. Fuerza residual desconocida

Definimos:

[
mathbf F_X
=
mathbf F_{m req}
-
sum_kmathbf F_{{m known},k}.
]

El problema inverso general es

[
oxed{
min_{H,mathcal T,mathbf F_X}
left[
int|mathbf F_X|^2,dVdt
+
lambda_T C(mathcal T)
+
lambda_H C(H)
ight]
}
]

sujeto a:

- estado terminal;
- equilibrio;
- accesibilidad;
- tolerancias;
- evidencia.

Para la Torre Eiffel, una vez admitidas:

- modularidad;
- prefabricación;
- grúas ascendentes;
- andamios temporales;
- regulación hidráulica;
- fijaciones provisionales;
- remachado convencional,

existe una trayectoria histórica convencional.

Por tanto, a esta resolución:

[
oxed{
mathbf F_X^starapprox0.
}
]

No es necesario un campo de gravedad reducido, repulsivo o espiral.

---

# 15. Qué habría ocurrido con una ontología equivocada

Si el modelo tratara la estructura metálica completa de 7.300 t como un cuerpo que debe levantarse monolíticamente:

[
W_{m mono}
approx
71.6 {m MN}.
]

Aparecería una supuesta necesidad de fuerza enorme.

Pero la ontología real contiene 18.038 piezas.

Escala media:

[
ar W
approx
3.97 {m kN}.
]

La reducción de escala supera cuatro órdenes de magnitud.

Esto refuerza la regla obtenida en Golden Gate:

[
oxed{
	extbf{NO NEW PHYSICS BEFORE LATENT PROCESS EXHAUSTION}
}
]

o:

[
oxed{
	extbf{No introducir nueva física antes de agotar la topología temporal, modularidad y procesos constructivos latentes.}
}
]

---

# 16. Resultado resumido

| Inferencia IRL | Revelación histórica | Estado |
|---|---|---|
| cimentaciones antes de ramas metálicas | sí | consistente |
| cuatro ramas pueden avanzar en paralelo | sí | consistente |
| cierre del primer nivel antes de continuación superior | sí | consistente |
| ensamblaje modular | 18.038 piezas | coincide |
| prefabricación de precisión | talleres Eiffel | coincide |
| lifting que asciende con la obra | grúas a vapor trepadoras | coincide |
| soporte temporal en cierre | andamios | coincide |
| sistema de ajuste temporal | cajas de arena + gatos hidráulicos | coincide |
| fijación temporal antes del remache | bulones provisionales | coincide |
| fuerza exótica requerida | no | residual ~0 |

Debe interpretarse como **consistencia retrospectiva por clases**, no como demostración de inferencia automática ciega.

---

# 17. Comparación con IRL-Bench 001

## Golden Gate

El modelo necesitó inferir:

[
	ext{topología aérea temporal}
]

antes de formar el cable principal.

Históricamente:

[
	ext{catwalk}.
]

## Torre Eiffel

El modelo necesita inferir:

[
	ext{soporte temporal}
+
	ext{ajuste geométrico}
+
	ext{fijación provisional}.
]

Históricamente:

[
	ext{andamios}
+
	ext{cajas de arena/gatos}
+
	ext{bulones}.
]

Por tanto dos estructuras muy diferentes producen la misma conclusión metodológica:

[
oxed{
	ext{el estado terminal puede requerir entidades temporales que ya no existen}.
}
]

---

# 18. Nueva hipótesis metodológica a testear

Definimos la **ontología temporal latente mínima**:

[
oxed{
mathcal T^star
=
argmin_{mathcal T}
C(mathcal T)
}
]

sujeta a que exista una trayectoria constructiva convencional:

[
exists H:
quad
mathcal F(H,mathcal T)=X_T.
]

La pregunta deja de ser:

> “¿qué objetos temporales sabemos históricamente que usaron?”

y pasa a ser:

> “¿cuál es el conjunto mínimo de objetos temporales que debe postular el estado terminal para que exista una historia físicamente realizable?”

Este operador debe formalizarse y validarse con más benchmarks.

---

# 19. Próximos niveles

Para convertir IRL-Bench 002 en un benchmark cuantitativo serio:

1. incorporar un modelo 3D público de la Torre Eiffel;
2. segmentar los cuatro pilares y niveles;
3. construir un grafo real de elementos/remaches;
4. ocultar fotografías y cronología;
5. inferir el orden mediante (mathcal A^-);
6. modelar el cierre de la primera planta con tolerancias;
7. simular el sistema de jacks como actuadores;
8. calcular FEM incremental;
9. comparar contra las fotografías históricas etapa por etapa.

---

# Fuentes primarias/oficiales

- Historia y construcción: https://www.toureiffel.paris/es/el-monumento/historia
- Construcción ejemplar: https://www.toureiffel.paris/es/noticias/130-anos/la-construccion-de-la-torre-eiffel-una-obra-ejemplar
- Cómo se construyó tan rápidamente: https://www.toureiffel.paris/es/noticias/130-anos/como-se-construyo-la-torre-tan-rapidamente
- Cifras clave: https://www.toureiffel.paris/es/el-monumento/cifras-clave
- Motores/grúas a vapor: https://www.toureiffel.paris/en/news/history-and-culture/eiffel-tower-and-its-steam-engines
