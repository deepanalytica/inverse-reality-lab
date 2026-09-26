# Inverse Reality Ontology — Full Theory

> **Status:** proposed research framework.  
> **Primary laboratory:** Great Pyramid of Khufu.  
> **Comparative mathematical laboratories:** Vaidya collapse and Kerr null-geodesic accessibility.  
> **Important:** the framework does **not** claim antigravity, physical negative mass, literal backward evolution of nature, or physical equivalence between pyramids and black holes.

---

## 0. Why start from the finished object?

Most historical reconstruction begins with a story:

1. propose a construction method;
2. show that it is plausible;
3. compare it with selected evidence.

Inverse Reality reverses the epistemic direction.

We begin from the terminal object, its measured geometry, materials, voids, structural relationships, lithology, provenance evidence and archaeological context, and ask:

> **What predecessor states are compatible with everything that is observed?**

Let

\[
X_T
\]

denote the terminal **as-built** object at the instant of completion. Let

\[
Y_{\mathrm{now}}
\]

denote the measurements available today. Because the object has changed during roughly 4,600 years, the first inversion is not constructional but post-depositional:

\[
Y_{\mathrm{now}}
\rightarrow
X_{\mathrm{now}}
\rightarrow
X_T
\rightarrow
\Gamma
\rightarrow
D
\rightarrow
C .
\]

Here:

- \(X_{\mathrm{now}}\): reconstructed present physical state;
- \(X_T\): estimated as-built terminal state;
- \(\Gamma\): construction history / typed partial order;
- \(D\): design constraints;
- \(C\): earliest conception state capable of constraining the future object.

This prevents a crucial category error:

\[
\boxed{\text{present pyramid}\neq\text{completed pyramid}}
\]

because casing removal, erosion, fractures, salt weathering, excavation, repairs and human intervention are later operators.

---

## 1. Two inverse problems, not one

Define a forward post-construction evolution operator

\[
\mathcal D_{\text{post}}
\]

such that

\[
X_{\mathrm{now}}
=
\mathcal D_{\text{post}}
(X_T;\Theta_{\text{post}}).
\]

Then define a forward construction operator

\[
\mathcal B
\]

such that

\[
X_T
=
\mathcal B
(C,D,\Gamma;\Theta_{\text{build}}).
\]

The complete observation model is

\[
Y_{\mathrm{now}}
=
\mathcal O
\left[
\mathcal D_{\text{post}}
\left(
\mathcal B(C,D,\Gamma;\Theta_{\text{build}});
\Theta_{\text{post}}
\right)
\right]
+
\varepsilon,
\]

where \(\mathcal O\) is the observation operator and \(\varepsilon\) represents measurement/model error.

Therefore the reconstruction has two logically distinct inverse stages:

\[
\boxed{
\mathcal I_{\text{post}}:
Y_{\mathrm{now}}\rightarrow P(X_T\mid Y_{\mathrm{now}})
}
\]

and

\[
\boxed{
\mathcal I_{\text{build}}:
X_T\rightarrow P(\Gamma,D,C\mid X_T,E,\mathcal L).
}
\]

---

## 2. Reverse time is an inference coordinate

Let \(t\in[0,T]\) denote forward construction time and define

\[
\boxed{\tau=T-t}.
\]

At \(\tau=0\), the structure is complete. Increasing \(\tau\) means that the **inference engine** travels toward earlier states.

The derivatives transform as

\[
\frac{d}{d\tau}=-\frac{d}{dt},
\qquad
\frac{d^2}{d\tau^2}=\frac{d^2}{dt^2}.
\]

This is a coordinate transformation for reconstruction. It does **not** imply that nature itself evolves backward or that dissipative processes spontaneously reverse.

---

## 3. Geometry is not chronology

A first naive reconstruction would remove the pyramid by horizontal height. That is useful as a geometric baseline but is insufficient.

Define a local construction surface

\[
\boxed{h(x,y,t)}
\]

instead of a single global height \(H(t)\).

Two locations at the same elevation can have different construction times:

\[
z_i=z_j
\quad\not\Rightarrow\quad
t_i=t_j.
\]

The quantity we ultimately want is a 4D construction-time field

\[
\boxed{
T_b(x,y,z)
}
\]

for positive material and an analogous reservation/birth field

\[
\boxed{
T_v(x,y,z)
}
\]

for architectural negative space.

These fields are constrained by support, access, geometry, material provenance, structural loads and archaeological evidence.

---

