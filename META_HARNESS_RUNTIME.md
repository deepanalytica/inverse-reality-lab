# Meta-Harness Runtime v0.1

## Función

Meta-Harness evalúa claims y acciones antes de que sean promovidos o ejecutados.

La implementación está en:

- runtime/core/meta-harness.mjs
- runtime/core/policy.mjs

## Claim gates

Cada claim puede pasar por:

\[
G=
\{
G_E,
G_P,
G_C,
G_U,
G_I,
G_R,
G_A
\}.
\]

En términos operativos:

1. EPISTEMIC_CLASS
2. PROVENANCE
3. EVIDENCE
4. CONTRADICTION
5. UNCERTAINTY
6. IDENTIFIABILITY
7. ROLE_SEPARATION
8. PUBLICATION_POLICY, cuando corresponda
9. AUDIT

## Agregación

\[
\operatorname{Verdict}(G)=
\begin{cases}
BLOCK & \exists g_i=BLOCK,\\
REVIEW & \exists g_i=REVIEW\land \nexists BLOCK,\\
PASS & \forall g_i=PASS.
\end{cases}
\]

## Proposer y verifier

La política por defecto exige:

\[
\boxed{
\text{proposerId}\neq\text{verifierId}
}
\]

Un mismo actor utilizado como proposer y verifier produce BLOCK.

## Identificabilidad

El motor usa niveles:

\[
I0<I1<I2<I3.
\]

Un claim que necesita una resolución mayor que la permitida por la evidencia recibe REVIEW o BLOCK según el uso solicitado.

## Walls

Los walls representan operaciones estructuralmente prohibidas.

La política por defecto contiene, entre otros:

- WALL_SECRET_EXPORT
- WALL_BYPASS_LEDGER

Un wall produce BLOCK antes de llegar al executor.

## Autorización

Las acciones con efectos configurados requieren un objeto de autorización cuyo:

- status sea APPROVED;
- actionId coincida exactamente.

Sin esa autorización:

\[
\boxed{
\text{EXECUTE unavailable}.
}
\]

## Auditoría

El ledger utiliza una cadena SHA-256.

Además, PRAXIOS calcula un digest del estado canónico para contrastar el estado persistido con el último checkpoint registrado.

## Alcance

Meta-Harness gobierna la transición entre salida de modelo y acción/afirmación aceptada.

No depende de una marca específica de LLM.


## Binding de autorización

La autorización queda vinculada al contenido exacto de la acción. Meta-Harness compara la acción aprobada con la acción presentada al executor.

Una modificación posterior de payload, executor, effect o tags invalida la autorización y produce BLOCK.

## Metadata del executor

PRAXIOS registra metadata de seguridad junto al executor:

- effect;
- tags;
- enabled.

La metadata del executor prevalece sobre la declaración del caller. Esto evita que una herramienta de escritura sea reclasificada por el modelo como una acción sin efecto.

Un executor deshabilitado incorpora un wall estructural y no puede ejecutarse aunque exista autorización humana.
