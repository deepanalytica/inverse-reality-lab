# Cascading Event Graph — specification

## Node classes
FORCING; ANTECEDENT; HYDRO; GEO; INFRA; SOCIAL; RESPONSE.

## Edge confidence
- **D — Documented**
- **I — Supported inference**
- **H — Hypothesis**
- **R — Rejected**

## Initial graph
FORCING_AUG2023 → HYDRO_GUAIQUILLO [D]
HYDRO_GUAIQUILLO → SOCIAL_ZAPALLAR_EVAC [D]
HYDRO_GUAIQUILLO → SOCIAL_DRAGONES_EVAC [D]
FORCING_AUG2023 → GEO_UPEO_MULTI_FAILURE [D/I]
GEO_UPEO_MULTI_FAILURE → INFRA_UPEO_ACCESS_FAILURE [D]
INFRA_UPEO_ACCESS_FAILURE → SOCIAL_UPEO_ISOLATION [D]
SOCIAL_UPEO_ISOLATION → RESPONSE_HELICOPTER_LOGISTICS [D]
FORCING_AUG2023 → INFRA_LAS_PIEDRAS_WATER_ROAD [D]
INFRA_LAS_PIEDRAS_WATER_ROAD → RESPONSE_LAS_PIEDRAS_RECONSTRUCTION [D]

UPEO → ZAPALLAR [H: DO NOT PRESENT AS CAUSAL]

## Proof obligation for each edge
timestamp consistency; upstream/downstream topology; mechanism; independent evidence; alternative explanation; uncertainty.
