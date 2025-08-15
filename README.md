# Multi-Tenant Blog Application

## Introduction
A multi-tenant application is a software architecture where a single instance of the application serves multiple customers (tenants), with each tenant's data isolated and invisible to other tenants. This project demonstrates a multi-tenant blog platform where each organization gets its own subdomain and can manage their own blogs.

## About the Project
This is a demo multi-tenant blog application built with Next.js and Clerk. Each organization can create and manage their own blog, accessible via a unique subdomain (e.g., `organization.yourdomain.com`). The application uses Clerk for authentication and organization management, ensuring secure tenant isolation.

## Technologies Used
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Clerk** - Authentication and organization management
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Database
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **React Icons** - Icon library

## Running Locally

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database
- Clerk account for authentication

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd multi-tenant-blog
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env.local file with:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgresql_connection_string
```

4. Push database schema:
```bash
pnpm db:push
```

5. Run the development server:
```bash
pnpm dev
```

6. Access the application:
- Main app: `http://localhost:3000`
- Organization subdomain: `http://[org-slug].localhost:3000`
