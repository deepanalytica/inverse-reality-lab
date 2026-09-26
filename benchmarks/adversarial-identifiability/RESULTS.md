# IRL Adversarial Study 001 — Identifiability Under Evidence Ablation

## Propósito

Este experimento intenta **hacer fallar IRL**.

Los cinco benchmarks anteriores mostraron que varias clases históricas eran compatibles con lo que el modelo infería. Eso no responde una pregunta más dura:

> ¿Qué parte de esa recuperación proviene realmente del objeto terminal y qué parte depende de información adicional, priors, conocimiento del sitio, duración, tolerancias o logística?

Este estudio elimina sistemáticamente familias de variables y observa cuándo una clase de proceso deja de ser recuperable.

## Advertencia metodológica

El motor utilizado aquí es una **auditoría determinista de dependencias**, no un modelo aprendido y no una validación estadística externa.

Cada proceso histórico tiene un conjunto explícito de modalidades requeridas por la ontología actual. Por tanto, los porcentajes miden la robustez **de nuestro formalismo actual**, no una propiedad universal de la ingeniería.

La utilidad del experimento es epistemológica: detectar dónde estábamos afirmando más de lo que permiten los datos.

---

# 1. Tres estados epistemológicos

Cada clase de proceso recibe:

[
s(p,E)in{0,1,2}
]

donde:

- (0): **no recuperable** con las modalidades disponibles;
- (1): **favorecida/parcialmente restringida**, pero siguen existiendo alternativas importantes;
- (2): **recuperable por las reglas actuales a nivel de clase funcional**.

El valor (2) **no** significa que el mecanismo histórico exacto sea identificable.

Por ejemplo:

[
	ext{“soporte temporal ajustable”}
]

puede ser recuperable mientras

[
	ext{“gato hidráulico modelo X instalado en posición Y”}
]

no lo es.

---

# 2. Capas de evidencia

## T0 — sólo geometría

[
E_0={G}
]

## T1 — objeto terminal completo

[
E_1=
{G,	ext{microestructura},	ext{estructura},	ext{material}}
]

## T2 — terminal + sitio + accesibilidad + física de dominio

Añade:

[
{
	ext{entorno},
	ext{hidrología},
	ext{térmica},
	ext{acceso}
}
]

## T3 — añade objetivos/restricciones constructivas

Añade:

[
{
	ext{duración},
	ext{precisión},
	ext{logística}
}.
]

T3 ya **no es inferencia terminal pura**.

---

# 3. Resultado agregado

Se evaluaron 25 clases de proceso entre los cinco controles.

| Evidencia | Recuperables | Favorecidas | No recuperables | score normalizado |
|---|---:|---:|---:|---:|
| T0: geometría sola | 1 | 0 | 24 | 4% |
| T1: terminal completo | 4 | 11 | 10 | 38% |
| T2: + sitio/acceso/física | 10 | 9 | 6 | 58% |
| T3: + duración/precisión/logística | 25 | 0 | 0 | 100% |

La conclusión adversarial es contundente:

[
oxed{
X_T 	ext{solo no identifica la mayor parte de los procesos históricos}.
}
]

Esto corrige la interpretación demasiado fuerte de algunos benchmarks previos.

---

# 4. Resultado por estructura

## Golden Gate

### T0

La geometría sola no recupera ninguna de las cuatro clases ensayadas.

### T1

El terminal completo favorece:

- formación incremental del cable;
- lifting modular de torres;
- erección estructuralmente equilibrada del deck;

pero no identifica la topología aérea temporal.

### T2

Cuando añadimos:

- entorno del estrecho;
- accesibilidad/configuration space;

aparece de forma recuperable:

[
oxed{	ext{alguna clase de acceso aéreo temporal}}
]

y la formación incremental del cable.

**Corrección importante:** el terminal no identifica específicamente “catwalk”. Identifica una clase funcional de infraestructura aérea temporal. El catwalk histórico es una realización de esa clase.

---

## Torre Eiffel

El objeto terminal completo permite recuperar con bastante fuerza:

[
oxed{	ext{ensamblaje modular}}
]

y favorece el uso de procesos de precisión.

Pero:

- taller de Levallois;
- grúa a vapor exacta;
- sandboxes;
- gato hidráulico concreto;

no son identificables únicamente desde (X_T).

Con precisión/tolerancias y logística, sí se vuelve recuperable la clase:

[
oxed{
	ext{ajuste temporal + lifting ascendente + fijación provisional}.
}
]

