# Score Studio

A small web app for writing [ABC notation](https://abcnotation.com/) and seeing the staff notation rendered live with [abcjs](https://github.com/paulrosen/abcjs) (installed from npm, not a fork).

Stack: Vite, React, TypeScript, Tailwind CSS v4, shadcn/ui-style components.

## Features

- Left panel: ABC editor (preloaded with a sample tune)
- Right panel: real-time staff preview via `abcjs.renderAbc`
- Play / Pause using `abcjs.synth` (needs a browser with Web Audio; the first play downloads soundfonts, so it needs network access)

## Local setup

Requires Node.js 20+.

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

To test a Pages-style build locally: `VITE_BASE=/score-studio/ npm run build`.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` runs on every push to `main` (and manually):

1. `npm ci` and `npm run build`, with `VITE_BASE=/<repo-name>/` so assets resolve under the project-pages path (`vite.config.ts` reads `VITE_BASE`, default `/`).
2. Uploads `dist/` and publishes it with `actions/deploy-pages`.

One-time setup: in the repository go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
The site is then available at `https://<user>.github.io/score-studio/`.

## Updating abcjs

```bash
npm outdated abcjs          # check for a new release
npm install abcjs@latest    # or: npm update abcjs
npm run build               # verify
```

Commit `package.json` and `package-lock.json` and push to `main`; the workflow redeploys automatically.

## Adding shadcn/ui components

`components.json` is configured, so `npx shadcn@latest add <component>` works.
