# PRAXIOS Control Room — UI Specification v0.2

## Producto

Una sola aplicación presenta tres lentes sobre el mismo estado canónico:

\[
S_t
\rightarrow
\{
\text{Operate},
\text{Assure},
\text{Decide}
\}.
\]

## Operate / PRAXIOS

Muestra el runtime real:

- estado;
- Task DAG;
- scheduler;
- workers;
- providers;
- dependencias;
- ejecución.

## Assure / Meta-Harness

Muestra gates calculados por el motor:

- provenance;
- evidence;
- contradiction;
- uncertainty;
- identifiability;
- role separation;
- policy;
- audit.

## Decide / Decision Room

Muestra:

- situación;
- opciones;
- autorización humana;
- decisión;
- outcome.

## UI pública

La página praxios.html importa directamente:

- runtime/core/praxios-runtime.mjs;
- runtime/providers/fixture.mjs.

Por tanto, la UI pública ejecuta el core real en el navegador.

El fixture provider sustituye únicamente al modelo externo en el sitio público porque las API keys no deben almacenarse en GitHub Pages.

## Runtime con modelos externos

El servidor runtime/server.mjs mantiene las claves fuera del navegador y expone providers configurables.

El mismo control plane puede orquestar diferentes modelos sin modificar Meta-Harness.
