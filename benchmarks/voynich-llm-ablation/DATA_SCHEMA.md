# Esquema de datos

Formato recomendado: JSONL, una fila por respuesta.

## Identidad

```json
{
  "experiment_id": "IRL-ADV-002",
  "run_id": "uuid",
  "task_id": "F1-001",
  "family": "paragraph_structure",
  "condition": "A",
  "track": "closed_book",
  "replicate": 1
}
```

## Modelo/configuración

```json
{
  "provider": "openai",
  "model": "MODEL_ID",
  "model_version": "VERSION_IF_AVAILABLE",
  "reasoning_effort": "fixed",
  "temperature": null,
  "max_output_tokens": 8000,
  "tools_enabled": false,
  "system_prompt_hash": "sha256:...",
  "condition_prompt_hash": "sha256:...",
  "source_pack_hash": "sha256:..."
}
```

## Ejecución

```json
{
  "started_at": "ISO-8601",
  "latency_ms": 0,
  "input_tokens": 0,
  "output_tokens": 0,
  "cost_usd": null,
  "technical_failure": false,
  "raw_response_path": "runs/..."
}
```

## Scoring

```json
{
  "accuracy": 0,
  "traceability": 0,
  "falsification": 0,
  "hypothesis_control": 0,
  "calibration": 0,
  "error_detection": 0,
  "n_obs": 0,
  "n_derived": 0,
  "n_hypothesis": 0,
  "n_unsupported": 0,
  "n_error": 0,
  "judge_id": "blind-j1",
  "adjudicated": false
}
```

## Tool log open-book

Cada tool call se guarda por separado con:

- run_id;
- secuencia;
- herramienta;
- consulta;
- fuente/URL;
- timestamp;
- resultado resumido;
- si la fuente ya estaba en el source pack.

## Integridad

No editar outputs crudos. Cualquier corrección de scoring debe generar una nueva versión de adjudicación.
