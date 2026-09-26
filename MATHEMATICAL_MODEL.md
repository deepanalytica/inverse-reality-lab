# Mathematical model

## State vector

`X(t) = [G, rho+, rho⊖, K+, K-, sigma, C, A, Q, H, E]`

where `G` is geometry; `rho+` physical density; `rho⊖` counterfactual density deficit; `K+/-` material/void topology; `sigma` stress field; `C` contacts; `A` accessibility; `Q` provenance; `H` hydrology; and `E` evidence.

## Reverse time coordinate

`tau = T - t`, hence `d/dtau = -d/dt`, while second derivatives retain sign. Gravity itself does not reverse.

## Gravitational accounting

For block `i`:

`Delta U_i = m_i g (z_final - z_source)`.

Along the inferred inverse trajectory:

`Delta U_i^- = -Delta U_i`.

This is not antigravity.

## Counterfactual absent mass

For negative architectural object `V_C`:

`m_C^⊖ = - integral_(V_C) rho_ref(x) dV`.

It measures mass absent relative to a declared reference solid and is useful for density/muography reasoning.

## Ideal pyramid geometry

For base side `a` and height `H`:

`A(z)=a^2(1-z/H)^2`

`V=a^2 H/3`

`V_>z = V(1-z/H)^3`.

For uniform density, let `u=z/H`. The normalized gravitational potential contained above a reverse front is

`U_>(u)/U_total = 6u^2 - 8u^3 + 3u^4`.

Therefore the released fraction in ideal top-down disassembly is

`Gamma_G = 1 - 6u^2 + 8u^3 - 3u^4`.

## Chamber boundary completion

For future chamber `C`:

`eta_C(t)=Area(partial V_C intersect M(t))/Area(partial V_C)`.

`eta` tracks materialization of the boundary. Geometric emptiness is not equivalent to topological identity.

## Partial-order disassembly

Let `G=(V,E)` be a typed DAG of construction dependencies. The inverse admissible frontier is

`A^-(X)={e : outdegree_G(e)=0 AND stable(X-e) AND accessible(e) AND evidence-compatible(e)}`.

## Bayesian inverse problem

`P(Z|Y,L) proportional_to P(Y|Z,L)P(Z)`

where latent `Z` includes as-built geometry, chronology, construction DAG, quarry provenance, routes, tools, work fronts and design constraints. Multiple histories must remain when the problem is non-identifiable.

## Vaidya comparison

Didactic ingoing Vaidya metric:

`ds^2=-(1-2m(v)/r)dv^2+2dvdr+r^2dOmega^2`.

A normalized outgoing expansion changes sign at `r=2m(v)`. The event horizon is globally defined and can be approximated by backward integration of an outgoing null generator once a future stationary condition is imposed.

## Kerr comparison

For equatorial null geodesics with `E=1`, `b=L/E`, and `Delta=r^2-2Mr+a^2`:

`R(r;b)=[r^2+a^2-ab]^2-Delta(b-a)^2`.

Allowed radial motion requires `R>=0`. A critical light ring satisfies `R=0` and `dR/dr=0`, producing a separatrix and potentially changing the number of connected allowed radial intervals.

## Critical-transition template

For field `Phi(x;lambda)`, define a complement `N_lambda={x:Phi(x;lambda)<0}`. Candidate topology-changing critical states occur where

`Phi=0` and `grad_x Phi=0`,

subject to system-specific regularity conditions.
