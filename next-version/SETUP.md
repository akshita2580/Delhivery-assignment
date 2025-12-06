# Next.js Version Setup Instructions

## Overview

This Next.js version uses the same components, state management, and hooks as the React version. You'll need to copy the following directories from the main project:

## Required Files to Copy

### 1. Components
Copy all components from `../src/components/` to `./components/`:
- Button.jsx
- BotCard.jsx
- Card.jsx
- Input.jsx
- Layout.jsx
- ProtectedRoute.jsx
- LoginPage.jsx (as component)
- DashboardPage.jsx (as component)
- BotStatusPage.jsx (as component)
- TaskAllocationPage.jsx (as component)
- TaskQueuePage.jsx (as component)
- AnalyticsPage.jsx (as component)
- MapPage.jsx (as component)

### 2. State Management
Copy all stores from `../src/state/` to `./state/`:
- authStore.js
- botStore.js
- taskStore.js

### 3. Custom Hooks
Copy all hooks from `../src/hooks/` to `./hooks/`:
- useBots.js
- useTasks.js

## Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Copy components, state, and hooks:**
   ```bash
   # Create directories
   mkdir -p components state hooks
   
   # Copy files (adjust paths as needed)
   cp -r ../src/components/* components/
   cp -r ../src/state/* state/
   cp -r ../src/hooks/* hooks/
   ```

3. **Update imports in components:**
   - Change relative imports to use `@/` alias
   - Example: `import { useBotStore } from '@/state/botStore'`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Differences from React Version

- Uses Next.js App Router instead of React Router
- File-based routing in `app/` directory
- Server Components by default (use 'use client' for client components)
- Better SEO and performance with SSR
- Same UI and functionality

## Notes

- All page components need `'use client'` directive
- Layout component should be client component
- State management (Zustand) works the same way
- TailwindCSS configuration is identical


