-- Admin Commerce & Member Management System
-- Apply this migration in the Supabase SQL editor or with the Supabase CLI.

create type public.user_role as enum ('admin', 'member');
create type public.member_tier as enum ('bronze', 'silver', 'gold', 'platinum');
create type public.order_status as enum ('pending', 'processing', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  role public.user_role not null default 'member',
  tier public.member_tier not null default 'bronze',
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  total_price numeric(12, 2) not null check (total_price >= 0),
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  price numeric(12, 2) not null check (price >= 0)
);

create table public.member_points (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  points integer not null,
  description text not null,
  created_at timestamptz not null default now()
);

create index orders_user_id_created_at_idx on public.orders (user_id, created_at desc);
create index order_items_order_id_idx on public.order_items (order_id);
create index member_points_user_id_created_at_idx on public.member_points (user_id, created_at desc);

-- A profile is created automatically for every Supabase Auth registration.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- SECURITY DEFINER avoids circular RLS checks. It is only used inside policies/RPCs.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.calculate_tier(p_user_id uuid)
returns public.member_tier
language plpgsql
security definer set search_path = public
as $$
declare
  total_points integer;
  next_tier public.member_tier;
begin
  select coalesce(sum(points), 0) into total_points
  from public.member_points where user_id = p_user_id;

  next_tier := case
    when total_points >= 700 then 'platinum'
    when total_points >= 300 then 'gold'
    when total_points >= 100 then 'silver'
    else 'bronze'
  end;

  update public.profiles set tier = next_tier where id = p_user_id;
  return next_tier;
end;
$$;

-- Creates an order atomically. Prices always come from the database, never the browser.
create or replace function public.create_order(p_items jsonb)
returns uuid
language plpgsql
security definer set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  item jsonb;
  product_row public.products%rowtype;
  quantity_value integer;
  order_total numeric(12, 2) := 0;
  new_order_id uuid;
begin
  if current_user_id is null then
    raise exception 'Authentication is required';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Order items are required';
  end if;

  for item in select * from jsonb_array_elements(p_items)
  loop
    quantity_value := (item ->> 'quantity')::integer;
    if quantity_value is null or quantity_value <= 0 then
      raise exception 'Quantity must be greater than zero';
    end if;

    select * into product_row from public.products
    where id = (item ->> 'product_id')::uuid for update;
    if not found then raise exception 'Product not found'; end if;
    if product_row.stock < quantity_value then raise exception 'Insufficient stock'; end if;
    order_total := order_total + (product_row.price * quantity_value);
  end loop;

  insert into public.orders (user_id, total_price) values (current_user_id, order_total)
  returning id into new_order_id;

  for item in select * from jsonb_array_elements(p_items)
  loop
    quantity_value := (item ->> 'quantity')::integer;
    select * into product_row from public.products where id = (item ->> 'product_id')::uuid for update;
    insert into public.order_items (order_id, product_id, quantity, price)
    values (new_order_id, product_row.id, quantity_value, product_row.price);
    update public.products set stock = stock - quantity_value where id = product_row.id;
  end loop;

  return new_order_id;
end;
$$;

-- Only an admin can complete/cancel/process an order; completion awards points once.
create or replace function public.update_order_status(p_order_id uuid, p_status public.order_status)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  order_row public.orders%rowtype;
  earned_points integer;
begin
  if not public.is_admin() then raise exception 'Admin access is required'; end if;
  select * into order_row from public.orders where id = p_order_id for update;
  if not found then raise exception 'Order not found'; end if;

  update public.orders set status = p_status where id = p_order_id;
  if p_status = 'completed' and order_row.status <> 'completed' then
    earned_points := floor(order_row.total_price / 10000);
    insert into public.member_points (user_id, points, description)
    values (order_row.user_id, earned_points, 'Points from completed order ' || p_order_id);
    perform public.calculate_tier(order_row.user_id);
  end if;
end;
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.member_points enable row level security;

create policy "profiles: users read own profile or admins read all" on public.profiles
  for select to authenticated using (auth.uid() = id or public.is_admin());
create policy "profiles: admins update" on public.profiles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "products: public read" on public.products for select using (true);
create policy "products: admins insert" on public.products
  for insert to authenticated with check (public.is_admin());
create policy "products: admins update" on public.products
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "products: admins delete" on public.products
  for delete to authenticated using (public.is_admin());

create policy "orders: users read own or admins read all" on public.orders
  for select to authenticated using (auth.uid() = user_id or public.is_admin());
create policy "orders: users create own or admins create" on public.orders
  for insert to authenticated with check (auth.uid() = user_id or public.is_admin());
create policy "orders: admins update" on public.orders
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "orders: admins delete" on public.orders
  for delete to authenticated using (public.is_admin());

create policy "order items: owners or admins read" on public.order_items
  for select to authenticated using (
    public.is_admin() or exists (select 1 from public.orders where orders.id = order_id and orders.user_id = auth.uid())
  );
create policy "order items: users create own or admins create" on public.order_items
  for insert to authenticated with check (
    public.is_admin() or exists (select 1 from public.orders where orders.id = order_id and orders.user_id = auth.uid())
  );
create policy "order items: admins update" on public.order_items
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "order items: admins delete" on public.order_items
  for delete to authenticated using (public.is_admin());

create policy "member points: users read own or admins read all" on public.member_points
  for select to authenticated using (auth.uid() = user_id or public.is_admin());
create policy "member points: admins manage" on public.member_points
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant execute on function public.create_order(jsonb) to authenticated;
grant execute on function public.update_order_status(uuid, public.order_status) to authenticated;
