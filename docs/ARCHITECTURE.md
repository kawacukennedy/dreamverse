# Architecture Overview

This document describes the high-level architecture and design decisions of DreamVerse.

## System Architecture

### Frontend-Only Design
DreamVerse is built as a frontend-only application with offline-first capabilities:

- **No Backend Required**: All functionality works offline
- **Local Storage**: IndexedDB for persistent data storage
- **PWA Features**: Service worker for caching and offline support
- **Client-Side Rendering**: Next.js with App Router

### Technology Stack

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js 14    │    │  TypeScript 5   │    │ TailwindCSS 4   │
│   App Router    │    │   Strict Mode   │    │   Utility CSS   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   React 18      │
                    │   Strict Mode   │
                    └─────────────────┘
                             │
                    ┌─────────────────┐
                    │   Three.js      │
                    │ React Three     │
                    │     Fiber       │
                    └─────────────────┘
```

## Component Architecture

### Atomic Design Pattern
Components are organized following atomic design principles:

```
components/
├── atoms/          # Basic UI elements (Button, Input)
├── molecules/      # Composite UI elements (Card, Form)
├── organisms/      # Complex UI sections (Header, Sidebar)
├── templates/      # Page layouts
└── pages/          # Complete pages (moved to app/)
```

### State Management

#### Zustand Stores
- **userStore**: Authentication and user profile
- **worldStore**: World data and collections
- **uiStore**: UI state and preferences

#### State Flow
```
User Action → Component → Store Action → State Update → UI Re-render
```

#### Persistence Strategy
- **Zustand Persist**: Automatic state persistence
- **IndexedDB**: Large data storage (worlds, assets)
- **localStorage**: Small config data (theme, settings)

## Data Flow

### World Creation Flow
```
1. User selects object from palette
2. Object added to scene state
3. Three.js renders 3D object
4. User manipulates with gizmos
5. Changes saved to history
6. World exported as JSON
7. Stored in IndexedDB
```

### Authentication Flow
```
1. User enters credentials
2. Credentials validated against localStorage
3. JWT-like token stored (simulated)
4. User state updated
5. Protected routes enabled
6. Profile data loaded
```

## 3D Rendering Pipeline

### Scene Management
```
Canvas (React Three Fiber)
├── Ambient Light
├── Point Lights
├── Camera (OrbitControls)
├── Objects (Instanced Meshes)
├── Particles (Stars/Effects)
└── Gizmos (TransformControls)
```

### Object Rendering
- **Geometry**: Predefined shapes (box, sphere, cylinder, etc.)
- **Materials**: Standard materials with custom colors
- **Transformations**: Position, rotation, scale matrices
- **Optimization**: Instancing for performance

### Performance Optimizations
- **Frustum Culling**: Only render visible objects
- **LOD (Level of Detail)**: Reduce complexity at distance
- **Object Pooling**: Reuse object instances
- **Lazy Loading**: Load assets on demand

## Networking Strategy

### Offline-First Approach
- **Service Worker**: Cache static assets
- **IndexedDB**: Store user data locally
- **Sync Queue**: Queue changes for later sync
- **Conflict Resolution**: Client-side conflict handling

### API Design (Future)
```
GET  /api/worlds          # List public worlds
POST /api/worlds          # Create new world
GET  /api/worlds/:id      # Get world details
PUT  /api/worlds/:id      # Update world
POST /api/worlds/:id/like # Like world
```

## Security Architecture

### Client-Side Security
- **Input Validation**: Sanitize all user inputs
- **XSS Prevention**: React's automatic escaping
- **CSRF Protection**: Same-origin policy
- **Content Security Policy**: Restrict resource loading

### Data Protection
- **Encryption**: Sensitive data encrypted locally
- **Access Control**: User-scoped data isolation
- **Audit Trail**: Track user actions
- **Data Minimization**: Only collect necessary data

## Testing Strategy

### Testing Pyramid
```
┌─────────────┐  E2E Tests (Playwright)
│ Integration │  Component Integration
│   Tests     │  API Contract Testing
└─────────────┘
┌─────────────┐  Unit Tests (Vitest)
│ Unit Tests  │  Component Logic
│             │  Utility Functions
│             │  Store Actions
└─────────────┘
```

### Test Categories
- **Unit Tests**: Pure functions, component logic
- **Integration Tests**: Component interactions, store updates
- **E2E Tests**: Complete user workflows
- **Visual Tests**: UI regression testing

## Performance Architecture

### Bundle Optimization
- **Code Splitting**: Route-based splitting
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression
- **Caching**: Aggressive caching strategies

### Runtime Performance
- **Virtual Scrolling**: For large lists
- **Memoization**: React.memo, useMemo, useCallback
- **Debouncing**: Input handling optimization
- **Web Workers**: Heavy computations off main thread

### Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Bundle Analysis**: Webpack bundle analyzer
- **Error Tracking**: Client-side error monitoring
- **Performance Budgets**: Size and timing limits

## Scalability Considerations

### Code Organization
- **Feature Slices**: Group related code together
- **Shared Libraries**: Extract common utilities
- **Micro Frontends**: Potential future splitting
- **Monorepo Structure**: For multiple apps

### Data Management
- **Normalization**: Consistent data structures
- **Caching Layers**: Multiple cache levels
- **Sync Strategies**: Real-time vs batch updates
- **Migration Paths**: Data schema evolution

## Deployment Architecture

### CI/CD Pipeline
```
Git Push → Lint → Test → Build → Deploy
    ↓         ↓      ↓       ↓        ↓
  ESLint   Vitest  Next.js  Vercel   Production
```

### Environment Strategy
- **Development**: Hot reload, debug tools
- **Staging**: Production-like environment
- **Production**: Optimized, monitored

### Rollback Strategy
- **Blue-Green**: Zero-downtime deployments
- **Feature Flags**: Gradual feature rollout
- **Canary Releases**: Percentage-based rollouts

## Future Architecture

### Planned Enhancements
- **Real-time Collaboration**: WebRTC for multiplayer
- **Cloud Storage**: External asset hosting
- **AI Integration**: ML-powered features
- **Mobile App**: React Native companion
- **VR Support**: WebXR integration

### Technology Evolution
- **React Server Components**: For better performance
- **Edge Computing**: Global CDN deployment
- **WebAssembly**: Performance-critical operations
- **Progressive Enhancement**: Core functionality without JS