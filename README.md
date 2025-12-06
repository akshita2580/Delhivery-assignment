# Bot Management System

A comprehensive React-based bot management system with real-time monitoring, task allocation, analytics, and map visualization.

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Zustand** - Global state management
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Chart library for analytics
- **Lucide React** - Icon library
- **Three.js** - 3D visualization library (bonus feature)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BotCard.jsx     # Individual bot display card
│   ├── Button.jsx      # Reusable button component
│   ├── Card.jsx        # Generic card wrapper
│   ├── Input.jsx       # Form input component
│   ├── Layout.jsx      # Main layout with navigation
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── hooks/              # Custom React hooks
│   ├── useBots.js     # Bot management hook
│   └── useTasks.js    # Task management hook
├── pages/              # Page components
│   ├── LoginPage.jsx           # Login/Signup page
│   ├── DashboardPage.jsx       # Home dashboard
│   ├── BotStatusPage.jsx       # Bot status monitoring
│   ├── TaskAllocationPage.jsx  # Task creation form
│   ├── TaskQueuePage.jsx       # Task queue display
│   ├── AnalyticsPage.jsx       # Analytics and charts
│   ├── MapPage.jsx            # SVG map with moving bots
│   └── ThreeSim.jsx           # 3D bot simulation (bonus)
├── state/              # Zustand stores
│   ├── authStore.js   # Authentication state
│   ├── botStore.js    # Bot data and status
│   └── taskStore.js   # Task queue management
├── App.jsx            # Main app component with routing
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🏗️ Component Architecture

```
App
├── Layout (Navigation Sidebar)
│   ├── Dashboard Page
│   ├── Bot Status Page
│   │   └── BotCard (×10)
│   ├── Task Allocation Page
│   │   └── Form Components
│   ├── Task Queue Page
│   │   └── Task Cards
│   ├── Analytics Page
│   │   └── Chart Components (Recharts)
│   └── Map Page
│       └── SVG Renderer + Bot Circles
└── Login Page
```

## 🔄 Data Flow

### Bot Updates Flow
```
BotStore (Zustand)
    ↓
useBots Hook (starts 10s interval)
    ↓
BotStatusPage (displays bots)
    ↓
BotCard Components (render individual bots)
```

### Task Flow
```
TaskAllocationPage (form submission)
    ↓
TaskStore.addTask() (Zustand)
    ↓
TaskQueuePage (displays tasks)
    ↓
Auto-removal every 3s (simulates assignment)
    ↓
Assigned Tasks Array
```

### Authentication Flow
```
LoginPage (form submission)
    ↓
AuthStore.login/signup() (Zustand)
    ↓
ProtectedRoute (checks auth)
    ↓
Dashboard/Other Pages
```

## 🗄️ State Management

### Zustand Stores

1. **authStore.js**
   - `user`: Current user object
   - `isAuthenticated`: Boolean auth status
   - `login()`: Authenticate user
   - `signup()`: Create new account
   - `logout()`: Clear auth state
   - **Note**: NO localStorage/sessionStorage (as per requirements)

2. **botStore.js**
   - `bots`: Array of 10 bot objects
   - `updateBots()`: Update all bot data
   - `startAutoUpdate()`: Begin 10s interval updates
   - `stopAutoUpdate()`: Clear interval
   - `getStats()`: Calculate bot statistics

3. **taskStore.js**
   - `tasks`: Array of pending tasks
   - `assignedTasks`: Array of assigned tasks
   - `addTask()`: Add new task to queue
   - `removeTask()`: Remove task (simulate assignment)
   - `startAutoRemoval()`: Begin 3s interval removal
   - `stopAutoRemoval()`: Clear interval
   - `clearQueue()`: Clear all tasks

## 🎯 Features

### 1. Login/Signup Page
- Responsive form design
- Email and password validation
- Global state management (Zustand)
- No localStorage/sessionStorage
- Redirects to dashboard after login

