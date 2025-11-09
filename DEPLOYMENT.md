# Deployment Guide - AttendanceDoc

This guide will help you deploy AttendanceDoc to production.

## Prerequisites

- ✅ Supabase project created and configured
- ✅ Environment variables ready
- ✅ Code tested locally

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy React apps.

### Step 1: Prepare for Deployment

1. Make sure your code is committed to Git:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   ```

2. Push to GitHub/GitLab/Bitbucket:
   ```bash
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - Click **"Environment Variables"**
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
7. Click **"Deploy"**
8. Wait 2-3 minutes for deployment
9. Your site will be live at `https://your-project.vercel.app`

### Step 3: Update Supabase Site URL

1. Go to Supabase Dashboard → **Authentication** → **Settings**
2. Under **"Site URL"**, add your Vercel URL: `https://your-project.vercel.app`
3. Under **"Redirect URLs"**, add: `https://your-project.vercel.app/**`
4. Save changes

## Option 2: Deploy to Netlify

### Step 1: Prepare for Deployment

Same as Vercel - commit and push your code.

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Show advanced"** → **"New variable"**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
7. Click **"Deploy site"**
8. Your site will be live at `https://your-project.netlify.app`

### Step 3: Update Supabase Site URL

Same as Vercel - update Site URL and Redirect URLs in Supabase.

## Option 3: Deploy to GitHub Pages

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add to scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### Step 3: Update vite.config.ts

Add base path:
```typescript
export default defineConfig({
  base: '/AttendanceDOC/',
  // ... rest of config
})
```

### Step 4: Deploy

```bash
npm run deploy
```

**Note**: GitHub Pages doesn't support environment variables easily. You may need to use a different approach for env vars.

## Option 4: Deploy to Other Platforms

### Render

1. Create new **Static Site**
2. Connect your repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in dashboard

### Cloudflare Pages

1. Go to Cloudflare Dashboard → **Pages**
2. Connect your repository
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add environment variables

## Post-Deployment Checklist

- [ ] Test Sign Up functionality
- [ ] Test Sign In functionality
- [ ] Test Guest Login
- [ ] Verify database connections
- [ ] Check that all features work
- [ ] Test on mobile devices
- [ ] Update Supabase Site URL
- [ ] Set up custom domain (optional)

## Environment Variables for Production

Make sure these are set in your hosting platform:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Troubleshooting Deployment

### Build Fails

- Check that all dependencies are in `package.json`
- Verify TypeScript compilation passes: `npm run build`
- Check build logs for specific errors

### Environment Variables Not Working

- Make sure variable names start with `VITE_`
- Restart/redeploy after adding variables
- Check that variables are set in production environment (not just preview)

### Supabase Connection Issues

- Verify API keys are correct
- Check Supabase project is active
- Ensure Site URL is updated in Supabase settings
- Check browser console for CORS errors

## Custom Domain Setup

### Vercel

1. Go to Project Settings → **Domains**
2. Add your domain
3. Follow DNS configuration instructions

### Netlify

1. Go to Site Settings → **Domain management**
2. Add custom domain
3. Configure DNS

## Performance Optimization

After deployment, consider:
- Enable CDN caching
- Optimize images (if you add any)
- Enable compression
- Monitor performance with Lighthouse

