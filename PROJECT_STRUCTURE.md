# AttendanceDoc Project Structure

## Overview

AttendanceDoc is a full-stack responsive web application for tracking and calculating student attendance. Built with React, TypeScript, TailwindCSS, and Supabase.

## Project Structure

```
AttendanceDOC/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Auth/         # Authentication components
│   │   │   └── AuthForm.tsx
│   │   ├── YearSelection/
│   │   │   └── YearSelection.tsx
│   │   ├── AttendanceCalculator/
│   │   │   └── AttendanceCalculator.tsx
│   │   ├── SummaryReport/
│   │   │   └── SummaryReport.tsx
│   │   └── ui/           # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── lib/              # Utility libraries
│   │   ├── auth.ts       # Authentication functions
│   │   ├── attendance.ts # Attendance calculations
│   │   ├── subjects.ts   # Subject mappings
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts      # General utilities
│   ├── store/            # State management (Zustand)
│   │   ├── authStore.ts  # Authentication state
│   │   └── appStore.ts   # Application state
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── supabase/
│   └── schema.sql        # Database schema
├── .env.example          # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── SETUP.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Key Features

### 1. Authentication (`src/components/Auth/AuthForm.tsx`)
- Sign Up: Create account with name, roll number, email, password
- Sign In: Login with email and password
- Guest Login: Use app without account

### 2. Year Selection (`src/components/YearSelection/YearSelection.tsx`)
- Select academic year (1-5)
- View subjects for selected year
- Store year in user profile (if not guest)

### 3. Attendance Calculator (`src/components/AttendanceCalculator/AttendanceCalculator.tsx`)
- Input fields for each subject:
  - Classes attended
  - Classes held
  - Classes remaining (optional)
  - Date
- Real-time validation
- Calculate attendance percentage and status

### 4. Summary Report (`src/components/SummaryReport/SummaryReport.tsx`)
- Display attendance status for all subjects
- Show percentage, SAFE/UNSAFE status
- Calculate required classes to attend
- Show recommendations

## State Management

### Auth Store (`src/store/authStore.ts`)
- `user`: Current user object
- `setUser`: Set current user
- `logout`: Clear user session

### App Store (`src/store/appStore.ts`)
- `selectedYear`: Selected academic year
- `attendanceData`: Raw attendance input data
- `attendanceResults`: Calculated attendance results
- `setSelectedYear`: Update selected year
- `setAttendanceData`: Update attendance data
- `setAttendanceResults`: Update calculated results
- `addAttendanceData`: Add single attendance entry
- `reset`: Reset all app state

## Utility Functions

### Authentication (`src/lib/auth.ts`)
- `signUp`: Register new user
- `signIn`: Authenticate existing user
- `updateUserYear`: Update user's academic year

### Attendance Calculations (`src/lib/attendance.ts`)
- `calculateAttendance`: Calculate attendance percentage and status
- `validateAttendanceData`: Validate input data

### Subjects (`src/lib/subjects.ts`)
- `YEAR_SUBJECTS`: Subject mappings for each year
- `getSubjectsForYear`: Get subjects for specific year

## Database Schema

### Users Table
- `id` (UUID): Primary key, references auth.users
- `name` (TEXT): User's full name
- `roll_number` (TEXT): Student roll number
- `email` (TEXT): Unique email address
- `year` (INTEGER): Academic year (1-5)
- `created_at` (TIMESTAMP): Account creation date

## Subject Mappings

### Year 1
- Anatomy
- Anatomy (Lab)
- Biochemistry
- Biochemistry (Lab)
- Physiology
- Physiology (Lab)

### Year 2
- Pathology
- Pathology (Lab)
- Microbiology
- Microbiology (Lab)
- Pharmacology
- Pharmacology (Lab)

### Years 3-5
- Subjects not added yet

## Attendance Rules

- **Lab Subjects** (containing "(Lab)"): Minimum 80% attendance required
- **Regular Subjects**: Minimum 75% attendance required

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Custom components (ShadCN-inspired)
- **State Management**: Zustand
- **Backend**: Supabase (Auth + Database)
- **Date Handling**: date-fns
- **Icons**: lucide-react

## Environment Variables

Required in `.env`:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