### 2. Dashboard Page
- Summary cards showing:
  - Total Bots
  - Active Tasks
  - Idle Bots
  - Bots in Error
  - Pending Tasks
  - Assigned Tasks
- Responsive grid layout
- Real-time statistics

### 3. Bot Status Page
- Displays 10 bot cards
- Each card shows:
  - Battery percentage
  - Status (idle, busy, charging, error)
  - Current task
  - Speed (km/h)
  - Last updated time
- Auto-updates every 10 seconds
- Manual refresh button

### 4. Task Allocation Page
- Form fields:
  - Pickup location
  - Drop location
  - Priority (low, medium, high, urgent)
  - Comments (optional)
- Form validation
- Adds task to global state
- Redirects to task queue after creation

### 5. Task Queue Page
- Displays all pending tasks
- Auto-removes 1 task every 3 seconds (simulates assignment)
- Live UI updates
- Clear queue functionality
- Shows task details and priority

### 6. Analytics Page
- **Bot Workload Distribution** (Pie Chart)
- **Battery Level Distribution** (Bar Chart)
- **Task Completion Trends** (Line Chart)
- **Bot Speed Distribution** (Bar Chart)
- Summary statistics cards
- Responsive chart layout

### 7. Map Page (Bonus)
- SVG file upload
- Renders SVG map
- Displays bots as moving circles
- Random coordinate positioning
- Simulated movement with collision detection
- Color-coded by bot status

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📝 Usage

1. **Start the application**: Run `npm run dev`
2. **Login/Signup**: Use the login page to authenticate
3. **Dashboard**: View system overview and statistics
4. **Bot Status**: Monitor all bots with real-time updates
5. **Allocate Tasks**: Create new tasks via the allocation form
6. **Task Queue**: View and monitor pending tasks
7. **Analytics**: Explore charts and insights
8. **Map**: Upload SVG and visualize bots (bonus feature)

## 🔧 Custom Hooks

### useBots()
- Manages bot data and auto-updates
- Returns: `{ bots, updateBots, stats }`
- Handles lifecycle (starts/stops intervals)

### useTasks()
- Manages task queue and auto-removal
- Returns: `{ tasks, addTask, removeTask, clearQueue, stats }`
- Handles lifecycle (starts/stops intervals)

## 🎨 Styling

- **TailwindCSS** for utility-first styling
- Custom color palette (primary colors)
- Responsive design (mobile-first)
- Consistent component styling
- Hover effects and transitions

## 🔐 Authentication

- Simple email/password validation
- State stored in Zustand (in-memory)
- Protected routes using `ProtectedRoute` component
- Auto-redirect based on auth status

## 📊 Mock Data

- **Bots**: 10 bots with randomized properties
- **Tasks**: Generated on form submission
- **Updates**: Simulated via intervals and random values
- **Charts**: Uses real bot/task data

## 🚦 Auto-Update Logic

- **Bots**: Updates every 10 seconds
- **Tasks**: Removes 1 task every 3 seconds
- Uses `setInterval` with proper cleanup
- Managed via custom hooks

## 📈 Improvements with More Time

1. **Backend Integration**: Connect to real API
2. **WebSocket**: Real-time updates via WebSocket
3. **Persistence**: Add database for tasks and bots
4. **User Management**: Multiple user roles and permissions
5. **Notifications**: Toast notifications for events
6. **Error Handling**: Comprehensive error boundaries
7. **Testing**: Unit and integration tests
8. **Performance**: Code splitting and lazy loading
9. **Accessibility**: ARIA labels and keyboard navigation
10. **Internationalization**: Multi-language support

## ⭐ Bonus Features Implemented

### 1. Figma Design Documentation

A comprehensive Figma design plan is available in `/design/figma-plan.md`:

- **Component Hierarchy**: Complete structure of all UI components
- **Spacing System**: 4px base unit spacing system
- **Color Palette**: Primary indigo scale and status colors
- **Layout Structure**: Sidebar navigation and content area specifications
- **Export Instructions**: Frame setup and export settings for all pages
- **Design Tokens**: JSON format for colors, spacing, and typography

