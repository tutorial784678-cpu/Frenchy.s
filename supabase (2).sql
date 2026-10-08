create table if not exists public.site_store (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_store enable row level security;

-- The frontend never talks to this table directly.
-- /api/products uses the Supabase service-role key server-side.
-- No anonymous policies are required.
