import { createClient } from "@supabase/supabase-js";

const supabaseURL= "https://lgpzzoejpnhlojynqowe.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxncHp6b2VqcG5obG9qeW5xb3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MzI0NDYsImV4cCI6MjAxNDMwODQ0Nn0.qLXN-5-wDN2HNsUeBRTLgmtcnfOVYsovfyJ1wf9Zkt0"
export const supabase=createClient(supabaseURL,supabaseKey)