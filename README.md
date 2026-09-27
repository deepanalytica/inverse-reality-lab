# Inverse Reality Laboratory (IRL)

**Laboratorio de reconstrucción inversa de procesos físicos y constructivos.**

🌐 **Laboratorio interactivo:** https://deepanalytica.github.io/inverse-reality-lab/  
📘 **Guía rápida:** [START_HERE.md](START_HERE.md)  
📖 **Glosario:** [GLOSSARY.md](GLOSSARY.md)  
📄 **Paper canónico v1.0:** [paper/PAPER.pdf](paper/PAPER.pdf) · [LaTeX modular](paper/main.tex)  
🧮 **Modelo matemático:** [MATHEMATICAL_MODEL.md](MATHEMATICAL_MODEL.md)  
🧩 **Ontología:** [ONTOLOGY.md](ONTOLOGY.md)  
🧠 **Teoría:** [THEORY.md](THEORY.md)

---

# Qué es

Inverse Reality Laboratory estudia cómo reconstruir la historia de formación de un objeto a partir de lo que podemos observar en su estado actual.

El laboratorio principal es la **Gran Pirámide de Khufu**. Antes de aplicarlo allí, el método se prueba con estructuras cuya construcción está documentada: Golden Gate Bridge, Torre Eiffel, Hoover Dam, Empire State Building y Sydney Opera House.

La pregunta central es:

> **Dado un objeto terminado, ¿qué historias de construcción son compatibles con su geometría, materiales, estructura, accesos, entorno y evidencia disponible?**

El resultado se expresa como un conjunto de historias compatibles y su grado de soporte:

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

# Qué hace el laboratorio

IRL combina distintas fuentes de información y las convierte en restricciones sobre la historia constructiva.

Trabaja con:

- geometría;
- materiales;
- cámaras, corredores y otros espacios vacíos;
- relaciones de soporte y carga;
- accesibilidad de piezas;
- procedencia;
- logística;
- evidencia arqueológica, documental e instrumental;
- incertidumbre.

Cada historia candidata debe ser compatible con esos datos.

Cuando varias historias siguen siendo compatibles, el laboratorio conserva las alternativas y mide qué información adicional ayudaría a distinguirlas.

---

# Cuál es el aporte

El proyecto propone una forma integrada de estudiar la construcción desde el objeto terminado.

En términos simples:

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

El aporte está en reunir dentro de un mismo sistema:

- problemas inversos;
- mecánica estructural;
- teoría de grafos;
- topología;
- espacios de configuración;
- inferencia bayesiana;
- procedencia material;
- logística;
- simulación contrafactual;
- control explícito de identificabilidad.

La finalidad es distinguir tres situaciones que suelen mezclarse:

1. una historia físicamente posible;
2. una historia compatible con la evidencia disponible;
3. una historia realmente identificable frente a sus alternativas.

---

# Cómo funciona en una frase

IRL empieza desde el resultado, reconstruye estados anteriores posibles, elimina los que contradicen física o evidencia y calcula qué observaciones permitirían discriminar las historias que todavía sobreviven.

---

# Conceptos esenciales

**Estado terminal:** el objeto cuando la construcción quedó terminada.

**As-built:** cómo quedó realmente construido.

**Problema inverso:** partir del resultado observado para inferir qué procesos pudieron producirlo.

**Ontología:** catálogo estructurado de entidades y relaciones del problema: bloques, cámaras, eventos, fuentes, rutas, evidencias.

**Topología:** estudio de conexiones, cavidades y cambios de conectividad.

**Espacio negativo:** volumen diseñado para permanecer libre de material, como una cámara o corredor.

**Orden parcial:** cronología donde algunas acciones tienen precedencia obligatoria y otras pueden ocurrir en paralelo.

**Identificabilidad:** grado en que los datos permiten distinguir una explicación de otra.

**Ontología temporal latente:** estructuras temporales usadas durante la obra y ausentes en el objeto final, como andamios, rampas, moldes o pasarelas.

**Fuerza residual:** fuerza todavía sin explicar después de incorporar mecanismos conocidos; funciona como diagnóstico del modelo.

