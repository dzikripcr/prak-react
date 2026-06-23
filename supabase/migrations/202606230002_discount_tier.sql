-- Tier Discount System
-- Menambahkan kolom discount ke tabel orders dan memperbarui create_order RPC
-- untuk memberikan diskon otomatis berdasarkan tier member.
-- Apply setelah migration 202606230001_admin_commerce.sql

-- Tambah kolom discount di tabel orders
alter table public.orders
  add column if not exists discount numeric(12, 2) not null default 0 check (discount >= 0);

-- Helper function: ambil persentase diskon berdasarkan tier
create or replace function public.tier_discount_pct(p_tier public.member_tier)
returns numeric
language sql
immutable
as $$
  select case p_tier
    when 'bronze'   then 5
    when 'silver'   then 10
    when 'gold'     then 15
    when 'platinum' then 20
  end;
$$;

-- Update create_order: terapkan diskon tier
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
  order_subtotal numeric(12, 2) := 0;
  discount_pct numeric;
  discount_amount numeric(12, 2) := 0;
  order_total numeric(12, 2) := 0;
  new_order_id uuid;
  user_tier public.member_tier;
begin
  if current_user_id is null then
    raise exception 'Authentication is required';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Order items are required';
  end if;

  -- Ambil tier user
  select tier into user_tier from public.profiles where id = current_user_id;
  discount_pct := public.tier_discount_pct(user_tier);

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
    order_subtotal := order_subtotal + (product_row.price * quantity_value);
  end loop;

  discount_amount := round(order_subtotal * discount_pct / 100, 2);
  order_total := order_subtotal - discount_amount;

  insert into public.orders (user_id, total_price, discount)
  values (current_user_id, order_total, discount_amount)
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
