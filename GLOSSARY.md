# Glosario de Inverse Reality Laboratory



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