## 4. Positive ontology and negative ontology

### 4.1 Positive material objects

Let the construction domain be \(D\subset\mathbb R^3\). The material domain is

\[
M(t)\subseteq D.
\]

A positive object can be a block, beam, casing stone, mortar interface, bedrock element or structural subassembly.

We represent the material complex by

\[
\boxed{\mathcal K^+(t)}.
\]

### 4.2 Negative architectural objects

The complement is

\[
V(t)=D\setminus M(t).
\]

But not every empty region is an architectural object. A chamber, corridor or shaft is an **organized exclusion of material** whose boundary, portals, function and construction genealogy matter.

We therefore define a negative object

\[
\boxed{
N_j=
\left(
V_j,
\partial_s V_j,
P_j,
\mathcal H_j,
m_j^{\ominus},
\eta_j,
I_j,
\mathcal E_j
\right)
}
\]

where:

- \(V_j\): negative volume;
- \(\partial_sV_j\): structural boundary;
- \(P_j\): intended portals/connections;
- \(\mathcal H_j\): topological signature;
- \(m_j^\ominus\): counterfactual absent mass;
- \(\eta_j\): boundary-realization fraction;
- \(I_j\): identity state;
- \(\mathcal E_j\): evidence/provenance.

This is represented by a negative complex

\[
\boxed{\mathcal K^-(t)}.
\]

The framework therefore models architecture as a coupled pair

\[
\boxed{
\mathcal A(t)=
\big(\mathcal K^+(t),\mathcal K^-(t)\big).
}
\]

---

## 5. Counterfactual absent mass

Take a declared solid reference density \(\rho_{\mathrm{ref}}(\mathbf x)\). For an architectural void \(V_C\), define

\[
\boxed{
m_C^\ominus
=
-\int_{V_C}
\rho_{\mathrm{ref}}(\mathbf x)\,dV.
}
\]

This quantity does **not** gravitate as negative mass. It is a signed accounting variable:

> How much mass would occupy this volume if the chosen reference solid continued through it?

It becomes useful when comparing architecture with density-sensitive observations such as muography.

A density residual field can be written as

\[
\boxed{
\delta\rho(\mathbf x)
=
\rho_{\mathrm{observed}}(\mathbf x)
-
\rho_{\mathrm{ref}}(\mathbf x).
}
\]

An intentional cavity produces a strong negative density residual without implying exotic matter.

---

## 6. A chamber does not have one birth time

A chamber has a genealogy.

Let \(C\) be a target chamber. We distinguish:

1. **reservation event** \(t_R\): its future volume begins to be protected from infill;
2. **boundary emergence** \(t_B\): walls/floor begin to define a recognizable negative cell;
3. **closure event** \(t_C\): roof or equivalent enclosure is established;
4. **structural completion** \(t_S\): relieving/transfer systems required by the chamber are complete;
5. **encapsulation** \(t_E\): later masonry surrounds and embeds the subsystem.

Thus

\[
t_R\le t_B\le t_C\le t_S\le t_E.
\]

Under inverse inference these events disappear in reverse partial order.

A chamber can remain geometrically empty after it has ceased to be a distinct architectural cell. Therefore:

\[
\boxed{
\text{geometric emptiness}
\neq
\text{topological identity}
\neq
\text{architectural identity}.
}
\]

---

## 7. Why ordinary connected components are insufficient

The King's Chamber is connected to other internal spaces through passages. Therefore it cannot be identified merely as a connected component of \(V(t)\).

Instead, define the clearance field

\[
d_M(\mathbf x,t)
=
\operatorname{dist}(\mathbf x,M(t)).
\]

For a scale \(r>0\), define a superlevel negative-space filtration

\[
\boxed{
V_{t,r}
=
\{
\mathbf x\in V(t):
d_M(\mathbf x,t)\ge r
\}.
}
\]

Large chambers survive at larger clearance scales than narrow corridors. This allows chambers, galleries and corridors to appear as distinct persistent structures even when they are path-connected.

The inverse laboratory therefore proposes a **two-parameter filtration**

\[
\boxed{
(\tau,r)\mapsto V_{\tau,r}
}
\]

with:

- \(\tau\): inverse construction state;
- \(r\): geometric clearance scale.

Persistent homology, merge trees or Reeb graphs can be computed over this bifiltration.

This is one of the strongest formal candidates produced by the project.

---

## 8. Typed construction dependencies

Let

\[
\mathcal G=(\mathcal V,\mathcal E)
\]

