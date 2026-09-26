# Inverse Reality Laboratory (IRL)

**Terminal-state, evidence-constrained reconstruction of physical objects.**  
Primary archaeological laboratory: **Great Pyramid of Khufu, Giza**.  
Research architecture: **PRAXIOS + Meta-Harness**.

> **Scientific status:** research prototype and falsifiable formal framework.  
> It does not claim to have solved the construction of Khufu, nor does it claim antigravity, physical negative mass or physical equivalence between ancient architecture and black-hole physics.

🌐 **Interactive laboratory:** https://deepanalytica.github.io/inverse-reality-lab/  
📄 **Paper PDF:** [paper/PAPER.pdf](paper/PAPER.pdf)  
🧮 **Mathematics:** [MATHEMATICAL_MODEL.md](MATHEMATICAL_MODEL.md)  
🧩 **Ontology:** [ONTOLOGY.md](ONTOLOGY.md)  
🧠 **Theory:** [THEORY.md](THEORY.md)

---

# Resumen en español

El proyecto parte de una pregunta distinta a la habitual.

En lugar de:

> **¿Cómo pudieron construir la Gran Pirámide?**

pregunta:

> **Si comenzamos exactamente desde la pirámide terminada y retrocedemos estado por estado, ¿qué estados anteriores son físicamente, topológicamente, arqueológicamente y logísticamente compatibles con el objeto final?**

El resultado buscado no es una narración única, sino

\[
\boxed{
P(
\text{historias de construcción}
\mid
\text{objeto terminal},
\text{evidencia},
\text{leyes físicas}
).
}
\]

El objeto terminado se trata simultáneamente como:

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
\text{acceso}
+
\text{daño}
+
\text{evidencia}.
}
\]

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

The coarse terminal ontology reduces 7 major-component serial orders from 5,040 to 3 admissible linear extensions (99.9405% reduction), predicts a latent temporary aerial-access class before cable formation, and recovers mechanism classes consistent with climbing tower lifting, aerial cable spinning and balanced suspended-deck erection. At this resolution, conventional mechanics yields an unexplained-force residual approximately equal to zero.
