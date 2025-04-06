import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nesdosiongcedbcytfzl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lc2Rvc2lvbmdjZWRiY3l0ZnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjU1MjMsImV4cCI6MjA1OTUwMTUyM30.Qr4Hw7LuJ6Rq0DJBG1eT2yPQGP17E_zqcZ1JZS6bwQo";

export const supabase = createClient(supabaseUrl, supabaseKey);
