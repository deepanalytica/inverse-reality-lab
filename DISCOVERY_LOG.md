# Discovery and Reasoning Log

This file records the conceptual route that produced the current research architecture. It is not a private chain-of-thought record; it is a concise scientific reconstruction of the ideas, assumptions and corrections that matter for reproducibility.

---

## Stage 1 — From “how was it built?” to terminal-state inversion

Initial question:

> How could the Great Pyramid have been built?

Reformulated question:

> If the pyramid already exists in completed form, what had to be true immediately before that state?

This converts narrative archaeology into an inverse problem:

\[
X_T
\rightarrow
P(X_{T-\Delta t}\mid X_T,E).
\]

---

## Stage 2 — Realization that the modern pyramid is not the terminal construction state

The present pyramid has undergone:

- casing loss;
- erosion;
- fractures;
- salt/weather effects;
- excavation;
- human alteration.

Therefore reconstruction needs:

\[
Y_{\mathrm{now}}
\rightarrow
X_{\mathrm{as-built}}
\]

before attempting

\[
X_{\mathrm{as-built}}
\rightarrow
\text{construction history}.
\]

This produced the two-stage inverse architecture.

---

## Stage 3 — Height cannot be used as historical time

The first reverse animation suggested removing horizontal layers.

That exposed a problem:

\[
z
\neq
t.
\]

A local construction surface

\[
h(x,y,t)
\]

and eventual birth-time field

\[
T_b(x,y,z)
\]

are required because different work fronts could evolve simultaneously.

---

## Stage 4 — The King's Chamber creates a partial-order problem

A chamber at an internal elevation cannot simply disappear when the reverse front reaches its floor.

Before the chamber can be inversely dismantled, later structures that depend on it must be undone.

This produced:

- causal/dependency cones;
- typed precedence edges;
- inverse maximal elements;
- partial-order rather than linear chronology.

---

## Stage 5 — Empty space is an object

A chamber is not only an absence.

It is a spatial region that had to remain unfilled while surrounding matter accumulated.

This produced the dual ontology:

\[
\mathcal K^+
\quad\text{and}\quad
\mathcal K^-.
\]

Matter and designed non-matter become first-class entities.

---

## Stage 6 — Counterfactual absent mass

To connect negative architecture with density observations, the project introduced

\[
m^\ominus
=
-\int_V\rho_{\mathrm{ref}}dV.
\]

Important correction:

This is **not** physical negative mass. It is a signed deficit relative to a chosen solid reference.

---

## Stage 7 — Inverse gravity was corrected

The phrase “reverse gravity” initially risked implying

\[
\mathbf g\rightarrow-\mathbf g.
\]

That is unnecessary and physically misleading.

The correct reconstruction variable is:

\[
\Delta U^-
=
-\Delta U^+,
\]

while

\[
\mathbf g
\]

remains unchanged.

Thus the framework uses reverse **accounting of gravitational potential/work**, not antigravity.

---

## Stage 8 — Friction prevents literal microscopic time reversal

Real construction dissipates energy.

Therefore inverse reconstruction cannot mean physically replaying the microscopic dynamics backward.

The inverse engine instead asks:

> Which predecessor states, evolved forward under normal physics, are compatible with the terminal state?

This is a Bayesian/constraint inversion, not a thermodynamic reversal.

---

## Stage 9 — Ordinary topology is insufficient for chambers connected by corridors

The King's Chamber is connected to other internal spaces.

Therefore connected-component topology alone cannot define chamber identity.

This motivated a clearance field

\[
d_M(x)=\operatorname{dist}(x,M)
\]

and filtration

\[
V_{\tau,r}
=
\{
x:d_M(x,\tau)\ge r
\}.
\]

Large chambers persist at scales where narrow corridors disappear.

This produced the negative-space bifiltration.

---

## Stage 10 — Structural mechanics becomes a historical filter

Final geometry alone permits many sequences.

But intermediate states must satisfy:

\[
\nabla\cdot\sigma+\rho g=0
\]

and contact/stability constraints.

A historically proposed sequence can therefore be eliminated because its intermediate structure would not stand.

---

## Stage 11 — Access must live in configuration space

Blocks are rigid bodies.

A placement requires a path in

\[
SE(3),
\]

not merely a line through 3D space.

This introduced configuration-space accessibility as another precedence generator.

---

## Stage 12 — Lithology allows the object to point back toward its quarry

Block composition and orientation can produce source posteriors

\[
P(q_j\mid\ell_i).
\]

Coupled with quarry volume and transport networks, terminal material distributions constrain source geography and logistics.

---

## Stage 13 — The pyramid becomes a network-flow system

A construction mechanism must scale.

The distinction emerged:

\[
\text{possible}
\neq
\text{scalable}.
\]

This introduced flow capacities, buffers, bottlenecks and global throughput as historical constraints.

---

## Stage 14 — Vaidya introduced local/global accessibility

In Vaidya collapse, apparent and event horizons illustrate that a global terminal/future condition can constrain an earlier causal boundary.

The project did **not** transfer black-hole physics to archaeology. It extracted a methodological lesson:

> global accessibility can contain information unavailable to local state variables.

---

## Stage 15 — Kerr introduced accessibility bifurcation

For equatorial null geodesics,

\[
R(r;b)\ge0
\]

defines allowed radial states.

At

\[
R=0,
\qquad
\partial_rR=0,
\]

a critical separatrix appears.

This suggested treating topological changes in admissible state spaces through generic critical-boundary conditions.

---

## Stage 16 — Complement-defined object

The common abstraction became

\[
N_{\mathcal R}
=
\Omega
\setminus
\mathrm{Accessible}_{\mathcal R}(\Omega).
\]

This allowed architectural, causal and phase-space complements to share a computational interface without asserting equal physics.

---

## Stage 17 — Counterfactual engine becomes mandatory

Inverse inference alone can generate convincing stories.

Scientific reconstruction requires each history \(H\) to produce predicted evidence:

\[
H
\rightarrow
\widehat Y_H.
\]

The hypothesis is useful only if \(\widehat Y_H\) can disagree with reality.

---

## Stage 18 — Non-identifiability becomes an explicit answer

If multiple histories survive every current constraint, the correct result is

\[
P(H_1,H_2,\ldots\mid Y),
\]

not forced certainty.

The next scientific question becomes:

> What new measurement would maximally discriminate the surviving histories?

This introduced expected information gain and active experiment design.

---

## Current synthesis

The project now treats the finished object as:

\[
\boxed{
\text{geometry}
+
\text{matter}
+
\text{negative space}
+
\text{loads}
+
\text{contacts}
+
\text{provenance}
+
\text{accessibility}
+
\text{post-history}
+
\text{evidence}
}
\]

and seeks:

\[
\boxed{
P(
\text{construction histories}
\mid
\text{terminal object},
\text{evidence},
\text{laws}
).
}
\]

The Great Pyramid is the primary falsifiable laboratory for this program.
