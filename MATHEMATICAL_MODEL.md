# Mathematical Model and Derivations

This document separates **established mathematics/physics** from **project-specific operators and proposed formalism**.

---

# Part I — Baseline geometry of an ideal square pyramid

Let:

- base side \(a\);
- completed height \(H\);
- vertical coordinate \(z\in[0,H]\);
- normalized height \(u=z/H\).

The side length of a horizontal section is

\[
s(z)
=
a\left(1-\frac{z}{H}\right)
=
a(1-u).
\]

Hence the sectional area is

\[
\boxed{
A(z)
=
a^2
\left(1-\frac{z}{H}\right)^2.
}
\]

The total volume is

\[
V
=
\int_0^H
A(z)\,dz
=
a^2H
\int_0^1
(1-u)^2\,du
=
\boxed{\frac{a^2H}{3}}.
\]

---

## 1. Volume and mass above a reverse front

For a reverse front at height \(z=Hu\), the material geometrically above it has volume

\[
V_{>}(u)
=
\int_{Hu}^{H}
A(z)\,dz.
\]

Substituting \(z=Hx\),

\[
V_{>}(u)
=
a^2H
\int_u^1
(1-x)^2\,dx
=
\frac{a^2H}{3}(1-u)^3.
\]

Therefore

\[
\boxed{
\frac{V_{>}(u)}{V}
=
(1-u)^3.
}
\]

For uniform density,

\[
\boxed{
\Gamma_M(u)
=
\frac{M_{\mathrm{removed}}}{M}
=
(1-u)^3.
}
\]

This is the correct geometric baseline for ideal top-down disassembly.

---

## 2. Remaining volume below the front

\[
\frac{V_{\le}(u)}{V}
=
1-(1-u)^3
=
\boxed{
3u-3u^2+u^3.
}
\]

This immediately shows why height is not proportional to mass.

At \(u=1/2\),

\[
\Gamma_M(1/2)=\frac18.
\]

Removing the upper half of the pyramid by height removes only \(12.5\%\) of the ideal uniform volume.

---

# Part II — Gravitational potential baseline

For uniform density \(\rho\), differential mass is

\[
dm
=
\rho A(z)\,dz.
\]

The gravitational potential energy relative to the base is

\[
U
=
\int_0^H
gz\,dm
=
\rho g
\int_0^H
zA(z)\,dz.
\]

Substitute \(z=Hx\):

\[
U
=
\rho g a^2H^2
\int_0^1
x(1-x)^2dx.
\]

Since

\[
\int_0^1
x(1-x)^2dx
=
\frac1{12},
\]

we obtain

\[
U
=
\frac{\rho a^2gH^2}{12}.
\]

Using

\[
M=\frac{\rho a^2H}{3},
\]

the total potential becomes

\[
\boxed{
U
=
\frac14MgH.
}
\]

Thus the center of mass of an ideal uniform pyramid lies at

\[
\boxed{z_{\mathrm{COM}}=H/4}.
\]

---

## 3. Potential energy above the reverse front

\[
U_{>}(u)
=
\rho g a^2H^2
\int_u^1
x(1-x)^2dx.
\]

The primitive is

\[
F(x)
=
\frac{x^2}{2}
-
\frac{2x^3}{3}
+
\frac{x^4}{4}.
\]

Therefore

\[
U_{>}(u)
=
\rho g a^2H^2
\left[
\frac1{12}
-
\frac{u^2}{2}
+
\frac{2u^3}{3}
-
\frac{u^4}{4}
\right].
\]

Divide by \(U=\rho g a^2H^2/12\):

\[
\boxed{
\Gamma_G(u)
=
\frac{U_{>}(u)}{U}
=
1
-
6u^2
+
8u^3
-
3u^4.
}
\]

This is the fraction of baseline gravitational potential associated with material above the front.

At \(u=1/2\),

\[
\Gamma_G(1/2)
=
1
-
6\left(\frac14\right)
+
8\left(\frac18\right)
-
3\left(\frac1{16}\right)
=
\frac5{16}
=
31.25\%.
\]

Thus the top \(12.5\%\) of ideal mass contains \(31.25\%\) of the total gravitational potential relative to the base.

This demonstrates why mass and gravitational-energy clocks are intrinsically different.

---

# Part III — Reverse-time coordinate

Define

\[
\boxed{\tau=T-t}.
\]

Then

\[
\frac{dX}{d\tau}
=
-\frac{dX}{dt},
\]

and

\[
\frac{d^2X}{d\tau^2}
=
\frac{d^2X}{dt^2}.
\]

If forward dynamics are

