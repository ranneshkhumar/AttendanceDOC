# Quick Publish Guide - AttendanceDoc

## 🚀 Fastest Way to Publish (Vercel - 5 minutes)

### Step 1: Set Up Supabase (5 minutes)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free)

2. **Create New Project**
   - Click "New Project"
   - Name: `AttendanceDoc`
   - Set a database password (save it!)
   - Choose region
   - Wait 2-3 minutes

3. **Get API Keys**
   - Go to **Settings** → **API**
   - Copy **Project URL** and **anon public** key

4. **Set Up Database**
   - Go to **SQL Editor**
   - Click **New Query**
   - Copy contents from `supabase/schema.sql`
   - Paste and click **Run**

5. **Enable Authentication**
   - Go to **Authentication** → **Settings**
   - Make sure **Email** provider is enabled

### Step 2: Deploy to Vercel (5 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/AttendanceDOC.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click **"Add New Project"**
   - Import your repository
   - **Build Settings** (auto-detected):
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - **Environment Variables**:
     - Add `VITE_SUPABASE_URL` = your Supabase URL
     - Add `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click **"Deploy"**

3. **Update Supabase**
   - Copy your Vercel URL (e.g., `https://attendancedoc.vercel.app`)
   - Go to Supabase → **Authentication** → **Settings**
   - **Site URL**: `https://attendancedoc.vercel.app`
   - **Redirect URLs**: `https://attendancedoc.vercel.app/**`
   - Save

### Step 3: Test Your Live Site

1. Visit your Vercel URL
2. Try **Sign Up** with a test account
3. Test all features
4. Check Supabase dashboard to see data

## 🎉 Done!

Your app is now live! Share the Vercel URL with others.

## Alternative: Netlify

If you prefer Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. **New site from Git** → Select repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables (same as Vercel)
6. Deploy!

## Need Help?

- **Supabase Issues**: Check `SUPABASE_SETUP.md`
- **Deployment Issues**: Check `DEPLOYMENT.md`
- **Local Setup**: Check `SETUP.md`

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Add analytics (optional)
- [ ] Set up error monitoring (optional)
- [ ] Share with users! 🎊