be a directed acyclic graph or, more generally, a typed partial-order graph.

Edges are not all equivalent. We distinguish at least:

\[
\mathcal E
=
\mathcal E_S
\cup
\mathcal E_G
\cup
\mathcal E_A
\cup
\mathcal E_L
\cup
\mathcal E_V
\cup
\mathcal E_P
\cup
\mathcal E_Q,
\]

representing:

- structural support \(S\);
- geometric precedence \(G\);
- access/configuration-space precedence \(A\);
- load-transfer precedence \(L\);
- void-preservation precedence \(V\);
- procedural precedence \(P\);
- material/provenance precedence \(Q\).

Write

\[
e_i\prec e_j
\]

when \(e_i\) must precede \(e_j\) under the union and transitive closure of these relations.

The set of legal historical sequences is the set of linear extensions of the partial order, additionally filtered by physics and evidence.

---

## 9. The inverse admissible frontier

At inverse state \(X_\tau\), not every exposed element may be removed.

Define the inverse admissible frontier

\[
\boxed{
\mathcal A^-(X_\tau)
=
\left\{
e:
\deg_{\mathcal G_\tau}^{+}(e)=0,
\;
\mathrm{Stable}(X_\tau\setminus e),
\;
\mathrm{Accessible}(e),
\;
\mathrm{EvidenceCompatible}(e)
\right\}.
}
\]

This turns inverse reconstruction into a constrained state-space search rather than a decorative animation.

The process is

\[
X_{\tau+\Delta\tau}
\in
\mathscr R(X_\tau),
\]

where \(\mathscr R\) returns a **distribution** over admissible predecessor states rather than a single deterministic answer.

---

## 10. Structural mechanics as a Reality Gate

For quasi-static equilibrium,

\[
\boxed{
\nabla\cdot\boldsymbol\sigma
+
\rho\mathbf g
=
0.
}
\]

At unilateral contacts, normal gap \(g_n\) and normal contact force \(\lambda_n\) obey complementarity:

\[
g_n\ge0,
\qquad
\lambda_n\ge0,
\qquad
g_n\lambda_n=0.
\]

A Coulomb approximation constrains tangential force:

\[
\|\boldsymbol\lambda_t\|
\le
\mu\lambda_n.
\]

Candidate predecessor states that require impossible support or unstable intermediate geometry can therefore be rejected even if their chronology looks plausible.

---

## 11. Access is a configuration-space problem

A stone is a rigid body, not a point.

Let a block configuration be

\[
q=(\mathbf x,R)\in SE(3).
\]

At construction state \(t\), define free configuration space

\[
\mathcal C_{\mathrm{free}}(t)
=
\left\{
q\in SE(3):
B(q)\cap M(t)=\varnothing
\right\}.
\]

A proposed historical placement is physically accessible only if there exists a continuous path

\[
\gamma_i:[0,1]\rightarrow\mathcal C_{\mathrm{free}}(t)
\]

that also satisfies force, slope, rope/tool and support constraints.

This means that a reconstruction can be rejected because a block could not have reached its final pose after certain surrounding elements already existed.

---

## 12. Reverse gravitational bookkeeping

Gravity remains

\[
\mathbf g=(0,0,-g).
\]

For block \(i\) transported from source elevation \(z_{s,i}\) to final elevation \(z_{f,i}\),

\[
\Delta U_i^+
=
m_i g(z_{f,i}-z_{s,i}).
\]

In the reverse ledger,

\[
\boxed{
\Delta U_i^-
=
-\Delta U_i^+.
}
\]

This does not mean antigravity. It means that the reconstruction tracks the gravitational potential accumulated during forward construction and subtracts it while traveling through inferred predecessor states.

The energy ledger is useful because a candidate construction history must account not just for geometry but for force, work, power and throughput.

---

## 13. Mass, geometry and time are different clocks

Define normalized inverse clocks:

\[
\Gamma_M(\tau)
=
\frac{M_{\mathrm{removed}}(\tau)}{M_T},
\]

\[
\Gamma_G(\tau)
=
\frac{U_{\mathrm{released}}(\tau)}{U_T},
\]

and an optional topological state vector

\[
\Gamma_{\mathcal H}(\tau)
=
\big(
\beta_0,\beta_1,\beta_2,
\mathrm{Reeb},
\mathrm{merge\ tree},
\dots
\big).
\]

Generally,

