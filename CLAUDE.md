# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm start        # Run production build
npm run lint     # Run ESLint (eslint-config-next core-web-vitals + TypeScript rules)
```

There is no test suite in this project.

## Architecture

This is a Next.js 16 App Router todo application using **JSON file-based persistence** instead of a database.

### Data flow

All mutations go through **Server Actions** (`app/actions.ts`) — no API routes exist. The Server Actions read/write directly to `data/todos.json` via Node `fs` (synchronous reads/writes), then call `revalidatePath('/')` to trigger a re-render.

The `Todo` type is defined and exported from `app/actions.ts`, making it the single source of truth for the data shape:

```ts
type Todo = { id: string; text: string; completed: boolean; createdAt: string }
```

### Server/Client component split

- `app/page.tsx` — Server Component. Fetches todos by calling `getTodos()` directly (not via `fetch`), renders the add-todo form with `action={addTodo}` (native form submission to Server Action), and passes individual `Todo` objects to `TodoItem`.
- `app/components/TodoItem.tsx` — Client Component (`'use client'`). Handles toggle and delete via `onClick` calling Server Actions directly. The delete button is hidden by default and revealed on hover via Tailwind's `group`/`group-hover` pattern.

### Important constraints

- `data/todos.json` must exist and contain a valid JSON array (`[]` at minimum) — the app will crash with a parse error if the file is missing or malformed.
- Mutations use synchronous `fs.readFileSync`/`fs.writeFileSync`, which means concurrent writes are not safe. This is intentional for a single-user local app.
- The app is Japanese-language UI (`lang="ja"`, Japanese placeholder text and labels).
