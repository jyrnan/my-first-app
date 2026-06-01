# Repository Guidelines

## Project Structure & Module Organization

Keep application source in `src/`, organized by feature or responsibility. Common frontend folders include `src/components/` for reusable UI, `src/pages/` or `src/routes/` for route-level views, `src/lib/` for shared utilities, and `src/assets/` for images, icons, and static media imported by the app. Place public static files that should be served directly in `public/`.

Tests should live close to the code they verify as `*.test.*` or in a dedicated `tests/` directory when they cover integration-level behavior. Keep generated output such as `dist/`, coverage reports, and dependency folders out of source control.

## Build, Test, and Development Commands

Use the scripts defined in `package.json` as the source of truth. Typical commands are:

- `npm install` - install project dependencies.
- `npm run dev` - start the local development server.
- `npm run build` - create a production build.
- `npm run preview` - serve the built app locally, if configured.
- `npm test` or `npm run test` - run the test suite, if configured.
- `npm run lint` - run static analysis, if configured.

If this repository uses `pnpm` or `yarn`, use the matching lockfile and equivalent commands, for example `pnpm install` or `yarn dev`.

## Coding Style & Naming Conventions

Prefer TypeScript or modern JavaScript modules. Use 2-space indentation, single-purpose functions, and explicit names over abbreviations. Name React components and route-level views with `PascalCase`, hooks with `useCamelCase`, utilities with `camelCase`, and test files as `ComponentName.test.tsx` or `utility.test.ts`.

Follow the formatter and linter configuration already present in the repository. Do not introduce broad style-only rewrites while making feature changes.

## Testing Guidelines

Add tests for user-facing behavior, shared utilities, and bug fixes. Keep unit tests near the implementation when practical, and use integration tests for workflows that cross component or module boundaries. Test names should describe observable behavior, for example `renders empty state when no items exist`.

Run the relevant test command before opening a pull request. If a test command is not configured, note the manual verification steps in the PR.

## Commit & Pull Request Guidelines

Write concise, imperative commit messages, such as `Add search filter` or `Fix empty state layout`. Keep commits focused on one logical change.

Pull requests should include a short description of the change, testing performed, and any user-visible impact. Link related issues when available. For UI changes, include screenshots or a short screen recording. Call out configuration changes, migrations, or follow-up work explicitly.

## Security & Configuration Tips

Do not commit secrets, API keys, local environment files, or generated credentials. Document required environment variables in an example file such as `.env.example`, and keep local values in ignored `.env` files.
