import { supabase } from '@/core/supabaseClient';
import { type User, type UserRole } from '@/types/user';

export const userService = {
  getUsers: async () => {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data as User[];
  },
  updateUserRole: async (id: string, role: UserRole) => {
    const { data, error } = await supabase.from('users').update({ role }).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data as User;
  }
};
