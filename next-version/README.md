# Bot Management System - Next.js Version

This is the Next.js 14 App Router version of the Bot Management System.

## Features

- ✅ Server-side rendering with Next.js 14
- ✅ App Router architecture
- ✅ Same functionality as React version
- ✅ TailwindCSS styling
- ✅ Zustand state management
- ✅ All pages: Dashboard, Bots, Tasks, Queue, Analytics, Map

## Installation

```bash
cd next-version
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Project Structure

```
next-version/
├── app/
│   ├── dashboard/
│   ├── bots/
│   ├── tasks/
│   │   ├── allocate/
│   │   └── queue/
│   ├── analytics/
│   ├── map/
│   ├── login/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   └── (shared components)
├── state/
│   └── (Zustand stores)
└── hooks/
    └── (custom hooks)
```

## Differences from React Version

- Uses Next.js App Router instead of React Router
- Server-side rendering capabilities
- File-based routing
- Better SEO and performance
- Same UI and functionality


