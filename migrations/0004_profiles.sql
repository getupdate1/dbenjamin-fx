create table if not exists profiles (
  user_id text primary key,
  full_name text not null,
  phone text not null,
  verified boolean not null default true,
  created_at timestamptz not null default now()
);
