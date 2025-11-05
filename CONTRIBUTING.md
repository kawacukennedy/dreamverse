# Contributing to DreamVerse

Thank you for your interest in contributing to DreamVerse! We welcome contributions from developers of all skill levels. This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/dreamverse.git
cd dreamverse

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📋 Contribution Guidelines

### Code Style
- Follow the existing TypeScript and React patterns
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Ensure code is accessible and responsive

### Commit Messages
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

### Pull Requests
1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Update documentation
5. Ensure all tests pass
6. Submit a PR with a clear description

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Verify accessibility with screen readers
- Check performance with Lighthouse

## 🏗️ Architecture

### State Management
We use Zustand for state management. Stores are located in `/stores/`:
- `userStore.ts` - User authentication and profile
- `worldStore.ts` - World data and management
- `uiStore.ts` - UI state and preferences

### Component Structure
Components are organized by feature in `/components/`:
- Feature-specific components in their own directories
- Shared UI components in `/components/ui/`
- Pages in `/app/`

### Styling
- TailwindCSS for utility classes
- CSS custom properties for theming
- Framer Motion for animations

## 🎯 Feature Requests

### 3D Features
- New object types and materials
- Advanced lighting and shadows
- Physics simulation
- Multiplayer collaboration

### Social Features
- Comments and discussions
- User following
- World collections/playlists
- Achievement system

### Performance
- WebGL optimizations
- Progressive loading
- Asset compression
- Caching strategies

## 🐛 Bug Reports

When reporting bugs, please include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments to new functions
- Update API documentation
- Include examples in PR descriptions

## 🎨 Design Guidelines

### Color Palette
- Primary: #7B61FF
- Accent: #00F5A0
- Secondary: #FF7AB6
- Background (dark): #0B0B0F
- Text: #FFFFFF / #000000

### Typography
- Font: Inter
- Sizes: h1 (36px), h2 (28px), h3 (22px), body (16px), small (14px)

### Animations
- Use Framer Motion for smooth transitions
- Respect user preferences for reduced motion
- Keep animations subtle and purposeful

## 📞 Communication

- **Issues:** For bugs and feature requests
- **Discussions:** For questions and ideas
- **Pull Requests:** For code contributions

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:
- Be respectful and constructive
- Welcome newcomers
- Focus on solutions, not problems
- Follow our community guidelines

## 🙏 Recognition

Contributors will be recognized in:
- GitHub repository contributors
- Changelog for major releases
- Special mentions in release notes

Thank you for contributing to DreamVerse! 🎨✨