\[
m\ddot{\mathbf x}
=
m\mathbf g+\mathbf F,
\]

the coordinate change does not reverse gravity:

\[
m\frac{d^2\mathbf x^-}{d\tau^2}
=
m\mathbf g+\mathbf F^-.
\]

The project therefore defines **inverse gravitational bookkeeping**, not inverse gravitational physics.

---

# Part IV — Signed construction mass

Physical mass is always non-negative:

\[
m_i>0.
\]

A reverse removal event is represented by a signed ledger increment

\[
\boxed{
dm^-=-dm^+.
}
\]

Cumulative reverse material accounting is

\[
M^-(\tau)
=
-\sum_{i\in R(\tau)}m_i,
\]

while mass still present is

\[
M_{\mathrm{present}}(\tau)
=
M_T+M^-(\tau).
\]

No negative-mass physics is implied.

---

# Part V — Counterfactual absent mass

Let \(V_C\) be a target architectural negative volume and \(\rho_{\mathrm{ref}}(\mathbf x)\) a declared reference material field.

Define

\[
\boxed{
m_C^\ominus
=
-\int_{V_C}
\rho_{\mathrm{ref}}(\mathbf x)\,dV.
}
\]

For a simple constant-density demonstration,

\[
m_C^\ominus
=
-\rho_{\mathrm{ref}}V_C.
\]

Using an illustrative rectangular King's Chamber approximation

\[
V_C
\approx
10.5\times5.2\times5.8
\approx
316.68\ \mathrm{m^3}
\]

and a limestone reference

\[
\rho_{\mathrm{ref}}\approx2.6\ \mathrm{t/m^3},
\]

one obtains

\[
m_C^\ominus
\approx
-823\ \mathrm{t\text{-}equivalent}.
\]

This is **only a reference deficit**, not the actual mass of removed construction material and not gravitational negative mass.

---

# Part VI — Boundary realization of a negative object

Let \(C\) be the target chamber volume and \(\partial C\) its target boundary.

A mathematically cleaner boundary-completion measure than a direct set intersection uses an \(\varepsilon\)-neighborhood:

\[
\boxed{
\eta_C(t;\varepsilon)
=
\frac1{\operatorname{Area}(\partial C)}
\int_{\partial C}
\mathbf 1
\left[
d(\mathbf x,M(t))
\le\varepsilon
\right]
\,dA.
}
\]

Then

\[
0\le\eta_C\le1.
\]

Interpretation:

- \(\eta_C\approx0\): target boundary not yet materially realized;
- \(0<\eta_C<1\): partial enclosure;
- \(\eta_C\approx1\): boundary largely realized.

This quantity alone does not define architectural identity; topology and portals must also be considered.

---

# Part VII — Negative-space bifiltration

Define material distance field

\[
d_M(\mathbf x,\tau)
=
\operatorname{dist}
(
\mathbf x,M(\tau)
).
\]

For clearance scale \(r\),

\[
\boxed{
V_{\tau,r}
=
\{
\mathbf x\in D\setminus M(\tau):
d_M(\mathbf x,\tau)\ge r
\}.
}
\]

The family

\[
(\tau,r)\mapsto V_{\tau,r}
\]

is a two-parameter filtration.

For fixed \(\tau\), varying \(r\) removes narrow passages before large chambers, exposing spatial hierarchy.

For fixed \(r\), varying \(\tau\) follows the emergence/disappearance of negative structures under inverse reconstruction.

Candidate observables include

\[
H_k(V_{\tau,r}),
\quad
\beta_k(\tau,r),
\]

as well as merge trees and Reeb graphs.

This is a proposed formal device for distinguishing chambers from corridors even when the complete free-space domain is connected.

---

# Part VIII — Typed partial order

Let

\[
P=(E,\prec)
\]

be a finite poset of construction entities/events.

The historical chronology is not a single sequence. Any valid total order

\[
\pi=(e_{\pi(1)},\ldots,e_{\pi(n)})
\]

must be a linear extension:

\[
e_i\prec e_j
\Rightarrow
\pi^{-1}(e_i)
<
\pi^{-1}(e_j).
\]

Let

\[
\mathcal L(P)
\]

denote the set of all linear extensions.

Inverse reconstruction seeks a posterior over posets and/or extensions:

\[
\boxed{
P(P,\pi\mid Y)
=
P(\pi\mid P,Y)P(P\mid Y).
}
\]

This explicitly preserves parallelism and uncertainty.

---

# Part IX — Admissible inverse frontier

Let the current partial order be \(P_\tau\).

A purely graph-theoretic removable set is

