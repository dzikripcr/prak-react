import { getSupabase } from "../lib/supabase";

async function getProfile(userId) {
  const { data, error } = await getSupabase()
    .from("profiles")
    .select("id, name, phone, role, tier")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export const authAPI = {
  async getCurrentUser() {
    const { data, error } = await getSupabase().auth.getUser();
    if (error) throw error;
    if (!data.user) return { user: null, profile: null };

    return { user: data.user, profile: await getProfile(data.user.id) };
  },

  async login(email, password) {
    const { data, error } = await getSupabase().auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { user: data.user, profile: await getProfile(data.user.id) };
  },

  async register({ email, password, name, phone }) {
    const { data, error } = await getSupabase().auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    });

    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await getSupabase().auth.signOut();
    if (error) throw error;
  },

  async sendPasswordReset(email) {
    const { error } = await getSupabase().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  async updatePassword(password) {
    const { error } = await getSupabase().auth.updateUser({ password });
    if (error) throw error;
  },
};
