import React, { useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import { DataContext } from './data-context'

// Initial realistic default medications matching the ElderCare AI schedule
const initialMedications = [
  {
    id: 'med-01',
    name: 'BP Medicine (Telma 40)',
    dosage: '1 Tablet',
    frequency: 'once_daily',
    timing: ['8:00 AM'],
    food_relation: 'after_food',
    instructions: 'Blood pressure medication. Take with warm water after breakfast.',
    mfr: 'Glenmark Pharmaceuticals Ltd',
    composition: 'Telmisartan (40mg)',
    price: '115.50',
    status: 'active',
    taken_today: { '8:00 AM': true }
  },
  {
    id: 'med-02',
    name: 'Diabetes Medicine (Glycomet-GP 1)',
    dosage: '1 Tablet',
    frequency: 'once_daily',
    timing: ['1:00 PM'],
    food_relation: 'before_food',
    instructions: 'Take 15 minutes before lunch for blood sugar regulation.',
    mfr: 'USV Ltd',
    composition: 'Metformin (500mg) , Glimepiride (1mg)',
    price: '145.20',
    status: 'active',
    taken_today: { '1:00 PM': false }
  },
  {
    id: 'med-03',
    name: 'Heart & Calcium (Shelcal 500)',
    dosage: '1 Tablet',
    frequency: 'once_daily',
    timing: ['8:00 PM'],
    food_relation: 'after_food',
    instructions: 'Calcium and Vitamin D3 supplement for bone and heart strength.',
    mfr: 'Torrent Pharmaceuticals Ltd',
    composition: 'Calcium (500mg) , Vitamin D3 (250IU)',
    price: '119.80',
    status: 'active',
    taken_today: { '8:00 PM': false }
  }
]

const initialAppointments = [
  {
    id: 'appt-01',
    doctor_name: 'Dr. Anand K. Verma',
    specialty: 'Cardiologist & Senior Physician',
    hospital_name: 'District Community Health Centre (CHC)',
    appointment_date: '2026-11-18',
    appointment_time: '11:30 AM',
    purpose: 'Routine 3-month Blood Pressure & ECG follow-up',
    status: 'upcoming'
  },
  {
    id: 'appt-02',
    doctor_name: 'Dr. Meenakshi Sunder',
    specialty: 'Diabetologist & Endocrinologist',
    hospital_name: 'Primary Health Centre (PHC)',
    appointment_date: '2026-11-25',
    appointment_time: '04:00 PM',
    purpose: 'HbA1c test review & insulin regulation check',
    status: 'upcoming'
  }
]

const initialSymptoms = [
  {
    id: 'sym-01',
    symptom_name: 'Morning Dizziness & Lightheadedness (తలతిరుగుడు)',
    severity: 'mild',
    logged_at: '2026-11-15 08:45 AM',
    notes: 'Felt slight spinning while getting out of bed. Drank warm water and rested.'
  },
  {
    id: 'sym-02',
    symptom_name: 'Knee Joint Stiffness (మోకాళ్ళ నొప్పులు)',
    severity: 'mild',
    logged_at: '2026-11-14 06:30 PM',
    notes: 'Mild ache in right knee after walking in garden.'
  }
]

const initialFamilyMembers = [
  {
    id: 'fam-01',
    member_name: 'Savitri Devi',
    member_email: 'savitri.asha@aphealth.gov.in',
    member_phone: '+91 98765 11223',
    role: 'caretaker',
    title: 'ASHA Worker (Accredited Social Health Activist)',
    access_code: 'ASHA26',
    permissions: ['view', 'manage_meds', 'manage_appts', 'record_vitals', 'request_refills']
  },
  {
    id: 'fam-02',
    member_name: 'Ramesh Kumar',
    member_email: 'ramesh.care@example.com',
    member_phone: '+91 98765 22334',
    role: 'caretaker',
    title: 'Village Caregiver',
    access_code: 'CARE24',
    permissions: ['view', 'manage_meds']
  },
  {
    id: 'fam-03',
    member_name: 'Priya Sharma',
    member_email: 'priya.sharma@example.com',
    member_phone: '+91 98765 00112',
    role: 'family',
    title: 'Daughter (Remote Caregiver)',
    access_code: 'SEVA99',
    permissions: ['view', 'emergency_alert']
  }
]

// ASHA Worker Home Visits & Clinical Vitals History
const initialAshaData = {
  workerName: 'Savitri Devi',
  workerId: 'ASHA-AP-GUN-402',
  phcCenter: 'Primary Health Centre (PHC) Mangalagiri, Guntur',
  phone: '+91 98765 11223',
  nextVisit: {
    date: 'Tomorrow, Nov 16',
    time: '10:00 AM',
    purpose: 'Monthly Blood Pressure & Sugar Monitoring + Pill Box Inspection',
    status: 'scheduled'
  },
  vitalsHistory: [
    {
      id: 'vit-1',
      date: '2026-11-08',
      time: '10:30 AM',
      bp: '128/82 mmHg',
      sugar: '138 mg/dL (Random)',
      pulse: '74 bpm',
      spo2: '98%',
      weight: '62 kg',
      notes: 'Blood pressure well-controlled with Telma 40. Advised grandmother to continue morning walk.',
      status: 'Normal'
    },
    {
      id: 'vit-2',
      date: '2026-10-24',
      time: '11:00 AM',
      bp: '136/88 mmHg',
      sugar: '155 mg/dL (Post-lunch)',
      pulse: '78 bpm',
      spo2: '97%',
      weight: '62.5 kg',
      notes: 'Sugar was slightly elevated due to festival sweets. Reminded regarding Glycomet timing.',
      status: 'Attention'
    }
  ],
  refillRequests: [
    {
      id: 'ref-1',
      medicine: 'Telma 40 & Glycomet 1 PR',
      source: 'Government Jan Aushadhi Kendra (PHC)',
      status: 'Approved & Dispensed',
      date: '2026-11-08'
    }
  ]
}

function createMedication(elderlyId, medData) {
  return {
    id: 'med-' + Date.now(),
    elderly_id: elderlyId,
    name: medData.name,
    dosage: medData.dosage || '1 Tablet',
    frequency: medData.frequency || 'once_daily',
    timing: medData.timing || ['09:00'],
    food_relation: medData.food_relation || 'after_food',
    instructions: medData.instructions || '',
    mfr: medData.mfr || 'Pharmaceutical Co.',
    composition: medData.composition || '',
    price: medData.price || 'Free (Jan Aushadhi)',
    prescribed_by: medData.prescribed_by || 'PHC Medical Officer',
    taken_today: {}
  }
}

function createAshaLog(vitals) {
  const d = new Date()
  return {
    id: 'vit-' + Date.now(),
    date: d.toISOString().split('T')[0],
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    bp: vitals.bp || '120/80 mmHg',
    sugar: vitals.sugar || '130 mg/dL',
    pulse: vitals.pulse || '72 bpm',
    spo2: vitals.spo2 || '98%',
    weight: vitals.weight || '62 kg',
    notes: vitals.notes || 'Routine ASHA home visit checkup completed.',
    status: 'Normal'
  }
}

function createRefill(medicineName) {
  return {
    id: 'ref-' + Date.now(),
    medicine: medicineName,
    source: 'Government Jan Aushadhi Kendra (PHC)',
    status: 'Requested by ASHA Worker',
    date: new Date().toISOString().split('T')[0]
  }
}

export function DataProvider({ children }) {
  const { profile } = useAuth()
  const elderlyId = profile?.id || 'elderly-demo-01'

  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('eldercare_medications')
    return saved ? JSON.parse(saved) : initialMedications
  })

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('eldercare_appointments')
    return saved ? JSON.parse(saved) : initialAppointments
  })

  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem('eldercare_symptoms')
    return saved ? JSON.parse(saved) : initialSymptoms
  })

  const [familyMembers, setFamilyMembers] = useState(() => {
    const saved = localStorage.getItem('eldercare_family')
    return saved ? JSON.parse(saved) : initialFamilyMembers
  })

  const [ashaData, setAshaData] = useState(() => {
    const saved = localStorage.getItem('eldercare_asha')
    return saved ? JSON.parse(saved) : initialAshaData
  })

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'ASHA Worker Visit Tomorrow',
      message: 'Savitri Devi is visiting at 10:00 AM for BP & Sugar checkup and medicine refill check.',
      time: '1 hour ago',
      type: 'asha'
    },
    {
      id: 'notif-2',
      title: 'Afternoon Dose Scheduled',
      message: 'Diabetes Medicine (Glycomet) due at 1:00 PM before lunch.',
      time: '30 mins ago',
      type: 'medication'
    }
  ])

  useEffect(() => {
    localStorage.setItem('eldercare_medications', JSON.stringify(medications))
  }, [medications])

  useEffect(() => {
    localStorage.setItem('eldercare_appointments', JSON.stringify(appointments))
  }, [appointments])

  useEffect(() => {
    localStorage.setItem('eldercare_symptoms', JSON.stringify(symptoms))
  }, [symptoms])

  useEffect(() => {
    localStorage.setItem('eldercare_family', JSON.stringify(familyMembers))
  }, [familyMembers])

  useEffect(() => {
    localStorage.setItem('eldercare_asha', JSON.stringify(ashaData))
  }, [ashaData])

  // Toggle dose taken
  const toggleDoseTaken = (medId, timeSlot) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medId) {
        const currentTaken = med.taken_today || {}
        const updated = {
          ...med,
          taken_today: {
            ...currentTaken,
            [timeSlot]: !currentTaken[timeSlot]
          }
        }
        return updated
      }
      return med
    }))
  }

  // Add Medication
  const addMedication = async (medData) => {
    const newMed = createMedication(elderlyId, medData)

    setMedications(prev => [newMed, ...prev])
    addNotification({
      title: 'New Medication Added',
      message: `${newMed.name} added to schedule`,
      type: 'medication'
    })
    return newMed
  }

  const deleteMedication = (medId) => {
    setMedications(prev => prev.filter(m => m.id !== medId))
  }

  // Add Appointment
  const addAppointment = async (apptData) => {
    const newAppt = {
      id: 'appt-' + Date.now(),
      elderly_id: elderlyId,
      doctor_name: apptData.doctor_name,
      specialty: apptData.specialty || 'General Physician',
      hospital_name: apptData.hospital_name,
      appointment_date: apptData.appointment_date,
      appointment_time: apptData.appointment_time,
      purpose: apptData.purpose || 'Follow-up checkup',
      status: 'upcoming'
    }

    setAppointments(prev => [newAppt, ...prev])
    return newAppt
  }

  const deleteAppointment = (apptId) => {
    setAppointments(prev => prev.filter(a => a.id !== apptId))
  }

  // Add Symptom
  const addSymptom = async (symData) => {
    const newSym = {
      id: 'sym-' + Date.now(),
      elderly_id: elderlyId,
      symptom_name: symData.symptom_name,
      severity: symData.severity || 'mild',
      logged_at: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      notes: symData.notes || '',
      reported_by: symData.reported_by || 'elderly'
    }

    setSymptoms(prev => [newSym, ...prev])
    return newSym
  }

  // Add Family Member
  const addFamilyMember = async (famData) => {
    const code = 'SEVA' + Math.floor(1000 + Math.random() * 9000)
    const newFam = {
      id: 'fam-' + Date.now(),
      elderly_id: elderlyId,
      member_name: famData.member_name,
      member_email: famData.member_email,
      member_phone: famData.member_phone,
      role: famData.role || 'family',
      access_code: code,
      permissions: famData.permissions || ['view', 'manage_meds']
    }

    setFamilyMembers(prev => [...prev, newFam])
    return newFam
  }

  const deleteFamilyMember = (famId) => {
    setFamilyMembers(prev => prev.filter(f => f.id !== famId))
  }

  // ASHA Specific Functions: Log Vitals during home visit
  const logAshaVitals = (vitals) => {
    const newLog = createAshaLog(vitals)

    setAshaData(prev => ({
      ...prev,
      vitalsHistory: [newLog, ...prev.vitalsHistory]
    }))

    addNotification({
      title: 'ASHA Vitals Recorded',
      message: `BP: ${newLog.bp}, Sugar: ${newLog.sugar} recorded by Savitri Devi.`,
      type: 'asha'
    })

    return newLog
  }

  // ASHA Refill Request
  const requestAshaRefill = (medicineName) => {
    const newRefill = createRefill(medicineName)

    setAshaData(prev => ({
      ...prev,
      refillRequests: [newRefill, ...prev.refillRequests]
    }))

    addNotification({
      title: 'PHC Medicine Refill Requested',
      message: `ASHA worker initiated free refill request for ${medicineName}.`,
      type: 'asha'
    })

    return newRefill
  }

  // Schedule Next ASHA Visit
  const scheduleAshaVisit = (date, time, purpose) => {
    setAshaData(prev => ({
      ...prev,
      nextVisit: {
        date,
        time,
        purpose,
        status: 'scheduled'
      }
    }))
  }

  const addNotification = (notif) => {
    const newN = {
      id: 'notif-' + Date.now(),
      ...notif,
      time: 'Just now'
    }
    setNotifications(prev => [newN, ...prev])
  }

  // Adherence
  const totalDosesToday = medications.reduce((acc, med) => acc + (med.timing?.length || 1), 0)
  const takenDosesToday = medications.reduce((acc, med) => {
    const taken = med.taken_today || {}
    const count = Object.values(taken).filter(Boolean).length
    return acc + count
  }, 0)
  const adherenceRate = totalDosesToday > 0 ? Math.round((takenDosesToday / totalDosesToday) * 100) : 100

  return (
    <DataContext.Provider
      value={{
        medications,
        appointments,
        symptoms,
        familyMembers,
        ashaData,
        notifications,
        adherenceRate,
        totalDosesToday,
        takenDosesToday,
        toggleDoseTaken,
        addMedication,
        deleteMedication,
        addAppointment,
        deleteAppointment,
        addSymptom,
        addFamilyMember,
        deleteFamilyMember,
        logAshaVitals,
        requestAshaRefill,
        scheduleAshaVisit,
        addNotification
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
