# PRAXIOS Control Room — UI Specification v0.1

## Producto

Una sola aplicación presenta tres lentes sobre el mismo estado canónico:

\[
S_t\rightarrow\{\text{Operate},\text{Assure},\text{Decide}\}.
\]

## Operate / PRAXIOS

Expone Task DAG, agentes, modelos, herramientas, artefactos, retries, dependencias y estado.

## Assure / Meta-Harness

Expone claims, evidencia, contradicciones, incertidumbre, provenance, gates, policies y PASS / REVIEW / BLOCK.

## Decide / Decision Room

Expone Situation, Evidence, Findings, Unknowns, Risks, Scenarios, Options, Human checkpoint, Decision, Actions y Outcome.

## Orquestación

Un modelo puede proponer delegación:

\[
M_p\rightarrow\text{Task Proposal}.
\]

PRAXIOS controla la creación efectiva del trabajo:

\[
\text{Task Proposal}\rightarrow\text{Scheduler}\rightarrow\text{Worker}.
\]

El worker devuelve un artefacto a la sesión y Meta-Harness verifica su uso posterior.

## Proposer / verifier

\[
\boxed{\text{Proposer}\neq\text{Verifier}}
\]

La UI lo representa mediante roles y nodos separados.

## Estado externo

El estado canónico vive fuera de los modelos:

\[
S_t=\{tasks,claims,evidence,artifacts,policies,authorizations,decisions,ledger\}.
\]

## Side effects

\[
\text{proposal}\rightarrow\text{policy gate}\rightarrow\text{human authority}\rightarrow\text{execution}.
\]

## Prototipo

- praxios.html: Control Room interactivo.
- praxios-design-system.html: sistema de diseño.
- assets/praxios.css: tokens y componentes.
- assets/praxios.js: interacciones de demostración.

La demo simula la orquestación en el navegador. La conexión a proveedores de IA pertenece al runtime real.