\[
\boxed{
\tau
\neq
\Gamma_M
\neq
\Gamma_G
\neq
z/H.
}
\]

A reconstruction that equates height with historical time loses exactly the information the inverse method is designed to recover.

---

## 14. Material provenance as probabilistic evidence

For block \(i\), let lithological/geochemical feature vector be

\[
\boldsymbol\ell_i
=
(\text{petrography},\text{fossils},\text{texture},\text{chemistry},\dots).
\]

For candidate quarry source \(q_j\),

\[
\boxed{
P(q_j\mid\boldsymbol\ell_i)
\propto
P(\boldsymbol\ell_i\mid q_j)P(q_j).
}
\]

The source posterior can then be coupled to:

- transport cost;
- quarry extraction volume;
- chronology;
- block dimensions;
- spatial distribution in the monument.

This allows the finished object to constrain its source landscape.

---

## 15. Quarry-to-monument flow as a transport problem

Let \(\mu_Q\) denote available stone measure in source regions and \(\mu_P\) the terminal block/material measure.

A baseline transport prior may be expressed as an optimal-transport problem

\[
\gamma^\star
=
\arg\min_{\gamma\in\Pi(\mu_Q,\mu_P)}
\int
c(q,p,t)\,d\gamma(q,p),
\]

subject to capacity, chronology and route constraints.

This is **not** an assumption that ancient builders globally optimized a modern objective. It is a useful null model: histories that are dramatically more expensive than competing histories require additional evidence.

---

## 16. Logistics and throughput

Let \(f_e(t)\) be flow through logistics edge \(e\), with capacity \(c_e(t)\):

\[
0\le f_e(t)\le c_e(t).
\]

At storage/work nodes,

\[
\sum f_{\mathrm{in}}
-
\sum f_{\mathrm{out}}
=
\frac{dS}{dt}.
\]

The system throughput satisfies

\[
\mu_{\mathrm{system}}
\le
\min_e c_e
\]

at its bottleneck.

A mechanism that can move one block is not necessarily scalable to the full monument.

We therefore distinguish:

\[
\boxed{
\text{possible}
\rightarrow
\text{feasible}
\rightarrow
\text{scalable}
\rightarrow
\text{historically compatible}.
}
\]

---

## 17. Bayesian reconstruction

Let latent reconstruction state be

\[
Z=
(X_T,\mathcal G,T_b,T_v,Q,R,U,D,C,\dots)
\]

and observations be \(Y\).

Then

\[
\boxed{
P(Z\mid Y,\mathcal L)
\propto
P(Y\mid Z,\mathcal L)P(Z).
}
\]

Evidence modalities can be conditionally factorized where justified:

\[
P(Y\mid Z)
=
P(Y_G\mid Z)
P(Y_L\mid Z)
P(Y_\mu\mid Z)
P(Y_S\mid Z)
P(Y_A\mid Z)\cdots
\]

for geometry, lithology, muography, structural and archaeological evidence.

When multiple histories produce effectively the same evidence,

\[
\boxed{
\text{the correct answer is a posterior over histories, not a forced unique narrative.}
}
\]

---

## 18. Identifiability

Suppose two candidate histories \(H_1,H_2\) satisfy

\[
P(Y\mid H_1)
=
P(Y\mid H_2)
\]

for all available observations \(Y\). Then the histories are observationally non-identifiable under the current evidence.

The laboratory treats this as a formal epistemic state.

New evidence \(Y^\star\) is valuable when it maximizes expected discrimination, for example through information gain

\[
\boxed{
\mathrm{EIG}(Y^\star)
=
\mathbb E
\left[
D_{\mathrm{KL}}
\left(
P(H\mid Y,Y^\star)
\|
P(H\mid Y)
\right)
\right].
}
\]

This suggests a practical scientific use: choose future measurements that most reduce uncertainty between construction hypotheses.

---

## 19. Counterfactual prediction and falsification

A candidate history \(H\) must generate predicted present evidence

\[
\widehat Y(H)
=
\mathcal O
\circ
\mathcal D_{\mathrm{post}}
\circ
\mathcal B(H).
\]

Compare it with observations:

\[
d(H)
=
d\big(
Y_{\mathrm{now}},
\widehat Y(H)
\big).
\]

Different evidence channels may use different likelihoods or discrepancies.

A hypothesis becomes scientifically useful when it predicts:

- hidden density patterns;
- block-size distributions;
- quarry signatures;
- construction marks;
- load-transfer geometry;
- inaccessible/accessible corridors;
- expected void continuation;
- measurable structural discontinuities.

