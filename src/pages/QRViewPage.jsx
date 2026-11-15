import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Phone,
  AlertTriangle,
  Pill,
  Printer,
  Activity
} from 'lucide-react'
import { useAuth } from '../context/auth-context'
import { useData } from '../context/data-context'

export default function QRViewPage() {
  const { profile } = useAuth()
  const { medications, ashaData } = useData()

  const latestVitals = ashaData?.vitalsHistory?.[0]

  const patient = profile || {
    name: 'Lakshmi Garu',
    age: 72,
    gender: 'Female',
    blood_group: 'B+',
    address: 'Guntur, Andhra Pradesh, India',
    medical_conditions: ['Type 2 Diabetes', 'Hypertension (BP)', 'Mild Arthritis'],
    allergies: ['Penicillin', 'Sulfa Drugs'],
    emergency_contact_name: 'Priya Sharma (Daughter)',
    emergency_contact_phone: '+91 98765 00112'
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#0f172a] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Banner */}
        <div className="bg-white border border-emerald-200 rounded-3xl p-5 mb-6 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              ⚕️
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-700">
                Official Clinical Emergency Portal
              </span>
              <h1 className="text-xl font-extrabold text-slate-800 font-['Outfit']">
                ElderCare AI Medical Passport
              </h1>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            title="Print Emergency Sheet"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Sheet</span>
          </button>
        </div>

        {/* Patient Identity Card */}
        <div className="elder-card p-6 sm:p-8 mb-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Patient Name:</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-['Outfit']">{patient.name}</h2>
              <p className="text-xs text-slate-600 mt-1">
                Age: <strong>{patient.age} Yrs</strong> • Gender: <strong>{patient.gender}</strong> • Village: <strong>{patient.address}</strong>
              </p>
            </div>
            
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl px-5 py-3 text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-rose-700 block">Blood Group</span>
              <span className="text-3xl font-black text-rose-600 font-['Outfit']">{patient.blood_group}</span>
            </div>
          </div>

          {/* CRITICAL: Allergies */}
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs uppercase mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Critical Drug Allergies (Contraindications)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(patient.allergies || ['Penicillin', 'Sulfa Drugs']).map((a, i) => (
                <span key={i} className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-xl shadow-sm">
                  ⚠️ {a}
                </span>
              ))}
            </div>
          </div>

          {/* ASHA Verified Clinical Vitals */}
          {latestVitals && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Latest Vitals (Recorded by ASHA: {ashaData.workerName})
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  {latestVitals.date}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Blood Pressure</span>
                  <span className="text-sm font-extrabold text-slate-800 font-mono">{latestVitals.bp}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Blood Sugar</span>
                  <span className="text-sm font-extrabold text-slate-800 font-mono">{latestVitals.sugar}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Pulse</span>
                  <span className="text-sm font-extrabold text-slate-800 font-mono">{latestVitals.pulse}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-sm">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">SpO2</span>
                  <span className="text-sm font-extrabold text-slate-800 font-mono">{latestVitals.spo2}</span>
                </div>
              </div>
              {latestVitals.notes && (
                <p className="text-[11px] text-emerald-800 mt-2 italic bg-white/60 p-2 rounded-lg border border-emerald-100">
                  ASHA Clinical Observation: "{latestVitals.notes}"
                </p>
              )}
            </div>
          )}

          {/* Chronic Conditions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span>Diagnosed Chronic Conditions</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(patient.medical_conditions || ['Type 2 Diabetes', 'Hypertension']).map((c, i) => (
                <span key={i} className="bg-emerald-50 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-xl border border-emerald-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Active Medications List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-emerald-600" />
              <span>Current Daily Medications ({medications.length})</span>
            </h3>
            <div className="space-y-2">
              {medications.map(m => (
                <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex justify-between items-center">
                  <div>
                    <strong className="text-slate-800 text-sm font-['Outfit']">{m.name}</strong>
                    <p className="text-slate-500 text-[11px]">{m.composition || m.instructions}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-700 font-bold">{m.dosage}</span>
                    <span className="block text-[10px] text-slate-500 capitalize">{m.food_relation?.replace('_', ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Family Contact */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider">Emergency Family Contact</span>
              <p className="font-bold text-slate-800 text-sm">{patient.emergency_contact_name}</p>
            </div>
            <a
              href={`tel:${patient.emergency_contact_phone}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call ({patient.emergency_contact_phone})</span>
            </a>
          </div>

        </div>

        <div className="text-center text-xs text-slate-500 py-4">
          <p>Verified through ElderCare AI Decentralized Healthcare System</p>
          <Link to="/" className="text-emerald-700 font-bold hover:underline mt-1 inline-block">
            Learn more about ElderCare AI
          </Link>
        </div>

      </div>
    </div>
  )
}
