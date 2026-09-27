# Guía rápida — Inverse Reality Laboratory

## Qué es

**Inverse Reality Laboratory (IRL)** es un laboratorio de investigación para reconstruir cómo pudo formarse un objeto físico a partir de lo que podemos medir en su estado actual.

El caso principal de estudio es la **Gran Pirámide de Khufu**, pero el método se prueba primero con estructuras cuya construcción está bien documentada, como el Golden Gate Bridge, la Torre Eiffel, Hoover Dam, el Empire State Building y la Sydney Opera House.

La pregunta central es sencilla:

> **Dado un objeto terminado, ¿qué historias de construcción son compatibles con su geometría, materiales, estructura, accesos, entorno y evidencia disponible?**

IRL organiza esa pregunta como un problema matemático y computacional.

---

## Qué hace el laboratorio

El laboratorio recibe información sobre un objeto terminado y construye un conjunto de historias posibles.

Cada historia debe pasar filtros independientes:

1. **geometría:** las piezas y espacios deben encajar;
2. **estructura:** los estados intermedios deben ser estables;
3. **accesibilidad:** las piezas deben poder llegar físicamente a su posición;
4. **materiales y procedencia:** la piedra, acero u hormigón deben ser compatibles con sus fuentes;
5. **logística:** el proceso debe poder operar a la escala necesaria;
6. **evidencia:** fotografías, arqueología, sensores, documentos y mediciones deben ser compatibles;
7. **identificabilidad:** el sistema determina cuánto podemos afirmar realmente con los datos disponibles.

El resultado puede ser una historia muy restringida, varias historias compatibles o un estado explícito de **no identificabilidad** cuando la evidencia disponible todavía permite varias explicaciones.

---

## Qué aporta

El aporte principal es una forma integrada de estudiar la construcción desde el objeto terminado.

En lugar de elegir primero una explicación y comprobar si parece plausible, IRL intenta:

\[
\boxed{
\text{objeto terminado}
\rightarrow
\text{restricciones}
\rightarrow
\text{historias compatibles}
\rightarrow
\text{predicciones comprobables}
}
\]

El proyecto reúne en un mismo sistema:

- problemas inversos;
- mecánica estructural;
- topología;
- teoría de grafos;
- espacios de configuración;
- inferencia bayesiana;
- procedencia material;
- logística;
- simulación contrafactual.

La contribución del laboratorio está en **cómo se integran estas herramientas para reconstruir procesos constructivos y medir qué tan identificable es cada conclusión**.

---

## Ejemplo sencillo

Supongamos que vemos un puente terminado.

Desde el estado final podemos observar que:

- el tablero cuelga de suspensores;
- los suspensores dependen de cables principales;
- los cables se apoyan en torres y anclajes.

Esto impone relaciones como:

\[
\text{torres}
\prec
\text{cables}
\prec
\text{suspensores}
\prec
\text{tablero}.
\]

El símbolo

\[
a\prec b
\]

significa:

> **a debe existir antes de b dentro de la historia constructiva considerada.**

El sistema puede además detectar que, antes de existir el cable definitivo, hace falta alguna forma de acceso o soporte temporal en altura.

La historia real del Golden Gate utilizó catwalks. IRL no necesita adivinar el catwalk exacto para obtener una conclusión útil: puede recuperar la **clase funcional “acceso aéreo temporal”**.

---

## Por qué la Gran Pirámide es un caso adecuado

Khufu reúne varias fuentes de información que pueden restringirse entre sí:

- geometría exterior e interior;
- cámaras y corredores;
- caliza y granito;
- canteras;
- lecho rocoso;
- fracturas;
- anomalías de densidad;
- muografía;
- posibles rutas de transporte;
- paleohidrología;
- evidencia arqueológica.

IRL intenta combinar estas fuentes para reducir el número de historias compatibles.

---

# Glosario esencial

## Estado terminal

El objeto en el momento en que la construcción quedó funcionalmente terminada.

En el caso de Khufu interesa reconstruir primero el estado original terminado, porque la pirámide actual ha cambiado durante milenios.

---

## As-built

Expresión de ingeniería que significa:

> **como quedó realmente construido.**

Puede diferir del diseño previsto.

---

## Problema inverso

Un problema directo pregunta:

> Si hago A, ¿qué resultado B obtengo?

Un problema inverso pregunta:

> Si observo B, ¿qué A pudo producirlo?

IRL trabaja principalmente en esta segunda dirección.

---

## Ontología

En este proyecto, una ontología es un **modelo organizado de las cosas que existen en el problema y de las relaciones entre ellas**.

Por ejemplo:

- bloque;
- cámara;
- corredor;
- cantera;
- evento de colocación;
- soporte;
- evidencia;
- ruta de transporte.

Sirve para evitar que todos los elementos se traten como simples puntos o polígonos sin significado.

---

## Topología

La topología estudia relaciones como:

- qué está conectado con qué;
- qué región está encerrada;
- cuándo aparece una cavidad;
- cuándo dos espacios dejan de estar conectados.

En IRL sirve especialmente para estudiar cámaras, corredores, vacíos y accesibilidad.

---

## Espacio negativo

Es el espacio que deliberadamente queda libre de material.

Una cámara es un ejemplo.

IRL la trata como una entidad arquitectónica porque durante la construcción hubo que **preservar ese volumen vacío**.

---

## \(\mathcal K^+\) y \(\mathcal K^-\)

\[
\mathcal K^+
\]

representa la estructura material: bloques, vigas, muros, pisos.

\[
\mathcal K^-
\]

