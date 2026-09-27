# PRAXIOS Runtime v0.1

## Estado

PRAXIOS ya dispone de una implementación funcional en el repositorio.

El núcleo se encuentra en:

- runtime/core/praxios-runtime.mjs
- runtime/core/scheduler.mjs
- runtime/core/ledger.mjs
- runtime/core/orchestrator.mjs
- runtime/server.mjs

## Ciclo ejecutable

\[
OBSERVE
\rightarrow
REASON
\rightarrow
PROPOSE
\rightarrow
VERIFY
\rightarrow
AUTHORIZE
\rightarrow
EXECUTE
\rightarrow
OBSERVE.
\]

Cada transición modifica un estado canónico y registra un evento en el ledger.

## Estado canónico

\[
S_t=
\{
goal,
evidence,
claims,
tasks,
authorizations,
actions,
decisions,
artifacts
\}.
\]

El estado no reside dentro de un modelo. Los modelos reciben sólo el contexto necesario para cada trabajo.

## Scheduler

El scheduler mantiene:

- dependencias;
- QUEUED;
- RUNNING;
- COMPLETED;
- FAILED;
- BLOCKED.

Una tarea no se ejecuta hasta que sus dependencias terminan correctamente.

## Provider registry

Un provider implementa:

~~~text
generate(request) -> text
~~~

Esto permite registrar cualquier modelo o servicio compatible.

El repositorio incluye adaptadores de servidor para OpenAI y Anthropic y un fixture provider para tests.

## Orquestación multi-modelo

El planner puede proponer un DAG, pero PRAXIOS crea y controla los trabajos.

\[
\text{planner output}
\rightarrow
\text{scheduler}
\rightarrow
\text{workers}
\rightarrow
\text{independent verifier}.
\]

## Ledger

Cada evento contiene:

- secuencia;
- timestamp;
- actor;
- session id;
- previous hash;
- payload;
- SHA-256 hash.

La cadena completa puede verificarse y las sesiones persistidas incluyen un checkpoint del estado.

## Persistencia

El runtime de servidor utiliza FileSessionStore.

Las escrituras son atómicas mediante archivo temporal + rename.

Una sesión puede reconstruirse con:

\[
\text{snapshot}
\rightarrow
\text{PraxiosRuntime.fromSnapshot}.
\]

## Acciones

Las acciones tienen un campo effect.

Los efectos:

- write;
- external;
- financial;
- publish

requieren autorización explícita de acuerdo con la política activa.

## UI pública

La página praxios.html ejecuta el mismo core de estado, scheduler, Meta-Harness y ledger dentro del navegador.

Para evitar exposición de secretos, el sitio público usa un fixture provider. Los adapters de modelos externos viven en el servidor.
