# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
/opt/homebrew/bin/npm run dev      # start dev server at localhost:3000
/opt/homebrew/bin/npm run build    # production build (use this to verify no errors before deploying)
/opt/homebrew/bin/npm run lint     # lint
/opt/homebrew/bin/npx vercel --prod  # deploy to production
```

`npx` and `npm` must be prefixed with `/opt/homebrew/bin/` — they are not on the default PATH in this environment.

## Architecture

This is a Next.js 14 App Router app. The only user-facing page is `app/page.tsx`. The entire flow is:

1. User pastes or uploads a Smart Balance report image in the browser
2. `app/page.tsx` converts it to base64 and POSTs to `/api/interpret`
3. `app/api/interpret/route.ts` (server-only) calls Claude `claude-sonnet-4-6` with the system prompt from `lib/systemPrompt.ts` and the image as a vision content block
4. The interpretation text is returned and rendered by `components/ResultsPanel.tsx`

## Key files

- `lib/systemPrompt.ts` — the clinical interpretation prompt. This is the clinical brain of the app. Changes here directly affect output quality and format. Current instructions: output in Korean, plain text only (no markdown), conclusion first.
- `lib/types.ts` — shared TypeScript interfaces. `InterpretRequest` / `InterpretResponse` are the API contract between page and route.
- `app/api/interpret/route.ts` — the only server-side file. API key lives here via `process.env.ANTHROPIC_API_KEY`. Never move Anthropic client instantiation to the client.
- `components/ResultsPanel.tsx` — parses Claude's plain-text response by detecting the 5 Korean section headings and renders each as a color-coded card.

## Environment

Requires `.env.local` with `ANTHROPIC_API_KEY`. The `.env.local.example` documents this. On Vercel, the key is set via the dashboard (Settings → Environment Variables) and requires a redeploy after changes.

## Deployment

Hosted on Vercel at `https://smart-balance-dictator.vercel.app`. GitHub remote is `https://github.com/ksunwoong-coder/smart-balance-dictator`. Push to `main` does not auto-deploy — manual deploy via `vercel --prod` is used.
