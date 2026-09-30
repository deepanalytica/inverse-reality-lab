# Amenazas a la validez y controles

## 1. Fuga de respuestas por contexto

**Riesgo:** B/C contienen la solución.

**Control:** separar training/context de holdout; auditar contexto antes de correr; hash y versionado.

## 2. Diferencia de modelo

**Riesgo:** “genérico” corre un modelo distinto.

**Control:** mismo model ID/configuración. Si la UI no permite garantizarlo, clasificar la corrida como cuasi-experimental.

## 3. Herramientas desiguales

**Riesgo:** C tiene web o conectores y A no.

**Control:** tool parity estricta. Closed-book como pista principal.

## 4. Longitud

**Riesgo:** C parece mejor porque escribe más.

**Control:** formato común, límite de tokens y análisis ajustado por longitud.

## 5. Judge bias

**Riesgo:** el juez reconoce el estilo de C.

**Control:** anonimización, orden aleatorio, dos jueces, adjudicación y métricas objetivas de claims.

## 6. LLM-as-judge autocorrelacionado

**Riesgo:** un juez de la misma familia favorece su estilo.

**Control:** familia distinta + auditoría humana estratificada.

## 7. No determinismo

**Riesgo:** una sola corrida favorece una condición por azar.

**Control:** 5 réplicas por tarea en main.

## 8. Contaminación del benchmark público

**Riesgo:** el modelo consulta este repositorio.

**Control:** closed-book sin herramientas y source packs locales; registrar ventana de ejecución.

## 9. Gold ambiguo

**Riesgo:** en Voynich muchas preguntas no tienen “verdad” semántica conocida.

**Control:** gold centrado en hechos verificables (transcripción, posición, frecuencia, contraejemplos, consistencia lógica), no en traducciones no demostradas.

## 10. Confirmación del investigador

**Riesgo:** diseñar puntuación para premiar PRAXIOS.

**Control:** prerregistro, criterios de fracaso, resultados negativos publicados y revisión adversarial.

## 11. Transferencia

**Riesgo:** extrapolar Voynich a cualquier investigación.

**Control:** conclusión restringida al dominio y configuración probados hasta replicaciones externas.
