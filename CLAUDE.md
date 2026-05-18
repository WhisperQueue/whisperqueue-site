# whisperqueue-site

## Stack

- Astro (SSG)
- Tailwind CSS
- Pagefind for search
- Bun runtime

## Design

Follow the WhisperQueue design system in `project-docs/DESIGN.md`:
- Dark mode only — no light variant
- Use WQ color tokens (`--wq-void`, `--wq-surface`, `--wq-raised`, `--wq-border`, `--wq-accent`, etc.)
- System sans-serif font stack
- No gradients, glow, neon, blue/purple accents, emoji, or marketing superlatives

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