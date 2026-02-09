# Admin Analytics Dashboard

A responsive, production-ready Admin Analytics Dashboard built with Next.js that visualizes business data using charts and reusable UI components.


##  Features

### Core Features
- **Responsive Layout**: Collapsible sidebar, mobile-friendly design
- **4 KPI Cards**: Total Revenue, Total Users, Orders, Conversion Rate with trend indicators
- **Interactive Charts**: 
  - Revenue Over Time (Line Chart)
  - Orders Per Month (Bar Chart)
  - User Distribution (Donut Chart)
  - Traffic Sources (Pie Chart)
- **Filter System**: Date range and user type filters
- **Role-Based UI**: Admin and Manager roles with different permissions

### Bonus Features
- **CSV Export**: Export dashboard data to CSV
- **Skeleton Loading States**: Smooth loading experience
- **Error & Empty States**: Graceful error handling
- **Micro-interactions**: Hover effects and smooth transitions

##  Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React Framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first CSS styling |
| **Zustand** | Lightweight state management |
| **Recharts** | Chart components |
| **Lucide React** | Icon library |
| **Axios** | HTTP client (included) |
| **clsx** | Conditional class names |

##  Project Structure

admin-dashboard/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard page
├── components/
│   ├── charts/            # Chart components
│   │   ├── OrdersChart.tsx
│   │   ├── RevenueChart.tsx
│   │   ├── TrafficSourceChart.tsx
│   │   └── UserDistributionChart.tsx
│   ├── filters/           # Filter components
│   │   └── FilterSection.tsx
│   ├── kpi/               # KPI components
│   │   ├── KPICard.tsx
│   │   └── KPISection.tsx
│   ├── layout/            # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/                # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dropdown.tsx
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       └── Skeleton.tsx
├── data/
│   └── mockData.ts        # Mock data and API simulation
├── lib/
│   └── utils.ts           # Utility functions
├── store/
│   └── useStore.ts        # Zustand store
└── types/
    └── index.ts           # TypeScript types
```

##  Architecture Decisions

### State Management (Zustand)
- **Why Zustand**: Lightweight, minimal boilerplate, and perfect for medium-sized applications
- **Persistence**: Theme, sidebar state, and filter preferences are persisted to localStorage
- **Store Structure**: Single store with clear separation of UI state and data state

### Component Architecture
- **Composition Pattern**: Compound components for Cards (Card, CardHeader, CardContent)
- **Memoization**: React.memo used on all major components to prevent unnecessary re-renders
- **Lazy Loading**: Charts use ResponsiveContainer for optimal performance
- **Reusability**: UI components designed to be generic and reusable

### Styling Approach
- **Tailwind CSS**: Utility-first approach for rapid development
- **Dark Mode**: CSS custom properties with Tailwind's dark mode class strategy
- **Responsive Design**: Mobile-first approach with sm/md/lg breakpoints

### Data Handling
- **Mock API**: Simulated API with random delays and occasional errors
- **Data Transformation**: Filter-based data modifications with multipliers
- **Error Handling**: Graceful error states with retry functionality

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

##  Data Flow

1. **Initial Load**: Dashboard fetches data on mount via `fetchData()` action
2. **Filter Changes**: Selecting a new filter triggers automatic data refetch
3. **Mock API**: Simulates network delay (500-1500ms) and occasional errors (5%)
4. **State Updates**: Zustand store updates trigger component re-renders


##  Role-Based Features

| Feature | Admin | Manager |
|---------|-------|---------|
| Dashboard View | ✅ | ✅ |
| Settings Nav Item | ✅ | ❌ |
| Export Data | ✅ | ✅ |
| Role Switcher | ✅ | ✅ |

##  Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Sidebar hidden, vertical chart stack |
| Tablet | 640-1024px | Collapsible sidebar, 2-column grid |
| Desktop | > 1024px | Full sidebar, 2-column grid |

##  Performance Optimizations

1. **Component Memoization**: All major components use `React.memo()`
2. **Selective Re-renders**: Zustand's shallow equality checks
3. **Chart Optimization**: ResponsiveContainer with debounced resize
4. **Code Splitting**: Next.js automatic code splitting
5. **Image Optimization**: Next.js Image component (if needed)

##  Testing Considerations

Key areas to test:
- Filter state changes and data updates
- Theme toggle persistence
- Mobile sidebar behavior
- Error state recovery
- CSV export functionality

##  Assumptions Made

1. **Authentication**: Not implemented - would add NextAuth.js in production
2. **Data Source**: Using mock data - would connect to real API
3. **Caching**: No caching layer - would add React Query/SWR for production
4. **Accessibility**: Basic a11y implemented - would add full ARIA support
5. **Internationalization**: Not implemented - would add next-intl for i18n




