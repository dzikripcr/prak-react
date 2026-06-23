import { getSupabase } from "../lib/supabase";

async function runQuery(query) {
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export const commerceAPI = {
  getProducts() {
    return runQuery(getSupabase().from("products").select("*").order("created_at", { ascending: false }));
  },

  getProduct(id) {
    return runQuery(getSupabase().from("products").select("*").eq("id", id).single());
  },

  createProduct(product) {
    return runQuery(getSupabase().from("products").insert(product).select().single());
  },

  updateProduct(id, product) {
    return runQuery(getSupabase().from("products").update(product).eq("id", id).select().single());
  },

  deleteProduct(id) {
    return runQuery(getSupabase().from("products").delete().eq("id", id));
  },

  getCustomers() {
    return runQuery(getSupabase().from("profiles").select("*").order("created_at", { ascending: false }));
  },

  updateCustomer(id, profile) {
    return runQuery(getSupabase().from("profiles").update(profile).eq("id", id).select().single());
  },

  getOrders() {
    return runQuery(
      getSupabase()
        .from("orders")
        .select("*, profiles(name, phone, tier), order_items(id, product_id, quantity, price, products(name))")
        .order("created_at", { ascending: false }),
    );
  },

  async createOrder(items) {
    const { data, error } = await getSupabase().rpc("create_order", { p_items: items });
    if (error) throw error;
    return data;
  },

  async updateOrderStatus(id, status) {
    const { error } = await getSupabase().rpc("update_order_status", {
      p_order_id: id,
      p_status: status,
    });
    if (error) throw error;
  },

  deleteOrder(id) {
    return runQuery(getSupabase().from("orders").delete().eq("id", id));
  },

  getMemberPoints(userId) {
    return runQuery(
      getSupabase().from("member_points").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    );
  },
};
