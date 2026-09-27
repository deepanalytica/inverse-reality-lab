# Ontología de Realidad Inversa — Preprint v1.2

**Alexis Brian Reyes Saavedra · Deep Analytica · Chile**

- [PDF canónico](PAPER.pdf)
- [Fuente LaTeX](main.tex)
- [Secciones del paper](sections/)
- [Vista matemática](../mathematics.html)
- [Biblioteca completa](../library.html)

## Tesis central

IRL busca inferir:

\[
\boxed{
P(
\text{historias constructivas}
\mid
\text{objeto terminal},
\text{evidencia},
\text{leyes},
\text{contexto}
)
}
\]

sin forzar una historia única cuando los datos no la identifican.

## Formalismos principales

\[
\mathcal A(t)
=
(\mathcal K^+(t),\mathcal K^-(t))
\]

materia positiva y arquitectura negativa;

\[
m^\ominus(V)
=
-\int_V\rho_{\rm ref}\,dV
\]

masa ausente contrafactual;

\[
T_b^+(\mathbf x),
\qquad
T_b^-(\mathbf x)
\]

campos de incorporación material y reserva de espacio negativo;

\[
V_{\tau,r}
=
\{
\mathbf x\notin M_\tau:
d(\mathbf x,M_\tau)\ge r
\}
\]

bifiltración del espacio negativo;

\[
\mathcal A^-(X)
=
\{
e\in\operatorname{Max}(P):
\mathrm{Stable}
\land
\mathrm{Accessible}
\land
\mathrm{EvidenceCompatible}
\}
\]

frente inverso admisible.

## Resultado metodológico de los benchmarks

Cinco controles —Golden Gate, Torre Eiffel, Hoover Dam, Empire State Building y Sydney Opera House— muestran que procesos convencionales y ontologías temporales pueden reducir el residual de fuerza a aproximadamente cero a la resolución gruesa estudiada.

El estudio adversarial corrige una interpretación demasiado fuerte: **el terminal aislado no identifica la mayoría de los mecanismos**.

La regla final es:

\[
\boxed{
\text{missing evidence}
\not\Rightarrow
\text{unknown force}
}
\]

y el protocolo pasa a ser:

\[
\boxed{
\text{CHECK IDENTIFIABILITY}
\rightarrow
\text{CAUSAL ORDER}
\rightarrow
\text{TEMPORARY ONTOLOGY}
\rightarrow
\text{CONVENTIONAL PROCESSES}
\rightarrow
\text{RESIDUAL}
}
\]

## Física contrafactual

El paper conserva modelos de compensación gravitatoria \(\alpha(\mathbf x,t)\) y un campo elástico-helicoidal como **extensiones falsables**, no como explicaciones históricas ni como física establecida.

## Estado

Preprint v1.2. El próximo paso científico es pasar de benchmarks retrospectivos a experimentos prospectivos con reglas congeladas y ground truth oculto.


## Formalización v1.2

La versión actual corrige la terminología topológica: la familia temporal se modela con zigzag persistence cuando las inclusiones cambian de dirección. También incorpora homología relativa respecto del exterior y politopos de orden para cronologías parciales.
