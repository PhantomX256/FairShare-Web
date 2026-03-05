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
- **Linting:** ESLint (flat config) + `typescript-eslint` + React Hooks / React Refresh rules

### Planned (not implemented yet)
- **Auth:** Supabase Auth (Google OAuth) — UI shell exists on `/auth`, but no Supabase dependencies wired yet.
  - Note: there are currently **no Supabase dependencies** in `package.json` and no `supabase` usage in `src/`.

---

## Repo layout & conventions

### Pages
- **Location:** `src/pages/`
- **Rule:** Pages should be **composition-only**.
  - They import the relevant components and lay out the page.
  - Keep business logic and reusable UI out of pages when possible.

### Components
- **Root:** `src/components/`
- **Two buckets:**
  - `src/components/shared/`
    - Reusable components used across multiple pages/features.
    - Current: `Sidebar.tsx` (layout wrapper for all authenticated app routes).
  - `src/components/standalone/<PageName>/`
    - Page-specific components that are not meant to be reused elsewhere.
    - `<PageName>` should match the page file name (e.g. `Hero` page → `standalone/Hero/`).

### Naming conventions
- **Components:** PascalCase file names, `.tsx` (e.g. `HeroSection.tsx`).
- **Folders:**
  - Page-specific folder matches the page name (e.g. `Hero/`, `Dashboard/`).
  - Keep related sections grouped together.
- **Imports:** Current code uses explicit TS extensions in imports (e.g. `"./Hero.tsx"`). Prefer keeping this consistent unless you intentionally change the convention.

### "Lib" utilities
- **Location:** `src/lib/`
- **Rule:** Non-React utilities/constants that are shared across the app.
- Constants file is at `src/lib/constants/constants.ts` (note: nested in a `constants/` subfolder).

---

## Current app entry points

### HTML entry
- `index.html`
  - Loads fonts (Inter + Material Symbols).
  - Mounts React at `<div id="root" />`.

### React entry
- `src/main.tsx`
  - Creates the React root, wraps app in `<StrictMode>` and `<BrowserRouter>`.

### App router
- `src/App.tsx`
  - Defines routes using `react-router-dom`.
  - Authenticated app routes are nested under a `<Sidebar />` layout route (using `<Outlet />`).

---

## Current routes

### `/`
- Page: `src/pages/Hero.tsx`
- Purpose: Landing page (dark, glassy UI).
- Layout: `<Navbar />` + `<main>` with landing sections.

### `/auth`
- Page: `src/pages/Auth.tsx`
- Purpose: Authentication page — Google OAuth sign-in UI shell.
- Layout: Standalone (no Sidebar). Includes a "Back to Home" link.
- Note: Button is present but not wired to any auth provider yet.

### `/dashboard` *(nested under `<Sidebar />`)*
- Page: `src/pages/Dashboard.tsx`
- Purpose: Main app dashboard showing balance summary, active groups, recent activity, and friends list.

### `/friends` *(nested under `<Sidebar />`)*
- Page: `src/pages/Friends.tsx`
- Purpose: Friends management page — **stub, not yet implemented**.

### `/groups` *(nested under `<Sidebar />`)*
- Page: `src/pages/Groups.tsx`
- Purpose: Groups management page — **stub, not yet implemented**.

### `/settings` *(nested under `<Sidebar />`)*
- Page: `src/pages/Settings.tsx`
- Purpose: Settings page — **stub, not yet implemented**.

---

## Shared component: Sidebar (`src/components/shared/Sidebar.tsx`)

Acts as a **layout route wrapper** for all authenticated app pages (`/dashboard`, `/friends`, `/groups`, `/settings`).

- Renders a fixed left sidebar (`w-72`) with:
  - FairShare brand logo + tagline.
  - Navigation links driven by `DASHBOARD_SIDEBAR_TABS` constant (uses `useLocation` for active state).
  - "Scan Receipt" CTA button at the bottom.
  - Hardcoded user profile card (placeholder: "Alex Richards").
  - Logout button (not yet wired).
- Renders `<Outlet />` for the nested page content on the right.
- Uses custom class `.glass-sidebar`.

---

## Landing page: Hero (`src/pages/Hero.tsx`)

