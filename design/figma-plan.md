# Figma Design Plan - Bot Management System

## Overview
This document describes the Figma design system for the Bot Management System, including component hierarchy, spacing, colors, and layout structure.

## Design System

### Color Palette

#### Primary Colors (Indigo Scale)
- **Primary 50**: `#eef2ff` - Lightest background
- **Primary 100**: `#e0e7ff` - Card backgrounds, hover states
- **Primary 200**: `#c7d2fe` - Subtle borders
- **Primary 300**: `#a5b4fc` - Disabled states
- **Primary 400**: `#818cf8` - Secondary actions
- **Primary 500**: `#6366f1` - Primary brand color
- **Primary 600**: `#4f46e5` - Primary buttons, links
- **Primary 700**: `#4338ca` - Hover states
- **Primary 800**: `#3730a3` - Active states
- **Primary 900**: `#312e81` - Darkest shade

#### Status Colors
- **Success/Idle**: `#10b981` (Green) - `bg-green-100 text-green-800`
- **Info/Busy**: `#3b82f6` (Blue) - `bg-blue-100 text-blue-800`
- **Warning/Charging**: `#f59e0b` (Yellow) - `bg-yellow-100 text-yellow-800`
- **Error**: `#ef4444` (Red) - `bg-red-100 text-red-800`

#### Neutral Colors
- **Gray 50**: `#f9fafb` - Page background
- **Gray 100**: `#f3f4f6` - Card backgrounds
- **Gray 200**: `#e5e7eb` - Borders
- **Gray 300**: `#d1d5db` - Input borders
- **Gray 600**: `#4b5563` - Secondary text
- **Gray 700**: `#374151` - Body text
- **Gray 800**: `#1f2937` - Headings
- **Gray 900**: `#111827` - Dark text

### Typography

#### Font Family
- **Primary**: Inter, system-ui, sans-serif
- **Fallback**: Arial, Helvetica, sans-serif

#### Font Sizes
- **3xl**: 30px (1.875rem) - Page titles
- **2xl**: 24px (1.5rem) - Section titles
- **xl**: 20px (1.25rem) - Card titles
- **lg**: 18px (1.125rem) - Large text
- **base**: 16px (1rem) - Body text
- **sm**: 14px (0.875rem) - Small text, labels
- **xs**: 12px (0.75rem) - Badges, timestamps

#### Font Weights
- **Bold**: 700 - Headings
- **Semibold**: 600 - Subheadings, emphasized text
- **Medium**: 500 - Labels, buttons
- **Regular**: 400 - Body text

### Spacing System

#### Base Unit: 4px

- **1**: 4px (0.25rem) - Tight spacing
- **2**: 8px (0.5rem) - Small gaps
- **3**: 12px (0.75rem) - Default gaps
- **4**: 16px (1rem) - Standard spacing
- **6**: 24px (1.5rem) - Medium spacing
- **8**: 32px (2rem) - Large spacing
- **12**: 48px (3rem) - Extra large spacing

#### Component Spacing
- **Card Padding**: 24px (p-6)
- **Section Margin**: 32px (mb-8)
- **Grid Gap**: 24px (gap-6)
- **Form Field Gap**: 16px (space-y-4)

### Component Hierarchy

```
App
├── Layout (Sidebar Navigation)
│   ├── Sidebar (256px width)
│   │   ├── Logo Section (p-6)
│   │   ├── Navigation Items (p-4)
│   │   └── Logout Button (bottom)
│   └── Main Content (ml-64, p-8)
│       └── Page Content
│
├── LoginPage (Full Screen)
│   └── Login Card (max-w-md, centered)
│
├── DashboardPage
│   ├── Header (mb-8)
│   ├── Stats Grid (grid-cols-3, gap-6)
│   └── Summary Cards (grid-cols-2, gap-6)
│
├── BotStatusPage
│   ├── Header + Refresh Button (mb-8)
│   └── Bot Cards Grid (grid-cols-4, gap-6)
│
├── TaskAllocationPage
│   ├── Header (mb-8)
│   └── Form Card (max-w-2xl)
│
├── TaskQueuePage
│   ├── Header + Stats (mb-8)
│   └── Task Cards List (space-y-4)
│
├── AnalyticsPage
│   ├── Header (mb-8)
│   ├── Charts Grid (grid-cols-2, gap-6)
│   └── Stats Cards (grid-cols-4, gap-4)
│
└── MapPage
    ├── Header (mb-8)
    └── Map Container (min-h-600px)
```

### Layout Structure

