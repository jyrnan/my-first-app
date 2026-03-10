# GEMINI.md - Project Context

## Project Overview
This project, `my-first-app`, is a modern web application built using **React 19**, **Vite 7**, and **TypeScript**. It serves as a simple demonstration of component-based architecture and state management in a React environment.

### Core Technologies
- **React (v19):** UI library for building components.
- **Vite (v7):** Build tool and development server for fast HMR (Hot Module Replacement).
- **TypeScript:** Adds static typing to ensure code reliability.
- **ESLint (v9):** Enforces code quality and consistency using `typescript-eslint`.

### Architecture
The application follows a standard Vite + React project structure:
- `src/main.tsx`: Entry point for the React application.
- `src/App.tsx`: Main application component managing top-level state.
- `src/components/`: Directory for reusable UI components (e.g., `news_item_list.tsx`).
- `src/assets/`: Static assets such as images and SVGs.
- `public/`: Public static assets (e.g., `vite.svg`).

## Building and Running

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (or yarn/pnpm)

### Key Commands
- **Install Dependencies:**
  ```bash
  npm install
  ```
- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```
  *Compiles TypeScript and bundles the application using Vite.*
- **Lint Codebase:**
  ```bash
  npm run lint
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## Development Conventions

### Coding Standards
- **TypeScript:** Use strict typing. Define types/interfaces for component props and state.
- **Components:** Favor functional components with React Hooks (`useState`, `useEffect`, etc.).
- **Naming:**
    - Component files: `snake_case.tsx` or `PascalCase.tsx` (current project uses `news_item_list.tsx`).
    - Component functions: `PascalCase`.
- **Styling:**
    - Global styles in `src/index.css`.
    - Component-specific styles in `src/App.css` or via inline styles for simplicity in small prototypes.
- **Imports:** Use explicit file extensions for local TypeScript files when required by the configuration (e.g., `import App from './App.tsx'`).

### Configuration Files
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript compiler settings.
- `vite.config.ts`: Vite configuration for the bundler and plugins.
- `eslint.config.js`: ESLint rules and configuration for JavaScript and TypeScript.
- `.devcontainer/devcontainer.json`: Configuration for VS Code Dev Containers.
