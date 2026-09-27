# PRAXIOS Runtime + Meta-Harness

Este directorio contiene el runtime funcional de PRAXIOS y el motor de assurance Meta-Harness.

## Qué es real en esta implementación

### PRAXIOS

El runtime mantiene estado canónico fuera del modelo y ejecuta el ciclo:

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

Incluye:

- sesión con revisión incremental;
- scheduler con dependencias;
- registro de providers;
- separación proposer / verifier;
- registro de evidencia;
- claims tipados;
- solicitudes de autorización;
- ejecución bloqueada hasta aprobar efectos;
- decisiones;
- ledger hash-chain SHA-256.

### Meta-Harness

Evalúa claims y acciones mediante gates:

- epistemic class;
- provenance;
- evidence;
- contradiction;
- uncertainty;
- identifiability;
- role separation;
- publication policy;
- walls;
- authorization;
- audit integrity.

El resultado agregado es:

\[
PASS,\quad REVIEW,\quad BLOCK.
\]

Un BLOCK de autorización o wall impide la ejecución.

## Providers

La implementación contiene adaptadores para:

- OpenAI Responses API;
- Anthropic Messages API;
- fixture provider para tests y la UI pública.

Las claves permanecen en el servidor mediante variables de entorno; la UI estática no solicita ni almacena API keys.

## Ejecutar localmente

Requiere Node.js 20 o posterior.

~~~bash
cd runtime
npm test
npm start
~~~

Health check:

~~~text
GET http://127.0.0.1:8787/api/health
~~~

## Configurar modelos

Variables opcionales:

~~~text
OPENAI_API_KEY
PRAXIOS_OPENAI_MODEL
ANTHROPIC_API_KEY
PRAXIOS_ANTHROPIC_MODEL
PORT
HOST
PRAXIOS_CORS_ORIGIN
~~~

Los nombres de modelo no están fijados por el runtime. Se configuran por slot para que PRAXIOS sea provider-agnostic.

## Orquestación multi-modelo

El endpoint POST /api/orchestrate recibe un objeto con goal, planner, workers y verifier.

El planner propone el DAG. PRAXIOS crea y ejecuta los jobs. El verifier independiente produce claims, evidencia y acciones propuestas. Meta-Harness aplica los gates.

## Seguridad arquitectónica

Las acciones con efectos write, external, financial o publish requieren autorización explícita.

Los hard walls se evalúan antes de ejecutar. Una acción etiquetada secret_export o bypass_ledger queda estructuralmente bloqueada.

## UI pública

La página praxios.html ejecuta el mismo core en el navegador con un fixture provider seguro. Eso permite probar estados, gates, ledger, autorización y decisiones sin exponer secretos.

Para sesiones con modelos externos, se conecta la UI al runtime de servidor.


## Persistencia

El servidor persiste snapshots de sesión mediante FileSessionStore. Cada snapshot conserva estado, tasks y ledger. PraxiosRuntime.fromSnapshot reconstruye la sesión y vuelve a verificar la cadena.

## Autenticación del servidor

Cuando HOST no es localhost, PRAXIOS_SERVER_TOKEN es obligatorio. Las rutas distintas de /api/health requieren Authorization: Bearer <token> cuando el token está configurado.

## Auditoría de estado

Cada evento incorpora un checkpoint SHA-256 del estado canónico, excluyendo metadatos temporales de revisión. El endpoint /api/sessions/:id/audit verifica ledger y correspondencia del estado con el último checkpoint.


## Tool / executor policy

Cada executor puede registrar metadata autoritativa de efecto, tags y disponibilidad. El modelo no puede reducir el nivel de efecto declarado por el registro.

Las autorizaciones se vinculan a la acción completa. Si el payload cambia después de aprobarse, Meta-Harness bloquea la ejecución.
