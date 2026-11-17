create table if not exists staff (
  user_id text primary key,
  role text not null default 'client'
);
