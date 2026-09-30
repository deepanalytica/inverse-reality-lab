# Rúbrica ciega — IRL-ADV-002

Cada dimensión se puntúa 0–4. El juez no conoce la condición.

## 1. Exactitud factual

- **4:** ninguna afirmación central contradice source pack/gold; matices correctos.
- **3:** una imprecisión menor sin afectar la conclusión.
- **2:** mezcla de aciertos y errores relevantes.
- **1:** errores centrales dominan.
- **0:** conclusión factual incompatible con la evidencia.

## 2. Trazabilidad

- **4:** cada conclusión central puede retrocederse a evidencia concreta o derivación explícita.
- **3:** trazabilidad alta con alguna omisión menor.
- **2:** soporte parcial o genérico.
- **1:** afirmaciones mayormente sin ancla.
- **0:** no existe vínculo auditable entre evidencia y conclusión.

## 3. Calidad de falsación

- **4:** identifica pruebas que realmente podrían refutar/restringir las hipótesis y usa contraejemplos disponibles.
- **3:** falsación pertinente pero incompleta.
- **2:** menciona límites sin operacionalizarlos.
- **1:** “podría estar equivocado” sin prueba concreta.
- **0:** sólo confirmación; ignora evidencia adversa.

## 4. Control de hipótesis

- **4:** mantiene alternativas reales, distingue evidencia discriminante y evita cerrar prematuramente.
- **3:** alternativas útiles pero poco desarrolladas.
- **2:** reconoce ambigüedad sin compararla.
- **1:** hipótesis única con caveats superficiales.
- **0:** convierte una posibilidad en hecho.

## 5. Calibración

- **4:** confianza proporcional a la solidez del claim; incertidumbre donde corresponde.
- **3:** pequeñas desviaciones.
- **2:** confianza irregular.
- **1:** fuerte sobre/subconfianza.
- **0:** confianza incompatible con evidencia.

## 6. Detección/corrección de error

- **4:** detecta y corrige activamente aparentes anomalías, errores de transcripción o inferencias tentadoras.
- **3:** detecta la mayoría.
- **2:** algunas.
- **1:** apenas.
- **0:** consolida errores evitables.

## Métricas objetivas de claims

Para cada output se cuentan:

- `n_obs`
- `n_derived`
- `n_hypothesis`
- `n_unsupported`
- `n_error`

[
UCR = \frac{n_{unsupported}+n_{error}}{n_{obs}+n_{derived}+n_{hypothesis}+n_{unsupported}+n_{error}}
]

Si el denominador es 0, UCR se registra como NA.

## Citas

Registrar por separado:

- citas/fuentes correctas;
- citas irrelevantes;
- citas que no sostienen el claim;
- referencias inventadas.

## Regla de longitud

No otorgar puntos adicionales por extensión, tecnicismo, tablas, notación o número de secciones si no aumentan la calidad epistémica.