#### Sidebar Navigation
- **Width**: 256px (w-64)
- **Background**: White (#ffffff)
- **Shadow**: Large shadow-lg
- **Position**: Fixed left
- **Height**: Full viewport height
- **Z-index**: 10

#### Main Content Area
- **Margin Left**: 256px (ml-64)
- **Padding**: 32px (p-8)
- **Background**: Gray 50 (#f9fafb)
- **Min Height**: Full viewport

#### Cards
- **Background**: White (#ffffff)
- **Border**: Gray 200 (#e5e7eb)
- **Border Radius**: 8px (rounded-lg)
- **Padding**: 24px (p-6)
- **Shadow**: Medium (shadow-md)
- **Hover**: Large shadow (hover:shadow-lg)

### Component Specifications

#### Button Component
- **Primary**: 
  - Background: Primary 600 (#4f46e5)
  - Text: White
  - Hover: Primary 700 (#4338ca)
  - Padding: 8px 16px (px-4 py-2)
  - Border Radius: 8px (rounded-lg)
  
- **Secondary**:
  - Background: Gray 200 (#e5e7eb)
  - Text: Gray 800 (#1f2937)
  - Hover: Gray 300 (#d1d5db)

#### Input Component
- **Border**: Gray 300 (#d1d5db)
- **Border Radius**: 8px (rounded-lg)
- **Padding**: 8px 16px (px-4 py-2)
- **Focus**: Primary 500 ring (#6366f1)
- **Error**: Red 500 border (#ef4444)

#### Status Badge
- **Padding**: 4px 12px (px-3 py-1)
- **Border Radius**: 9999px (rounded-full)
- **Font Size**: 12px (text-xs)
- **Font Weight**: 500 (font-medium)

#### Bot Card
- **Dimensions**: Auto width, min-height 200px
- **Padding**: 24px (p-6)
- **Gap**: 12px (space-y-3)
- **Status Badge**: Top right corner

### Responsive Breakpoints

- **Mobile**: < 768px
  - Sidebar: Hidden or overlay
  - Grid: 1 column
  - Padding: 16px (p-4)

- **Tablet**: 768px - 1024px
  - Grid: 2 columns
  - Padding: 24px (p-6)

- **Desktop**: > 1024px
  - Grid: 3-4 columns
  - Full sidebar visible
  - Padding: 32px (p-8)

## Figma Export Instructions

### Frame Setup

#### 1. Home Dashboard Frame
- **Dimensions**: 1920x1080px
- **Background**: #f9fafb
- **Components**:
  - Sidebar (256px width)
  - Header section
  - 6 stat cards (3x2 grid)
  - 2 summary cards (side by side)
- **Export**: PNG @2x, SVG

#### 2. Bot Status Page Frame
- **Dimensions**: 1920x1080px
- **Background**: #f9fafb
- **Components**:
  - Sidebar (256px width)
  - Header with refresh button
  - 10 bot cards (4x3 grid)
- **Export**: PNG @2x, SVG

#### 3. Task Allocation Page Frame
- **Dimensions**: 1920x1080px
- **Background**: #f9fafb
- **Components**:
  - Sidebar (256px width)
  - Header
  - Form card (centered, max-width 672px)
  - Form fields: Pickup, Drop, Priority, Comments
  - Submit button
- **Export**: PNG @2x, SVG

#### 4. Task Queue Page Frame
- **Dimensions**: 1920x1080px
- **Background**: #f9fafb
- **Components**:
  - Sidebar (256px width)
  - Header with stats
  - Task cards list (vertical stack)
- **Export**: PNG @2x, SVG

#### 5. Analytics Page Frame
- **Dimensions**: 1920x1080px
- **Background**: #f9fafb
- **Components**:
  - Sidebar (256px width)
  - Header
  - 4 chart cards (2x2 grid)
  - 4 stat cards (horizontal row)
- **Export**: PNG @2x, SVG

#### 6. Map Page Frame
- **Dimensions**: 1920x1080px
- **Background**: #f9fafb
- **Components**:
  - Sidebar (256px width)
  - Header with upload button
  - Map container (800x600px)
  - Legend section
- **Export**: PNG @2x, SVG

### Export Settings

#### PNG Export
- **Format**: PNG
- **Scale**: 2x
- **Quality**: 100%
- **Naming**: `{PageName}-{Component}-@2x.png`

#### SVG Export
- **Format**: SVG
- **Include "id" attribute**: Yes
- **Outline text**: No
- **Naming**: `{PageName}-{Component}.svg`

### Component Library

Create reusable components in Figma:

1. **Button** (Primary, Secondary, Danger variants)
2. **Input** (Default, Error states)
3. **Card** (Base card component)
4. **Status Badge** (Idle, Busy, Charging, Error)
5. **Bot Card** (Reusable bot display)
6. **Sidebar Navigation** (Fixed component)
7. **Chart Container** (For analytics)

### Design Tokens

Export design tokens as JSON:

```json
{
  "colors": {
    "primary": {
      "50": "#eef2ff",
      "600": "#4f46e5",
      "700": "#4338ca"
    },
    "status": {
      "idle": "#10b981",
      "busy": "#3b82f6",
      "charging": "#f59e0b",
      "error": "#ef4444"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "typography": {
    "heading": {
      "fontSize": "30px",
      "fontWeight": "700"
    },
    "body": {
      "fontSize": "16px",
      "fontWeight": "400"
    }
  }
}
```

## Design Matching

### Current UI Implementation
The React application matches this Figma design system:

- ✅ Color palette implemented in `tailwind.config.js`
- ✅ Spacing system using Tailwind utilities
- ✅ Component structure matches hierarchy
- ✅ Responsive breakpoints implemented
- ✅ Status colors match design tokens
- ✅ Typography scales match specifications

### Design-to-Code Mapping

| Figma Component | React Component | File Location |
|----------------|-----------------|---------------|
| Button | Button.jsx | src/components/Button.jsx |
| Input | Input.jsx | src/components/Input.jsx |
| Card | Card.jsx | src/components/Card.jsx |
| Bot Card | BotCard.jsx | src/components/BotCard.jsx |
| Sidebar | Layout.jsx | src/components/Layout.jsx |
| Status Badge | Inline in BotCard | src/components/BotCard.jsx |

## Figma Link

**Design File**: [Figma Design Link](https://www.figma.com/file/YOUR_FILE_ID/Bot-Management-System)

*Note: Replace YOUR_FILE_ID with actual Figma file ID when design is created.*

## Next Steps

1. Create Figma file with above specifications
2. Build component library
3. Design all 6 page frames
4. Export assets and tokens
5. Link design file in README.md


