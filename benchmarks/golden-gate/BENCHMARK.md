# IRL-Bench 001 — Golden Gate Bridge

## Objective

Test whether the Inverse Reality Laboratory (IRL) can recover major construction precedence relations and mechanism classes from a terminal suspension-bridge ontology before consulting the documented chronology.

This is a **coarse controlled benchmark**, not yet a full block/member-resolved inverse solver.

## Blind-input layer

The inference layer is allowed to use terminal/as-built structural facts:

- suspension bridge with two towers, two main cables, anchorages, vertical suspenders, stiffening/deck structure and foundations;
- main span: 1,280 m;
- tower height: 227 m;
- suspender spacing: 50 ft ≈ 15.24 m;
- both towers: ≈40.2 million kg total;
- cable+suspender system: ≈22.2 million kg;
- each main cable: ≈2,332 m long, 27,572 wires;
- load path: deck → suspenders → main cables → towers/anchorages → foundations.

The inference stage deliberately does **not** use construction dates or named historical machinery.

## Terminal support ontology

Nodes:

- P — tower piers/foundations
- A — anchorages
- T — towers
- M — main cables
- S — local suspender system
- D — suspended deck/stiffening structure
- R — roadway/paving

Core inferred precedence constraints:

[
Pprec T
]

[
Aprec M
]

[
Tprec M
]

[
Mprec S_jprec D_j
]

[
Dprec R
]

The model does not impose a strict order between tower erection and anchorage construction except where required by later convergence at the cable stage. This permits parallel work.

## Combinatorial result

Seven unconstrained milestones admit

[
7!=5040
]

serial orders.

The core terminal support graph admits only **3 linear extensions**:

1. P → A → T → M → S → D → R
2. P → T → A → M → S → D → R
3. A → P → T → M → S → D → R

Thus the coarse terminal ontology reduces the serial search space by

[
1-rac{3}{5040}=99.9405%.
]

This is not proof of historical uniqueness. It demonstrates that final structural dependencies alone encode strong chronological information while preserving parallel/partially ordered branches.

## Hidden temporary topology prediction

Before the final main cable exists, cable formation requires repeated traversal/support across the strait near the future cable trajectory.

Let

[
mathcal C_{mathrm{worker}}(t)
]

be the worker/process accessibility space. Without temporary aerial infrastructure, the elevated construction-access topology across the channel is disconnected for the cable-forming operation.

IRL therefore introduces a latent temporary object (C):

[
T,Aprec Cprec M.
]

This object is not present in the terminal bridge.

Interpretation: a temporary aerial access/guide/support topology must exist before completion of the main cables.

After adding the latent temporary node:

[
8!=40320
]

unconstrained orders become only **3 admissible linear extensions**, a reduction of

[
99.9926%.
]

### Historical reveal

The documented construction used wire-supported footwalks/catwalks from August 2 to September 27, 1935, before main cable spinning began in October 1935.

Therefore the **class of hidden temporary topology predicted by the inverse model is present in the historical record**.

The terminal object does not uniquely identify the exact catwalk design; it identifies the need for an aerial temporary accessibility/support class.

## Mechanism inversion 1 — towers

Official terminal mass data give approximately

[
M_T approx rac{40.2	imes10^6}{2}
=20.1	imes10^6 {m kg}
]

per tower.

Monolithic weight would be

[
W_T=M_Tgapprox197.1 {m MN}.
]

For a rough uniform-height baseline, gravitational potential relative to the base is

[
U_Tapprox M_Tgrac{H}{2}
approx22.37 {m GJ}
]

per tower, before losses.

A single-piece erection is therefore an extremely poor construction decomposition. A minimum-peak-load objective strongly favors modular erection.

Because required lift height increases with the growing tower, minimizing independent external falsework favors a lifting system that can use the already-completed tower as its changing support/reach structure.

### Blind inference class

**Predicted:** modular prefabricated tower sections + vertically advancing/self-elevating lifting support.

### Historical reveal

The towers were built from prefabricated steel sections using a **climbing derrick**: a temporary crane platform was raised as the tower grew.

The mechanism class matches; exact derrick design is not uniquely recoverable from the terminal bridge.

## Mechanism inversion 2 — main cables

Official terminal cable ontology:

- length per cable ≈2,332 m;
- mass per cable ≈12,000 US tons ≈10.886 million kg;
- 27,572 parallel wires per cable.

A monolithic lift requires instantaneous support of approximately

[
W_Capprox106.8 {m MN}
]

per cable, distributed across a 2.3 km object.

But the final cable is already ontologically decomposed into 27,572 wires. A simple average mass scale is

[
m_{m wire}
approx
rac{10.886	imes10^6}{27572}
approx395 {m kg}.
]

The ratio of monolithic cable mass to average wire mass is therefore approximately

[
2.76	imes10^4.
]

This makes an incremental in-situ formation process vastly more favorable under a maximum-unit-load objective.

### Blind inference class

**Predicted:** form the final cable in situ through repeated placement/traversal of small wire elements between completed anchorages and towers, followed by bundling/compaction.

### Historical reveal

The cables were formed by **aerial spinning**: wire was repeatedly drawn from anchorage to anchorage over both towers, grouped into strands and compacted.

