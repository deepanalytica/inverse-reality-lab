# Registro de variables — Inverse Reality Laboratory v1.2

This registry defines the variables that can enter the inverse reconstruction. The purpose is to prevent the model from silently collapsing geology, geometry, architecture, chronology and evidence into one generic state.

The proposed high-level state is

\[
\boxed{
\Xi(t)
=
[
G,
M,
L,
P,
S,
F,
C,
D,
E,
H,
Q,
A,
T,
\mathcal E
]_t
}
\]

with each symbol representing a family of fields rather than a single scalar.

---

# 1. Global geometry \(G\)

Required variables include:

- base polygon and side lengths;
- completed height;
- face planes and local deviations;
- local slope / face inclination;
- orientation and cardinal azimuths;
- course elevations;
- block-level geometry where available;
- casing geometry;
- internal chamber/corridor/shaft geometry;
- void/anomaly geometry;
- bedrock-pyramid interface;
- current versus reconstructed as-built surfaces.

A geometry value always has uncertainty:

\[
G
\rightarrow
(G,\Sigma_G).
\]

---

# 2. Material field \(M\)

Physical density:

\[
\rho^+(\mathbf x).
\]

Block-level mass:

\[
m_i
=
\int_{B_i}\rho_i(\mathbf x)dV.
\]

Material classes may include:

- local core limestone;
- fine casing limestone;
- granite;
- mortar;
- bedrock;
- later repair material;
- unknown material.

Mass is not inferred from one constant density when lithology and porosity data are available.

---

# 3. Lithology \(L\)

For block \(i\):

\[
L_i
=
[
rock\ type,
facies,
fossils,
grain\ size,
bedding,
texture,
porosity
].
\]

Lithology can constrain:

- mechanical behavior;
- provenance;
- quarry stratum;
- weathering;
- block orientation.

---

# 4. Petrochemical / mineralogical state \(P\)

Possible observations:

- calcite/dolomite ratio;
- quartz fraction;
- gypsum/anhydrite;
- iron oxides;
- elemental composition;
- isotopic variables where scientifically justified;
- salt species;
- mortar mineralogy.

For source inference:

\[
P(q_j\mid\ell_i)
\propto
P(\ell_i\mid q_j)P(q_j).
\]

---

# 5. Substrate and bedrock \(S\)

The pyramid-foundation problem requires a rock-mass model, not a generic "sand" variable.

Potential variables:

- bedrock lithology;
- bedding orientation;
- joints;
- faults;
- RQD or equivalent rock-mass quality;
- karst/paleokarst;
- stiffness;
- compressive strength;
- foundation topography;
- local cut/fill.

Contact pressure satisfies

\[
\int_Ap(x,y)dA=W.
\]

---

# 6. Fracture field \(F\)

For fracture \(j\):

\[
F_j
=
[
geometry,
orientation,
aperture,
persistence,
displacement,
damage,
age\ posterior
].
\]

Age hypotheses can include:

- quarry-induced;
- dressing-induced;
- placement-induced;
- construction-load;
- seismic;
- salt/weathering;
- modern intervention.

A crack is therefore an event-history observation, not merely a Boolean feature.

---

# 7. Contacts \(C\)

For every significant interface:

- normal;
- contact area;
- gap;
- mortar thickness;
- friction estimate;
- load transfer;
- local damage.

Contact constraints:

\[
g_n\ge0,\qquad
\lambda_n\ge0,\qquad
g_n\lambda_n=0.
\]

---

# 8. Damage / alteration \(D\)

Post-construction deterioration variables can include:

- erosion;
- salt crystallization;
- thermal cycling;
- exfoliation;
- cracking;
- biological effects;
- casing removal;
- quarrying of monument stone;
- excavation;
- restoration.

A conceptual damage law may be written

\[
\frac{\partial D}{\partial t}
=
f(T,RH,S_w,W,\sigma,J,\ldots).
\]

The purpose is not to assert a single damage equation but to force post-history into the model explicitly.

---

# 9. Environmental variables \(E\)

Separate construction-era environment from modern environment.

Possible variables:

- temperature;
- humidity;
- rainfall;
- wind;
- solar exposure;
- dust;
- groundwater;
- flood regime;
- seismic events.

These variables enter either original logistics or later degradation.

---

# 10. Hydrology and transport landscape \(H\)

Time-dependent hydrological state:

\[
H(t)
=
[
channel\ geometry,
water\ level,
discharge,
flood\ probability,
harbor\ accessibility,
groundwater
].
\]

Landscape elevation should be time-dependent:

\[
Z(x,y,t),
\]

because quarry excavation, filling and construction alter the terrain itself.

---

# 11. Provenance \(Q\)

For each block/material batch:

\[
Q_i
=
[
candidate\ source,
source\ posterior,
stratigraphic\ unit,
distance,
route,
evidence
].
\]

