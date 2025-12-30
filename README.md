# Techno Cars 🚗

A modern car rental platform built for the Algerian market, featuring vehicle management, booking system, and user authentication.

## Features

- 🚗 **Vehicle Management** - Browse, filter, and manage rental vehicles
- 📅 **Booking System** - Complete booking workflow with status tracking
- 👤 **User Authentication** - Secure login/registration with Supabase Auth
- 👨‍💼 **Admin Dashboard** - Manage vehicles, bookings, and users
- 📄 **Document Management** - Upload and manage rental documents
- 🇩🇿 **Algeria-Specific** - Wilaya selection, local phone formats, DZD currency

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Database Setup

1. Create a new Supabase project
2. Run the database migration scripts (contact admin for SQL files)
3. Configure Row Level Security (RLS) policies
4. Set up storage buckets for vehicle images and documents

## Project Structure

```
techno-cars/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── admin/          # Admin-only pages
│   │   ├── bookings/       # User bookings
│   │   ├── documents/      # Document management
│   │   └── profile/        # User profile
│   ├── vehicles/           # Public vehicle pages
│   ├── login/              # Authentication
│   └── register/
├── src/
│   ├── components/         # React components
│   │   ├── common/         # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   └── layout/         # Layout components
│   ├── contexts/           # React contexts (Auth)
│   ├── services/           # API service functions
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
└── public/                 # Static assets
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## License

Private - All rights reserved