This is a strong mechanism-class recovery from terminal micro-ontology plus geometry.

## Mechanism inversion 3 — suspended deck

Suspenders are spaced at approximately

[
Delta x=15.24 {m m}.
]

A simplified Golden Gate educational structural model uses a total deck load of approximately

[
wapprox330 {m kN/m}.
]

A 50-ft support bay therefore corresponds to a load scale

[
W_{m bay}
=wDelta x
approx5.03 {m MN},
]

or about

[
513 {m tonnes}
]

of equivalent supported mass.

The final topology already supplies an aerial support system at each suspender station. Therefore the minimum-temporary-structure solution is to use the final cable/suspender system to support modular deck erection instead of building falsework from below.

For a module of weight (W) erected an offset (x) from a tower, an unbalanced first-order moment scale is

[
M_u=Wx.
]

Installing approximately symmetric modules on opposing sides suppresses the first-order imbalance:

[
M_u^{(+)}+M_u^{(-)}approx0.
]

### Blind inference class

**Predicted:** modular suspended deck erection after main cable completion, proceeding in a balanced/symmetric fashion around major support points.

### Historical reveal

The documented deck was erected in sections from the towers in a balanced manner, hung from the suspenders. No temporary support under the main span was required after the main suspension system existed.

## Historical chronology reveal

Official Golden Gate Bridge records document:

- tower piers/anchorages beginning in 1933;
- Marin tower erection beginning November 1933;
- San Francisco tower erection January–June 1935;
- temporary footwalk/catwalk support wires August–September 1935;
- main cable spinning October 1935–May 1936;
- suspended structure June–December 1936;
- roadway January–April 1937.

These observations are consistent with all core IRL precedence constraints.

## Precedence benchmark result

For the strict major dependencies tested here, no contradiction was found between the inverse dependency graph and the documented construction timeline.

The result should be described as:

> **core precedence consistency: 100% on the selected strict dependency set**

not as 100% reconstruction accuracy of the whole bridge.

The benchmark does not yet score thousands of individual members, temporary works, start/finish overlap or exact dates.

## Residual-force experiment

Define an unexplained external field:

[
mathbf F_X
=
mathbf F_{m required}
-
sum_k mathbf F_{{m known},k}.
]

The inverse objective is

[
oxed{
min_{H,mathcal T,mathbf F_X}
int
|mathbf F_X|^2,dV,dt
+
lambda_T C(mathcal T)
+
lambda_H C(H)
}
]

subject to terminal-state, equilibrium, access and evidence constraints.

Here (H) is construction history and (mathcal T) temporary infrastructure.

### Golden Gate outcome

Once the inferred mechanism classes are admitted—

- modular lifting;
- self-elevating tower lifting support;
- temporary aerial access;
- incremental cable spinning;
- suspension-supported modular deck erection—

the coarse model has a conventional-mechanics feasible path.

Therefore

[
oxed{
mathbf F_X^starapprox0
}
]

at this resolution.

No gravity-control/antigravity term is required.

This is an important calibration result: IRL should not produce exotic residual physics merely because the terminal object is massive.

## What happens if process ontology is artificially removed?

If the model forbids temporary/modular construction and tries to lift final components monolithically, apparent force deficits become enormous:

- one tower: (sim197) MN weight;
- one main cable: (sim107) MN weight;
- one 50-ft deck load slice: (sim5.03) MN.

Those are **modeling residuals caused by missing construction ontology**, not evidence of unknown physics.

This benchmark therefore establishes a crucial rule:

[
oxed{
	ext{No new physics before latent temporary topology and process decomposition are exhausted.}
}
]

## Main discovery from IRL-Bench 001

The most interesting result is not that the load-path order was recovered; much of that follows naturally from suspension-bridge mechanics.

The stronger result is that the inverse framework can predict **temporary objects absent from the terminal state** when a process would otherwise be topologically inaccessible.

For Golden Gate:

[
oxed{
	ext{terminal cable topology}
+
	ext{configuration-space constraint}
Rightarrow
	ext{temporary aerial access/support topology}.
}
]

The historical catwalk provides a positive control for that class of inference.

## Limitations

This first benchmark is manual/coarse and uses aggregate structural nodes. It does not yet:

- infer dates automatically;
- recover exact derrick geometry;
- model individual tower members/rivets;
- perform nonlinear finite-element erection analysis;
- infer catwalk geometry uniquely;
- model wind/tide construction loads;
- search a complete historical mechanism library.

The correct interpretation is **proof of concept for IRL-Bench**, not validation of the full inverse-reconstruction theory.

## Primary sources

Golden Gate Bridge, Highway and Transportation District:

- Construction timeline: https://www.goldengate.org/bridge/history-research/bridge-construction/construction/
- Design & construction statistics: https://www.goldengate.org/bridge/history-research/statistics-data/design-construction-stats/
- Tower construction: https://www.goldengate.org/exhibits/worlds-tallest-bridge-towers/
- Main cable spinning: https://www.goldengate.org/exhibits/spinning-the-main-cables/
- Roadway deck erection: https://www.goldengate.org/exhibits/hanging-the-roadway-deck/
- Load path: https://www.goldengate.org/exhibits/how-the-bridge-spans-the-golden-gate/
