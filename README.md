# Clear Breath Education

Marketing site + private admin dashboard for educational coaching (non-clinical).

## Public site
- `/` — marketing page and booking request form

## Admin
- `/admin/login` — sign in
- `/admin` — dashboard (booking inbox, paid flag, session links, notes)

## Setup (required for admin + saving bookings)

1. Create a free project at https://supabase.com
2. SQL Editor → run `supabase-schema.sql`
3. Authentication → Users → Add user (email + password) — use your admin email
4. Settings → API → copy Project URL and anon public key
5. Netlify → Site configuration → Environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Redeploy the site

## Local dev
```bash
npm install
cp .env.example .env
npm run dev
```
