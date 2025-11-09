# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: AttendanceDoc (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to be ready

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

## Step 3: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press F5)
6. You should see "Success. No rows returned"

## Step 4: Enable Email Authentication

1. Go to **Authentication** → **Settings**
2. Under **"Auth Providers"**, make sure **Email** is enabled
3. (Optional) Configure email templates if needed
4. Under **"Site URL"**, add your deployment URL (we'll update this after deployment)

## Step 5: Configure Environment Variables

### For Local Development:

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Replace `your-project-id` and `your-anon-key-here` with your actual values from Step 2.

### For Production Deployment:

You'll add these same variables in your hosting platform (Vercel, Netlify, etc.) as environment variables.

## Step 6: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Try signing up with a new account
3. Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created
4. Check **Table Editor** → **users** to see if the user profile was created

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists in the root directory
- Check that variable names start with `VITE_`
- Restart the dev server after creating `.env`

### "Failed to create user"
- Check that Email authentication is enabled in Supabase
- Verify your API keys are correct
- Check browser console for detailed error messages

### "RLS policy violation"
- Make sure you ran the SQL schema
- Check that RLS policies are created correctly
- Verify the user is authenticated before accessing data

## Security Notes

- The `anon` key is safe to use in frontend code (it's public)
- Never commit `.env` file to git (it's already in `.gitignore`)
- For production, always use environment variables in your hosting platform
- The `anon` key has Row Level Security (RLS) enabled, so users can only access their own data

