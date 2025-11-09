# How to Create .env File - Step by Step

## What is a .env file?

A `.env` file stores your Supabase credentials securely. It's like a password file that only your app can read.

## Step-by-Step Instructions

### Option 1: Create in VS Code / Your Editor

1. **Open your project folder** in VS Code (or your code editor)

2. **In the root folder** (same folder as `package.json`), right-click

3. **Select "New File"**

4. **Name it exactly**: `.env` 
   - Important: The name must start with a dot (.)
   - No extension needed
   - Just `.env`

5. **Open the file** and paste this:

```
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

6. **Replace the values**:
   - Replace `your-project-url-here` with your Supabase Project URL
   - Replace `your-anon-key-here` with your Supabase anon key

7. **Save the file** (Ctrl+S)

### Option 2: Create Using Command Line

1. **Open Command Prompt** (CMD) or PowerShell in your project folder

2. **Run this command**:
   ```cmd
   echo VITE_SUPABASE_URL=your-project-url-here > .env
   echo VITE_SUPABASE_ANON_KEY=your-anon-key-here >> .env
   ```

3. **Then edit the file** to replace the placeholder values

### Option 3: Copy Template

1. I'll create a template file for you
2. Copy it and rename to `.env`
3. Fill in your values

## Where to Get Your Values

### From Supabase Dashboard:

1. Go to [supabase.com](https://supabase.com) and login
2. Select your project
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API** in the settings menu
5. You'll see:
   - **Project URL** - Copy this (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key - Copy this (long string starting with `eyJ...`)

## Example .env File

Here's what it should look like (with fake values):

```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example_key_here
```

## Important Notes

✅ **DO:**
- Name it exactly `.env` (with the dot)
- Put it in the root folder (same as `package.json`)
- Use your actual Supabase values
- Save the file

❌ **DON'T:**
- Don't name it `env.txt` or `.env.txt`
- Don't put it in a subfolder
- Don't commit it to Git (it's already in `.gitignore`)
- Don't share it publicly

## Verify It Works

1. After creating `.env`, restart your dev server:
   ```bash
   npm run dev
   ```

2. Try signing up - if it works, your `.env` is correct!

3. If you see "Missing Supabase environment variables" error:
   - Check the file is named `.env` (not `.env.txt`)
   - Check it's in the root folder
   - Check the values are correct
   - Restart the dev server

## Still Need Help?

If you're stuck, tell me:
- What editor you're using (VS Code, Notepad, etc.)
- What step you're on
- Any error messages you see

I can guide you through it!

