# PhD-level research protocol

## Design principle
Treat Curicó 2023 as a quasi-experimental historical reconstruction with heterogeneous spatial exposure, two major 2023 episodes and a long antecedent land-cover record. This does not automatically identify causal effects; it creates contrasts that must be defended.

## Units of analysis
Nested hierarchy: pixel/segment → hillslope/corridor → reach → sub-basin → infrastructure node → settlement → basin/event.
Statistical inference must account for nesting and spatial dependence.

## Baseline periods
Land cover: 1999–2022 as antecedent trajectory; 2023 as event year; 2024 where useful for recovery.
Remote sensing: matched pre/post windows with cloud/SAR constraints.
Meteorology: event windows plus antecedent 7/30/90-day accumulation where data permit.

## Variables
Outcome candidates: flood extent, erosion/deposition proxy, detected surface change, road/bridge failure, isolation duration, inundated built area.
Exposure: built area, road/bridge density, settlement footprint.
Susceptibility: slope, curvature, lithology/soil if available, drainage area, distance to channel.
Forcing: precipitation totals/intensity, freezing level, discharge.
Antecedents: land-cover transitions, fire, prior event damage, moisture proxies.

## Analysis ladder
L0 descriptive chronology.
L1 spatial overlay and topology.
L2 bivariate exploratory associations.
L3 multivariable models with pre-specified covariates.
L4 matched/contrast analyses where assumptions permit.
L5 causal interpretation only when identification assumptions survive review.

## Required diagnostics
Missingness; spatial autocorrelation; multicollinearity; class imbalance; sensitivity to spatial resolution; MAUP; uncertainty in event geometry; temporal mismatch; multiple testing; leakage between training/validation if ML is used.

## Counterfactual discipline
Never say “X caused Y” merely because Y overlaps X. Specify counterfactual: expected Y under comparable forcing/terrain absent the exposure of interest. If no defensible comparator exists, report association/mechanism evidence rather than causal effect.

## June vs August
Compare forcing, antecedent wetness/damage, footprint and infrastructure response. Do not treat June as an untreated control; it is itself a major event and may alter August conditions.

## MapBiomas
Quantify transitions, persistence and fragmentation within hydrologically meaningful zones and matched comparison areas. Test multiple buffer widths. Do not infer local engineering-scale conditions from 30 m categorical data alone.

## Remote sensing
Document sensor/product, orbit/tile, acquisition time, preprocessing, thresholds and quality masks. SAR flood/change must address layover/shadow and surface roughness. Optical change must address cloud/shadow/phenology.

## Review artifacts
Every figure receives: generating script/notebook, input manifest, parameters, CRS, timestamp, software versions and claim IDs supported.
