# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimalist note-taking app ("极简笔记") built with React 19, Vite 7, and TypeScript. Uses Cloudflare D1 (SQLite) for storage via a Cloudflare Worker REST API. Cross-tab sync via 5-second polling.

## Core Commands

```bash
npm install              # Install frontend dependencies
cd worker && npm install # Install worker dependencies
npm run dev              # Start both frontend (Vite) and worker (Wrangler) concurrently
npm run dev:frontend     # Start only Vite dev server
npm run dev:worker       # Start only Wrangler dev server
npm run build            # TypeScript check + Vite production build
npm run lint             # ESLint
npm run preview          # Preview production build locally
npm run db:init          # Apply D1 migrations locally
```

There are no tests configured in this project.

## Environment Setup

Requires a `.env` file (see `.env.example`):
```
VITE_API_BASE=/api
```

The worker requires a D1 database. First-time setup:
```bash
cd worker
npx wrangler d1 create notes-db   # prints database_id
# paste database_id into worker/wrangler.toml
npm run db:init:local              # create tables locally
```

D1 `notes` table schema: `id` (TEXT, auto-generated hex), `content` (TEXT), `created_at` (TEXT, auto datetime).

## Architecture

```
Frontend (React/Vite)  →  fetch()  →  Cloudflare Worker (REST API)  →  D1 (SQLite)
       ↑ polling (5s)                       ↑ CORS headers
```

- **`src/main.tsx`** - Entry point, renders `<App />` in StrictMode
- **`src/App.tsx`** - Main component. Manages all state (notes list, input, editing). Calls `src/lib/api.ts` for CRUD. Polls every 5s for cross-tab sync.
- **`src/components/NoteCard.tsx`** - Note card with delete button and long-press (500ms) for edit modal. Exports the `Note` type.
- **`src/lib/api.ts`** - Fetch-based API client wrapping the Worker REST endpoints. Reads `VITE_API_BASE` env var.
- **`worker/src/index.ts`** - Cloudflare Worker with REST API (GET/POST/PUT/DELETE `/api/notes`). Uses D1 binding for SQLite queries. Includes CORS headers.
- **`worker/wrangler.toml`** - Wrangler config with D1 database binding.

Data flow: App.tsx owns all state and passes callbacks to NoteCard. Vite dev proxy forwards `/api` to the worker (localhost:8787) to avoid CORS issues in development.

## Conventions

- Functional components with hooks only (no class components)
- Chinese UI text throughout (error messages, placeholders, headings)
- CSS in `src/App.css` (component styles) and `src/index.css` (global/reset)
- TypeScript strict mode via `tsconfig.app.json`
- Use `.tsx` extension for components, `.ts` for pure logic files
- Worker has its own `package.json`, `tsconfig.json`, and `wrangler.toml` in `worker/`