**Corrección:** IRL recupera clases funcionales, no el aparato histórico exacto.

---

## Hoover Dam

Aquí la ablación fue especialmente informativa.

Con geometría + material, el sistema puede favorecer construcción segmentada.

Al añadir:

- río/cañón;
- hidrología;
- térmica;

se vuelven recuperables:

[
oxed{
	ext{control hidráulico temporal}
}
]

y:

[
oxed{
	ext{segmentación térmica del hormigón}.
}
]

Pero la **refrigeración activa con tuberías** no es obligatoria desde el terminal si no damos también una restricción de tiempo.

Sin duration/schedule podrían existir historias mucho más lentas con otras estrategias térmicas.

Por tanto:

[
oxed{
	ext{cooling pipes exactas no son terminal-identifiable}.
}
]

El benchmark previo era demasiado fuerte en ese punto.

---

## Empire State Building

Éste fue el benchmark más frágil.

Desde el terminal completo sí podemos recuperar:

[
oxed{
	ext{estructura modular de acero}
}
]

y favorecer control de deformaciones.

Pero:

[
	ext{JIT},
quad
	ext{pipeline extremo},
quad
	ext{jumping derricks}
]

**no pueden deducirse únicamente del edificio terminado**.

Requieren respectivamente información sobre:

- parcela/entorno;
- objetivo de duración;
- logística;
- accesibilidad;
- throughput.

Por tanto la frase previa:

> “el terminal revela el pipeline vertical”

era demasiado fuerte.

La formulación correcta es:

> **terminal + restricción temporal + logística urbana favorecen fuertemente un pipeline concurrente.**

Esta es una corrección científica importante.

---

## Sydney Opera House

Es el único caso donde la geometría sola puede recuperar algo realmente fuerte:

[
oxed{
	ext{generador geométrico común}
}
]

si disponemos de geometría 3D suficientemente precisa.

El terminal completo además favorece:

- prefabricación repetitiva;
- continuidad segmental;
- modularización del cladding.

Con estructura + acceso puede recuperarse una clase de:

[
oxed{
	ext{soporte temporal para el rib incompleto}.
}
]

Pero:

- telescopic erection arch exacto;
- fábrica on-site;
- rail-mounted cranes;

no son identificables sólo desde la forma terminada.

---

# 5. Sensibilidad leave-one-modality-out

Partiendo del conjunto T3 completo, eliminamos una modalidad cada vez.

| Modalidad eliminada | Pérdida de score (máx. 50) |
|---|---:|
| geometría | **32** |
| microestructura | **22** |
| logística | **13** |
| estructura | **11** |
| entorno | **9** |
| material | **7** |
| precisión | **7** |
| duración/schedule | **5** |
| accesibilidad | **4** |
| térmica | **4** |
| hidrología | **2** |

Dentro de **este conjunto de benchmarks**, los dos campos más críticos son:

[
oxed{
	ext{geometría}
+
	ext{microestructura}.
}
]

Esto tiene una consecuencia directa para Khufu:

una representación geométrica demasiado gruesa o una pirámide modelada como “masa continua” destruiría gran parte de la información inversa que buscamos.

---

# 6. Ablación aleatoria

También se eliminaron modalidades aleatoriamente.

Con sólo 10% de probabilidad de perder cada modalidad, el promedio cae aproximadamente a:

[
18.6/25
]

clases recuperables.

La probabilidad de conservar las 25 es sólo aproximadamente:

[
31%.
]

Con 25% de pérdida aleatoria:

[
mathbb E[	ext{recuperables}]
approx
11.2/25.
]

Con 50%:

[
approx
3.9/25.
]

Esto muestra una propiedad importante:

[
oxed{
	ext{IRL no es robusto a la ausencia indiscriminada de modalidades}.
}
]

Eso no es necesariamente una debilidad del método; es una propiedad normal de un problema inverso multimodal.

Pero obliga a reportar explícitamente qué evidencia falta.

---

# 7. Negative control: falso residuo de fuerza

El experimento más peligroso consiste en eliminar **modularidad**.

## Golden Gate

Si colapsamos una torre a una sola unidad de levante:

[
Wapprox197 {m MN}.
]

Para un cable monolítico:

[
Wapprox107 {m MN}.
]

## Torre Eiffel

Si colapsamos la estructura metálica completa:

[
Wapprox71.6 {m MN}.
]

## Empire State

Si colapsamos las aproximadamente 57.480 t de acero estructural:

