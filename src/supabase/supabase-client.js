// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

// src/supabase/supabase-client.js

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

// ✅ Istanza unica, fuori da qualsiasi funzione
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;




