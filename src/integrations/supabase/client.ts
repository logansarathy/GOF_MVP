// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kurmwakpumadhbjrhgtm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1cm13YWtwdW1hZGhianJoZ3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NzEyNzEsImV4cCI6MjA2MDA0NzI3MX0.LEd2dveeTe1Q6wVIz6BaWUgqwIq2FQENbmW-iaUzKbw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);