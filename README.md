# Inverse Reality Laboratory (IRL)

**Laboratorio de reconstrucción inversa de procesos físicos y constructivos.**

🌐 **Laboratorio:** https://deepanalytica.github.io/inverse-reality-lab/  
🧭 **Dashboard 3D/4D:** https://deepanalytica.github.io/inverse-reality-lab/dashboard.html  
📘 **Guía rápida:** [START_HERE.md](START_HERE.md)  
📖 **Glosario:** [GLOSSARY.md](GLOSSARY.md)  
📄 **Paper canónico v1.0:** [paper/PAPER.pdf](paper/PAPER.pdf)  
🧾 **Fuente LaTeX:** [paper/main.tex](paper/main.tex)  
🧪 **Benchmarks:** [benchmarks/README.md](benchmarks/README.md)  
📚 **Biblioteca:** https://deepanalytica.github.io/inverse-reality-lab/library.html  
🎓 **Revisión académica:** https://deepanalytica.github.io/inverse-reality-lab/review.html

---

## Qué es

Inverse Reality Laboratory estudia cómo reconstruir la historia de formación de un objeto a partir de su estado terminado y de la evidencia disponible.

El laboratorio arqueológico principal es la **Gran Pirámide de Khufu**. El método se calibra con estructuras cuya construcción está ampliamente documentada: Golden Gate Bridge, Torre Eiffel, Hoover Dam, Empire State Building y Sydney Opera House.

La pregunta central es:

> **Dado un objeto terminado, ¿qué historias de construcción son compatibles con su geometría, materiales, estructura, accesos, entorno y evidencia?**

El resultado se representa como:

\[
\boxed{
P(
\text{historias de construcción}
\mid
\text{objeto terminal},
\text{evidencia},
\text{leyes físicas},
\text{contexto}
)
}
\]

---

## Qué hace

IRL convierte información del objeto y su contexto en restricciones sobre la historia constructiva.

El sistema estudia:

- geometría;
- materiales;
- cámaras, corredores y otros espacios vacíos;
- cargas y contactos;
- accesibilidad de piezas;
- procedencia;
- rutas y logística;
- cambios posteriores a la construcción;
- evidencia arqueológica, documental e instrumental;
- incertidumbre e identificabilidad.

Cada historia candidata se evalúa con esos criterios.

Cuando varias historias producen observaciones equivalentes, el resultado conserva las alternativas y permite calcular qué nueva medición tendría mayor capacidad para diferenciarlas.

---

## Cuál es el aporte

El proyecto integra en un mismo flujo herramientas que suelen utilizarse por separado:

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

El marco reúne:

- problemas inversos;
- mecánica estructural y de contacto;
- teoría de grafos y órdenes parciales;
- topología;
- espacios de configuración;
- inferencia bayesiana;
- procedencia material;
- logística y throughput;
- simulación contrafactual;
- control explícito de identificabilidad.

El aporte metodológico consiste en usar estas herramientas de manera coordinada para **reducir el espacio de historias posibles, medir el nivel de soporte de cada conclusión y generar predicciones que puedan contrastarse con nueva evidencia**.

---

## Ejemplo simple

En un puente suspendido terminado observamos que:

\[
\text{tablero}
\rightarrow
\text{suspensores}
\rightarrow
\text{cables}
\rightarrow
\text{torres y anclajes}.
\]

Esa estructura impone precedencias:

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

significa que \(a\) debe existir antes que \(b\) dentro de la historia considerada.

El mismo análisis puede revelar que antes del cable definitivo hace falta una clase de acceso o soporte temporal en altura. La historia del Golden Gate permite contrastar esa inferencia con sus catwalks documentados.

---

## Conceptos principales

**Estado terminal:** estado del objeto cuando la construcción quedó funcionalmente terminada.

**As-built:** forma en que el objeto quedó realmente construido.

**Problema inverso:** inferir causas o procesos a partir de sus resultados observables.

**Ontología:** modelo organizado de las entidades y relaciones del problema.

**Topología:** estudio de conexiones, cavidades y cambios de conectividad.

**Espacio negativo:** volumen arquitectónico reservado para permanecer libre de material, como una cámara o corredor.

**Orden parcial:** cronología que representa dependencias obligatorias y permite procesos paralelos.

**Identificabilidad:** grado en que la evidencia permite distinguir una historia de sus alternativas.

**Ontología temporal latente:** conjunto de estructuras de obra que existieron durante la construcción y luego desaparecieron, como andamios, rampas, moldes, pasarelas o soportes.

