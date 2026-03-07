# FairShare Frontend — AGENTS.md (Living Project Snapshot)
This document is the **handoff + rules-of-the-road** for the FairShare frontend.
## Purpose (read this first)
- **Single source of truth** for what exists in this repo right now (structure, routes, components, styling, conventions).
- **Update cadence:** Anytime you add/move/rename a page/component, change routing, add a new library, or introduce a new convention, update this file in the same change.
- **Audience:** You (future you) + any AI assistant. It should be understandable in <2 minutes.
---
## Tech stack (current)
- **Build tool:** Vite
- **UI:** React 19 (with JSX transform via `@vitejs/plugin-react`)
- **Language:** TypeScript
- **Routing:** `react-router-dom` v7
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **HTTP client:** `axios` — a configured instance lives at `src/lib/api/axios.config.ts`
- **Server state:** `@tanstack/react-query` v5 — `QueryClientProvider` wraps the app in `main.tsx`
- **Auth:** `@react-oauth/google` — Google One-Tap / OAuth credential flow. `GoogleOAuthProvider` wraps the app in `main.tsx`, fed by `VITE_GOOGLE_CLIENT_ID`.
- **Linting:** ESLint (flat config) + `typescript-eslint` + React Hooks / React Refresh rules
### Auth flow (implemented)
1. User lands on `/auth` and clicks the Google sign-in button (rendered by `@react-oauth/google`'s `<GoogleLogin />`).
2. On success, `@react-oauth/google` returns a Google credential JWT.
3. The credential is passed to `authenticateWithGoogle(credential)` (`src/lib/api/auth.api.ts`), which POSTs it to the backend at `POST /auth/google`.
4. The backend verifies the Google credential, creates its own session/JWT, and responds.
5. On success the user is navigated to `/dashboard`; on failure an error toast is shown.
### Environment variables
All env vars are prefixed with `VITE_` so Vite exposes them at build time.
| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID passed to `GoogleOAuthProvider` |
| `VITE_BACKEND_URL` | Base URL for all axios API calls |
> **Guard:** If `VITE_GOOGLE_CLIENT_ID` is missing at startup, `main.tsx` logs an error and **does not render the app at all**.
---
## Repo layout & conventions
### Pages
- **Location:** `src/pages/`
- **Rule:** Pages should be **composition-only**.
  - They import the relevant components and lay out the page.
  - Keep business logic and reusable UI out of pages when possible.
### Components
- **Root:** `src/components/`
- **Four buckets:**
  - `src/components/shared/`
    - Reusable components used across multiple pages/features.
    - Current: `Sidebar.tsx` (layout wrapper for all authenticated app routes), `Toast.tsx` (global toast notification renderer).
  - `src/components/standalone/<PageName>/`
    - Page-specific components that are not meant to be reused elsewhere.
    - `<PageName>` should match the page file name (e.g. `Hero` page -> `standalone/Hero/`).
  - `src/components/context/`
    - React context definitions (plain `.ts` files - no JSX).
    - Current: `ToastContext.ts`
  - `src/components/provider/`
    - React context provider components (`.tsx`).
    - Current: `ToastProvider.tsx`
### Naming conventions
- **Components:** PascalCase file names, `.tsx` (e.g. `HeroSection.tsx`).
- **Folders:** Page-specific folder matches the page name (e.g. `Hero/`, `Dashboard/`).
- **Imports:** Current code uses explicit TS extensions in imports (e.g. `"./Hero.tsx"`).
### Lib utilities
- **Location:** `src/lib/`
- **Rule:** Non-React utilities/constants shared across the app.
- Sub-folders:
  - `src/lib/constants/` - app-wide constants and env var exports.
  - `src/lib/api/` - axios instance + per-domain API functions.
  - `src/lib/errors/` - `AppError` class + `handleError` utility.
  - `src/lib/hooks/` - custom React hooks (auth, context accessors).
---
## Current app entry points
### HTML entry
- `index.html` — Loads fonts (Inter + Material Symbols). Mounts React at `<div id="root" />`.
### React entry (`src/main.tsx`)
- Guards on `VITE_GOOGLE_CLIENT_ID`; if missing, logs an error and skips rendering entirely.
- Provider nesting order:
  `<StrictMode>` -> `<BrowserRouter>` -> `<QueryClientProvider>` -> `<GoogleOAuthProvider>` -> `<ToastProvider>` -> `<App/>` + `<Toast />`
### App router (`src/App.tsx`)
- Defines routes using `react-router-dom`.
- Authenticated app routes are nested under a `<Sidebar />` layout route (using `<Outlet />`).
---
## Current routes
| Path | Page | Notes |
|---|---|---|
| `/` | `src/pages/Hero.tsx` | Landing page |
| `/auth` | `src/pages/Auth.tsx` | Google OAuth sign-in, no Sidebar |
| `/dashboard` | `src/pages/Dashboard.tsx` | Nested under Sidebar |
| `/friends` | `src/pages/Friends.tsx` | Nested under Sidebar — stub |
| `/groups` | `src/pages/Groups.tsx` | Nested under Sidebar — stub |
| `/settings` | `src/pages/Settings.tsx` | Nested under Sidebar — stub |
---
## Shared component: Sidebar (`src/components/shared/Sidebar.tsx`)
Layout route wrapper for all authenticated pages.
- Fixed left sidebar (`w-72`) with brand logo, nav links (from `DASHBOARD_SIDEBAR_TABS`), "Scan Receipt" CTA, hardcoded user profile card, and logout button (not yet wired).
- Uses `useLocation` for active nav state.
- Renders `<Outlet />` for nested page content.
- Custom class: `.glass-sidebar`
---
## Shared component: Toast (`src/components/shared/Toast.tsx`)
Global toast notification renderer. Rendered once at root in `main.tsx` alongside `<App />`.
- Reads `toasts` and `dismiss` from `ToastContext` via `useToast()`.
- Fixed stack at `bottom-4 right-4`.
- Each toast: success (green `check_circle`) or error (red `error`) icon + message + manual dismiss button.
- Auto-dismisses after 4 seconds (timer in `ToastProvider`).
---
## Toast system
### Context (`src/components/context/ToastContext.ts`)
Plain `.ts` (no JSX). Defines `ToastContext`:
```ts
interface ToastContextType {
  toast: (message: string, success: boolean) => void;
  toasts: Toast[];
  dismiss: (id: number) => void;
}
```
### Provider (`src/components/provider/ToastProvider.tsx`)
- `toasts` state: array of `{ id, message, success }`.
- `useRef` counter (`idRef`) generates unique IDs without extra re-renders.
- `toast()` appends item and schedules auto-dismiss (4 s via `setTimeout`).
- `dismiss()` filters the toast out immediately.
### Hook — `useToast()` (`src/lib/hooks/context.hooks.ts`)
- Safe `useContext(ToastContext)` accessor.
- Throws `AppError` with `ERROR_SEVERITY.FATAL` if called outside provider.
---
## Error handling system
### `AppError` (`src/lib/errors/app.error.ts`)
Custom class extending `Error`. Adds `severity: ERROR_SEVERITY`.
| Severity | Value | Meaning |
|---|---|---|
| `TOAST` | `"toast"` | Show dismissible toast (default) |
| `LOG` | `"log"` | `console.error` only |
| `FATAL` | `"fatal"` | Unexpected — should not occur at runtime |
### `handleError` (`src/lib/errors/errorHandler.ts`)
`handleError(error, toast)`:
- `AppError` -> switch on severity -> `toast()` or `console.error()`.
- Unknown errors -> generic toast + `console.error`.
- Called in `useMutation`'s `onError` inside custom hooks.
### Axios interceptor (`src/lib/api/axios.config.ts`)
Converts every failed response into an `AppError`:
```ts
return Promise.reject(new AppError(serverMessage!));
```
All HTTP errors are `AppError` instances before reaching `handleError`.
---
## API layer (`src/lib/api/`)
### Axios instance (`axios.config.ts`)
```ts
const api = axios.create({
  baseURL: BACKEND_URL,   // VITE_BACKEND_URL
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});
```
Always import `api` from this file — never use `axios` directly.
### Auth API (`auth.api.ts`)
- `authenticateWithGoogle(credential: string)` — `POST /auth/google` with `{ credential }`.
### API constants (`src/lib/constants/api.constants.ts`)
- `GOOGLE_AUTH_URL = "/auth/google"`
---
## Custom hooks (`src/lib/hooks/`)
### `auth.hooks.ts`
- `useAuthenticateWithGoogle()` — TanStack `useMutation` wrapping `authenticateWithGoogle`.
  - `onSuccess`: success toast + navigate to `/dashboard`.
  - `onError`: `handleError(error, toast)`.
  - Consumers destructure `mutate` (e.g. renamed `authenticateWithGoogle` in `AuthCard`).
### `context.hooks.ts`
- `useToast()` — safe `ToastContext` accessor (throws fatal `AppError` if outside provider).
---
## Landing page components (`src/components/standalone/Hero/`)
- `Navbar.tsx` — Fixed top nav with brand + links + CTA.
- `HeroSection.tsx` — Main headline, CTA, dashboard preview mock.
- `FeaturesSection.tsx` — "Smart Scan Technology" section.
- `HighlightsSection.tsx` — Feature highlight card grid.
- `CallToActionSection.tsx` — Final CTA section.
- `Footer.tsx` — Footer links. Uses `GITHUB_URL` and `LINKEDIN_URL` from constants.
---
## Dashboard page components (`src/components/standalone/Dashboard/`)
- `TopNav.tsx` — Sticky top bar with greeting, date, notification bell, "New Expense" button.
- `BalanceSection.tsx` — "Total Owed" (red) + "Total You Are Owed" (green) summary cards.
- `GroupsSection.tsx` — Active groups grid + "Create New Group" card. Embeds `<RecentActivitySection />`.
- `GroupCard.tsx` — Group card with image, member avatars, name, owed amount, progress bar.
- `RecentActivitySection.tsx` — Recent activity list with expense items.
- `FriendsSidebar.tsx` — Right-column friends list with avatars, balances, action buttons.
---
## Styling
### Tailwind config (`tailwind.config.ts`)
- `darkMode: "class"`
- Custom colors: `primary` (#1337ec), `background-dark` (#050505), `surface-dark` (#121212), `card-dark` (#16161a), `border-dark` (#2a2a30), `glass` (rgba white 5%).
- Custom fonts: `display` + `sans` (both Inter).
- Custom background: `hero-glow` radial gradient.
### Global CSS (`src/styles/global.css`)
Custom utility classes:
- `.glass-panel` — semi-transparent dark panel with backdrop blur.
- `.glass-card` — translucent card with blur, border, shadow.
- `.glass-sidebar` — sidebar variant.
- `.text-gradient` — white-to-zinc gradient text.
- `.text-gradient-primary` — blue gradient text.
- `.animated-gradient` — radial gradient overlay (Auth page background).
- Custom webkit scrollbar styles.
---
## Constants (`src/lib/constants/constants.ts`)
- `GITHUB_URL`, `LINKEDIN_URL` — footer links.
- `DASHBOARD_SIDEBAR_TABS` — `{ name, icon, link }[]` driving sidebar nav.
- `GOOGLE_CLIENT_ID` — `import.meta.env.VITE_GOOGLE_CLIENT_ID`.
- `BACKEND_URL` — `import.meta.env.VITE_BACKEND_URL`.
- `ERROR_SEVERITY` — const object `{ TOAST, LOG, FATAL }` + TypeScript type.
---
## Tooling scripts (`package.json`)
- `dev` — Vite dev server
- `build` — `tsc -b && vite build`
- `lint` — ESLint
- `preview` — Vite preview
---
## Known gaps / TODO
- No cookie/session storage after login — auth state is lost on page refresh.
- Sidebar profile and Logout button are hardcoded placeholders.
- All Dashboard data is static hardcoded UI — no backend integration yet.
- Friends, Groups, and Settings pages are empty stubs.