representa la estructura de espacios negativos: cámaras, corredores, vacíos y otros volúmenes reservados.

Sirven para estudiar materia y vacío dentro del mismo modelo.

---

## Masa ausente contrafactual \(m^\ominus\)

Es la cantidad de masa que existiría en un espacio vacío si ese espacio estuviera lleno con un material de referencia.

\[
m^\ominus(V)
=
-\int_V \rho_{\mathrm{ref}}\,dV.
\]

Sirve para comparar vacíos arquitectónicos con mediciones de densidad, por ejemplo muografía.

---

## Orden parcial

Es una cronología en la que algunas cosas tienen un orden obligatorio y otras pueden ocurrir en paralelo.

Por ejemplo:

\[
\text{fundación}\prec\text{torre}
\]

pero dos fundaciones diferentes pueden construirse simultáneamente.

Sirve para representar una obra real mejor que una lista lineal de pasos.

---

## Frente inverso admisible

Es el conjunto de elementos que pueden retirarse en un determinado estado de la reconstrucción inversa sin violar:

- dependencias;
- estabilidad;
- geometría;
- accesibilidad;
- evidencia.

Sirve para recorrer hacia atrás una construcción de manera físicamente controlada.

---

## \(SE(3)\)

Es el espacio matemático que representa la posición y orientación de un cuerpo rígido en tres dimensiones.

IRL lo usa porque mover un bloque exige controlar:

- dónde está;
- cómo está orientado;
- si puede girar;
- si cabe por una trayectoria.

---

## Bifiltración \((\tau,r)\)

Es una forma de estudiar cómo cambia un espacio vacío usando dos variables:

- \(\tau\): estado de la reconstrucción inversa;
- \(r\): escala espacial o tamaño mínimo de paso.

Sirve para distinguir, por ejemplo, una cámara grande de un corredor estrecho que la conecta con otro espacio.

---

## Identificabilidad

Pregunta:

> **¿Los datos disponibles permiten distinguir realmente una explicación de otra?**

Si dos historias producen prácticamente las mismas observaciones, el sistema las mantiene como alternativas.

---

## Ontología temporal latente \(\mathcal T\)

Conjunto de elementos que existieron durante la construcción y luego desaparecieron.

Ejemplos:

- andamios;
- rampas;
- pasarelas;
- grúas;
- moldes;
- gatos;
- cofferdams;
- soportes temporales.

Sirve para evitar interpretar como “imposible” un proceso al que simplemente le falta una infraestructura temporal.

---

## Fuerza residual \(\mathbf F_X\)

Es la fuerza que queda sin explicar después de incorporar las fuerzas y mecanismos conocidos:

\[
\mathbf F_X
=
\mathbf F_{\mathrm{requerida}}
-
\sum_k
\mathbf F_{\mathrm{conocida},k}.
\]

Sirve como diagnóstico.

Antes de atribuir significado físico a ese residual, el laboratorio revisa geometría, modularidad, soportes temporales, logística, parámetros e identificabilidad.

---

## Modelo directo

Parte de una historia candidata y calcula qué deberíamos observar si esa historia fuera correcta.

\[
H\rightarrow\widehat Y_H.
\]

Sirve para comprobar hipótesis.

---

## Modelo inverso

Parte de las observaciones y busca historias que puedan producirlas.

\[
Y\rightarrow P(H\mid Y).
\]

Es el núcleo de IRL.

---

## Modelo contrafactual

Pregunta qué ocurriría bajo una condición hipotética.

Ejemplo:

> ¿Qué cambiaría si el peso efectivo de una pieza se redujera un 20%?

Sirve para comparar mecanismos y estudiar hipótesis de forma cuantitativa.

---

## Expected Information Gain

Medida de cuánto podría reducir nuestra incertidumbre una nueva observación.

Sirve para decidir qué conviene medir después.

Por ejemplo:

- una nueva línea de muografía;
- una medición litológica;
- un escaneo geométrico;
- una inspección estructural.

---

## Benchmark

Caso de prueba cuya historia real está documentada.

IRL utiliza benchmarks para comprobar si sus reglas recuperan relaciones constructivas conocidas antes de aplicarlas a un caso histórico incierto.

---

## PRAXIOS

Es la capa de ejecución del laboratorio.

Coordina:

- estados;
- modelos;
- herramientas;
- simulaciones;
- flujos de cálculo;
- recuperación y repetición de experimentos.

---

## Meta-Harness

Es la capa de control científico.

Revisa:

- de dónde viene una afirmación;
- qué evidencia la respalda;
- qué incertidumbre tiene;
- qué alternativas siguen abiertas;
- qué nivel de identificabilidad posee.

Su función es mantener trazabilidad entre datos, cálculos y conclusiones.

---

## Vaidya y Kerr

Son modelos matemáticos de relatividad general usados como **laboratorios comparativos de accesibilidad y fronteras**.

Su utilidad dentro de IRL es conceptual y matemática:

- Vaidya ayuda a estudiar diferencias entre información local y global;
- Kerr ayuda a estudiar cambios en regiones permitidas y separatrices.

Se emplean para desarrollar herramientas matemáticas de accesibilidad que luego pueden reutilizarse en otros dominios.

---

# Cómo leer el proyecto

Una ruta práctica es:

1. **esta guía** para entender el propósito;
2. **README** para ver el proyecto completo;
3. **Registro de descubrimientos** para seguir cómo evolucionó el modelo;
4. **Paper v1.0** para la formulación académica;
5. **Modelo matemático y ontología** para detalles técnicos;
6. **Benchmarks** para ver cómo se prueba el método.

