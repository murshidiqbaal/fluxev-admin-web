import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrlsrydfqtmmmjhkmcbn.supabase.co';
const supabaseKey = 'sb_publishable_wC8_SKrZfh-GQ5QiAHTyBg_CAaRnu0_';

export const supabase = createClient(supabaseUrl, supabaseKey);
