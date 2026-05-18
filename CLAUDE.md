# whisperqueue-site

## Stack

- Astro (SSG)
- Tailwind CSS v4 with `@tailwindcss/vite`
- Pagefind for search
- Bun runtime

## Design

Follow the WhisperQueue design system in `project-docs/DESIGN.md`:
- Dark mode only — no light variant
- WQ colors defined as Tailwind theme values in `src/styles/global.css` (`bg-wq-void`, `text-wq-accent`, etc.)
- System sans-serif font stack
- No gradients, glow, neon, blue/purple accents, emoji, or marketing superlatives

### esbuild CSS bug

Never put JSON/JS-like `{...}` content directly in Astro HTML templates — esbuild's CSS bundler
misinterprets curly braces as CSS selectors. Define data in frontmatter variables and render with
`{variableName}`. See `project-docs/TAILWIND_BUG.md` for details.

## Scope

- Landing page + docs in one Astro site
- Server API docs only for now — SDK pages added as SDKs are built
- Static content, no interactive elements

## Docs source

Markdown maintained in this repo. Not pulled from `whisperqueue` server repo.

## Deployment

- GitHub Pages via GitHub Actions
- Custom domain: whisperqueue.axmdev.app
- Single version docs (no versioning for now)

## Commands

- `bun dev` — dev server
- `bun run build` — production build
- `bun check` — must pass zero errors before done