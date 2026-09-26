# Ontology Specification

## 1. Purpose

The ontology must represent not only *what the pyramid contains*, but also:

- what it deliberately does not contain;
- when each material or negative-space entity begins to exist;
- what depends on what;
- which relationships are observed versus inferred;
- which construction histories remain admissible.

The central design principle is:

\[
\boxed{
\text{Object}
=
\text{entities}
+
\text{relations}
+
\text{time}
+
\text{evidence}
+
\text{uncertainty}.
}
\]

---

# 2. Core entity classes

## 2.1 MaterialEntity

Examples:

- CoreBlock
- CasingBlock
- GraniteBeam
- MortarJoint
- BedrockElement
- FloorElement
- WallElement
- GableElement
- TemporarySupport (hypothetical unless evidenced)

Required attributes:

\[
\{
id,
geometry,
pose,
material,
density,
mass,
provenance,
damage,
evidence
\}.
\]

## 2.2 NegativeEntity

Examples:

- Chamber
- Corridor
- Shaft
- Gallery
- Void
- TemporaryConstructionVoid
- UnknownDensityAnomaly

Attributes:

\[
\{
volume,
boundary,
portals,
clearance,
topological\ signature,
m^\ominus,
identity\ state
\}.
\]

## 2.3 Event

Examples:

- ExtractionEvent
- DressingEvent
- TransportEvent
- PlacementEvent
- BoundaryEmergenceEvent
- ClosureEvent
- EncapsulationEvent
- DamageEvent
- CasingRemovalEvent
- RestorationEvent

## 2.4 Process

Examples:

- Quarrying
- RiverTransport
- LandTransport
- RampTransport
- Placement
- Surveying
- Weathering
- SaltCrystallization
- HumanRemoval

## 2.5 Evidence

Evidence is never represented as unqualified truth.

Evidence classes:

\[
\boxed{
Observed,
Reported,
Derived,
Inferred,
Hypothetical,
Counterfactual.
}
\]

Each Evidence node contains:

\[
\{
source,
date,
instrument,
resolution,
uncertainty,
provenance,
license,
citation
\}.
\]

---

# 3. Relation vocabulary

## Structural relations

- supports
- supportedBy
- transfersLoadTo
- contacts
- overlapsLoadCone
- stabilizes

## Geometric relations

- above
- below
- adjacentTo
- intersects
- encloses
- containedIn
- alignedWith

## Negative-space relations

- bounds
- portalTo
- connectedBy
- mergesWith
- separatesFrom
- reserves
- excludesMaterialFrom

## Chronological relations

- precedes
- follows
- overlapsInTime
- mustPrecede
- possiblyPrecedes
- contemporaneousWith

## Provenance relations

- extractedFrom
- lithologicallyCompatibleWith
- transportedFrom
- processedAt

## Epistemic relations

- supportedByEvidence
- contradictedByEvidence
- inferredFrom
- predictedBy
- falsifiedBy
- unresolvedAgainst

---

# 4. Lifecycle of a negative architectural object

For negative object \(N\), define state machine:

\[
\boxed{
\text{unassigned}
\rightarrow
\text{reserved}
\rightarrow
\text{emergent}
\rightarrow
\text{bounded}
\rightarrow
\text{structurally complete}
\rightarrow
\text{encapsulated}.
}
\]

Inverse traversal:

\[
\boxed{
\text{encapsulated}
\rightarrow
\text{structurally exposed}
\rightarrow
\text{unbounded}
\rightarrow
\text{merged}
\rightarrow
\text{unassigned}.
}
\]

A chamber's volume may remain empty in the geometric sense while its architectural identity has already disappeared.

---

# 5. King's Chamber first-subgraph specification

The King's Chamber research subgraph should eventually include at least:

- floor;
- four wall systems;
- entrance/antechamber relation;
- ceiling beams;
- relieving compartments;
- upper gabled system;
- shafts and interfaces;
- neighboring core masonry;
- access paths required to place granite elements;
- probable source/provenance nodes for granite;
- later overburden/load descendants.

The ontology does **not** assume a unique construction sequence. Instead it stores constraints such as

\[
e_i\prec e_j
\]

with an EvidenceRef and uncertainty for each relation.

---

# 6. Positive and negative time fields

For material:

\[
T_b^+(\mathbf x)
=
\text{time at which material at }\mathbf x\text{ becomes part of the object}.
\]

For negative-space reservation:

\[
T_b^-(\mathbf x)
=
\text{time at which }\mathbf x\text{ becomes intentionally constrained to remain non-material}.
\]

For identity:

\[
T_I(N)
=
[t_{\mathrm{birth}},t_{\mathrm{death}}]
\]

under a specified identity criterion.

These fields make it possible for a chamber to begin existing **before** its final roof exists.

---

# 7. Evidence-aware graph edge

Every inferred edge should be a structured object:

\[
e_{ij}
=
(
i,j,
type,
p,
E^+,
E^-,
assumptions,
model
).
\]

Where:

- \(p\): posterior/provisional probability;
- \(E^+\): supporting evidence;
- \(E^-\): contradictory evidence.

No construction dependency should exist only because an LLM narrated it.

---

# 8. Multi-scale negative-space topology

Because rooms and corridors may belong to one connected free-space component, topology is evaluated at scale.

Define

\[
V_{\tau,r}
=
\{
x:
x\notin M_\tau,
\ d(x,M_\tau)\ge r
\}.
\]

Then track:

- connected components \(\beta_0\);
- loops \(\beta_1\);
- cavities \(\beta_2\);
- merge-tree nodes;
- Reeb graph nodes;
- persistence intervals.

The intended result is an identity system in which “King's Chamber”, “Grand Gallery” and “corridor” emerge as geometrically persistent negative cells rather than arbitrary semantic labels.

---

# 9. Ontological distinction: unknown void vs designed void

A density anomaly is not automatically a chamber.

Define:

\[
\text{DensityAnomaly}
\neq
\text{ArchitecturalVoid}.
\]

A proposed promotion path is:

\[
\text{anomaly}
\rightarrow
\text{geometric void candidate}
\rightarrow
\text{bounded negative cell}
\rightarrow
\text{architectural interpretation}.
\]

Each transition requires separate evidence.

---

# 10. Ontological distinction: causal dependency vs physical support

If \(A\) supports \(B\), then often

\[
A\prec B,
\]

but construction precedence can exist without final support, and final support can sometimes be modified by temporary works.

Therefore:

\[
\boxed{
\text{supports}
\neq
\text{mustPrecede}.
}
\]

The ontology deliberately keeps them separate.

---

# 11. State of knowledge

For any Claim node:

\[
K(c)
=
[
class,
support,
contradiction,
uncertainty,
identifiability,
falsifiers
].
\]

Recommended classes:

- OBSERVED
- DERIVED
- INFERRED
- HYPOTHESIS
- COUNTERFACTUAL
- UNKNOWN

This allows the UI to show researchers exactly where the model stops being evidence and begins being inference.
