# Vercel Deployment Guide for Dyann AI

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Connect your repository
3. **Firebase Project**: Set up Firebase for authentication and database
4. **Google Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
5. **Bun**: Install Bun package manager (recommended) or Node.js 18+

## Environment Variables Setup

### In Vercel Dashboard:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following variables:

#### Firebase Configuration
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

#### Google Gemini AI
```
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Deployment Steps

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   bun add -g vercel
   # or
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For Production**:
   ```bash
   vercel --prod
   ```

### Method 2: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect Repository**:
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

## Firebase Security Rules Deployment

Since we're using Vercel for hosting but Firebase for backend services, deploy Firebase rules separately:

### Deploy Database Rules:
```bash
firebase deploy --only database
```

### Deploy Firestore Rules:
```bash
firebase deploy --only firestore
```

### Deploy Storage Rules:
```bash
firebase deploy --only storage
```

## Build Configuration

The project is configured for Vercel with:
- **Framework**: Vite
- **Package Manager**: Bun (recommended) or npm
- **Build Command**: `bun run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

## Custom Domain Setup

1. In Vercel Dashboard, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Configure SSL certificate (automatic with Vercel)

## Environment-Specific Variables

### Development
- Use `.env.local` for local development
- Variables prefixed with `VITE_` are exposed to the client

### Production
- Set all variables in Vercel Dashboard
- Never commit `.env` files to version control

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check environment variables are set
   - Ensure Bun is properly configured

2. **Firebase Connection Issues**:
   - Verify Firebase config variables
   - Check Firebase project settings
   - Ensure proper CORS configuration

3. **Gemini API Errors**:
   - Verify API key is correct
   - Check API quota limits
   - Ensure proper environment variable naming

### Debug Commands:

```bash
# Check build locally
bun run build

# Test production build
bun run preview

# Check environment variables
echo $VITE_FIREBASE_API_KEY

# Install dependencies
bun install
```

## Performance Optimization

1. **Enable Vercel Analytics** (optional)
2. **Configure Edge Functions** for API routes
3. **Use Vercel Image Optimization**
4. **Enable Automatic HTTPS**
5. **Bun Performance**: Faster installs and builds

## Security Best Practices

1. **Environment Variables**: Never expose sensitive keys in client code
2. **Firebase Rules**: Always deploy proper security rules
3. **API Keys**: Rotate keys regularly
4. **CORS**: Configure Firebase CORS properly

## Monitoring and Analytics

1. **Vercel Analytics**: Built-in performance monitoring
2. **Firebase Analytics**: User behavior tracking
3. **Error Tracking**: Consider Sentry integration

## Support

For issues:
1. Check Vercel documentation
2. Review Firebase console logs
3. Check browser console for client-side errors
4. Verify environment variables in Vercel dashboard
