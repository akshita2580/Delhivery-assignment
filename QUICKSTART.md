# Quick Start Guide

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Default Login

You can use any email/password combination:
- Email: `test@example.com`
- Password: `password123` (minimum 6 characters)

## Features Overview

1. **Login/Signup** - Simple authentication (no backend)
2. **Dashboard** - Overview statistics
3. **Bot Status** - 10 bots with auto-updates every 10s
4. **Task Allocation** - Create new tasks
5. **Task Queue** - View pending tasks (auto-removes every 3s)
6. **Analytics** - Charts and insights
7. **Map** - Upload SVG and see moving bots

## Sample SVG Map

A sample SVG map is available at `public/sample-map.svg` for testing the Map feature.

## Notes

- All data is in-memory (resets on refresh)
- No backend API required
- Auto-updates use intervals
- Responsive design (mobile-friendly)