### Standalone components
Location: `src/components/standalone/Hero/`
- `Navbar.tsx` — Fixed top nav with brand + links + CTA.
- `HeroSection.tsx` — Main headline + subtext + CTA button + "dashboard preview" mock.
- `FeaturesSection.tsx` — "Smart Scan Technology" section with image + copy.
- `HighlightsSection.tsx` — Grid of feature highlight cards + larger "Groups for every occasion" card.
- `CallToActionSection.tsx` — Final CTA section ("Ready to settle up?").
- `Footer.tsx` — Footer content and links. Uses `GITHUB_URL` from constants.

### Page composition
```tsx
<>
  <Navbar />
  <main className="min-h-screen bg-background-dark bg-hero-glow">
    <HeroSection />
    <FeaturesSection />
    <HighlightsSection />
    <CallToActionSection />
    <Footer />
  </main>
</>
```

---

## Dashboard page: Dashboard (`src/pages/Dashboard.tsx`)

### Standalone components
Location: `src/components/standalone/Dashboard/`
- `TopNav.tsx`
  - Sticky top bar with greeting, date, notification bell (with red dot indicator), and "New Expense" button.
- `BalanceSection.tsx`
  - Two-column summary cards: "Total Owed" (red) and "Total You Are Owed" (green), each with a % change indicator.
- `GroupsSection.tsx`
  - "Active Groups" heading + grid of `<GroupCard />` components + "Create New Group" placeholder card.
  - Embeds `<RecentActivitySection />` below the groups grid.
- `GroupCard.tsx`
  - Individual group card showing group image, member avatars, group name, owed amount, and a progress bar.
- `RecentActivitySection.tsx`
  - "Recent Activity" list with expense items (icon, description, group name, amount, date).
- `FriendsSidebar.tsx`
  - Right-column friends list with avatars, online status indicators, owed/owing amounts, and action buttons (notify / pay).

### Page composition
```tsx
<main className="flex-1 overflow-y-auto h-screen relative">
  <TopNav />
  <div className="px-8 pb-12 space-y-8">
    <BalanceSection />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <GroupsSection />   {/* xl:col-span-2 */}
      <FriendsSidebar />
    </div>
  </div>
</main>
```

---

## Styling

### Tailwind config (`tailwind.config.ts`)
- `darkMode: "class"`
- `content`: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- `theme.extend` includes:
  - `colors`:
    - `primary`: `#1337ec`
    - `background-light`: `#f6f6f8`
    - `background-dark`: `#050505`
    - `surface-dark`: `#121212`
    - `glass`: `rgba(255, 255, 255, 0.05)`
    - `card-dark`: `#16161a`
    - `border-dark`: `#2a2a30`
  - `fontFamily`: `display`, `sans` (both Inter)
  - `borderRadius`: default → full
  - `backgroundImage`: `hero-glow` (radial gradient)

### Global CSS utilities (`src/styles/global.css`)
- Imports Tailwind (`@import "tailwindcss";`)
- Uses `@config "../../tailwind.config.ts";`
- Custom utility classes:
  - `.glass-panel` — semi-transparent dark panel with backdrop blur.
  - `.glass-card` — card with dark translucent background, backdrop blur, and subtle border/shadow.
  - `.glass-sidebar` — sidebar variant with blur and right border.
  - `.text-gradient` — white-to-zinc gradient text.
  - `.text-gradient-primary` — blue gradient text (light blue → primary).
  - `.animated-gradient` — radial gradient overlay used on the Auth page background.
- Custom scrollbar styling (webkit).

---

## Constants (`src/lib/constants/constants.ts`)
- `GITHUB_URL` — used by landing page footer.
- `LINKEDIN_URL` — used by landing page footer.
- `DASHBOARD_SIDEBAR_TABS` — array of `{ name, icon, link }` objects driving the Sidebar navigation. Tabs: Dashboard, Groups, Friends, Settings.

---

## Tooling scripts
From `package.json`:
- `dev`: run Vite dev server
- `build`: TypeScript build (project references) + Vite build
- `lint`: ESLint
- `preview`: Vite preview

---

## Known gaps / TODO (keep this short and current)
- Supabase Google auth not wired yet (no deps/usages yet). Auth page UI shell exists at `/auth`.
- Friends, Groups, and Settings pages are stubs (empty layout shells).
- Sidebar user profile and Logout button are hardcoded/non-functional placeholders.
- All data in Dashboard components (balances, friends, groups, activity) is hardcoded static UI — no backend integration yet.
