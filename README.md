# DreamVerse 🌌

A immersive social universe for teens to create, explore, and share 3D mini-worlds. Built with modern web technologies for a seamless offline-first experience.

![DreamVerse Preview](https://via.placeholder.com/800x400/7B61FF/FFFFFF?text=DreamVerse+3D+World+Builder)

## ✨ Features

### 🎨 **3D World Creation**
- Intuitive drag-and-drop object placement
- 8+ 3D shapes (Cube, Sphere, Cylinder, Cone, Torus, Pyramid, Ring, Capsule)
- Real-time gizmo controls (translate, rotate, scale)
- Interactive particle systems with customizable effects
- Background selection (gradients, images, skyboxes)
- Music and sound integration

### 👤 **Avatar Customization**
- Layer-based avatar builder (hair, eyes, mouth, clothes, accessories)
- Color customization for each layer
- AI-powered avatar generation (mock implementation)
- Live 3D preview with orbit controls

### 🌍 **Social Exploration**
- Discover community-created worlds
- Like and visit tracking with leaderboard
- Share worlds with generated URLs
- Social media integration for sharing

### 🔐 **User Management**
- Local authentication system
- User profiles and preferences
- Persistent data with IndexedDB
- Privacy-focused design

### 🎯 **Advanced UX**
- Dark/Light theme with system preference detection
- Global keyboard shortcuts (press `?` for help)
- Responsive design for all devices
- PWA features with offline support
- Accessibility compliance

### 🛠 **Developer Experience**
- TypeScript for type safety
- Comprehensive testing (Vitest + Playwright)
- ESLint and Prettier configuration
- Modular component architecture
- Zustand state management

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6
- **Styling:** TailwindCSS 4.0
- **3D Graphics:** Three.js + React Three Fiber
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Testing:** Vitest + Playwright
- **Database:** IndexedDB (idb)
- **Deployment:** Vercel-ready

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/kawacukennedy/dreamverse.git
cd dreamverse

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Variables
Create a `.env.local` file:
```env
# Optional: AI API key for avatar generation
AI_API_KEY=your_api_key_here

# Optional: Analytics tracking ID
ANALYTICS_ID=your_analytics_id
```

## 🎮 Usage

### Creating Worlds
1. Navigate to the Create page
2. Drag objects from the palette into the 3D scene
3. Use gizmo controls to position, rotate, and scale objects
4. Add particles, backgrounds, and music
5. Save and share your world

### Customizing Avatars
1. Go to the Avatar page
2. Select layers and customize colors
3. Use AI generation for inspiration
4. Save your avatar

### Exploring Worlds
1. Browse the Explore page
2. Click on worlds to view them
3. Like and share your favorites
4. Check the leaderboard for top creators

### Keyboard Shortcuts
- `?` - Show help modal
- `Ctrl+Z` - Undo (in editor)
- `Ctrl+Y` - Redo (in editor)
- `Delete` - Remove selected object
- `G` - Cycle gizmo modes

## 🏗️ Project Structure

```
dreamverse/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── avatar/            # Avatar builder
│   ├── create/            # World editor
│   ├── explore/           # World discovery
│   ├── leaderboard/       # Rankings
│   ├── privacy/           # Privacy policy
│   ├── profile/           # User profile
│   ├── settings/          # App settings
│   └── world/[id]/        # World viewer
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── stores/               # Zustand state stores
├── public/               # Static assets
├── e2e/                  # End-to-end tests
├── __tests__/            # Unit tests
└── styles/               # Global styles
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables are configured automatically

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance
- Test on multiple devices/browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for React integration
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/kawacukennedy/dreamverse/issues)
- **Discussions:** [GitHub Discussions](https://github.com/kawacukennedy/dreamverse/discussions)
- **Email:** hello@dreamverse.app

---

Made with ❤️ for creative teens everywhere.