\[
\operatorname{Max}(P_\tau)
=
\{
e:
\nexists f\text{ such that }e\prec f
\}.
\]

Physics narrows it:

\[
\boxed{
\mathcal A^-(X_\tau)
=
\left\{
e\in\operatorname{Max}(P_\tau):
S_e\land A_e\land G_e\land E_e
\right\},
}
\]

where:

- \(S_e\): structural stability after removal;
- \(A_e\): access/configuration-space feasibility;
- \(G_e\): geometry/contact compatibility;
- \(E_e\): evidence compatibility.

The inverse operator returns

\[
\mathscr R(X_\tau)
=
P(X_{\tau+\Delta\tau}\mid X_\tau,Y,\mathcal L).
\]

---

# Part X — Structural/contact constraints

Quasi-static equilibrium:

\[
\nabla\cdot\boldsymbol\sigma
+
\rho\mathbf g
=
0.
\]

For non-penetrating contact:

\[
g_n\ge0,
\qquad
\lambda_n\ge0,
\qquad
g_n\lambda_n=0.
\]

Coulomb cone:

\[
\boxed{
\|\boldsymbol\lambda_t\|
\le
\mu\lambda_n.
}
\]

A candidate predecessor state is rejected if the forward reconstruction from it requires a mechanically impossible intermediate state.

---

# Part XI — Access in \(SE(3)\)

Represent a rigid block pose by

\[
q=(\mathbf x,R)\in SE(3).
\]

Define

\[
\boxed{
\mathcal C_{\mathrm{free}}(t)
=
\left\{
q:
B(q)\cap M(t)=\varnothing
\right\}.
}
\]

A valid placement/removal path requires

\[
\gamma:[0,1]\to\mathcal C_{\mathrm{free}}(t)
\]

with continuous position and orientation, plus tool/force constraints.

This is stronger than checking whether a 3D line exists between two points.

---

# Part XII — Force and work along a ramp

For slope \(\theta\), mass \(m\), and sliding-friction coefficient \(\mu\), an idealized required pulling force is

\[
\boxed{
F
=
mg(\sin\theta+\mu\cos\theta).
}
\]

To gain vertical height \(h\), ramp length is

\[
L=\frac{h}{\sin\theta}.
\]

The work becomes

\[
W
=
FL
=
mgh
+
\mu mgh\cot\theta.
\]

Thus lowering slope reduces instantaneous force but increases distance and potentially infrastructure.

This gives a quantitative trade-off for candidate transport geometries.

---

# Part XIII — Logistics network

Let logistics graph be

\[
\mathcal N=(V_N,E_N).
\]

Flow \(f_e(t)\) on edge \(e\) is bounded by

\[
0\le f_e(t)\le c_e(t).
\]

Inventory at node \(v\) follows

\[
\boxed{
\frac{dS_v}{dt}
=
\sum_{e\in\mathrm{in}(v)}f_e
-
\sum_{e\in\mathrm{out}(v)}f_e.
}
\]

A candidate construction history must satisfy global throughput, not merely single-block feasibility.

---

# Part XIV — Source provenance and transport prior

For material observation \(\ell_i\) and source \(q_j\):

\[
P(q_j\mid\ell_i)
=
\frac
{
P(\ell_i\mid q_j)P(q_j)
}
{
\sum_kP(\ell_i\mid q_k)P(q_k)
}.
\]

A transport-plan prior can be defined using

\[
\gamma^\star
=
\arg\min_{\gamma\in\Pi(\mu_Q,\mu_P)}
\int c(q,p,t)\,d\gamma(q,p),
\]

with chronology/capacity constraints.

This does not claim historical optimality; it produces a comparison baseline.

---

# Part XV — Bayesian multimodal inverse model

Let

\[
Z=
(
X_T,
P,
T_b,
T_v,
Q,
R,
U,
D,
C
).
\]

Then

\[
\boxed{
P(Z\mid Y)
\propto
P(Y\mid Z)P(Z).
}
\]

If modalities are conditionally independent given \(Z\),

\[
P(Y\mid Z)
=
\prod_m
P(Y_m\mid Z).
\]

Possible modalities include:

\[
m\in
\{
\mathrm{geometry},
\mathrm{muography},
\mathrm{lithology},
\mathrm{contacts},
\mathrm{damage},
\mathrm{quarry},
\mathrm{text},
\mathrm{hydrology}
\}.
\]

---

# Part XVI — Identifiability and experiment design

Let \(H\) index construction hypotheses.

Posterior entropy:

\[
\mathcal H(H\mid Y)
=
-\sum_H
P(H\mid Y)\log P(H\mid Y).
\]

