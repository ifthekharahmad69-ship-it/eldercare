import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const TABLES = {
  PROFILES: 'profiles',
  MEDICATIONS: 'medications',
  MEDICATION_LOGS: 'medication_logs',
  APPOINTMENTS: 'appointments',
  SYMPTOMS: 'symptoms',
  FAMILY_ACCESS: 'family_access',
  SOS_ALERTS: 'sos_alerts'
}
