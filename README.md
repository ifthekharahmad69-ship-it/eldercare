# 🌟 ElderCare+ | Smart Elderly Healthcare & Medication Management Platform

> Developed for the **Elderly Care & Medication Management Challenge** — An intelligent, multilingual, patient-centric ecosystem connecting elderly individuals, family caretakers, and emergency physicians.

---

## 🏆 Key Features & Innovations

1. **🧕 "Seva" Multilingual Regional Voice AI Assistant**
   - Built for rural and regional elderly who struggle with English menus.
   - Speaks and listens in **Telugu (తెలుగు), Hindi (हिन्दी), Tamil, Bengali, Marathi, Gujarati, and Indian English**.
   - Voice-controlled app navigation and spoken audio reminders announcing the **exact medicine type** and **exact dosage** (e.g., 1 Tablet, 500mg).

2. **🔄 7-Step Closed Healthcare Loop (Hackathon Showcase)**
   - Complete end-to-end clinical workflow:
     1. Doctor-Prescribed Schedule (CHC/PHC)
     2. Caregiver enters medication (Passcode `SEVA99`)
     3. Backend schedules proactive reminder
     4. Sarvam speaks in Telugu announcing Type & Dosage
     5. Elderly person acknowledges (Trophy moves to 67%)
     6. Missed dose triggers automated Email & SMS alert to Daughter (`priya.sharma@example.com`)
     7. Village ASHA Worker home visit follow-up & vitals check

3. **👩🏽‍⚕️ Government ASHA Health Worker Integration (`/asha-worker`)**
   - National Health Mission (NHM) grassroots integration.
   - Allows accredited ASHA workers to record monthly vitals (BP, Sugar, SpO2, Pulse) and request free Jan Aushadhi generic refills.

4. **👥 5 Dedicated Category Login Portals (`/login`)**
   - **Elderly Patient:** Phone + 4-digit PIN (`1234`) ➔ `/dashboard`
   - **Family Member:** Passcode `SEVA99` ➔ `/family-access`
   - **ASHA Worker:** Passcode `ASHA26` ➔ `/asha-worker`
   - **Caregiver:** Passcode `CARE24` ➔ `/medications`
   - **Doctor / Paramedic:** Zero-login emergency pass ➔ `/qr/elderly-demo-01`

5. **💊 2.5 Lakh Indian Medicines Database with Instant Search**
   - Indexed from India's official pharmacopoeia dataset.
   - Real brand names (*Augmentin, Glycomet, Telma, Shelcal, Azithral, etc.*) with salt compositions, manufacturer, and pricing.
   - Sub-millisecond autocomplete search when adding prescriptions.

3. **🔲 Doctor & Paramedic Emergency QR Code (Medical Passport)**
   - Generates an offline-friendly, printable QR card for fridge or wallet.
   - Any doctor or ambulance responder can scan using standard smartphone camera.
   - Opens `/qr/:userId` with **zero login/app installation required** for the doctor.
   - Shows blood group, critical drug allergies (e.g. Penicillin), chronic conditions, active medications, and emergency phone numbers.

4. **🔐 Passcode-Based Shared Family Ecosystem**
   - **Elderly:** Simple 4-digit PIN access.
   - **Caretaker / Family:** 6-character access pass (e.g., `SEVA99`, `CARE24`) allowing remote monitoring, appointment scheduling, and adherence verification.

5. **📊 Medication Adherence & Schedule Tracking**
   - Timeline of daily doses with food timings (*before food / after food*).
   - 1-tap adherence logger updating real-time compliance percentage.
   - Proactive alert triggers for missed doses.

6. **🗺️ Live Location & 24/7 Hospital Locator (Leaflet + OpenStreetMap)**
   - 100% free and open-source mapping (no Google Maps API billing or key needed).
   - Real-time GPS tracking with 1-tap navigation and casualty/ambulance contact buttons.

7. **🚨 One-Tap SOS Emergency System**
   - High-contrast pulsing emergency button with 3-second accidental cancel protection.
   - Dispatches emergency alert with live GPS coordinates to all registered family members.
   - Immediate quick-dial buttons for **108 (Ambulance)** and **112 (National Emergency)**.

8. **🩺 Health Concern & Symptom Reporter**
   - Safe, non-prescriptive daily symptom logger with severity grading (*Mild / Moderate / Severe*).
   - Immediate alert dispatch to caretakers if severe chest pain or breathing distress is logged.

---

## 🚀 Getting Started

### 1. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Connect Your Supabase Database
Your Supabase credentials are already configured in `.env`.
To create the database tables in your Supabase dashboard:
1. Open your Supabase project: [https://supabase.com/dashboard/project/qhbeovpslnvgzzzrjjob](https://supabase.com/dashboard/project/qhbeovpslnvgzzzrjjob)
2. Go to **SQL Editor** on the left menu.
3. Open or copy the contents of `supabase-schema.sql` from this project folder.
4. Paste and click **Run**.

*(Note: The app has automatic offline and local storage resilience, so you can preview the full platform even before running the SQL script!)*

---

## ⚡ 1-Click Judge Demo Credentials

- **Elderly Patient Login:**
  - Phone: `9876543210`
  - Passcode: `1234`
- **Caretaker / Family Member Login:**
  - Access Code: `SEVA99` or `CARE24`
- **Or click "1-Click Judge Demo"** directly on the landing page!