**Fuerza residual:** parte de la demanda mecánica que continúa sin explicación después de incorporar mecanismos conocidos; funciona como variable de diagnóstico.

**Modelo directo:** parte de una historia y calcula qué observaciones produciría.

**Modelo inverso:** parte de observaciones y busca historias compatibles.

**Modelo contrafactual:** calcula qué ocurriría bajo una condición hipotética.

Las definiciones ampliadas están en [GLOSSARY.md](GLOSSARY.md).

---

## Materia y espacio arquitectónico

IRL representa el objeto mediante dos componentes:

\[
\mathcal K^+
\]

para la materia construida, y:

\[
\mathcal K^-
\]

para cámaras, corredores y otros espacios arquitectónicos reservados.

Esta representación permite estudiar cómo nace una cámara, cuándo queda cerrada, qué estructuras dependen de ella y qué observaciones de densidad deberían producirse.

---

## Cronología como orden parcial

La altura de una pieza aporta información geométrica, mientras la cronología depende también de soporte, acceso, logística y secuencias paralelas.

IRL utiliza grafos de precedencia:

\[
P=(E,\prec).
\]

Así puede expresar que una acción requiere otra previa y, al mismo tiempo, conservar ramas de trabajo que pudieron desarrollarse en paralelo.

---

## Mecánica y accesibilidad

Cada historia debe producir estados intermedios físicamente realizables.

El laboratorio utiliza equilibrio estructural:

\[
\nabla\cdot\boldsymbol\sigma+\rho\mathbf g=0
\]

y espacios de configuración en:

\[
SE(3)
\]

para estudiar si una pieza rígida puede llegar a una determinada posición con la orientación requerida.

---

## Identificabilidad

Una explicación físicamente posible puede compartir las mismas observaciones con otras explicaciones.

IRL distingue:

\[
\text{posible}
\rightarrow
\text{compatible con evidencia}
\rightarrow
\text{identificable}.
\]

El estudio adversarial de los cinco benchmarks mostró que geometría, microestructura, contexto, accesibilidad, precisión, duración y logística aportan información diferente. Esta separación permite saber qué afirmaciones están respaldadas y qué medición conviene realizar después.

---

## Dashboard 3D/4D

La versión v1.2 incorpora un visor interactivo de Khufu que combina:

- envolvente 3D paramétrica;
- cámaras y corredores publicados;
- ScanPyramids Big Void y North Face Corridor;
- líneas de visión muográficas esquemáticas;
- cursos y bloques proxy;
- fuerzas y magnitudes mecánicas de baseline;
- dominios de búsqueda;
- hipótesis con evidencia, deducciones, predicciones y observaciones discriminantes;
- slider 4D de estados causales.

En este contexto:

\[
\text{4D}
=
\text{3D}
+
\text{estado causal/inferencial}.
\]

El slider representa estados de reconstrucción y sus condiciones necesarias. No funciona como una fecha histórica automática.

**Visor:** [dashboard.html](dashboard.html)  
**Especificación:** [DASHBOARD_SPEC.md](DASHBOARD_SPEC.md)  
**Datos:** [DATA_SCHEMA.md](DATA_SCHEMA.md)  
**Matemática avanzada:** [ADVANCED_MATHEMATICS.md](ADVANCED_MATHEMATICS.md)  
**Topología:** [TOPOLOGY.md](TOPOLOGY.md)  
**Validación:** [VALIDATION_PROTOCOL.md](VALIDATION_PROTOCOL.md)  
**Fuentes:** [SOURCE_REGISTRY.md](SOURCE_REGISTRY.md)  
**Roadmap:** [ROADMAP_3D_4D.md](ROADMAP_3D_4D.md)

---

## Benchmarks

El método se ha aplicado de forma retrospectiva a cinco estructuras documentadas:

| Caso | Aspecto principal estudiado |
|---|---|
| Golden Gate Bridge | precedencias, suspensión y acceso temporal |
| Torre Eiffel | modularidad, cierre geométrico y precisión |
| Hoover Dam | hidráulica, hormigón masivo y control térmico |
| Empire State Building | producción vertical, logística y concurrencia |
| Sydney Opera House | geometría generativa, prefabricación y soporte temporal |

Los resultados completos están en [benchmarks/README.md](benchmarks/README.md).

El estudio de ablación posterior estableció una regla operativa:

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
\text{RESIDUAL}
}
\]

