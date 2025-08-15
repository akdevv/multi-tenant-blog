# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Lint the codebase
pnpm lint

# Push database schema changes
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

## Architecture Overview

This is a **multi-tenant blog application** where each organization gets its own subdomain. The system uses subdomain-based routing to serve different blogs based on the organization's slug.

### Key Architectural Components

1. **Subdomain Routing**: Implemented via middleware (`middleware.ts`) that:
   - Extracts subdomains from incoming requests
   - Rewrites subdomain requests to `/s/[subdomain]` route
   - Handles both localhost and production environments
   - Supports Vercel preview deployments with pattern `tenant---branch-name.vercel.app`

2. **Multi-Tenancy Model**:
   - Organizations (via Clerk) serve as tenant boundaries
   - Each organization can have multiple blogs
   - Blogs are accessed publicly via `{orgSlug}.{domain}`
   - Blog creation restricted to authenticated organization members

3. **Database Structure**:
   - Single `blogs` table with `orgId` linking to Clerk organizations
   - Drizzle ORM for type-safe database operations
   - PostgreSQL as the database (local development uses Docker Compose)

4. **Authentication**:
   - Clerk handles all authentication and organization management
   - Organization switcher allows users to manage multiple organizations
   - Middleware integrates Clerk authentication with subdomain routing

### Project Structure

```
app/
├── layout.tsx           # Root layout with ClerkProvider
├── page.tsx            # Landing page
├── org/[slug]/         # Organization management
│   ├── page.tsx       # Blog creation interface
│   └── actions.ts     # Server actions for blog operations
└── s/[subdomain]/      # Subdomain blog display
    └── page.tsx       # Public blog view

components/
├── navbar.tsx          # Main navigation with Clerk integration
└── ui/                # shadcn/ui components (button, input, textarea)

db/
├── index.ts           # Database connection
└── schema.ts          # Drizzle schema definition

lib/
└── utils.ts           # Utility functions (cn for className merging)
```

### Working with Subdomains

When testing subdomain functionality locally:
- Access main app: `http://localhost:3000`
- Access subdomain: `http://{subdomain}.localhost:3000`
- The middleware automatically handles the routing

### Database Operations

All database operations use Drizzle ORM with the schema defined in `db/schema.ts`. Server actions in `app/org/[slug]/actions.ts` handle blog creation with proper type safety.

### UI Components

The project uses shadcn/ui components with Radix UI primitives. All components are in `components/ui/` and follow the shadcn/ui patterns. Tailwind CSS v4 is used for styling with a comprehensive design system defined in `app/globals.css`.

### Environment Variables Required

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
DATABASE_URL
```

### Important Patterns

1. **Server Actions**: Used for all data mutations (see `app/org/[slug]/actions.ts`)
2. **Type Safety**: Full TypeScript with strict mode enabled
3. **Component Organization**: Server and client components properly separated
4. **Routing**: App Router with dynamic routes for organizations and subdomains