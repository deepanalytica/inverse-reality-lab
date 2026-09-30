# PRD — Curicó 2023 Cascading Hydrogeomorphic Observatory
## Commission-grade research and engineering specification
Version 1.0 — 2026-09-30

## 1. Purpose
Build a reproducible, falsifiable and auditable reconstruction of the June–August 2023 Curicó/Mataquito hydrogeomorphic disaster, integrating meteorological forcing, hydrology, geomorphology, land-cover history, infrastructure failure, exposure, emergency response and reconstruction.

The product is not a narrative map. It is an **evidence system** capable of answering: what happened, where, when, through which physical and infrastructural mechanisms, with what confidence, which alternative explanations remain viable, and what observations would falsify each causal claim.

## 2. Scientific questions
RQ1. What spatiotemporal sequence best explains the observed impacts during June and August 2023?
RQ2. Which impacts share only regional forcing and which are physically connected through drainage, sediment or infrastructure networks?
RQ3. Did antecedent land-cover/use transitions measurably alter runoff, erosion, slope response or exposure?
RQ4. Did the June event create antecedent conditions that modified August response?
RQ5. Which infrastructure nodes amplified consequences by transforming physical hazard into isolation, access loss or service interruption?
RQ6. Can a transferable cascade-detection framework be derived without overfitting Curicó?

## 3. Pre-registered hypotheses
H1: August impacts are explained by meteorological forcing plus spatial susceptibility better than forcing alone.
H2: sub-basins/corridors with stronger antecedent land-cover alteration exhibit different event signatures after controlling for terrain and forcing.
H3: June damage/saturation contributes explanatory power to August failures.
H4: infrastructure network topology explains a measurable share of social disruption beyond local hazard intensity.
H5: Upeo and Zapallar belong to a common regional forcing episode but direct Upeo→Zapallar physical causality is not assumed and must pass topology/timing/mechanism tests.

Each hypothesis requires a null/alternative formulation, observable variables, confounders, test, uncertainty and rejection criterion before inferential analysis.

## 4. Product users
Primary: multidisciplinary review commission in hydrology, geomorphology, remote sensing/GIS, civil/infrastructure engineering, disaster risk and data science.
Secondary: researchers, public agencies and technical decision-makers.

## 5. Functional requirements
FR-01 immutable source/provenance registry.
FR-02 event registry with stable IDs, time interval, geometry + uncertainty, class, evidence and confidence.
FR-03 hydrological and infrastructure network representation.
FR-04 causal/cascade graph with typed edges and proof obligations.
FR-05 annual MapBiomas transition analysis 1999–2023/24.
FR-06 June/August event forcing reconstruction.
FR-07 reproducible Sentinel/Landsat change products.
FR-08 explicit alternative-hypothesis ledger.
FR-09 uncertainty propagation and sensitivity analysis.
FR-10 reproducible build from raw/externally referenced inputs to derived products.
FR-11 machine-readable outputs plus human-readable technical report.
FR-12 public demonstrator must never display unsupported causal claims as facts.

## 6. Non-functional requirements
Reproducibility; deterministic processing where possible; versioned inputs; checksums; CRS/unit metadata; schema validation; testable pipelines; no guessed coordinates; no silent imputation; explicit missingness; source licensing compliance; computational environment lockfile/container; audit log.

## 7. Evidence hierarchy
A: primary measured/official/scientific record with traceable method.
B: independent authoritative secondary evidence.
C: geolocated/timestamped observational evidence.
D: press/testimony useful for discovery but requiring corroboration.
E: model-derived inference.
No E-level inference may overwrite contradictory A/B evidence.

## 8. Epistemic states
OBSERVED; DOCUMENTED_RELATION; SUPPORTED_INFERENCE; HYPOTHESIS; CONTESTED; REJECTED; UNKNOWN.
Every claim stores source set, method, reviewer state and confidence rationale. Confidence is not probability unless calibrated as such.

## 9. Data model minimum
Event, Observation, Source, Geometry, Catchment, NetworkNode, NetworkEdge, LandCoverState, ForcingObservation, InfrastructureAsset, Damage, ResponseAction, Claim, Hypothesis, AnalysisRun, Artifact, ReviewDecision.

## 10. Statistical/causal discipline
Separate exploratory from confirmatory analyses. Avoid post-hoc causal language. Control for terrain, upstream area, rainfall, antecedent moisture where available, land cover and exposure. Report effect sizes and uncertainty, not p-values alone. Use spatial autocorrelation diagnostics. Avoid treating pixels as independent replicates. Perform sensitivity to DEM, thresholds, buffers, temporal windows and land-cover class aggregation.

## 11. Validation
V1 source triangulation.
V2 temporal consistency.
V3 topological/hydrological consistency.
V4 remote-sensing cross-validation.
V5 field/photographic validation where feasible.
V6 independent expert review.
V7 negative controls/counterexamples.
V8 reproducibility from clean environment.

## 12. Acceptance gates
G0 schemas + provenance complete.
G1 ≥95% critical events have authoritative or independently triangulated evidence.
G2 all published coordinates have provenance and positional uncertainty.
G3 all causal edges pass explicit proof obligations.
G4 MapBiomas results include uncertainty/confounder analysis and no causal overclaim.
G5 June/August comparison reproducible.
G6 independent reviewer can reproduce core figures/tables from documented commands.
G7 red-team review resolves critical objections or records them openly.
G8 public release contains zero known unsupported causal statements.

## 13. Out of scope
Real-time warning system; operational emergency command; prediction of individual property loss; proprietary PRAXIOS/Meta-Harness internals; claims of negligence/liability without competent documentary/legal evidence.

## 14. Principal deliverables
D1 evidence database + schemas.
D2 geospatial event atlas.
D3 forcing reconstruction.
D4 MapBiomas longitudinal analysis.
D5 terrain/hydrological connectivity model.
D6 infrastructure cascade model.
D7 causal graph + alternative explanations.
D8 reproducibility package.
D9 commission technical report.
D10 interactive evidence-first observatory.

## 15. Definition of done
The project is complete only when another qualified team can inspect provenance, reproduce central transformations, challenge every causal edge, identify uncertainty and obtain materially equivalent core results without privileged oral knowledge.
