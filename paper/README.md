# Paper canónico — Preprint v1.2

La versión académica canónica del proyecto es:

- **Fuente principal:** [main.tex](main.tex)
- **Secciones modulares:** [sections/](sections/)
- **PDF compilado por GitHub Actions:** [PAPER.pdf](PAPER.pdf)
- **Vista matemática web:** [../mathematics.html](../mathematics.html)
- **Biblioteca web:** [../library.html](../library.html)

## Idioma y alcance

El paper canónico está escrito en **español**, con abstract adicional en inglés. Integra:

- teoría de inversión terminal;
- ontología positiva/negativa;
- masa ausente contrafactual;
- campos \(T_b^+\) y \(T_b^-\);
- bifiltración \((\tau,r)\);
- orden parcial y frente inverso admisible;
- mecánica, contacto y acceso en \(SE(3)\);
- Bayes, identificabilidad y Expected Information Gain;
- ontología temporal latente;
- residual de fuerza;
- extensiones contrafactuales de compensación gravitatoria y campo elástico-helicoidal;
- cinco benchmarks documentados;
- estudio adversarial de ablación;
- correcciones epistemológicas;
- conjeturas, criterios de falsificación y programa Khufu.

## Compilación reproducible

Cada push a main ejecuta GitHub Actions:

1. compila paper/main.tex;
2. genera el PDF;
3. copia el resultado a paper/PAPER.pdf;
4. publica el sitio completo en GitHub Pages.

El paper está dividido en archivos LaTeX independientes dentro de paper/sections/ para facilitar revisión por pares, versionado y correcciones.

## Estado científico

**Preprint v1.2 / marco de investigación.**

El paper distingue explícitamente:

- matemática/física establecida;
- derivaciones internas;
- formalismos propuestos;
- hipótesis contrafactuales;
- observaciones publicadas;
- resultados de benchmark;
- estados no identificables.

No afirma haber resuelto el método histórico de construcción de Khufu ni presenta los campos gravitatorios hipotéticos como evidencia física.


## Extensión v1.2

El paper incorpora una sección formal de topología computacional e identificabilidad: homología relativa, filtración por despeje, zigzag persistence, persistencia multiparámetro, grafos de Reeb, politopos de orden y Expected Information Gain.
