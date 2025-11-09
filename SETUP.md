# AttendanceDoc Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings and copy:
   - Project URL
   - Anon/public key

3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Set Up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase/schema.sql`

This will create:
- `users` table with proper structure
- Row Level Security (RLS) policies
- Required indexes

## Step 4: Configure Supabase Auth

1. In Supabase dashboard, go to Authentication > Settings
2. Make sure Email authentication is enabled
3. Configure email templates if needed (optional)

## Step 5: Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

### Authentication
- **Sign Up**: Create account with name, roll number, email, and password
- **Sign In**: Login with email and password
- **Guest Login**: Use the app without creating an account

### Year Selection
- Select academic year (1-5)
- View subjects for each year
- Year 1 and 2 have predefined subjects
- Other years show "Subjects not added yet"

### Attendance Calculator
- Enter attendance data for each subject:
  - Classes attended
  - Classes held
  - Classes remaining (optional)
  - Date
- Automatic validation
- Real-time calculations

### Summary Report
- View attendance status for all subjects
- See percentage, status (SAFE/UNSAFE), and recommendations
- Calculate required classes to attend

## Database Schema

The `users` table structure:
- `id` (UUID, Primary Key, references auth.users)
- `name` (TEXT, Required)
- `roll_number` (TEXT, Optional)
- `email` (TEXT, Unique, Required)
- `year` (INTEGER, Optional)
- `created_at` (TIMESTAMP, Auto-generated)

## Troubleshooting

### Authentication Issues
- Ensure Supabase Auth is enabled in your project
- Check that RLS policies are correctly set up
- Verify environment variables are correct

### Database Errors
- Make sure the schema has been run successfully
- Check that the `users` table exists
- Verify RLS policies are active

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

