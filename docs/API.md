# DreamVerse API Documentation

This document describes the internal APIs and data structures used in DreamVerse.

## State Management

DreamVerse uses Zustand for state management with the following stores:

### User Store (`stores/userStore.ts`)

Manages user authentication and profile data.

```typescript
interface User {
  id: string
  username: string
  displayName: string
  avatarData: AvatarData
  preferences: Preferences
  badges: string[]
  worldsOwned: string[]
  createdAt: string
  updatedAt: string
}

interface UserState {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  login: (username: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
}
```

**Methods:**
- `login(username, password)` - Authenticates user
- `signup(userData)` - Creates new user account
- `logout()` - Clears user session

### World Store (`stores/worldStore.ts`)

Manages world data and collections.

```typescript
interface World {
  id: string
  ownerId: string
  title: string
  description: string
  thumbnail: string
  background: BackgroundConfig
  music: MusicConfig
  objects: SceneObject[]
  particles: ParticlesConfig
  likes: number
  visits: number
  createdAt: string
  updatedAt: string
  visibility: 'public' | 'private'
}

interface WorldState {
  worlds: World[]
  currentWorld: World | null
  addWorld: (world: World) => void
  updateWorld: (id: string, updates: Partial<World>) => void
  deleteWorld: (id: string) => void
  setCurrentWorld: (world: World | null) => void
  likeWorld: (id: string) => void
  visitWorld: (id: string) => void
}
```

**Methods:**
- `addWorld(world)` - Adds new world to collection
- `likeWorld(id)` - Increments like count
- `visitWorld(id)` - Increments visit count

### UI Store (`stores/uiStore.ts`)

Manages application UI state and preferences.

```typescript
interface UIState {
  modals: Record<string, boolean>
  drawers: Record<string, boolean>
  notifications: string[]
  theme: 'dark' | 'light'
  setModal: (key: string, open: boolean) => void
  setDrawer: (key: string, open: boolean) => void
  addNotification: (message: string) => void
  clearNotifications: () => void
  setTheme: (theme: 'dark' | 'light') => void
}
```

## Data Persistence

### IndexedDB Schema

DreamVerse uses IndexedDB for offline data storage with the following object stores:

#### Users Store
```typescript
interface UserDB {
  id: string
  username: string
  displayName: string
  avatarData: AvatarData
  preferences: Preferences
  badges: string[]
  worldsOwned: string[]
  createdAt: string
  updatedAt: string
}
```

#### Worlds Store
```typescript
interface WorldDB {
  id: string
  ownerId: string
  title: string
  description: string
  thumbnail: string
  background: BackgroundConfig
  music: MusicConfig
  objects: SceneObject[]
  particles: ParticlesConfig
  likes: number
  visits: number
  createdAt: string
  updatedAt: string
  visibility: 'public' | 'private'
}
```

#### Assets Store
```typescript
interface AssetDB {
  key: string
  type: string
  data: any
}
```

#### Settings Store
```typescript
interface SettingDB {
  key: string
  value: any
}
```

## Component APIs

### WorldEditor Props

```typescript
interface WorldEditorProps {
  // No props - component manages its own state
}
```

**Internal State:**
- `objects`: Array of scene objects
- `selectedObject`: Currently selected object
- `gizmoMode`: Current transformation mode
- `history`: Undo/redo history stack
- `particles`: Particle system configuration

### AvatarBuilder Props

```typescript
interface AvatarBuilderProps {
  // No props - component manages its own state
}
```

**Internal State:**
- `avatarData`: Current avatar configuration
- `selectedLayer`: Currently selected customization layer

### WorldViewer Props

```typescript
interface WorldViewerProps {
  worldId: string  // ID of world to display
}
```

**Features:**
- Loads world data from IndexedDB
- Handles likes and visits tracking
- Provides sharing functionality

## Utility Functions

### Database Utils (`lib/dbUtils.ts`)

```typescript
// User operations
saveUser(user: User): Promise<void>
getUser(id: string): Promise<User | undefined>

// World operations
saveWorld(world: World): Promise<void>
getWorld(id: string): Promise<World | undefined>
getAllWorlds(): Promise<World[]>
deleteWorld(id: string): Promise<void>

// Settings operations
saveSetting(key: string, value: any): Promise<void>
getSetting(key: string): Promise<any>
```

### Analytics (`lib/useAnalytics.ts`)

```typescript
interface AnalyticsHook {
  trackEvent: (event: string, data?: any) => void
  trackPageView: (page: string) => void
}

useAnalytics(): AnalyticsHook
usePageAnalytics(pageName: string): void
```

### Sound Effects (`lib/useSound.ts`)

```typescript
interface SoundHook {
  playSound: (sound: 'click' | 'success' | 'error') => void
}

useSound(): SoundHook
```

## Error Handling

DreamVerse implements comprehensive error handling:

- **Error Boundaries**: Catch React component errors
- **Async Error Handling**: Try/catch blocks for async operations
- **User Feedback**: Toast notifications and error messages
- **Graceful Degradation**: Fallback UI for failed operations

## Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes event handlers
- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Bundle optimization with Next.js
- **IndexedDB**: Efficient local data storage

## Testing

### Unit Tests
Located in `__tests__/` directory, using Vitest:
```bash
npm run test
```

### E2E Tests
Located in `e2e/` directory, using Playwright:
```bash
npm run test:e2e
```

### Test Coverage
- Component rendering and interactions
- State management logic
- Database operations
- User authentication flow
- 3D scene interactions