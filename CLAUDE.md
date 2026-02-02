# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: 19.x
- **Styling**: Tailwind CSS 4 (using `@import "tailwindcss"` syntax)
- **Language**: TypeScript (strict mode)
- **Linting**: ESLint 9 with flat config
- **Animations** (planned): Three.js, GSAP, Anime.js
- **Forms** (planned): React Hook Form + Zod
- **CMS** (planned): WordPress headless via REST API

## Project Context

Legal services website for Legal Cameroun (by RODEC Conseils) featuring:
- Bilingual support (French/English)
- WordPress backend for blog content
- Advanced animations (Three.js particle backgrounds, GSAP scroll animations)

See `IMPLEMENTATION.md` for the complete implementation guide.

## Architecture

This is a Next.js App Router project. All routes and pages live in the `app/` directory:
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles and Tailwind CSS theme configuration

Planned structure:
- `components/` - Reusable UI components
- `lib/` - Utility functions and API clients (wordpress.ts)
- `types/` - TypeScript type definitions

## Path Aliases

The `@/*` alias maps to the project root, configured in `tsconfig.json`.
