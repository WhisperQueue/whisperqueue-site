# esbuild CSS Bundling Bug in Astro 6 / Vite 7

## Verified Bug (2026-05-18)

**esbuild chokes on `{...}` content in Astro HTML templates during CSS bundling.** This is a real bug that reproduces on a clean `bun create astro` project with the correct Tailwind v4 setup.

Error:
```
Expected "}" but found ":"
  Location: /path/to/file.astro:LINE:COL
```

The column number is always extremely high (e.g., `1891`, `503`) because esbuild treats the entire page as a single line — confirming it's a CSS parse error in the combined output, not a source file issue.

## Root Cause

Astro uses esbuild (bundled inside Vite) for CSS minification. When scoped `<style>` blocks from multiple components are combined, esbuild's CSS parser misinterprets `{...}` characters from HTML content as CSS selectors/rules. This happens regardless of whether Tailwind is installed.

**Tailwind v4 itself works fine in Astro.** The bug is in esbuild's CSS handling of HTML content that contains JSON-like braces.

## What Was Tried

| Attempt | Result |
|---------|--------|
| Tailwind v4 with `@tailwindcss/vite` plugin | Works (no JSON in HTML) |
| `@theme inline` directive | Same error when JSON present |
| `cssMinify: false` in Vite config | Same error — bug is in bundling, not minification |
| `cssMinify: 'lightningcss'` | Same error |
| Switching to `@tailwindcss/postcss` | Same error when JSON present |
| Downgrading to Tailwind v3 | Same error when JSON present |
| Pinning esbuild to 0.24 | Same error — Vite bundles its own esbuild |
| Downgrading Vite to v6 | Same error — Astro bundles its own esbuild |
| Adding `postcss-nesting` | Same error |
| Plain CSS without Tailwind, JSON in HTML | **Same error** — confirms bug is esbuild, not Tailwind |
| Plain CSS, JSON moved to frontmatter variables | **Build passes** |
| Tailwind v4 + no JSON in HTML | **Build passes** |

## Verified Reproduction

Clean `bun create astro --template minimal` + Tailwind v4 + `@tailwindcss/vite`:
- Without `{...}` in HTML: **builds fine**
- With `{"job_id": "abc", "status": "queued"}` in `<pre><code>`: **build fails**

## Current Solution

Tailwind CSS v4 with `@tailwindcss/vite` plugin. WQ color tokens defined via `@theme` in `src/styles/global.css` and used as Tailwind utilities (`bg-wq-void`, `text-wq-accent`, etc.). No scoped `<style>` blocks — all styling uses Tailwind utility classes.

All JSON example content is defined as JavaScript variables in Astro frontmatter and rendered with `{variableName}` syntax.

### Key constraint

Never put JSON/JS-like `{...}` content directly in Astro HTML templates. Define it in frontmatter and render with Astro template expressions. This avoids esbuild seeing the braces during CSS bundling.

## Versions

- Astro: 6.3.3 (project) / 6.3.5 (repro)
- Vite: 7.3.3 (bundled by Astro)
- esbuild: 0.27.7 (bundled by Astro)
- Bun: 1.3.0
- Tailwind: 4.3.0 (tested in repro)