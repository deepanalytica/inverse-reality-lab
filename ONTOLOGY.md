# Ontología de Inverse Reality Laboratory v1.2

## Qué significa ontología en IRL

Una ontología es el modelo explícito de las entidades que existen en el problema, sus propiedades y las relaciones permitidas entre ellas.

Su función es evitar que geometría, materia, cronología y evidencia queden mezcladas en una representación genérica.

El estado conceptual es:

\[
\boxed{
\text{objeto}
=
\text{entidades}
+
\text{relaciones}
+
\text{tiempo}
+
\text{evidencia}
+
\text{incertidumbre}.
}
\]

---

## 1. Entidades materiales

Ejemplos:

- bloque;
- revestimiento;
- viga de granito;
- junta;
- lecho rocoso;
- piso;
- muro;
- elemento de cubierta.

Atributos:

\[
\{
id,
G,
q,
material,
\rho,
m,
provenance,
damage,
evidence
\}.
\]

---

## 2. Entidades de espacio negativo

Ejemplos:

- cámara;
- corredor;
- galería;
- shaft;
- vacío;
- volumen temporal;
- anomalía de densidad.

Atributos:

\[
\{
V,
\partial V,
portals,
clearance,
topology,
m^\ominus,
identity,
evidence
\}.
\]

La identidad de una cámara incluye su geometría y su relación con fronteras y accesos.

---

## 3. Eventos

- extracción;
- labrado;
- transporte;
- colocación;
- aparición de frontera;
- cierre;
- encapsulamiento;
- daño;
- remoción;
- restauración.

Los eventos forman el conjunto \(E\) del poset constructivo.

---

## 4. Procesos

- cantería;
- transporte terrestre;
- transporte fluvial;
- elevación;
- colocación;
- medición;
- intemperismo;
- alteración humana.

Un proceso puede generar múltiples eventos.

---

## 5. Entidades temporales latentes

\[
\mathcal T
\]

representa infraestructura que existió durante la obra y luego desapareció:

- rampas;
- andamios;
- pasarelas;
- moldes;
- soportes;
- gatos;
- sistemas de izado.

Su función es evitar falsos problemas de fuerza o acceso.

---

## 6. Evidencia

Cada evidencia contiene:

\[
\{
source,
date,
instrument,
resolution,
uncertainty,
provenance,
license,
citation
\}.
\]

Estados:

- OBSERVED;
- PUBLISHED;
- DERIVED;
- INFERRED;
- HYPOTHESIS;
- COUNTERFACTUAL;
- UNKNOWN.

---

## 7. Relaciones estructurales

- supports;
- supportedBy;
- transfersLoadTo;
- contacts;
- stabilizes.

## 8. Relaciones geométricas

- above;
- below;
- adjacentTo;
- intersects;
- encloses;
- containedIn;
- alignedWith.

## 9. Relaciones de espacio negativo

- bounds;
- portalTo;
- connectedBy;
- mergesWith;
- separatesFrom;
- reserves;
- excludesMaterialFrom.

## 10. Relaciones cronológicas

- precedes;
- mustPrecede;
- possiblyPrecedes;
- contemporaneousWith;
- overlapsInTime.

## 11. Procedencia

- extractedFrom;
- lithologicallyCompatibleWith;
- transportedFrom;
- processedAt.

## 12. Relaciones epistemológicas

- supportedByEvidence;
- contradictedByEvidence;
- inferredFrom;
- predictedBy;
- falsifiedBy;
- unresolvedAgainst.

---

## 13. Ontología topológica

IRL v1.2 añade objetos explícitos:

### TopologicalSpace

\[
\{
domain,
boundary,
exterior,
complex,
resolution
\}.
\]

### HomologyState

\[
\{
H_0,H_1,H_2,\beta_0,\beta_1,\beta_2
\}.
\]

### PersistenceFeature

\[
\{
dimension,
birth,
death,
generator,
confidence
\}.
\]

### ReebNode / ReebEdge

Representan eventos de ramificación o fusión de conjuntos de nivel.

### ZigzagState

Registra inclusiones o mapas entre estados topológicos sucesivos.

---

## 14. Hipótesis

Una hipótesis contiene:

\[
H=
\{
statement,
evidence,
deductions,
predictions,
discriminators,
status
\}.
\]

Una hipótesis útil debe producir al menos una predicción y una observación discriminante.

---

## 15. Claim

Cada afirmación pública puede representarse como:

\[
C=
\{
text,
epistemicClass,
sources,
uncertainty,
identifiability,
falsifiers,
modelVersion
\}.
\]

Esto permite que Meta-Harness audite afirmaciones antes de publicarlas.

---

## 16. Regla de resolución

La ontología debe ser tan detallada como la evidencia permita y tan simple como el problema requiera.

Una entidad sólo se subdivide cuando la subdivisión cambia:

- una restricción;
- una predicción;
- una relación causal;
- una carga;
- una accesibilidad;
- una conclusión.