Para definiciones más completas: **[GLOSSARY.md](GLOSSARY.md)**.

---

# Por qué Khufu

La Gran Pirámide reúne varias fuentes de evidencia que pueden restringirse entre sí:

- geometría exterior e interior;
- cámaras y corredores;
- diferencias entre caliza y granito;
- canteras;
- lecho rocoso;
- fracturas;
- anomalías de densidad;
- muografía;
- rutas de transporte;
- paleohidrología;
- evidencia arqueológica.

Esto permite estudiar la construcción como un problema multimodal y medir cuánto reduce cada fuente el espacio de historias posibles.

---

# Core research question

Let \(X_T\) be the estimated **as-built terminal state** of a physical object and \(Y\) the available observations.

Infer

\[
\boxed{
P(
\mathcal G,
T_b^+,
T_b^-,
Q,
R,
D,
C
\mid
X_T,Y,\mathcal L
)
}
\]

where:

- \(\mathcal G\): typed construction dependency graph;
- \(T_b^+\): material birth-time field;
- \(T_b^-\): negative-space reservation/birth field;
- \(Q\): material provenance;
- \(R\): routes/access;
- \(D\): design constraints;
- \(C\): earliest conception constraints;
- \(\mathcal L\): admissible physical laws/models.

---

# Why the Great Pyramid?

Khufu is unusually valuable as an inverse-reconstruction laboratory because independent evidence domains can constrain one another:

- global geometry;
- internal chambers and corridors;
- granite/limestone material differences;
- quarry evidence;
- bedrock and plateau geology;
- known and unknown density anomalies;
- ScanPyramids muography;
- structural load paths;
- transport landscape and paleohydrology;
- archaeological/textual evidence.

The method is useful only if combining these constraints removes candidate histories.

---

# Central idea 1 — Positive and negative construction

Traditional models store material.

IRL models both:

\[
\boxed{\mathcal K^+}
\]

the positive material complex, and

\[
\boxed{\mathcal K^-}
\]

the negative architectural complex.

A chamber is not merely “air”. It is a region that had to be **kept free of material** while its boundaries and surrounding structure were constructed.

For a reference solid density \(\rho_{\mathrm{ref}}\), the project defines a counterfactual absent-mass variable

\[
\boxed{
m^\ominus(V)
=
-\int_V\rho_{\mathrm{ref}}\,dV.
}
\]

This is a density-reference variable, **not physical negative mass**.

---

# Central idea 2 — Height is not time

The historical object cannot be reconstructed with one scalar height \(H(t)\).

Instead the unknown chronology is a field:

\[
\boxed{
T_b(x,y,z)
}
\]

plus a partial order among entities/events.

Different parts of the monument may have advanced concurrently.

Therefore

\[
z_i=z_j
\not\Rightarrow
t_i=t_j.
\]

---

# Central idea 3 — Inverse disassembly is a constrained partial order

Let

\[
P=(E,\prec)
\]

be a construction poset.

An inverse state may remove only maximal elements that also satisfy mechanics, access and evidence:

\[
\boxed{
\mathcal A^-(X)
=
\{
e\in\operatorname{Max}(P):
\mathrm{Stable}
\land
\mathrm{Accessible}
\land
\mathrm{EvidenceCompatible}
\}.
}
\]

The result is not “remove every horizontal layer”. It is a physically conditioned inverse state-space search.

---

# Central idea 4 — Negative space has topology and genealogy

A chamber connected to a corridor is not a separate connected component of empty space. Therefore the project introduces a clearance-scale filtration:

\[
\boxed{
V_{\tau,r}
=
\{
x\notin M_\tau:
d(x,M_\tau)\ge r
\}.
}
\]

This creates a two-parameter family over:

- inverse construction state \(\tau\);
- clearance scale \(r\).

Large chambers can remain persistent after narrow corridors disappear at higher \(r\), allowing room identity to be represented by persistent topology / merge-tree / Reeb-style structures.

---

# Central idea 5 — Gravity is not reversed

Define reverse inference coordinate

\[
\tau=T-t.
\]

Gravity remains

\[
\mathbf g=(0,0,-g).
\]

The project only reverses the **accounting** of gravitational potential accumulated during forward construction:

