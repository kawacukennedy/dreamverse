# Deployment Guide

This guide covers deploying DreamVerse to various platforms.

## Vercel Deployment (Recommended)

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure build settings
3. Deploy on every push to main branch

### Manual Configuration
If needed, configure in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/**/*.ts": {
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/world/:id",
      "destination": "/world/[id]"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Environment Variables
Set in Vercel dashboard:
```
AI_API_KEY=your_api_key
ANALYTICS_ID=your_analytics_id
```

## Netlify Deployment

### Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18+

### Redirects
Add to `public/_redirects`:
```
/world/:id /world/[id] 200
/* /index.html 200
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  dreamverse:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
```

## Manual Server Deployment

### Build Process
```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Start production server
npm start
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
}
```

## Environment Setup

### Production Environment Variables
```bash
# Required
NODE_ENV=production

# Optional
AI_API_KEY=your_production_api_key
ANALYTICS_ID=GA_MEASUREMENT_ID

# Database (if using external DB)
DATABASE_URL=your_database_url
```

### SSL Certificate
For HTTPS, use Let's Encrypt:
```bash
certbot --nginx -d your-domain.com
```

## Monitoring and Analytics

### Performance Monitoring
- Use Vercel Analytics for deployment metrics
- Implement custom performance tracking
- Monitor Core Web Vitals

### Error Tracking
- Add error logging service (Sentry, LogRocket)
- Monitor client-side errors
- Track API failures

### User Analytics
- Google Analytics 4 integration
- Custom event tracking
- User journey analysis

## CDN and Asset Optimization

### Static Assets
- Images are automatically optimized by Next.js
- 3D models should be compressed
- Audio files should be in efficient formats

### Caching Strategy
- Static assets cached for 1 year
- API responses cached appropriately
- Service worker handles offline caching

## Backup and Recovery

### Data Backup
- IndexedDB data is local to user
- Implement cloud backup for user data
- Regular database backups if using server DB

### Rollback Strategy
- Keep previous deployments available
- Use feature flags for gradual rollouts
- Monitor error rates post-deployment

## Security Considerations

### Content Security Policy
```javascript
// next.config.js
{
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

### Environment Security
- Never commit secrets to repository
- Use environment-specific variables
- Rotate API keys regularly

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript errors

**Runtime Errors:**
- Check browser console for errors
- Verify environment variables
- Check network connectivity for external APIs

**Performance Issues:**
- Use Lighthouse for performance audit
- Check bundle size with `npm run build`
- Optimize images and assets

### Support
- Check GitHub Issues for known problems
- Review deployment logs
- Contact maintainers for assistance