For candidate future measurement \(Z_m\), expected information gain is

\[
\boxed{
\mathrm{EIG}(Z_m)
=
\mathbb E_{z_m}
\left[
D_{\mathrm{KL}}
\left(
P(H\mid Y,z_m)
\|
P(H\mid Y)
\right)
\right].
}
\]

The best new archaeological/geophysical measurement is therefore not merely the most detailed measurement but the one expected to discriminate most strongly among surviving histories.

---

# Part XVII — Counterfactual forward evidence

For hypothesis \(H\),

\[
\widehat Y_H
=
\mathcal O
\circ
\mathcal D_{\mathrm{post}}
\circ
\mathcal B(H).
\]

A weighted discrepancy may be

\[
\boxed{
J(H)
=
\sum_m
\lambda_m
d_m(Y_m,\widehat Y_{H,m}).
}
\]

In a likelihood formulation,

\[
P(Y\mid H)
\propto
\exp[-J(H)/2]
\]

under a Gaussian-style error model.

---

# Part XVIII — Vaidya comparison system

Metric:

\[
ds^2
=
-
\left(1-\frac{2m(v)}r\right)dv^2
+
2dvdr
+
r^2d\Omega^2.
\]

Outgoing radial null curves satisfy

\[
0
=
-
\left(1-\frac{2m(v)}r\right)dv^2
+
2dvdr,
\]

hence

\[
\boxed{
\frac{dr}{dv}
=
\frac12
\left(
1-\frac{2m(v)}r
\right).
}
\]

The apparent-horizon condition is

\[
\boxed{r_{\mathrm{AH}}(v)=2m(v)}.
\]

An event-horizon generator can be integrated backward after imposing a suitable future asymptotic condition.

The comparison illustrates global versus local accessibility, not archaeological physics.

---

# Part XIX — Kerr comparison system

For equatorial null geodesics with \(E=1\), \(Q=0\), \(b=L/E\),

\[
\Delta
=
r^2-2Mr+a^2,
\]

and

\[
\boxed{
R(r;b)
=
[r^2+a^2-ab]^2
-
\Delta(b-a)^2.
}
\]

Allowed motion:

\[
R(r;b)\ge0.
\]

Critical circular null orbit:

\[
\boxed{
R(r;b)=0,
\qquad
\frac{\partial R}{\partial r}=0.
}
\]

At such a double root, allowed radial intervals can merge or split as parameters cross critical values.

---

# Part XX — Generic accessibility transition

Let

\[
N_\lambda
=
\{x:\Phi(x;\lambda)<0\}.
\]

A candidate critical point satisfies

\[
\boxed{
\Phi(x^\star;\lambda^\star)=0,
\qquad
\nabla_x\Phi(x^\star;\lambda^\star)=0.
}
\]

For a non-degenerate Morse critical point one additionally examines the Hessian

\[
H_\Phi
=
\nabla_x^2\Phi
\]

and its index.

The project does **not** claim a universal theorem equating these systems. It proposes this as a reusable analytical template for accessibility bifurcations.

---

# Part XXI — Proposed composite state

A high-level Inverse Reality state may be represented as

\[
\boxed{
\Xi(\tau)
=
[
G,
\rho^+,
\rho^\ominus,
\mathcal K^+,
\mathcal K^-,
\boldsymbol\sigma,
\mathcal C,
\mathcal A,
Q,
T_b,
T_v,
\Gamma_M,
\Gamma_G,
\mathcal E
]_\tau.
}
\]

This state is intentionally heterogeneous: geometry, physics, topology, chronology and evidence are all first-class variables.

---

# Part XXII — What is established and what is proposed?

### Established mathematics/physics used

- Euclidean/solid geometry;
- classical mechanics and gravitational potential;
- continuum/contact mechanics;
- \(SE(3)\) configuration spaces;
- graph theory and partial orders;
- Bayesian inference;
- optimal transport;
- persistent homology / Reeb-style topology;
- Vaidya and Kerr spacetime mathematics.

### Proposed project-specific formalism

- coupled \(\mathcal K^+/\mathcal K^-\) construction ontology;
- counterfactual absent-mass field \(m^\ominus\);
- inverse gravitational ledger \(\Delta U^-\);
- construction/void birth fields \(T_b,T_v\);
- typed inverse admissible frontier;
- \((\tau,r)\) negative-space bifiltration for inverse architectural reconstruction;
- complement-defined accessibility object \(N_{\mathcal R}\);
- unified forward/inverse/counterfactual reconstruction engine controlled by Meta-Harness.

These are **proposals**, not established theorems.
