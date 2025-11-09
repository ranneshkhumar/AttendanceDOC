# AttendanceDoc Features

## ✅ Feature 1: Authentication

### Sign Up
- Fields: name, roll_number, email, password
- Stores data in Supabase `users` table
- Fields stored: id, name, roll_number, email, password_hash (via Supabase Auth), year, created_at

### Sign In
- Email + password authentication via Supabase
- Fetches user data from `users` table after authentication

### Guest Login
- No database entry required
- Uses local state: `{ name: "Guest User", guest: true }`
- Navigates to Year Selection after login

## ✅ Feature 2: Year Selection

- User selects year (1-5) after login
- Year is stored in user record (if not guest)

### Subject Mapping

**Year 1:**
- Anatomy
- Anatomy (Lab)
- Biochemistry
- Biochemistry (Lab)
- Physiology
- Physiology (Lab)

**Year 2:**
- Pathology
- Pathology (Lab)
- Microbiology
- Microbiology (Lab)
- Pharmacology
- Pharmacology (Lab)

**Years 3-5:**
- Shows "Subjects not added yet" message

After selection → Shows Attendance Calculator

## ✅ Feature 3: Attendance Calculator

### Input Fields (per subject):
- `classesAttended`: Number of classes attended
- `classesHeld`: Number of classes held
- `classesRemaining`: Optional - remaining classes
- `date`: Date up to which attendance is calculated

### Validation:
- `classesHeld >= classesAttended` (shows red error text if invalid)
- No negative values allowed

### Subject Type Rules:
- Subjects containing "(Lab)" → `minPercent = 80`
- Other subjects → `minPercent = 75`

### Calculations:
- `percentage = (attended / held) * 100`
- Status: `SAFE` if `percentage >= minPercent`, else `UNSAFE`

### Remaining Classes Logic:
If `classesRemaining` is provided:
- `maxPossible = ((attended + remaining) / (held + remaining)) * 100`
- If `maxPossible < minPercent`: Shows "Even attending all remaining classes cannot reach the minimum required."
- Else: Calculates required classes to attend
- `required = ceil((minPercent * (held + remaining) - 100 * attended) / 100)`
- If `required > 0`: "You must attend {required} out of {remaining} remaining classes."
- If `required <= 0`: "You can skip {abs(required)} out of {remaining} remaining classes."

### Day of Week:
- Calculates and displays: `format(selectedDate, 'EEEE')` (e.g., "Monday")

## ✅ Feature 4: Summary Report

Displays a summary card for each subject showing:
- Subject name
- Percentage
- SAFE / UNSAFE status
- "You must attend/skip X out of Y remaining classes" message
- Day of week
- Maximum possible percentage (if remaining classes provided)
- Visual indicators (green for SAFE, red for UNSAFE)

## ✅ Frontend Requirements

- ✅ React + Vite
- ✅ TypeScript
- ✅ TailwindCSS
- ✅ ShadCN-inspired UI components (custom built)
- ✅ Zustand for global state management
- ✅ One-page UI with state-based navigation (Login → Year → Attendance → Summary)
- ✅ Mobile-friendly and responsive design
- ✅ Clean, modern UI with gradient backgrounds

## ✅ Database

- ✅ Supabase schema automatically generated in `supabase/schema.sql`
- ✅ `users` table with proper structure
- ✅ Row Level Security (RLS) policies
- ✅ Foreign key relationship with `auth.users`

## Implementation Details

### State Management
- **Auth Store**: Manages user authentication state
- **App Store**: Manages year selection, attendance data, and results

### Components
- Modular component structure
- Reusable UI components (Button, Input, Card, Label)
- Feature-specific components (Auth, YearSelection, AttendanceCalculator, SummaryReport)

### Utilities
- Attendance calculation logic
- Data validation
- Subject mapping
- Supabase integration

### Styling
- TailwindCSS with custom color scheme
- Responsive grid layouts
- Gradient backgrounds
- Status-based color coding (green/red)

## Next Steps

1. Install dependencies: `npm install`
2. Set up Supabase project and run schema
3. Configure environment variables
4. Run development server: `npm run dev`

