# Component Standards (Next.js App Router + TypeScript)

This document defines standards for creating and maintaining components in the project.
Goals: consistency, accessibility, predictable APIs, and ease of evolution.

---

## 1) Package Manager (required)

- This project uses **pnpm** as the only package manager.
- Use only pnpm commands (for example: `pnpm install`, `pnpm dev`, `pnpm test`, `pnpm build`).
- Do not use npm commands in this repository.
- Do not create or commit `package-lock.json`.

---

## 2) Folder structure

### Routes

- `app/` must contain **only** route files:
  - `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
  - `route.ts` (handlers)
- Avoid reusable UI logic inside `app/`

## 3) Client vs Server Components

### Default

- Components in `components/ui/` may be **Client Components** when they:
  - use handlers (`onClick`, `onChange`), state, effects, refs
- Components without interactivity should be **Server Components** (avoid `"use client"`).

### Rules

- Avoid `"use client"` by default everywhere.
- If a component is Client, add `"use client"` at the top of the file.
- Do not import `server-only` modules inside Client Components.

---

## 4) Accessibility (A11y) — required

### General rules

- Prefer semantic HTML:
  - Data tables: use `<table>`
  - Actions: use `<button>`
  - Navigation: use `<nav>`
  - Inputs: always pair with an associated `<label>`
- Visible focus is required:
  - use `focus-visible:*` for outlines/rings
- Error messages: use `role="alert"` when appropriate
- Icon-only buttons: must have `aria-label` or visually hidden text (`sr-only`)

### Tables

- Always use:
  - `<caption>` for a title
  - `<th scope="col">` for headers
- Avoid complex tables unless necessary.

---

## 5) Styling (Tailwind via CSS styles) — required

### Rule: no Tailwind utility strings inline in JSX

- **Do not** write `className="flex gap-2 ..."`.
- Components must use a **component-scoped CSS Style** (`<Component>.styles.css`).
- Tailwind utilities must be composed inside the CSS Style using `@apply`.
- Semantic class names in JSX are allowed and expected (for example: `className="create-order-modal__field"`).
- The restriction applies only to raw Tailwind utility strings inline in JSX.

### Tailwind v4 rule for `@apply`

- In this project setup, any stylesheet that uses `@apply` must include `@reference` at the top.
- Without `@reference`, Tailwind v4 may fail with unknown utility errors during build.
- Use the project global stylesheet as reference.

Example:

```css
@reference '../../styles/globals.css';

.root {
	@apply inline-flex items-center gap-2;
}
```

### Example

**CSS Styles**

```css
.root {
	@apply inline-flex items-center justify-center rounded-md font-medium transition;
	@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
	@apply disabled:opacity-50 disabled:pointer-events-none;
}
```

**Component**

```tsx
import styles from './Button.styles.css';

export function Button() {
	return <button className={styles.root} />;
}
```

### Variants

- Use the `variant` prop for visual style.
- Use the `size` prop for sizing.
- Variants and sizes must map to CSS Style class names (e.g. `.primary`, `.secondary`, `.sm`, `.md`, `.lg`).
- Don’t invent variant names per component (keep consistent across the UI kit).

Recommended standard:

- `variant`: `"primary" | "secondary"`
- `size`: `"sm" | "md" | "lg"`

### When conditional styling is needed

- Prefer explicit modifier classes in the CSS Style:
  - `.isLoading`, `.isSelected`, `.hasError`, etc.
- Or use data attributes (when integrating with libraries like Radix):
  - `[data-state="open"] { ... }`

---

## 6) Component API (best practices)

### Rules

- Props should be small and predictable.
- Prefer `children` and composition over too many boolean props.
- Avoid coupling to services/requests inside `components/ui/`.

### Loading/disabled

- Interactive components must support:
  - `disabled`
  - `loading` (when applicable)
- When `loading`:
  - set `aria-busy={true}`
  - disable interaction (e.g., set `disabled`)

---

## 7) Compound Components (when to apply)

Use Compound Components only when the component has multiple semantic parts that must share state/context.

Apply Compound when at least 2 of these are true:

- multiple related parts (for example: Root, Label, Input, Hint, Error)
- shared behavior/state between parts (open, selected, invalid, disabled, ids)
- need for flexible composition in layout
- prop-based API would become too large/noisy

Do not apply Compound when:

- a single primitive with `variant`, `size`, `disabled`, `width` is enough
- no shared state is required between parts

If Compound is applied:

- `Root` owns shared state/context
- parts consume context (`Component.Root`, `Component.Part`)
- a11y links are required (`id`, `aria-describedby`, `aria-invalid`)
- Storybook must include composed usage
- tests must cover composition + a11y behavior

---

## 8) SOLID applied to UI

### Single Responsibility (SRP)

### Container vs Presentational

- Containers (domain):
  - fetch data, apply rules, call services
- Presentational (UI):
  - receive ready-to-render data via props and render it

---

## 9) Tests (required)

- Every new component must include tests.
- Any behavior change in an existing component must update/add tests.
- Test files must live close to the component:
  - `components/<Name>/__tests__/<Name>.test.tsx`

Minimum required cases per interactive component:

1. Renders with default props
2. Accessibility:
   - correct role/name/label
   - icon-only controls include `aria-label`
3. Interaction:
   - user events trigger expected callbacks (`onClick`, `onChange`, etc.)
4. States:
   - `disabled`
   - `loading` (when supported)
   - any documented variant/size behavior

Commands:

- Run tests with `pnpm test`
- CI must fail when required tests are missing or failing

## 10) State Management (Zustand)

Goal: avoid prop drilling while keeping state predictable, testable, and well-scoped.

## 11) When to use Zustand (✅)

Use Zustand when state is shared by **multiple components** that are not in a simple parent/child chain, or when prop drilling becomes noisy.

Typical cases:

- Table state shared across multiple UI parts:
  - filters, sorting, pagination, selected rows
- Multi-step forms (wizard) across multiple components
- Global UI state:
  - toasts, dialogs, sidebars, theme (if not handled elsewhere)
- Data shared across pages/layout segments (client-side only)

Rule of thumb:

- If a value is passed through **2+ intermediate components** only to reach a deeper child, consider Zustand.

---

## When NOT to use Zustand (❌)

Do NOT use Zustand for:

- Single-component local state → use `useState` / `useReducer`
- Simple parent-child passing with 1 level → props are fine
- Server state / remote data cache → prefer React Query / SWR (or Next fetch + caching)
- Anything that must stay on the server (secrets, database calls)

Prefer composition before Zustand:

- colocate components
- pass `children`
- create a small container component to own the state

---

## 12) Storybook (required)

- Every reusable UI component in `components/ui/*` must have a story.
- Story file name: `<Component>.stories.tsx`
- Prefer CSF3 format (`Meta`, `StoryObj`).
- Keep stories beside the component, or in a single documented stories folder (pick one and enforce it).

### Story quality rules

- Provide at least:
  - `Default`
  - one variant/state (e.g. `Disabled`, `Loading`, `WithIcon`)
- Use `args`/`argTypes` for props controls.
- Do not fetch real APIs in stories; use mocks.
- Stories must be deterministic (no random/time-based unstable UI).
- For icon-only buttons, include accessibility label in the story examples.

### Styling and providers

- Stories must render with the same global styles/theme as app runtime (Tailwind/theme tokens).
- Add required decorators (theme/provider/router mock) in `.storybook/preview.ts`.

### Commands

- Run locally: `pnpm run storybook`
- Build docs: `pnpm run build-storybook`
- PRs should pass Storybook build when UI components are changed.
