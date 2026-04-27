# Inkwell — AI Blog Generator (PRD)

## Original Problem Statement
Build a production-ready AI Blog Generator that converts a topic into a structured, high-quality blog post with SEO metadata. Inputs: topic, tone (Professional/Casual/Technical), length (Short 300w / Medium 600w / Long 1000w). Output: title, intro, 3–5 sections, conclusion, 5–10 keywords, 150–160 char meta description. Controls: Generate, Regenerate, Copy. SaaS-style UI, split-panel layout, responsive.

## Stack
- React (CRA) + Tailwind + shadcn/ui + Phosphor icons + sonner toasts
- FastAPI + MongoDB + emergentintegrations (OpenAI GPT-5.2 via Universal LLM Key)

## User Personas
- Content marketer drafting SEO posts
- Indie maker / solo founder publishing fast
- Student/portfolio user demonstrating AI capability

## Core Requirements (static)
- Single-shot blog generation with structured JSON output
- Save every generation to Mongo and surface via Archive page
- Empty/loading/error states
- Copy-to-clipboard, download as .txt, regenerate
- Mobile-friendly split panel
- localStorage caching of last blog + form params

## Implemented (2026-02-XX)
- Backend: POST/GET/DELETE /api/blogs[/{id}] with strict JSON LLM prompt + parser
- Frontend: GeneratorPage (split panel), HistoryPage (Bento grid), BlogDetailPage
- Components: Navbar, BlogForm, BlogOutput, Loader, EmptyState
- Design: Swiss editorial high-contrast (Cabinet Grotesk + Playfair Display + JetBrains Mono)
- Tests: backend pytest (9 cases) + Playwright E2E — 100% pass

## Backlog
- P1: Streaming generation (SSE) for faster perceived speed
- P1: Edit blog inline before saving
- P2: Export as Markdown/HTML/MDX
- P2: Multi-language tone presets
- P2: Share-by-link / public read URL
- P2: User accounts + per-user archive
- P2: Rate limiting / quota meter