\[
\boxed{
\Delta U^-
=
-\Delta U^+.
}
\]

No antigravity is proposed.

For an ideal uniform square pyramid,

\[
V=\frac{a^2H}{3},
\qquad
U=\frac14MgH.
\]

If \(u=z/H\), the mass geometrically above the reverse front is

\[
\boxed{
\Gamma_M(u)=(1-u)^3
}
\]

while the gravitational potential contained above it is

\[
\boxed{
\Gamma_G(u)
=
1-6u^2+8u^3-3u^4.
}
\]

Thus mass, height, gravitational potential and historical time are different clocks.

---

# Central idea 6 — The finished object must predict its own past

A proposed history \(H\) is not accepted because it sounds plausible.

It must generate predicted evidence:

\[
\boxed{
\widehat Y_H
=
\mathcal O
\circ
\mathcal D_{\mathrm{post}}
\circ
\mathcal B(H).
}
\]

Then

\[
\widehat Y_H
\]

is compared with real observations.

A historical model becomes scientifically useful only when it predicts evidence that could falsify it.

---

# Comparative mathematical laboratories

## Vaidya

Used to study local versus global accessibility boundaries in a time-dependent spacetime:

\[
ds^2
=
-\left(1-\frac{2m(v)}r\right)dv^2
+
2dvdr+r^2d\Omega^2.
\]

No black-hole physics is used as archaeological evidence.

## Kerr

For equatorial null geodesics,

\[
R(r;b)
=
[r^2+a^2-ab]^2
-
\Delta(b-a)^2.
\]

The critical system

\[
R=0,
\qquad
\partial_rR=0
\]

illustrates a separatrix at which the topology of an allowed-state set can change.

The transfer to IRL is purely mathematical: **critical accessibility boundaries**.

---

# Documentation map

| Document | Purpose |
|---|---|
| [THEORY.md](THEORY.md) | Complete conceptual theory and inverse architecture |
| [MATHEMATICAL_MODEL.md](MATHEMATICAL_MODEL.md) | Detailed derivations and equations |
| [ONTOLOGY.md](ONTOLOGY.md) | Positive/negative entity ontology and relations |
| [CONTRIBUTIONS.md](CONTRIBUTIONS.md) | Contribution candidates, conjectures and boundaries |
| [DISCOVERY_LOG.md](DISCOVERY_LOG.md) | Scientific evolution of the ideas and corrections |
| [RESEARCH_PROGRAM.md](RESEARCH_PROGRAM.md) | Validation roadmap and first publishable experiments |
| [VARIABLES.md](VARIABLES.md) | Full variable registry: geometry, lithology, substrate, climate, damage, blocks, voids |
| [SIMULATION_SPEC.md](SIMULATION_SPEC.md) | Exact equations and numerical assumptions implemented by the UI |
| [EPISTEMIC_STATUS.md](EPISTEMIC_STATUS.md) | Established vs derived vs proposed vs unknown claim ledger |
| [REFERENCES.md](REFERENCES.md) | Evidence and reference base |
| [paper/main.tex](paper/main.tex) | Full LaTeX paper source |
| [paper/PAPER.pdf](paper/PAPER.pdf) | Compiled paper |
| [CITATION.cff](CITATION.cff) | Citation metadata |

GitHub renders the equations in the Markdown files using LaTeX math notation. The public laboratory also contains a MathJax mathematics view.

---

# Established vs proposed

## Established tools used

- solid geometry;
- classical mechanics;
- structural/contact mechanics;
- rigid-body \(SE(3)\) configuration spaces;
- graph theory and partial orders;
- Bayesian inference;
- optimal transport;
- computational topology and persistent homology;
- Vaidya/Kerr relativistic geometry.

## Proposed project formalism

- positive/negative coupled construction ontology;
- counterfactual absent-mass field;
- inverse gravitational bookkeeping;
- material and negative-space birth fields;
- typed inverse admissible frontier;
- \((\tau,r)\) negative-space bifiltration;
- complement-defined accessibility object;
- forward/inverse/counterfactual reconstruction triad.

These are research proposals, not established theorems.

---

# Minimum serious scientific target

