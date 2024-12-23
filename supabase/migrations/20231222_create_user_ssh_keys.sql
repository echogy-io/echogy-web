-- Create the user_ssh_keys table
create table if not exists public.user_ssh_keys (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null unique,
    pub_key_hash text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_ssh_keys enable row level security;

-- Create policies
create policy "Users can view own ssh key"
    on public.user_ssh_keys for select
    using (auth.uid() = user_id);

create policy "Users can insert own ssh key"
    on public.user_ssh_keys for insert
    with check (auth.uid() = user_id);

create policy "Users can update own ssh key"
    on public.user_ssh_keys for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Create indexes
create index idx_user_ssh_keys_user_id on public.user_ssh_keys(user_id);
create index idx_user_ssh_keys_pub_key_hash on public.user_ssh_keys(pub_key_hash);
