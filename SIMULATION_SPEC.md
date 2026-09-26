# Simulation Specification

This document describes the mathematics actually implemented in the public interactive laboratory. These simulations are pedagogical/research prototypes, not final scientific solvers.

---

# 1. Pyramid inverse baseline

## Parameters

Current UI baseline:

- ideal height \(H=146.6\) m;
- inverse slider \(p\in[0,1]\);
- normalized remaining height

\[
u=1-p;
\]

- reverse front

\[
z=Hu.
\]

The geometry is an ideal square pyramid. It does not yet use a block-resolved as-built mesh.

## Removed mass fraction

The UI displays

\[
\boxed{
\Gamma_M=(1-u)^3=p^3.
}
\]

This follows exactly from ideal-pyramid volume.

## Released gravitational-potential fraction

The UI displays

\[
\boxed{
\Gamma_G
=
1-6u^2+8u^3-3u^4.
}
\]

This is the potential associated with ideal material above the reverse front, normalized by

\[
U_{\mathrm{total}}=\frac14MgH.
\]

## King's Chamber illustrative negative mass

The prototype uses approximate dimensions

\[
10.5\times5.2\times5.8\ {\rm m}
\]

only as an illustrative box and a reference density

\[
\rho_{\mathrm{ref}}=2.60\ {\rm t/m^3}.
\]

Thus the maximum displayed counterfactual deficit is approximately

\[
m^\ominus
\approx
-(10.5)(5.2)(5.8)(2.60)
\approx
-823\ {\rm t\text{-}eq}.
\]

This is **not** a claim about actual removed mass or exotic negative mass.

## Chamber identity state in the current UI

The current demo uses simplified vertical thresholds:

- floor \(\sim43\) m;
- primary chamber top \(\sim48.8\) m;
- upper structural system \(\sim64.5\) m.

These values are provisional visualization anchors, not a solved historical chronology.

The production model must replace them with an explicit cell/graph model.

---

# 2. Vaidya simulation

The UI uses an ingoing Vaidya-style metric

\[
ds^2
=
-\left(1-\frac{2m(v)}r\right)dv^2
+
2dvdr+r^2d\Omega^2.
\]

## Mass function

The implementation uses a finite smoothstep transition rather than a physical accretion model.

Let width \(w\). Define

\[
m(v)=
\begin{cases}
0,&v\le-w,\\
3s^2-2s^3,&-w<v<w,\\
1,&v\ge w,
\end{cases}
\]

where

\[
s=\frac{v+w}{2w}.
\]

This is dimensionless with final mass normalized to one.

## Apparent horizon

\[
\boxed{
r_{\mathrm{AH}}(v)=2m(v).
}
\]

## Outgoing null generator

From \(ds^2=0\),

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

The UI integrates this ODE backward using a fourth-order Runge-Kutta scheme from a future state near

\[
r=2M_f.
\]

This produces a didactic event-horizon curve.

## Expansion indicator

The UI uses a normalized sign-equivalent expression

\[
\theta_+
\propto
\frac{r-2m(v)}{r^2}.
\]

Only the sign is used pedagogically.

---

# 3. Kerr radial-accessibility simulation

Units are normalized with \(M=1\).

Spin parameter:

\[
a\in[0,0.99].
\]

Impact parameter:

\[
b=L/E.
\]

For equatorial null geodesics with \(E=1\) and \(Q=0\),

\[
\Delta=r^2-2r+a^2
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

Allowed radial state:

\[
R(r;b)\ge0.
\]

The UI samples \(R\) numerically outside the outer horizon

\[
r_+
=
1+\sqrt{1-a^2}.
\]

Roots are found by sign-change bracketing followed by bisection.

The number of connected allowed radial intervals is approximated numerically as

\[
\beta_0
=
\#\text{ connected components of }\{r:R(r;b)\ge0\}.
\]

## Equatorial prograde light-ring benchmark

The UI uses

\[
r_{\rm ph}
=
2\left[
1+\cos
\left(
\frac23\arccos(-a)
\right)
\right]
\]

for the prograde equatorial photon radius in units \(M=1\).

A corresponding critical impact parameter is computed from the radial double-root relation.

The critical condition is

\[
\boxed{
R=0,
\qquad
\partial_rR=0.
}
\]

---

# 4. Unified-accessibility panel

The final panel currently compares three schematic transitions:

### Pyramid

architectural negative-cell boundary change.

### Vaidya

\[
\theta_+>0
\rightarrow
\theta_+=0
\rightarrow
\theta_+<0.
\]

### Kerr

\[
\beta_0=1
\rightarrow
\text{double-root separatrix}
\rightarrow
\beta_0=2
\]

for parameter regimes where such splitting occurs.

The shared abstraction is

\[
\boxed{
N_{\mathcal R}(\lambda)
=
\Omega
\setminus
\mathrm{Accessible}_{\mathcal R}(\Omega,\lambda).
}
\]

This is a comparison of mathematical accessibility structures only.

---

# 5. Numerical limitations

The current UI does not yet implement:

- full 3D pyramid geometry;
- individual blocks;
- FEM;
- contact complementarity;
- real King's Chamber topology;
- real muography detector response;
- Bayesian graph inference;
- multiparameter persistent homology;
- quarry/logistics network;
- numerical relativity.

The public simulation should therefore be read as a **formal laboratory interface and sanity-check layer**, not a validated reconstruction.

---

# 6. Next simulation upgrades

Priority upgrades:

1. block-resolved or voxelized Khufu subsystem;
2. signed material/negative-space field;
3. explicit construction DAG;
4. Reeb/merge tree for internal voids;
5. \((\tau,r)\) persistence;
6. FEM/contact constraints;
7. \(SE(3)\) block-path feasibility;
8. muography forward operator;
9. posterior sampling over construction histories;
10. active measurement selection via expected information gain.
