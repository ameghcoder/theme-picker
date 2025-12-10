
# Next.js + Tailwind — Scalable Multi-Theme System (100+ themes)

This single-file scaffold includes a recommended folder structure and all the essential code snippets that needs to implement a dynamic theme system where each theme has both light & dark variants, supports previewing, lazy-loading, and persists the user's choice.

---

## Folder structure

```arduino
my-next-app/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ providers/  <-- theme provider + hooks
│  │   ├─ ThemeProvider.tsx
│  │   └─ useThemeManager.tsx
│  └─ components/
│     ├─ ThemePreview.tsx
│     └─ ThemeButton.tsx
├─ styles/
│  ├─ globals.css
│  └─ themes/
│     ├─ gray-lavish.css
│     ├─ ocean-blue.css
│     └─ ... (other theme files; consider one file per theme)
├─ lib/
│  └─ themeRegistry.ts
├─ tailwind.config.js
├─ postcss.config.js
└─ package.json
```

---

## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables so Tailwind utilities reflect runtime theme
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        muted: 'var(--color-muted)',
      },
    },
  },
  plugins: [],
};
```

> Tip: Use `bg-background`, `text-foreground`, `text-primary`, etc. in your components.

---

## postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* default variables (fallback theme) */
:root {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
  --color-muted: oklch(0.97 0 0);
}

/* Optional default dark-mode mapping if you want an initial dark style */
[data-mode="dark"] {
  /* fallback dark values if no theme selected */
  --color-background: oklch(0.145 0 0);
  --color-foreground: oklch(0.985 0 0);
}

/* small utilities to directly use variables if needed */
.bg-theme { background-color: var(--color-background); }
.text-theme { color: var(--color-foreground); }
```

---

## styles/themes/gray-lavish.css (example)

```css
/* Each theme defines both [data-mode="light"] and [data-mode="dark"] */

[data-theme="gray-lavish"][data-mode="light"] {
  --color-background: oklch(0.98 0.02 260);
  --color-foreground: oklch(0.12 0 0);
  --color-primary: oklch(0.22 0.03 260);
  --color-primary-foreground: oklch(0.99 0 0);
  --color-muted: oklch(0.95 0 0);
}

[data-theme="gray-lavish"][data-mode="dark"] {
  --color-background: oklch(0.12 0.01 260);
  --color-foreground: oklch(0.98 0 0);
  --color-primary: oklch(0.84 0.05 260);
  --color-primary-foreground: oklch(0.12 0 0);
  --color-muted: oklch(0.25 0 0);
}
```

> Repeat the same pattern for every theme. Keep each theme file lightweight (only variables).

---

## lib/themeRegistry.ts

```ts
// central metadata for all themes (used for UI lists and preview info)
export const themes = [
  { id: 'gray-lavish', name: 'Gray Lavish', preview: 'linear-gradient(135deg,#e6e6ea,#d9dbe1)' },
  { id: 'ocean-blue', name: 'Ocean Blue', preview: 'linear-gradient(135deg,#cfe9ff,#b2d4ff)' },
  // ...automatically generate or maintain this list
];
```

---

## app/providers/ThemeProvider.tsx (client)

```tsx
'use client';
import React, { useEffect } from 'react';
import { themes } from '@/lib/themeRegistry';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // On first load: apply saved theme or fallback to first theme
    const saved = localStorage.getItem('theme');
    const themeToApply = saved || themes[0].id;

    // Determine initial mode from OS
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // ensure attributes exist
    document.documentElement.setAttribute('data-theme', themeToApply);
    document.documentElement.setAttribute('data-mode', mode);

    // optional: listen for OS changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-mode', newMode);
      localStorage.setItem('mode', newMode);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return <>{children}</>;
}
```

---

## app/providers/useThemeManager.tsx (hook)

