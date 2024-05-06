import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cisyqubvjiglqmkadgmd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpc3lxdWJ2amlnbHFta2FkZ21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NTcxMDYsImV4cCI6MjAzMDQzMzEwNn0.8aaiArQdQk8EZZkE8U1D7QcG3z4GBPXLizxXKOQ7whU";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
