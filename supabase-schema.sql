-- Supabase Schema for Elder Care & Medication Management Platform

-- 1. Profiles (Elderly Patients, Caretakers, Family)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  passcode TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'elderly', -- 'elderly', 'caretaker', 'family'
  age INTEGER,
  gender TEXT,
  blood_group TEXT,
  address TEXT,
  medical_conditions TEXT[],
  allergies TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Medications
CREATE TABLE IF NOT EXISTS medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  elderly_id TEXT NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL, -- 'once_daily', 'twice_daily', 'thrice_daily', 'as_needed'
  timing TEXT[], -- e.g. ['08:00', '20:00']
  food_relation TEXT DEFAULT 'after_food', -- 'before_food', 'after_food', 'with_food'
  instructions TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  prescribed_by TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'discontinued'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Medication Adherence Logs (Taken, Skipped, Missed)
CREATE TABLE IF NOT EXISTS medication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id TEXT NOT NULL,
  elderly_id TEXT NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL, -- 'taken', 'skipped', 'missed'
  taken_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Doctor Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  elderly_id TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  specialty TEXT,
  hospital_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  purpose TEXT,
  location TEXT,
  status TEXT DEFAULT 'upcoming', -- 'upcoming', 'completed', 'cancelled'
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Symptom Logs
CREATE TABLE IF NOT EXISTS symptoms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  elderly_id TEXT NOT NULL,
  symptom_name TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'mild', 'moderate', 'severe'
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  reported_by TEXT DEFAULT 'elderly'
);

-- 6. Family & Caretaker Shared Access
CREATE TABLE IF NOT EXISTS family_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  elderly_id TEXT NOT NULL,
  member_name TEXT NOT NULL,
  member_email TEXT,
  member_phone TEXT,
  role TEXT NOT NULL, -- 'caretaker', 'family'
  access_code TEXT UNIQUE NOT NULL,
  permissions TEXT[] DEFAULT ARRAY['view', 'manage_meds', 'manage_appts'],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SOS Emergency Logs
CREATE TABLE IF NOT EXISTS sos_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  elderly_id TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  alert_time TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);

-- Enable RLS and add public permissive policies for hackathon demo
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write for profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for medications" ON medications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for medication_logs" ON medication_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for appointments" ON appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for symptoms" ON symptoms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for family_access" ON family_access FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for sos_alerts" ON sos_alerts FOR ALL USING (true) WITH CHECK (true);