```tsx
'use client';
import { useCallback, useEffect, useState } from 'react';

function getSystemMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useThemeManager() {
  const [theme, setTheme] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'gray-lavish') : 'gray-lavish');
  const [mode, setMode] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('mode') || getSystemMode()) : 'light');

  useEffect(() => {
    // ensure attributes on mount
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
  }, [theme, mode]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      const newMode = e.matches ? 'dark' : 'light';
      setMode(newMode);
      document.documentElement.setAttribute('data-mode', newMode);
      localStorage.setItem('mode', newMode);
    };
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const applyTheme = useCallback(async (themeId: string) => {
    // lazy-load CSS file for large # of themes (improves initial load)
    try {
      await import(`../../styles/themes/${themeId}.css`);
    } catch (err) {
      // If bundler can't import dynamically, ensure themes are pre-imported in registry
      console.warn('Failed to lazy-load theme:', themeId, err);
    }

    const currentMode = getSystemMode();
    document.documentElement.setAttribute('data-theme', themeId);
    document.documentElement.setAttribute('data-mode', currentMode);
    setTheme(themeId);
    setMode(currentMode);
    localStorage.setItem('theme', themeId);
  }, []);

  return { theme, mode, applyTheme };
}
```

---

## app/components/ThemePreview.tsx

```tsx
'use client';
import React from 'react';
import { themes } from '@/lib/themeRegistry';
import { useThemeManager } from '@/providers/useThemeManager';

export default function ThemePreview() {
  const { applyTheme, theme: active } = useThemeManager();

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {themes.map((t) => (
        <div key={t.id} className="p-2">
          <button
            onClick={() => applyTheme(t.id)}
            className={`w-full h-28 rounded-lg border transition-shadow p-3 flex flex-col justify-end items-start ${active === t.id ? 'ring-2 ring-offset-2' : ''}`}
            aria-pressed={active === t.id}
            style={{ background: t.preview }}
          >
            <span className="text-sm font-medium">{t.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## app/layout.tsx (Next.js app router example)

```tsx
import './styles/globals.css';
import './styles/themes/gray-lavish.css';
import './styles/themes/ocean-blue.css';
// you can import a few core/common themes up-front; others can be lazy-loaded

import ThemeProvider from './providers/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Notes & Best Practices

1. **Lazy-load themes:** For 100+ themes, prefer lazy-loading theme CSS files when the user previews or applies them. The `useThemeManager.applyTheme` uses dynamic import to attempt that.

2. **Preview vs. Apply:** For previews you can: (A) apply the theme id to `<html>` temporarily (no `localStorage` write) and revert if user cancels, or (B) render a component mock that uses the theme variables in `style` for a little preview frame. Temporary approach example:

```ts
function previewTheme(themeId) {
  const prev = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', themeId);
  // on mouseleave restore prev
}
```

3. **Performance:** Keep theme files minimal — only variables. Avoid heavy selectors or large CSS per theme.

4. **Tailwind:** Use `var(--color-*)` in `tailwind.config.js` so utilities reflect runtime changes.

5. **Server-side rendering:** Since theme relies on `document` and `window`, protect any code with `typeof window !== 'undefined'` checks. You could also render a small inline script in the server HTML to rehydrate the `data-theme` before React loads (prevents FOUC). Example inline script in `app/document` or `app/layout.tsx` is possible.

6. **Persisting mode preference:** You can let mode always follow the OS `prefers-color-scheme` (recommended), or let user choose explicit `light`/`dark` and store `mode` in `localStorage`.

---

## Quick example: Inline script to set theme early (prevent FOUC)

Place inside `<head>` (server-side render) to set attributes before CSS loads:

```html
<script>
  (function(){
    try {
      var theme = localStorage.getItem('theme');
      var mode = localStorage.getItem('mode');
      if (!theme) theme = 'gray-lavish';
      if (!mode) {
        mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-mode', mode);
    } catch(e){}
  })();
</script>
```

---

If you'd like, I can:
- generate a ZIP of all these files (ready to drop into a Next.js project),
- or create a runnable minimal repository structure with `package.json` and `scripts`.

Tell me which option you prefer and I will prepare the files accordingly.
