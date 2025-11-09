# Deployment Checklist ✅

Follow this checklist to deploy AttendanceDoc successfully.

## Phase 1: Supabase Setup

- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new project (name: AttendanceDoc)
- [ ] Save database password securely
- [ ] Wait for project to be ready (2-3 minutes)
- [ ] Go to **Settings** → **API**
- [ ] Copy **Project URL** (e.g., `https://xxxxx.supabase.co`)
- [ ] Copy **anon public** key
- [ ] Go to **SQL Editor** → **New Query**
- [ ] Copy contents from `supabase/schema.sql`
- [ ] Paste and click **Run** (should see "Success")
- [ ] Go to **Authentication** → **Settings**
- [ ] Verify **Email** provider is enabled
- [ ] Create `.env` file in project root:
  ```
  VITE_SUPABASE_URL=your-project-url
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```
- [ ] Test locally: `npm run dev`
- [ ] Try signing up with a test account
- [ ] Verify user appears in Supabase → **Authentication** → **Users**
- [ ] Verify profile appears in Supabase → **Table Editor** → **users**

## Phase 2: Git Setup (if not done)

- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Ready for deployment"`
- [ ] Create GitHub repository
- [ ] Push to GitHub: `git push origin main`

## Phase 3: Deploy to Vercel

- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up/Login with GitHub
- [ ] Click **"Add New Project"**
- [ ] Import your repository
- [ ] Verify build settings:
  - Framework: Vite (auto-detected)
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Add environment variables:
  - `VITE_SUPABASE_URL` = your Supabase URL
  - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
- [ ] Click **"Deploy"**
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy your Vercel URL (e.g., `https://attendancedoc.vercel.app`)

## Phase 4: Update Supabase Settings

- [ ] Go to Supabase → **Authentication** → **Settings**
- [ ] Set **Site URL**: your Vercel URL
- [ ] Add **Redirect URL**: `https://your-site.vercel.app/**`
- [ ] Save changes

## Phase 5: Final Testing

- [ ] Visit your live site
- [ ] Test **Sign Up** with new account
- [ ] Test **Sign In** with created account
- [ ] Test **Guest Login**
- [ ] Test **Year Selection**
- [ ] Test **Attendance Calculator**
- [ ] Test **Summary Report**
- [ ] Test **Update Attendance** (go back and modify)
- [ ] Test on mobile device
- [ ] Check Supabase dashboard for data

## Phase 6: Optional Enhancements

- [ ] Set up custom domain (optional)
- [ ] Add analytics (optional)
- [ ] Set up error monitoring (optional)
- [ ] Share with users! 🎉

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

### Environment Variables Not Working
- Make sure names start with `VITE_`
- Redeploy after adding variables
- Check Vercel → Settings → Environment Variables

### Supabase Connection Issues
- Verify API keys are correct
- Check Supabase project is active
- Verify Site URL is set correctly
- Check browser console for errors

### Authentication Not Working
- Verify Email provider is enabled
- Check Site URL matches deployment URL
- Verify Redirect URLs include your domain

---

**Once all checked ✅, your app is live and ready to use!**