En lenguaje directo: primero se comprueba qué permiten afirmar los datos; luego se reconstruyen dependencias y procesos temporales; después se agotan los mecanismos constructivos conocidos; finalmente se analiza cualquier fuerza que continúe sin explicación.

---

## Topología e identificabilidad v1.2

La versión v1.2 distingue tres niveles topológicos:

1. **grafo de conectividad**, útil para inspección inmediata;
2. **filtración por despeje**, que estudia qué conexiones sobreviven al aumentar la escala;
3. **homología volumétrica y persistencia**, especificadas como siguiente nivel numérico.

Para un estado \(\tau\) y radio \(r\):

\[
V_{\tau,r}
=
\{
x\in V_\tau:
d_M(x,\tau)\ge r
\}.
\]

La evolución constructiva puede abrir y cerrar conexiones, por lo que la dimensión temporal se formula mediante **zigzag persistence** cuando no existe monotonicidad de inclusiones.

La cronología parcial utiliza además el politopo de orden:

\[
\mathcal O(P)
=
\{
\mathbf t\in[0,1]^n:
t_i\le t_j
\text{ si }e_i\prec e_j
\}.
\]

Esto permite medir de manera continua cuánto restringen las precedencias el espacio de cronologías compatibles.

---

## PRAXIOS y Meta-Harness

**PRAXIOS** es la capa de ejecución. Coordina estados, modelos, herramientas, simulaciones y repetición de experimentos.

**Meta-Harness** es la capa de control científico. Mantiene la relación entre una afirmación y:

- su evidencia;
- su incertidumbre;
- sus contradicciones;
- las alternativas abiertas;
- su nivel de identificabilidad;
- las predicciones que permiten contrastarla.

---

## Vaidya y Kerr

Vaidya y Kerr se utilizan como laboratorios matemáticos comparativos.

**Vaidya** permite estudiar la diferencia entre fronteras definidas por información local y global.

**Kerr** permite estudiar separatrices y cambios de conectividad en regiones de movimiento permitido.

Su función en IRL es aportar herramientas matemáticas para estudiar accesibilidad, fronteras y transiciones críticas.

---

## Modelos gravitatorios contrafactuales

El laboratorio incluye un parámetro de compensación gravitatoria:

\[
\mathbf g_{\mathrm{eff}}
=
-(1-\alpha)g\hat{\mathbf z}
\]

y una familia de campos elástico-helicoidales.

Se utilizan para cuantificar escenarios hipotéticos y comparar qué magnitud de interacción adicional sería necesaria bajo determinadas condiciones.

El protocolo los sitúa después del análisis de identificabilidad, la ontología temporal y los mecanismos constructivos convencionales.

---

## Estado del proyecto

**Preprint v1.2 · marco de investigación en fase de validación.**

La versión actual incluye:

- paper académico en LaTeX;
- modelo matemático;
- ontología;
- laboratorio interactivo;
- cinco benchmarks retrospectivos;
- estudio adversarial de identificabilidad;
- programa experimental para Khufu;
- criterios de falsificación;
- código y resultados reproducibles.

La siguiente fase prevista es la validación prospectiva: reglas congeladas, historia de construcción oculta y evaluación definida antes de revelar el ground truth.

---

## Autor y contacto

**Alexis Brian Reyes Saavedra**  
Deep Analytica · Chile  
**Correo:** contacto@deepanalytica.cl  
**Sitio:** https://deepanalytica.cl  
**GitHub:** https://github.com/deepanalytica


---

## Auditoría formal y reproducibilidad

La versión v1.2 incorpora documentos específicos para revisión rigurosa:

- [Obligaciones de prueba](PROOF_OBLIGATIONS.md)
- [Supuestos y límites](ASSUMPTIONS_AND_LIMITS.md)
- [Reproducibilidad](REPRODUCIBILITY.md)
- [Protocolo de validación](VALIDATION_PROTOCOL.md)
- [Guía de revisión avanzada](AI_REVIEW_GUIDE.md)

El workflow valida datos, referencias, estados causales, topología, estructura del sitio, JavaScript y compilación LaTeX antes de publicar.


### Benchmark topológico sintético

IRL incluye un control con cuatro complejos voxelizados de topología conocida. El objetivo es comprobar el cálculo de \(\beta_0\), \(\beta_1\) y \(\beta_2\) antes de interpretar geometría arqueológica. Ver [resultados](benchmarks/topology-synthetic/RESULTS.md) y [script](scripts/topology_synthetic.py).