---

## 20. Complement-defined objects

Define a generalized accessibility relation \(\mathcal R\). Then

\[
\boxed{
N_{\mathcal R}(\lambda)
=
\Omega
\setminus
\mathrm{Accessible}_{\mathcal R}(\Omega,\lambda).
}
\]

Examples:

- architecture: regions excluded from material occupation or separated under morphological accessibility;
- causal geometry: regions unable to communicate with a target causal boundary;
- Kerr phase space: radial regions not allowed by the geodesic potential.

This is a **mathematical abstraction of complement and accessibility**, not a claim that the physical systems are equivalent.

---

## 21. Critical boundaries

For a scalar constraint field

\[
\Phi(x;\lambda),
\]

define

\[
N_\lambda
=
\{x:\Phi(x;\lambda)<0\}.
\]

A generic candidate critical event occurs when

\[
\boxed{
\Phi(x^\star;\lambda^\star)=0,
\qquad
\nabla_x\Phi(x^\star;\lambda^\star)=0.
}
\]

In a specific system additional non-degeneracy conditions are required.

In Kerr, the analogue is the double-root condition

\[
R(r;b)=0,
\qquad
\frac{\partial R}{\partial r}=0.
\]

In architecture, critical events may correspond to the creation/merger/destruction of negative cells under the \((\tau,r)\) filtration.

---

## 22. Vaidya as a comparison system

For ingoing Vaidya,

\[
ds^2
=
-\left(1-\frac{2m(v)}{r}\right)dv^2
+
2\,dv\,dr
+
r^2d\Omega^2.
\]

A normalized outgoing expansion changes sign at

\[
r=2m(v).
\]

The apparent horizon is quasi-local, while the event horizon depends on the global future causal structure.

The methodological lesson for inverse reconstruction is:

> terminal/global information can constrain earlier states in ways that are not recoverable from purely local observations.

No archaeological evidence is inferred from Vaidya.

---

## 23. Kerr as a comparison system

For equatorial null geodesics, \(E=1\), \(b=L/E\), and

\[
\Delta=r^2-2Mr+a^2,
\]

the radial potential is

\[
\boxed{
R(r;b)
=
[r^2+a^2-ab]^2
-
\Delta(b-a)^2.
}
\]

Allowed radial motion satisfies

\[
R(r;b)\ge0.
\]

A critical light ring obeys

\[
R=0,
\qquad
\partial_rR=0,
\]

creating a separatrix at which the connectedness of the allowed radial set may change.

Again, the transfer is mathematical: **critical accessibility boundaries**.

---

## 24. The three-engine architecture

The full research architecture has three engines.

### Forward engine

\[
\boxed{
\mathcal F:
(C,D,\Gamma)
\rightarrow
X_T
\rightarrow
Y_{\mathrm{now}}.
}
\]

### Inverse engine

\[
\boxed{
\mathcal I:
Y_{\mathrm{now}}
\rightarrow
P(\Gamma,D,C\mid Y).
}
\]

### Counterfactual engine

\[
\boxed{
\mathcal C:
H
\rightarrow
\widehat Y(H).
}
\]

The counterfactual engine is essential because it turns historical proposals into predictions that can fail.

---

## 25. Meta-Harness as epistemic control

Meta-Harness does not decide that a hypothesis is true because a model generated it.

Each claim should carry:

- observation/derivation/inference class;
- evidence references;
- source provenance;
- uncertainty;
- contradictions;
- identifiability status;
- predicted falsifiers;
- model/version/tool lineage.

The desired progression is not simply “low confidence → high confidence” but:

\[
\boxed{
\text{candidate}
\rightarrow
\text{physically admissible}
\rightarrow
\text{evidence compatible}
\rightarrow
\text{discriminated}
\rightarrow
\text{qualified}.
}
\]

---

## 26. The central scientific principle

The terminal object is not merely a result. It is a partially preserved record of its generative process.

Geometry constrains placement.  
Contacts constrain order.  
Loads constrain support.  
Voids constrain exclusion.  
Lithology constrains provenance.  
Damage constrains post-history.  
Quarries constrain extraction.  
Routes constrain logistics.  
Muography constrains density.  
The combined system constrains history.

The framework's central question is therefore:

\[
\boxed{
\text{What histories remain possible after every independent constraint has been applied?}
}
\]

That, rather than a single preferred story, is the object of Inverse Reality.
