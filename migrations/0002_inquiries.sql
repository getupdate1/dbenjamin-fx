create table if not exists inquiries (
  id         serial primary key,
  user_id    text not null,
  name       text not null,
  topic      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);
create index if not exists inquiries_user_id_idx on inquiries (user_id);
