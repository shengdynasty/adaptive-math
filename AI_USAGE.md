# AI Usage

This project was built with AI assistance. Per competition rules, AI usage is cited below and estimated at under 70% of total work.

## What AI assisted with

### Deployment configuration (Claude Sonnet 4.6 via Claude Code)
- Fixed `vite.config.js`: changed `base: './'` to `base: '/adaptive-math/'` so built assets resolve correctly at the GitHub Pages subpath.
- Updated `vite.config.js` PWA manifest `start_url` to match the base path.
- Added `gh-pages` as a dev dependency in `package.json`.
- Added `predeploy` and `deploy` scripts to `package.json` to automate building and pushing `dist/` to the `gh-pages` branch.
- Created this `AI_USAGE.md` file.

## What was built by the developer

- Core ELO-based adaptive engine (`src/engine/`)
- Question bank and content (`src/data/`)
- React UI components (`src/components/`)
- PWA / offline-first architecture design
- Project concept, SDG framing, and all written content