The reconstruction should eventually couple:

- source likelihood;
- quarry volume;
- block properties;
- placement region;
- transport cost.

---

# 12. Architecture \(A\)

Positive architectural entities:

- wall;
- floor;
- ceiling beam;
- relieving element;
- casing element.

Negative architectural entities:

- chamber;
- corridor;
- shaft;
- gallery;
- unknown void;
- temporary void candidate.

Each negative object includes:

\[
N_j
=
(
V_j,
\partial_sV_j,
P_j,
m_j^\ominus,
\eta_j,
I_j
).
\]

---

# 13. Chronology \(T\)

Chronology is not represented by elevation alone.

Variables include:

\[
T_b^+(\mathbf x)
\]

material incorporation time,

\[
T_b^-(\mathbf x)
\]

negative-space reservation time,

and event intervals

\[
[t_{\min},t_{\max}]
\]

for uncertain events.

Partial-order relations remain primary:

\[
e_i\prec e_j.
\]

---

# 14. Block-level state

A future block record should approximate

\[
\boxed{
B_i
=
[
G_i,
\rho_i,
m_i,
L_i,
P_i,
O_i,
C_i,
F_i,
D_i,
Q_i,
T_i,
E_i
]
}
\]

where \(O_i\) is orientation and \(E_i\) supporting evidence.

---

# 15. Negative-space state

For negative object \(N_j\):

\[
\boxed{
N_j
=
[
V_j,
\partial V_j,
portals_j,
d_M,
m_j^\ominus,
\eta_j,
\mathcal H_j,
T_j,
E_j
].
}
\]

This permits a void to have its own chronology rather than being treated as missing mesh.

---

# 16. Logistics state

Network:

\[
\mathcal N(t)
=
(V_N,E_N).
\]

Edge variables:

- capacity \(c_e(t)\);
- distance;
- slope;
- transport mode;
- friction / rolling/sliding assumptions;
- labor requirement;
- uncertainty.

Flow:

\[
0\le f_e(t)\le c_e(t).
\]

---

# 17. Human/resource variables

These are highly uncertain and should be priors, not facts:

- crew size;
- force envelope;
- work duration;
- shift structure;
- food/water supply;
- tool availability;
- repair/replacement rates;
- specialist teams.

They become useful only when coupled to measurable throughput consequences.

---

# 18. Evidence state \(\mathcal E\)

Every quantity should carry an epistemic class:

- OBSERVED
- DERIVED
- INFERRED
- HYPOTHESIS
- COUNTERFACTUAL
- UNKNOWN

An evidence record should contain:

\[
E_k
=
[
source,
instrument,
date,
resolution,
uncertainty,
citation,
license,
provenance
].
\]

---

# 19. Observation operators

Different instruments observe different projections of reality.

Examples:

### Geometry

\[
Y_G
=
\mathcal O_G(X)+\epsilon_G.
\]

### Muography

\[
\Sigma_\mu(\gamma)
=
\int_\gamma\rho(\mathbf x)ds,
\]

followed by detector/flux response

\[
Y_\mu
=
\mathcal O_\mu[\rho]+\epsilon_\mu.
\]

### Lithology

\[
Y_L
=
\mathcal O_L(Q,L,P)+\epsilon_L.
\]

This makes explicit that no single sensor directly observes "construction history".

---

# 20. Variable hierarchy

The framework deliberately separates:

\[
\boxed{
\text{measured}
\rightarrow
\text{derived}
\rightarrow
\text{latent}
\rightarrow
\text{counterfactual}.
}
\]

Examples:

- measured: point-cloud coordinate;
- derived: local face deviation;
- latent: block placement time;
- counterfactual: predicted muon signature under candidate history.

This hierarchy is essential for Meta-Harness auditability.


---

# Variables topológicas v1.2

- \(K_\tau^+\): complejo material;
- \(K_\tau^-\): complejo de espacio negativo;
- \(E_\tau\): subespacio exterior;
- \(H_k(V_\tau,E_\tau)\): homología relativa;
- \(\beta_k\): números de Betti;
- \(d_M(x,\tau)\): distancia a materia;
- \(V_{\tau,r}\): espacio negativo con despeje mínimo \(r\);
- \(D_k\): diagrama de persistencia;
- \(\mathcal R_f\): grafo de Reeb de una función \(f\);
- \(\mathcal O(P)\): politopo de orden;
- \(e(P)\): número de extensiones lineales;
- \(C_P\): compresión causal descriptiva;
- \(\mathsf H(H\mid Y)\): entropía posterior;
- \(\operatorname{EIG}(d)\): ganancia esperada de información.

Cada variable debe conservar dominio, unidades cuando correspondan, fuente, incertidumbre y versión del modelo.