[
oxed{
Wapprox563.7 {m MN}.
}
]

Estos números pueden parecer “fuerzas inexplicables”.

Pero son artefactos de una ontología incorrecta.

Por tanto:

[
oxed{
F_X
eq0

otRightarrow
	ext{nueva física}.
}
]

Primero debemos demostrar:

[
oxed{
	ext{que el residuo sobrevive a refinamiento ontológico}.
}
]

---

# 8. Segunda clase de falso positivo: prohibir objetos temporales

Si el motor no puede postular entidades que desaparecen:

- Golden Gate pierde el acceso aéreo temporal;
- Eiffel pierde soporte/ajuste provisional;
- Hoover pierde bypass y control térmico temporal;
- Sydney pierde soporte de ribs incompletos.

Entonces el solver puede declarar estados “imposibles” aunque exista una historia convencional documentada.

Esto demuestra que:

[
oxed{
mathcal T
]

—la ontología temporal— no es un adorno del modelo.

Es necesaria para evitar falsos positivos de física extraordinaria.

---

# 9. Tercera clase: confundir plausibilidad con identificabilidad

Un mecanismo puede minimizar costo sin ser históricamente identificable.

Por ejemplo, desde el Empire State terminal:

[
	ext{jumping derrick}
]

puede ser una solución eficiente.

Pero también podrían existir otras familias de grúas/hoists compatibles.

Por tanto debemos distinguir:

[
oxed{
	ext{feasible}

eq
	ext{favored}

eq
	ext{identified}.
}
]

Y además:

[
oxed{
	ext{functional class}

eq
	ext{exact historical mechanism}.
}
]

---

# 10. Jerarquía de identificabilidad descubierta

Sin formalizar todavía la teoría principal, los experimentos sugieren cuatro niveles útiles:

### I0 — orden causal grueso

Ejemplo:

[
	ext{foundation}prec	ext{tower}.
]

### I1 — clase funcional

Ejemplo:

[
	ext{temporary aerial access}.
]

### I2 — familia de mecanismo

Ejemplo:

[
	ext{incremental wire spinning}.
]

### I3 — implementación histórica exacta

Ejemplo:

[
	ext{catwalk concreto, dimensiones, maquinaria, fecha}.
]

Los cinco benchmarks muestran que (X_T) suele permitir I0–I1, ocasionalmente I2 y rara vez I3 sin evidencia adicional.

---

# 11. Condición mínima antes de Khufu

Antes de interpretar cualquier residual como:

[
mathbf F_X
]

debemos reportar una **matriz de suficiencia observacional**:

[
mathcal O_{m available}
=
[
G,
M,
	ext{microestructura},
E,
A,
T,
ldots
].
]

Si una modalidad crítica falta, el resultado debe ser:

[
oxed{
	ext{NON-IDENTIFIABLE}
}
]

y no:

[
oxed{
	ext{UNKNOWN FORCE}.
}
]

Ésta es posiblemente la conclusión más importante de este estudio adversarial.

---

# 12. Resultado global

Los benchmarks positivos iniciales mostraban:

[
mathcal T^star
ightarrow
F_X^starapprox0.
]

El adversarial añade:

[
oxed{
	ext{si faltan modalidades, }
mathcal T^star
	ext{ puede no ser identificable}.
}
]

Por tanto el orden epistemológicamente correcto pasa a ser:

[
oxed{
	ext{CHECK IDENTIFIABILITY}
ightarrow
	ext{INFER CAUSAL ORDER}
ightarrow
	ext{INFER TEMPORARY ONTOLOGY}
ightarrow
	ext{EXHAUST CONVENTIONAL PROCESSES}
ightarrow
	ext{COMPUTE RESIDUAL}.
}
]

Nunca:

[
	ext{missing evidence}
ightarrow
	ext{new physics}.
]

---

# 13. Conclusión

El intento de hacer fallar IRL **sí lo hizo fallar** bajo degradación de evidencia.

Eso es un resultado positivo para el programa científico.

Encontramos tres fuentes principales de error:

1. **ontología demasiado gruesa** → falso residuo de fuerza;
2. **prohibición de entidades temporales** → falsa imposibilidad;
3. **falta de site/schedule/logistics** → mecanismo plausible confundido con mecanismo identificado.

Por tanto, antes de Khufu necesitamos que Meta-Harness bloquee cualquier conclusión de física residual cuando no se haya superado un gate explícito de identificabilidad.
