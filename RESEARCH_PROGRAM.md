# Programa de investigación y validación — v1.2

## Goal

Turn Inverse Reality from a conceptual framework into a falsifiable computational archaeology program.

---

# Phase 0 — Literature and novelty audit

Before claiming novelty, perform a structured review covering:

- Egyptological construction literature;
- Harris matrices and stratigraphic partial orders;
- Bayesian archaeological chronology;
- 4D BIM construction sequencing;
- disassembly planning;
- inverse procedural modeling;
- digital twins;
- structural archaeology;
- computational topology;
- multiparameter persistent homology;
- muographic inversion;
- archaeological provenance modeling.

Deliverable:

\[
\text{claim matrix}
=
\{\text{known},\text{adapted},\text{possibly novel},\text{unsupported}\}.
\]

---

# Phase 1 — As-built terminal model

Build a metrically defensible \(X_T\).

Required layers:

- outer ideal/as-built geometry;
- surviving geometry;
- casing reconstruction;
- known internal passages/chambers;
- ScanPyramids void/corridor evidence;
- bedrock interface;
- lithology classes;
- uncertainty volumes.

Every geometric primitive gets uncertainty:

\[
p(\mathbf x,\theta).
\]

---

# Phase 2 — King's Chamber negative-space model

Create explicit model of:

- chamber volume;
- walls/floor/ceiling;
- relieving compartments;
- gabled superstructure;
- entry/antechamber;
- shafts;
- surrounding core masonry.

Compute:

1. material complex \(\mathcal K^+\);
2. negative complex \(\mathcal K^-\);
3. clearance field;
4. Reeb/merge representation;
5. \((\tau,r)\) persistence prototype.

---

# Phase 3 — Dependency DAG

Create entity/event graph with typed edges:

\[
E_S,E_G,E_A,E_L,E_V,E_P,E_Q.
\]

Each edge has:

- evidence class;
- confidence;
- supporting source;
- alternative interpretation.

Then enumerate or sample linear extensions.

---

# Phase 4 — Structural Reality Gate

For candidate reverse removals:

1. recompute load path;
2. verify contact/stability;
3. reject mechanically impossible predecessor states.

Start with coarse finite elements, then refine around:

- King's Chamber;
- ceiling beams;
- relieving structures;
- Grand Gallery interfaces.

---

# Phase 5 — Configuration-space access

Model representative block classes as rigid bodies.

Test whether candidate historical sequences permit transport/placement paths in

\[
SE(3).
\]

This can identify “access closure” events that impose chronology independent of height.

---

# Phase 6 — Material provenance

Construct source feature models:

\[
P(q\mid\ell).
\]

Inputs may include:

- petrography;
- fossil assemblage;
- elemental chemistry;
- isotopic markers where appropriate;
- bedding orientation;
- texture.

Couple block-source posteriors to quarry extraction volume.

---

# Phase 7 — Logistics

Build time-dependent network:

\[
\mathcal N(t).
\]

Nodes:

- quarry fronts;
- staging areas;
- harbor/water transport;
- land routes;
- ramp/work fronts.

Edges carry:

- capacity;
- slope;
- distance;
- friction/transport model;
- uncertainty.

Reject histories that are locally possible but globally throughput-incompatible.

---

# Phase 8 — Muography forward model

For a candidate density field,

\[
\rho_H(\mathbf x),
\]

compute line-integrated density

\[
\Sigma(\gamma)
=
\int_\gamma\rho_H\,ds
\]

and predicted muon flux.

Compare candidate histories/void geometries with published or future muographic observations.

This is one of the strongest routes to falsification.

---

# Phase 9 — Bayesian history inference

Latent variables:

\[
Z
=
(
P,
T_b^+,
T_b^-,
Q,
R,
\text{work fronts},
\text{void states}
).
\]

Implement inference by:

- sequential Monte Carlo;
- MCMC over graph structures;
- variational approximations;
- constraint-based search;
- hybrid discrete/continuous inference.

Output should be:

\[
P(H_i\mid Y),
\]

not a single animation.

---

# Phase 10 — Active evidence acquisition

For surviving hypotheses, calculate expected information gain for potential measurements:

- higher-resolution muography;
- photogrammetric block-contact mapping;
- petrographic sampling;
- non-destructive geophysics;
- high-resolution internal scans;
- targeted quarry comparison.

Prioritize:

\[
\arg\max_m \mathrm{EIG}(m).
\]

---

# Phase 11 — External expert review

Invite:

- Egyptologists;
- archaeologists;
- structural engineers;
- geologists;
- muography teams;
- topologists;
- historians of ancient technology.

The expert-review UI should allow a reviewer to mark:

- wrong assumption;
- missing evidence;
- impossible relation;
- alternative chronology;
- stronger source.

---

# Phase 12 — Publication standard

Before calling any result a reconstruction:

- all source data versioned;
- equations reproducible;
- assumptions explicit;
- code public where licensing permits;
- uncertainty propagated;
- alternative histories preserved;
- predictions registered before new evidence where possible.

---

# Minimum publishable experiment

The first serious paper should **not** claim to solve pyramid construction.

A stronger first result would be:

> Given a high-resolution model of the King's Chamber subsystem, demonstrate that the coupled structural/access/topological inverse model excludes a measurable fraction of otherwise geometrically plausible construction sequences.

That is falsifiable, tractable and scientifically defensible.


---

# Fase topológica v1.2–v1.4

1. construir datasets sintéticos con Betti numbers conocidos;
2. voxelizar geometría de Khufu con resolución documentada;
3. calcular \(H_k(V,E)\) mediante complejos cubicales;
4. calcular persistencia por despeje;
5. aplicar zigzag persistence a estados de apertura/cierre;
6. comparar resultados con el grafo proxy del dashboard;
7. medir sensibilidad a resolución y ruido;
8. integrar densidad muográfica como segundo parámetro.

Gate de avance: las invariantes topológicas deben recuperar ground truth en casos sintéticos antes de interpretarse arqueológicamente.
