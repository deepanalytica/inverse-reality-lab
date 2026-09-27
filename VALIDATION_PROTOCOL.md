# Protocolo de validación v1.2

## Objetivo

IRL debe evaluarse como sistema de inferencia, no como demostración visual.

La validación se organiza en seis capas.

## V1 — Integridad de datos

Checks automáticos:

- JSON válido;
- identificadores únicos;
- referencias de evidencia existentes;
- estados epistemológicos permitidos;
- estados causales ordenados;
- hipótesis con predicciones;
- hipótesis con discriminadores;
- enlaces de fuente definidos.

## V2 — Consistencia matemática

Cada fórmula debe estar clasificada como:

- establecida;
- derivada;
- propuesta;
- heurística;
- contrafactual.

Cada cantidad propuesta debe incluir unidades, dominio y condiciones de uso.

## V3 — Validación topológica

Para datasets sintéticos con ground truth:

- una esfera;
- un toro;
- dos cavidades;
- cámara + corredor estrecho;
- apertura y cierre zigzag.

El motor volumétrico futuro deberá recuperar los Betti numbers conocidos.

## V4 — Validación mecánica

Casos de control:

- bloque estable;
- bloque sin soporte;
- contacto unilateral;
- fricción insuficiente;
- cierre con soporte temporal.

## V5 — Benchmarks constructivos

Los cinco casos actuales se consideran retrospectivos.

La fase prospectiva debe:

1. congelar ontología;
2. congelar gates;
3. ocultar cronología;
4. pre-registrar métricas;
5. ejecutar inferencia;
6. revelar ground truth;
7. publicar errores.

## V6 — Khufu

Para Khufu se medirán resultados por:

- reducción del espacio de historias;
- calibración de incertidumbre;
- posterior predictivo;
- capacidad de anticipar evidencia;
- EIG de mediciones propuestas.

## Métricas

### Precedencias

Precision y recall sobre relaciones de orden conocidas:

\[
\mathrm{Precision}
=
\frac{TP}{TP+FP},
\]

\[
\mathrm{Recall}
=
\frac{TP}{TP+FN}.
\]

### Calibración

Para eventos probabilísticos:

- Brier score;
- reliability diagrams;
- log score.

### Reducción de historia

\[
R
=
1-
\frac{\mu(\mathcal H_{\mathrm{post}})}
{\mu(\mathcal H_{\mathrm{prior}})}.
\]

### Información

\[
\Delta \mathsf H
=
\mathsf H_{\mathrm{prior}}
-
\mathsf H_{\mathrm{post}}.
\]

## Condición de éxito científico

IRL avanza cuando aumenta poder discriminante o calibración sobre un baseline predefinido.

Una interfaz más compleja no cuenta como validación.


## Benchmark topológico sintético

La versión v1.2 incluye cuatro geometrías voxelizadas con tipo topológico conocido:

- bloque sólido: \((1,0,0)\);
- dos componentes: \((2,0,0)\);
- shell hueca: \((1,0,1)\);
- toro sólido: \((1,1,0)\).

El script scripts/topology_synthetic.py calcula característica de Euler y Betti numbers como control previo a la aplicación arqueológica.
