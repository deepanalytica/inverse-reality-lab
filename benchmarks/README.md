# IRL Benchmarks

Five positive-control experiments are now available.

| ID | Structure | Dominant inverse problem | Key recovered latent/process class |
|---|---|---|---|
| 001 | Golden Gate Bridge | suspension / accessibility | temporary aerial catwalk topology |
| 002 | Eiffel Tower | modular closure / precision | temporary supports, jacks, provisional fasteners |
| 003 | Hoover Dam | hydraulics / mass concrete / heat | diversion topology + sacrificial cooling network |
| 004 | Empire State Building | vertical industrial pipeline | JIT staging + jumping derricks + trade overlap |
| 005 | Sydney Opera House | generative geometry / segmental shells | common geometric generator + erection arch + post-tensioning |

## Current common observation

Across five radically different structures, allowing conventional **latent process ontology** drives the unexplained-force residual toward zero:

\[
\mathbf F_X^\star\approx0.
\]

So far, no benchmark requires a gravity-control or exotic-force term.

The controls increasingly suggest that apparent “force mysteries” often arise when the inverse model is missing one of four things:

1. temporary topology;
2. modular decomposition;
3. logistics/pipeline structure;
4. state-changing physical processes such as cooling, prestressing or adjustment.

This is an empirical pattern from the benchmark series, not yet a theorem.


## Adversarial Study 001 — Identifiability Under Evidence Ablation

The positive controls are now accompanied by a self-falsification study.

- [Results](adversarial-identifiability/RESULTS.md)
- [Epistemic corrections](adversarial-identifiability/CORRECTIONS.md)
- [Reproducible ablation engine](adversarial-identifiability/ablation.py)
- [Result snapshot](adversarial-identifiability/result.json)

Key finding:

[
oxed{
	ext{missing evidence}

otRightarrow
	ext{unknown force}
}
]

The study shows that terminal geometry alone is insufficient for most process classes and that several earlier mechanism matches were only identifiable after adding site, schedule, precision or logistics constraints.
