# AttendanceDoc 🎓

A full-stack responsive web application for tracking and calculating student attendance built with React, TypeScript, TailwindCSS, and Supabase.

![AttendanceDoc](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## ✨ Features

- 🔐 **Authentication**: Sign Up, Sign In, and Guest Login
- 📚 **Year Selection**: Choose academic year (1-5) with subject mapping
- 📊 **Attendance Calculator**: Real-time attendance calculation with instant results
- 📈 **Summary Report**: Comprehensive overview of all subjects with status indicators
- 🎨 **Modern UI**: Beautiful, interactive design with animations
- 📱 **Responsive**: Works perfectly on mobile and desktop

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up Supabase:**
   - Follow the guide in `SUPABASE_SETUP.md`
   - Create a `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run development server:**
```bash
npm run dev
```

4. **Open browser:**
   - Visit `http://localhost:5173`

### Deploy to Production

**Fastest way (5 minutes):**
- See `PUBLISH.md` for step-by-step deployment guide
- Recommended: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

**Detailed guides:**
- `SUPABASE_SETUP.md` - Complete Supabase configuration
- `DEPLOYMENT.md` - Detailed deployment instructions
- `PUBLISH.md` - Quick publish guide

## 📁 Project Structure

```
AttendanceDOC/
├── src/
│   ├── components/     # React components
│   ├── lib/          # Utilities and helpers
│   ├── store/        # Zustand state management
│   └── types/        # TypeScript types
├── supabase/         # Database schema
└── public/           # Static assets
```

## 🗄️ Database Schema

Run `supabase/schema.sql` in your Supabase SQL Editor to create:
- `users` table with RLS policies
- Proper foreign key relationships
- Security policies

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Backend**: Supabase (Auth + Database)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📚 Documentation

- `SETUP.md` - Detailed setup instructions
- `FEATURES.md` - Complete feature documentation
- `PROJECT_STRUCTURE.md` - Project organization
- `QUICK_START.md` - Quick start guide

## 🎯 Usage

1. **Login**: Sign up, sign in, or continue as guest
2. **Select Year**: Choose your academic year (1-5)
3. **Enter Data**: Input attendance for each subject
4. **View Results**: See real-time calculations
5. **Update**: Go back and update anytime

## 🔒 Security

- Row Level Security (RLS) enabled
- Secure password hashing via Supabase Auth
- Environment variables for sensitive data
- Client-side validation

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your needs!

---

**Made with ❤️ using React, TypeScript, and Supabase**