#### Figma Design System

**Design File**: [Figma Design Link](https://www.figma.com/file/YOUR_FILE_ID/Bot-Management-System)

*Note: Replace `YOUR_FILE_ID` with actual Figma file ID when design is created.*

#### Design Screens Mapping

| Figma Screen | React Page | Route |
|--------------|------------|-------|
| Dashboard Frame | DashboardPage | `/dashboard` |
| Bot Status Frame | BotStatusPage | `/bots` |
| Task Allocation Frame | TaskAllocationPage | `/tasks/allocate` |
| Task Queue Frame | TaskQueuePage | `/tasks/queue` |
| Analytics Frame | AnalyticsPage | `/analytics` |
| Map Frame | MapPage | `/map` |
| Login Frame | LoginPage | `/login` |

#### Design Tokens

All design tokens are documented in `/design/figma-plan.md` including:
- Color palette (Primary, Status, Neutral)
- Typography scale (Font sizes, weights)
- Spacing system (4px base unit)
- Component specifications
- Responsive breakpoints

#### Export Settings

- **Format**: PNG @2x, SVG
- **Naming**: `{PageName}-{Component}-@2x.png`
- **Frame Dimensions**: 1920x1080px
- **Background**: #f9fafb (Gray 50)

### 2. Next.js Version (App Router)

A complete Next.js 14 version is available in `/next-version/`:

- **Server-Side Rendering**: Better SEO and performance
- **App Router**: Next.js 14 file-based routing
- **Same Functionality**: All pages and features from React version
- **TypeScript Ready**: Includes TypeScript configuration

**To run Next.js version:**

```bash
cd next-version
npm install
npm run dev
```

**Project Structure:**
```
next-version/
├── app/
│   ├── dashboard/
│   ├── bots/
│   ├── tasks/
│   ├── analytics/
│   ├── map/
│   └── login/
├── components/
├── state/
└── hooks/
```

### 3. Three.js 3D Bot Simulation

A real-time 3D visualization of bots is available at `/3d` route:

- **3D Grid Floor**: Interactive grid-based floor
- **10 Moving Bots**: Spheres representing bots with random movement
- **Real-time Status**: Bot colors update based on actual bot status
- **60fps Animation**: Smooth animation loop
- **Camera & Lighting**: Proper 3D scene setup

**Features:**
- Bots move randomly on the grid
- Colors change based on bot status (idle=green, busy=blue, charging=yellow, error=red)
- Bots bounce off boundaries
- Smooth rotation and movement
- Responsive to window resize

**Access**: Navigate to "3D View" in the sidebar after logging in.

**Technical Details:**
- Uses Three.js for 3D rendering
- Dynamic import for code splitting
- Real-time synchronization with bot store
- Proper cleanup on unmount

## 📸 Screenshots

### Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)
*Overview of bot fleet statistics and system status*

### Bot Status
![Bot Status Screenshot](./screenshots/bot-status.png)
*Real-time monitoring of all 10 bots with status indicators*

### Task Allocation
![Task Allocation Screenshot](./screenshots/task-allocation.png)
*Create and assign tasks to available bots*

### Analytics
![Analytics Screenshot](./screenshots/analytics.png)
*Comprehensive charts and insights for bot fleet*

### Map View
![Map Screenshot](./screenshots/map.png)
*Interactive SVG map with moving bot visualization*

### 3D View
![3D View Screenshot](./screenshots/3d-view.png)
*Three.js 3D visualization of bots on grid floor*

*Note: Screenshots should be added to `/screenshots/` directory. Placeholder paths shown above.*

## 📄 License

This project is created for assignment purposes.

## 👨‍💻 Development Notes

- All components are functional components with hooks
- State management is centralized in Zustand stores
- No external API calls (all simulated)
- Clean code structure with separation of concerns
- Reusable components for maintainability
- Proper cleanup of intervals and effects

