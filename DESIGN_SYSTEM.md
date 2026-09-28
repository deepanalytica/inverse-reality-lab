# Deep Analytica Design System

Version 1.0 · 2026-09-28

## Purpose

The public and product surfaces of Deep Analytica must be governed by a shared visual system rather than page-specific styling. The system exists to keep hierarchy, contrast, theming, interaction and component behavior consistent across the landing page, PRAXIOS, Deep Geo, Research, EL PUENTE and technical-review surfaces.

## Design principles

1. **Clarity before spectacle.** Decorative motion and editorial typography must never obstruct the reading order.
2. **Evidence over decoration.** Visual metaphors should explain state, trajectory or assurance rather than exist as ambient noise.
3. **Functional hierarchy wins.** Product headings, body copy and action controls remain legible before any expressive layer.
4. **Operational elegance.** Interfaces should feel precise, deliberate and inspectable.
5. **Human authority.** The system should communicate that people remain responsible for consequential decisions.

## Type roles

- **Sans / Inter:** primary product communication and UI.
- **Display / Instrument Serif:** selective editorial emphasis.
- **Mono / IBM Plex Mono:** metadata, labels, state and system notation.

Do not use display serif for paragraphs. Do not use mono for long-form reading.

## Brand signal

Primary signal: **Electric Iris**.

- Iris 500: `#725BFF`
- Iris 600: `#5A45DD`
- Iris 400: `#A796FF`
- Secondary coral: `#F56F56`

The grid is infrastructure, not decoration. It must remain subordinate to content.

## Theme architecture

Theme is stored on the root HTML element:

- `data-theme="light"`
- `data-theme="dark"`

Preference is persisted in `localStorage` under `deep-analytica-theme`. When no preference exists, the OS preference is used.

The landing uses `assets/theme-v1.js`. Other public surfaces inherit the same preference through `site-nav.js`.

## Semantic token examples

- `--da-bg`
- `--da-surface`
- `--da-text`
- `--da-text-2`
- `--da-text-3`
- `--da-border`
- `--da-accent`
- `--da-focus`
- `--da-field-bg`
- `--da-field-grid`

New components should consume semantic tokens rather than raw hex values.

## Responsive rules

Desktop uses a 12-column mental model, tablet 8, mobile 4. Public reading surfaces must collapse to a single column where required.

On mobile:
- decorative metaphors are reduced to background texture;
- display typography may emphasize but may not cover content;
- body copy must keep strong contrast;
- CTAs must remain at least 44px high;
- interactive fields must not trap scrolling unintentionally.

## Motion

Allowed:
- section reveal;
- line construction;
- trace interactions;
- controlled hover states;
- small state transitions.

Avoid:
- constant ornamental motion;
- moving layers behind long copy;
- motion that changes the apparent reading order.

Always respect `prefers-reduced-motion`.

## Source files

- `assets/design-system-v1.css` — governed landing design layer.
- `assets/theme-v1.js` — landing theme controller.
- `site-nav.js` — global navigation and cross-surface theme bridge.
- `design-system/index.html` — visual laboratory for tokens and components.

## Release rule

A new visual component should be tested in the design-system lab before it is introduced into a production-facing surface.
