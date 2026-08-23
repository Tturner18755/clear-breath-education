-- Run this in Supabase: SQL Editor → New query → Run

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  preferred_times text not null,
  topic text not null,
  status text not null default 'new'
    check (status in ('new','contacted','scheduled','completed','cancelled')),
  paid boolean not null default false,
  session_link text,
  admin_notes text
);

alter table public.booking_requests enable row level security;

create policy "Public can insert bookings"
  on public.booking_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read bookings"
  on public.booking_requests
  for select
  to authenticated
  using (true);

create policy "Authenticated can update bookings"
  on public.booking_requests
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete bookings"
  on public.booking_requests
  for delete
  to authenticated
  using (true);