The first publishable experiment should **not** claim “we solved the pyramid”.

A defensible first test is:

> Build a high-resolution King's Chamber subsystem and quantify how many geometrically possible construction sequences are eliminated when structural mechanics, configuration-space access, negative-space topology and evidence are applied jointly.

That would directly test whether the framework adds scientific information.

---

# Discoverability keywords

Egyptology; Egyptian archaeology; Great Pyramid of Giza; Khufu; pyramid construction; construction sequence; inverse archaeology; computational archaeology; archaeological inference; archaeological science; digital archaeology; structural archaeology; muography; ScanPyramids; Giza Plateau; quarry provenance; 4D reconstruction; inverse problems; Bayesian archaeology; causal graphs; partial-order reconstruction; topology; persistent homology; multiparameter persistence; negative space; architectural voids; structural mechanics; configuration space; gravitational potential; Vaidya spacetime; Kerr geodesics; event horizon; trapped surfaces; PRAXIOS; Meta-Harness.

---

# Contact

**Alexis Brian Reyes Saavedra**  
Deep Analytica — Chile  
https://deepanalytica.cl  
contacto@deepanalytica.cl  
GitHub: https://github.com/deepanalytica

Collaboration is especially welcome from Egyptologists, field archaeologists, architectural historians, geologists, structural engineers, computational archaeologists, muography teams, topologists, inverse-problem researchers and relativists.


# Benchmarks

## IRL-Bench 001 — Golden Gate Bridge

First positive-control experiment for the inverse-construction framework.

- [Benchmark report](benchmarks/golden-gate/BENCHMARK.md)
- [Reproducible calculations](benchmarks/golden-gate/benchmark.py)
- [Result snapshot](benchmarks/golden-gate/result.json)

The coarse terminal ontology reduces 5,040 serial orders to 3 admissible linear extensions. After the adversarial study, the defensible claim is narrower: terminal + site/access constraints can recover a functional class of temporary aerial access, while the exact historical catwalk or machinery is not uniquely identifiable from the terminal object alone. Conventional mechanisms drive the coarse residual force toward zero.


## IRL-Bench 002 — Torre Eiffel

Second positive-control benchmark. Tests modularity, temporary support topology, geometric closure, provisional fastening and self-advancing lifting.

- [Benchmark report](benchmarks/eiffel-tower/BENCHMARK.md)
- [Reproducible calculations](benchmarks/eiffel-tower/benchmark.py)
- [Result snapshot](benchmarks/eiffel-tower/result.json)

The coarse 15-node support ontology reduces 15! serial orders to 60,480 admissible linear extensions. The adversarial interpretation distinguishes strong modularity constraints from process classes that require precision/logistics context; exact jacks, cranes or provisional fasteners are not terminal-state deductions. At this resolution conventional mechanics remains sufficient.


## IRL-Bench 003–005 — Three additional controls

- [IRL-Bench 003 — Hoover Dam](benchmarks/hoover-dam/BENCHMARK.md): hydraulics, mass-concrete thermodynamics, cooling and canyon logistics.
- [IRL-Bench 004 — Empire State Building](benchmarks/empire-state/BENCHMARK.md): industrialized vertical pipeline, JIT staging and jumping derricks.
- [IRL-Bench 005 — Sydney Opera House](benchmarks/sydney-opera-house/BENCHMARK.md): common geometric generator, precast rib production, temporary erection arches and post-tensioning.

[Open the complete benchmark index](benchmarks/README.md)


## Adversarial correction and canonical interpretation

The five positive controls were followed by an explicit self-falsification / evidence-ablation study.

- [Adversarial results](benchmarks/adversarial-identifiability/RESULTS.md)
- [Epistemic corrections](benchmarks/adversarial-identifiability/CORRECTIONS.md)

The principal correction is:

[
oxed{
	ext{terminal object}

eq
	ext{complete construction history}
}
]

and:

[
oxed{
	ext{missing evidence}

otRightarrow
	ext{unknown force}.
}
]

The **authoritative academic synthesis** is the Spanish PhD-level [Preprint v1.0](paper/PAPER.pdf), whose LaTeX source is modularized under [paper/sections/](paper/sections/).
