import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	"https://cmomsvttaoylmcgmijsz.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtb21zdnR0YW95bG1jZ21panN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1ODMyNzIsImV4cCI6MTk3OTE1OTI3Mn0.rhigiA9pWmGse504VObkPZggaP3o9z1kqoTksMAUfvU"
);

export { supabase };
