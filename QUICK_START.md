# Quick Start Guide - AttendanceDoc

## 🚀 How to Run the Application

### Option 1: Using PowerShell with Bypass (Recommended for Windows)

1. **Install Dependencies** (if not already done):
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "npm install"
   ```

2. **Set Up Environment Variables** (Required for full functionality):
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Run the Development Server**:
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "npm run dev"
   ```

4. **Open in Browser**:
   - The app will be available at: `http://localhost:5173`
   - Open this URL in your web browser

### Option 2: Using Command Prompt (CMD)

1. **Open Command Prompt** (not PowerShell)

2. **Navigate to project directory**:
   ```cmd
   cd C:\Users\HP\AttendanceDOC
   ```

3. **Install Dependencies**:
   ```cmd
   npm install
   ```

4. **Create `.env` file** with your Supabase credentials

5. **Run the server**:
   ```cmd
   npm run dev
   ```

### Option 3: Fix PowerShell Execution Policy (One-time setup)

1. **Open PowerShell as Administrator**

2. **Run this command**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Then you can use npm normally**:
   ```powershell
   npm install
   npm run dev
   ```

---

## 📋 Prerequisites Checklist

- [ ] Node.js installed (v18 or higher) - Check with: `node --version`
- [ ] npm installed - Check with: `npm --version`
- [ ] Supabase account created
- [ ] `.env` file created with Supabase credentials
- [ ] Database schema run in Supabase SQL Editor

---

## 🔧 Setting Up Supabase (First Time Only)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Create a new project
4. Wait for project to be ready

### Step 2: Get Your Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### Step 3: Create `.env` File
Create a file named `.env` in the project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** (or press F5)
5. Verify the `users` table was created

### Step 5: Enable Authentication
1. Go to **Authentication** → **Settings**
2. Make sure **Email** provider is enabled
3. Configure email templates (optional)

---

## 🎯 Testing Without Supabase

You can test the app with **Guest Login** without setting up Supabase:
1. Run `npm run dev`
2. Click "Continue as Guest"
3. You can test Year Selection and Attendance Calculator
4. Note: Sign Up/Sign In won't work without Supabase

---

## 🐛 Troubleshooting

### "npm is not recognized"
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal after installation

### "Execution Policy" Error
- Use Option 1 (PowerShell with Bypass) or Option 2 (CMD)
- Or fix execution policy (Option 3)

### "Cannot find module" Error
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### Port Already in Use
- The default port is 5173
- If it's busy, Vite will suggest another port
- Or stop the other process using that port

### Supabase Connection Errors
- Check your `.env` file has correct values
- Make sure there are no extra spaces in `.env` file
- Restart the dev server after changing `.env`

---

## 📱 Accessing the App

Once the server is running:
- **Local**: `http://localhost:5173`
- **Network**: The terminal will show the network URL (for testing on other devices)

---

## ✅ Success Indicators

You'll know it's working when:
- Terminal shows: `VITE v5.x.x  ready in xxx ms`
- Browser opens automatically (or you can manually navigate)
- You see the "AttendanceDoc" login screen

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

