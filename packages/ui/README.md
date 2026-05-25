# packages/ui

Shared React UI primitives used across all apps in this monorepo.

**Package name**: `@packages/ui`

---

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary and ghost variants |
| `Card` | Generic rounded container with border and padding |
| `Container` | Max-width content wrapper with horizontal padding |
| `Section` | Vertical spacing wrapper for page sections |

---

## Usage

```tsx
import { Button, Card, Container, Section } from "@packages/ui";

export function MyPage() {
  return (
    <Section>
      <Container>
        <Card>
          <Button>Click me</Button>
        </Card>
      </Container>
    </Section>
  );
}
```

The `@packages/ui` alias is resolved via npm workspaces — no installation needed beyond running `npm install` at the repo root.

---

## Adding a new component

1. Create `src/primitives/<name>.tsx` (atoms) or `src/layout/<name>.tsx` (layout)
2. Export it from `src/index.ts`
3. Keep components intentionally minimal — app-level Tailwind classes do the visual styling

---

## Structure

```
packages/ui/
├── src/
│   ├── index.ts              # Barrel export
│   ├── primitives/
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── layout/
│   │   ├── container.tsx
│   │   └── section.tsx
│   └── utils/
│       └── cn.ts             # clsx/tailwind-merge utility
└── package.json
```
