# Contributions, Novelty Candidates and Boundaries

This document is intentionally conservative. It distinguishes:

1. established mathematics and physics used by the project;
2. integrations that may be original as a framework;
3. project-specific mathematical objects/operators that require formal study;
4. claims that **must not** be presented as discoveries until validated.

---

# 1. Established foundations

The laboratory relies on mature areas:

- inverse problems;
- Bayesian inference;
- graph theory and partial orders;
- rigid-body configuration spaces;
- structural/contact mechanics;
- optimal transport;
- persistent homology;
- Reeb/merge-tree ideas;
- relativistic causal geometry;
- Vaidya and Kerr metrics.

None of these are claimed as invented here.

---

# 2. Framework-level contribution candidate

## 2.1 Terminal-state construction inversion

The first contribution candidate is the integration:

\[
\boxed{
\text{terminal physical object}
\rightarrow
\text{typed predecessor-state distribution}
\rightarrow
\text{construction poset}
\rightarrow
\text{design constraints}.
}
\]

The emphasis is not on visual reconstruction but on evidence-constrained inference over admissible histories.

Potential novelty must be evaluated against:

- inverse procedural modeling;
- 4D BIM;
- archaeological Harris matrices;
- Bayesian chronological modeling;
- assembly/disassembly planning;
- computational archaeology;
- digital twins.

---

# 3. Positive/negative coupled construction ontology

The project proposes modeling a constructed object as

\[
\boxed{
\mathcal A(t)
=
(
\mathcal K^+(t),
\mathcal K^-(t)
)
}
\]

where positive material and deliberately preserved negative space have equal ontological status.

The negative object has its own:

- birth;
- boundary;
- portals;
- topology;
- mass deficit relative to reference;
- dependencies;
- evidence.

This is stronger than simply storing holes in a mesh.

---

# 4. Counterfactual absent mass

The project-specific quantity

\[
\boxed{
m^\ominus(V)
=
-\int_V\rho_{\mathrm{ref}}\,dV
}
\]

is proposed as an interface variable between architectural negative space and density-based observations.

It is explicitly **not** physical negative mass.

Research questions:

- Is the variable mathematically useful beyond ordinary density residuals?
- Does it simplify multimodal inference with muography?
- What reference fields are scientifically defensible?
- How should uncertainty in \(\rho_{\mathrm{ref}}\) propagate?

---

# 5. Inverse gravitational ledger

The project proposes retaining normal gravity while defining a signed reverse energy ledger:

\[
\boxed{
\Delta U^-
=
-\Delta U^+.
}
\]

The possible contribution is not the equation itself, which is trivial, but its use as a **state variable in construction-history inversion** coupled to mass, access and topology.

---

# 6. Construction/void birth fields

Proposed paired fields:

\[
\boxed{
T_b^+(\mathbf x),
\qquad
T_b^-(\mathbf x).
}
\]

\(T_b^+\) records material incorporation; \(T_b^-\) records the moment a spatial region becomes constrained to remain negative space.

This distinction is central because the future chamber may begin to exist as a **constraint** before it exists as a closed room.

---

# 7. Negative-space bifiltration

One of the strongest mathematical contribution candidates is

\[
\boxed{
(\tau,r)\mapsto
V_{\tau,r}
=
\{x\notin M_\tau:d(x,M_\tau)\ge r\}.
}
\]

This combines:

- inverse construction state \(\tau\);
- morphological/clearance scale \(r\).

The goal is to track architectural negative objects through time and scale simultaneously.

Potential tools:

- 2-parameter persistence;
- fibered barcodes;
- rank invariants;
- Reeb graphs;
- merge trees.

This should be compared carefully with existing multiparameter persistent homology and shape-analysis literature before any novelty claim.

---

# 8. Typed inverse admissible frontier

The proposed operator

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
\}
}
\]

combines a construction poset with mechanics, configuration-space access and evidence.

Its scientific value would come from showing that it eliminates historical sequences that remain plausible under any one constraint alone.

---

# 9. Complement-defined accessibility object

Proposed abstraction:

\[
\boxed{
N_{\mathcal R}(\lambda)
=
\Omega
\setminus
\mathrm{Accessible}_{\mathcal R}(\Omega,\lambda).
}
\]

The relation \(\mathcal R\) changes by domain.

This is used to compare:

- architectural exclusion;
- causal non-escape;
- geodesic forbidden regions.

The contribution is an ontological/computational abstraction, **not a new physical equivalence**.

---

# 10. Cross-domain critical-boundary template

The generic condition

\[
\Phi=0,
\qquad
\nabla\Phi=0
\]

is established mathematics in critical-point/bifurcation settings.

The project contribution candidate is using it as a common **interface contract** for detecting accessibility transitions across heterogeneous simulation engines.

---

# 11. Forward / inverse / counterfactual triad

The architecture explicitly separates

\[
\mathcal F:
H\rightarrow Y,
\]

\[
\mathcal I:
Y\rightarrow P(H\mid Y),
\]

and

\[
\mathcal C:
H\rightarrow\widehat Y_H.
\]

The counterfactual engine is not optional: it produces the predictions required to falsify an inverse history.

---

# 12. Epistemic contribution: non-identifiability as output

A key methodological contribution is refusing to force a unique historical solution when

\[
H_1,H_2,\ldots
\]

remain observationally indistinguishable.

The system should report:

- equivalence classes of histories;
- posterior probabilities;
- evidence needed to discriminate them.

This is a direct answer to overconfident narrative generation.

---

# 13. Proposed conjectures

These are **not proven results**.

### Conjecture A — multimodal contraction

Independent evidence modalities should monotonically reduce the admissible history set under correctly specified likelihoods:

\[
\mathcal H_{n+1}
\subseteq
\mathcal H_n
\]

in a set-valued approximation, except when new evidence reveals prior model misspecification.

### Conjecture B — topological chronology bounds

Persistent negative-space events impose non-trivial lower/upper bounds on construction partial orders that cannot be recovered from elevation alone.

### Conjecture C — evidence-optimal sensing

Expected-information-gain selection of future muographic/geometric measurements should discriminate candidate construction graphs more efficiently than uniform measurement refinement.

### Conjecture D — dual-state sufficiency

For certain architectural reconstruction tasks, the coupled state

\[
(\mathcal K^+,\mathcal K^-)
\]

contains substantially more chronological information than material geometry alone.

Each conjecture requires experiment and comparison with baselines.

---

# 14. Claims we explicitly do not make

The project does **not** claim:

- proof of the historical construction method of Khufu;
- discovery of antigravity;
- physical negative mass in the pyramid;
- literal reversal of thermodynamic time;
- that a chamber is physically equivalent to a black hole;
- that Kerr or Vaidya dynamics explain ancient construction;
- that the proposed ontology is mathematically novel before literature review and peer scrutiny.

The correct phrase is:

> **proposed formalism / research hypothesis / contribution candidate**

until validated.
