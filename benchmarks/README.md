# IRL Benchmarks

El programa de validación contiene cinco controles positivos retrospectivos y un estudio adversarial de identificabilidad.

| ID | Estructura | Problema dominante | Conclusión defendible |
|---|---|---|---|
| 001 | Golden Gate Bridge | suspensión / accesibilidad | con sitio y acceso se recupera la clase funcional de acceso aéreo temporal |
| 002 | Torre Eiffel | cierre / modularidad / precisión | microestructura favorece montaje modular; precisión añade ajuste temporal |
| 003 | Hoover Dam | hidráulica / hormigón masivo / térmica | hidrología exige control del río; física térmica favorece segmentación |
| 004 | Empire State Building | producción vertical / logística | el terminal favorece modularidad; JIT/pipeline requieren sitio, schedule y logística |
| 005 | Sydney Opera House | geometría generativa / shells segmentales | geometría precisa puede recuperar un generador común; soporte exacto requiere más modalidades |

## Observación común de los controles

Cuando se admiten mecanismos convencionales, modularidad y ontologías temporales adecuadas, el residual de fuerza puede llevarse a aproximadamente:

\[
\mathbf F_X^\star\approx0
\]

a la resolución gruesa de los cinco benchmarks.

Esto **no** demuestra que IRL pueda reconstruir automáticamente la historia exacta de una obra. Los benchmarks son retrospectivos y pseudo-ciegos.

## Adversarial Study 001 — Identifiability Under Evidence Ablation

- [Resultados](adversarial-identifiability/RESULTS.md)
- [Correcciones epistemológicas](adversarial-identifiability/CORRECTIONS.md)
- [Motor reproducible de ablación](adversarial-identifiability/ablation.py)
- [Snapshot de resultados](adversarial-identifiability/result.json)

El resultado central es:

\[
\boxed{
\text{missing evidence}
\not\Rightarrow
\text{unknown force}
}
\]

De 25 clases de proceso del formalismo actual:

- geometría sola recupera 1;
- terminal completo recupera 4 y favorece 11;
- terminal + sitio/acceso/física de dominio recupera 10 y favorece 9;
- sólo al añadir schedule, precisión y logística las 25 resultan recuperables bajo las reglas actuales.

Por tanto, la versión autoritativa del programa distingue:

\[
\boxed{
\text{clase funcional recuperable}
\neq
\text{mecanismo histórico exacto}.
}
\]

## Documentos por benchmark

- [001 — Golden Gate](golden-gate/BENCHMARK.md)
- [002 — Torre Eiffel](eiffel-tower/BENCHMARK.md)
- [003 — Hoover Dam](hoover-dam/BENCHMARK.md)
- [004 — Empire State Building](empire-state/BENCHMARK.md)
- [005 — Sydney Opera House](sydney-opera-house/BENCHMARK.md)

El paper v1.0 integra estas correcciones y debe usarse como interpretación académica principal.
