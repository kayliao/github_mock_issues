import { createClient } from "@supabase/supabase-js";

const url =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_SUPABASE_PRO_URL
		: process.env.REACT_APP_SUPABASE_DEV_URL;
const key =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_SUPABASE_PRO_KEY
		: process.env.REACT_APP_SUPABASE_DEV_KEY;

const supabase = createClient(url as string, key as string);

export { supabase };
