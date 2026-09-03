# Design Reference — Williams Steel Works

**Identity: "Structural / Fab Shop."** Warm paper ground, drafting-ink dark sections, a
torch/weld orange accent, cool steel-grey neutrals. Square corners, 2px hard borders
instead of soft shadows, a faint engineering grid on dark sections, numbered section
headers, and one cut-plate corner detail. Sentence case for headings; UPPERCASE +
tracking reserved for mono labels, eyebrows, and buttons.

All tokens live in `tailwind.config.js`. Primitives live in `src/components/ui/`.
Global base + the three helper classes live in `src/index.css`.

---

## Colour (`tailwind.config.js` → `theme.extend.colors`)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4F1EA` | default page background |
| `paper-dim` | `#E9E4D8` | alternate / recessed sections |
| `ink` | `#16181D` | body text, hard borders, dark bands |
| `ink-soft` | `#33373F` | secondary body text on paper |
| `weld` | `#E4512B` | primary accent — CTAs, keylines, active nav, focus ring |
| `weld-dark` | `#C13F1E` | hover / pressed |
| `weld-light` | `#F0703F` | — reserved |
| `blueprint` | `#17313D` | dark section background (with grid) |
| `blueprint-dark` | `#0F232C` | — reserved |
| `steel-100…700` | `#E4E1DA → #343430` | borders (200), placeholder (400), muted text (500), on-dark text (200) |
| `success` / `warning` / `danger` | `#3F7D4E` / `#C98A1E` / `#C43B2B` | each has `.DEFAULT`, `.surface`, `.border`. Kept separate from `weld`. |

There is no separate "brand red" and "error red" collision any more: brand = `weld`,
errors = `danger`.

## Typography

Loaded via Google Fonts in `index.html`.

| Family | Token | Role |
|---|---|---|
| **Archivo** (400–900) | `font-display` | headings — `font-black` for H1/hero, `font-extrabold` for H2/H3 |
| **IBM Plex Sans** (400–700) | `font-sans` | body copy (default on `<body>`) |
| **IBM Plex Mono** (400–600) | `font-mono` | eyebrows, labels, buttons, spec lines, metadata |

- Display headings use `tracking-tightest` (`-0.045em`).
- Mono labels use `tracking-eyebrow` (`0.22em`) or `tracking-label` (`0.14em`), always `uppercase`.
- Heading sizes are set by `<SectionHeading>` / `<PageHero>` — don't hand-size H2s.

## Spacing & layout

- `<Container>` — `max-w-7xl` + `px-5 sm:px-8 lg:px-12`. Width/gutters only.
- `<Section>` — vertical rhythm (`py-16 md:py-24`) + a `tone` (`paper` | `dim` | `dark` | `weld`). Wraps children in a Container.
- Custom scale: `spacing.section` = 6rem, `spacing.section-lg` = 8rem. `maxWidth.prose` = 68ch.
- Header/Footer use `<Container>` directly (no section padding leaks in).

## Shape & elevation

- `borderRadius` is reset: default **0**, `sm`/`edge` = 2px, `full` for pills. The system is square.
- No blurred shadows. `boxShadow.hard` = `5px 5px 0 0 #16181D` (offset plate lift), `hard-sm`, `hard-weld`.
- `.edge-clip` (in `index.css`) cuts a 16px corner off the top-right — used on featured panels only.
- `.blueprint-grid` — `blueprint` bg + 30px engineering grid. Used by `<PageHero>` and `<Section tone="dark">`.
- `.hazard-rule` — caution-tape divider (`<HazardRule>`), one per page maximum.

## Focus & motion

- Single global treatment: `*:focus-visible { outline: 2px solid weld; outline-offset: 2px }` — works on light and dark.
- Transitions: `duration-200` + `ease-snap` (`cubic-bezier(0.2,0.8,0.2,1)`). Interactive cards shift `-translate-x/y-1` into a `shadow-hard`.

---

## Components (`src/components/ui/`, re-exported from `ui/index.js`)

| Component | Notes |
|---|---|
| `Container` | width + gutters |
| `Section` | `tone`, `container`, `containerClassName` |
| `Eyebrow` | mono kicker; `index` prop → `01 — `; `tone` `weld` \| `muted` \| `onDark` |
| `SectionHeading` | `index`, `eyebrow`, `title`, `intro`, `align`, `tone` (`light` \| `dark`) |
| `PageHero` | inner-page hero on the blueprint grid; `index`, `eyebrow`, `title`, `spec`, `subtitle`, children |
| `Button` | `variant` `primary` \| `outline` \| `onDark` \| `solidLight`; `size` `sm` \| `md` \| `lg`; `as` (e.g. `Link`); `withArrow` |
| `Card` | `interactive`, `accent` (weld top keyline), `clip` (cut corner), `padding` `none` \| `md` \| `lg`, `as` |
| `CTASection` | the one recurring end-of-page CTA (ink band, weld eyebrow, light button) |
| `SpecList` | feature list; marker is a bracketed weld square, not a check-circle; `columns`, `tone` |
| `Stat` | spec-sheet figure on a weld tick; `value`, `unit`, `label`, `tone`. Use real facts only. |
| `Icon` | one 24px stroke set; `name`, `strokeWidth`. Names: fabrication, welding, installation, arrowRight, check, menu, close, clock, phone, mail, document, search |
| `Logo` | wordmark lockup; `tone` `ink` \| `paper`, `size` `sm` \| `md` |
| `HazardRule` | diagonal-stripe divider |
| `Field`, `Label`, `Input`, `Textarea`, `Select`, `FieldError` | form primitives. `Input/Textarea/Select` forward refs (react-hook-form `register` works). `invalid` prop drives the `danger` border. `Select` has a custom chevron (no `@tailwindcss/forms`). |

### Usage example

```jsx
import { Section, SectionHeading, Card, Icon, Button } from '../components/ui'
import { Link } from 'react-router-dom'

<Section tone="dim">
  <SectionHeading index="02" eyebrow="Services" title="What we offer" />
  <div className="mt-12 grid gap-6 md:grid-cols-3">
    <Card as={Link} to="/services" interactive accent className="flex flex-col">
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center border-2 border-ink text-weld">
        <Icon name="fabrication" className="h-7 w-7" />
      </span>
      <h3 className="font-display text-xl font-extrabold tracking-tightest text-ink">Metal Fabrication</h3>
      <p className="mt-2 flex-grow text-ink-soft">Custom fabrication to spec.</p>
      <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-weld">
        See services <Icon name="arrowRight" className="h-4 w-4" />
      </span>
    </Card>
  </div>
</Section>
```

## Accessibility

- Skip link in `Layout.jsx` → `<main id="main-content">`.
- Every icon-only control has an `aria-label`; nav items carry `aria-current="page"`.
- Form fields: `<Label htmlFor>` bound, `aria-invalid` on error, mono error text via `<FieldError>`.
- Gallery modal: `role="dialog"` + `aria-modal` + `aria-label`.
- Focus ring is `weld` at 2px with 2px offset, on every interactive element.

## Content notes

- Phone: **(678) 849-4592** → `tel:+16788494592` (Header footer + Contact now match).
- Email: **info@williamssteelworks.net** (Header footer + Contact now match).
- `Stat` values are drawn from existing copy (3 services, 4 sectors, 24-hr response, MIG/TIG/Stick) — do not invent metrics or credentials.
