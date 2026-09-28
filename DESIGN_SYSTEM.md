# Deep Analytica Design System v1

Production design system for the public Deep Analytica landing.

## Architecture
- `assets/system/tokens.css`: primitives + semantic light/dark tokens.
- `assets/system/components.css`: typography, spacing, buttons, shared UI.
- `assets/system/landing.css`: production landing implementation using existing semantic HTML.
- `assets/system/theme.js`: persistent light/dark theme controller.

## Visual principles
1. Clarity before spectacle.
2. Functional hierarchy before decorative typography.
3. Electric Iris is the primary signal color.
4. Body text always uses semantic contrast tokens.
5. The grid is infrastructure, not content.
6. Motion is stateful and optional.
7. Light and dark themes use the same component hierarchy.

## Type roles
- Sans: product/UI hierarchy.
- Serif: editorial emphasis only.
- Mono: metadata, labels, states.

## Theme
Theme state lives on `html[data-theme]`.
The first visit respects `prefers-color-scheme`; explicit user choice is saved in `localStorage`.

## Production rule
Do not add raw colors or arbitrary font sizes to page components. Add or update tokens first.
