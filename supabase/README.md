# Supabase Setup & Migrations

## Folder Structure

```
supabase/
├── config.toml           # Supabase CLI configuration
├── migrations/           # Database migrations (version controlled)
│   └── 20260103_initial_schema.sql
└── README.md             # This file

lib/supabase/             # Client-side Supabase code
├── client.ts             # Browser client
├── server.ts             # Server-side client
├── types.ts              # TypeScript types
└── admin-service.ts      # CRUD operations
```

## Standard Workflow with Supabase CLI

### 1. Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# npm (cross-platform)
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link to Your Project

```bash
# Get your project ref from Supabase Dashboard URL
# e.g., https://supabase.com/dashboard/project/YOUR_PROJECT_REF

supabase link --project-ref YOUR_PROJECT_REF
```

### 4. Push Migrations to Remote

```bash
# Push all migrations to your Supabase project
supabase db push
```

### 5. Create New Migrations

```bash
# Create a new migration file
supabase migration new your_migration_name

# Edit the generated file in supabase/migrations/
```

### 6. Pull Changes from Remote

```bash
# Pull schema changes made in Supabase Dashboard
supabase db pull
```

### 7. Generate TypeScript Types

```bash
# Generate types from your database schema
supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

## Quick Reference Commands

| Command                         | Purpose                         |
| ------------------------------- | ------------------------------- |
| `supabase db push`              | Push local migrations to remote |
| `supabase db pull`              | Pull remote changes to local    |
| `supabase migration new <name>` | Create new migration            |
| `supabase gen types typescript` | Generate TypeScript types       |
| `supabase db reset`             | Reset local database            |
| `supabase start`                | Start local Supabase stack      |
| `supabase stop`                 | Stop local Supabase stack       |

## Environment Setup

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Migration Best Practices

1. **Never edit existing migrations** - Create new ones for changes
2. **Name migrations descriptively** - e.g., `add_user_avatar_column`
3. **Test locally first** - Use `supabase start` for local testing
4. **Keep migrations small** - One logical change per migration
5. **Version control** - Commit migrations to Git

## Tables Overview

| Table        | Purpose                   |
| ------------ | ------------------------- |
| `vehicles`   | Vehicle fleet management  |
| `blog_posts` | Blog content management   |
| `bookings`   | Customer booking requests |
| `inquiries`  | Contact form submissions  |
