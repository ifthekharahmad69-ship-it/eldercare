import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Activity,
  Pill,
  Building2,
  BadgeCheck,
  X
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'

export default function AshaWorkerPage() {
  const { ashaData, logAshaVitals, requestAshaRefill, medications } = useData()
  const { profile } = useAuth()

  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false)
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false)

  const [vitalsForm, setVitalsForm] = useState({
    bp: '128/82 mmHg',
    sugar: '138 mg/dL',
    pulse: '74 bpm',
    spo2: '98%',
    weight: '62 kg',
    notes: 'Blood pressure and glucose normal. Advised to drink warm water and take Telma 40 after breakfast.'
  })

  const [selectedRefillMed, setSelectedRefillMed] = useState(medications[0]?.name || 'Telma 40')

  const handleVitalsSubmit = (e) => {
    e.preventDefault()
    logAshaVitals(vitalsForm)
    setIsVitalsModalOpen(false)
  }

  const handleRefillSubmit = (e) => {
    e.preventDefault()
    requestAshaRefill(selectedRefillMed)
    setIsRefillModalOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto overflow-y-auto pb-24 md:pb-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>National Health Mission (NHM) • Community Healthcare</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              ASHA Worker Portal (ఆశా కార్యకర్త పోర్టల్)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Accredited Social Health Activist connection for rural home visits, monthly vitals tracking & Jan Aushadhi refills.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsVitalsModalOpen(true)}
              className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Activity className="w-4 h-4 stroke-[2.5]" />
              <span>Record Home Vitals</span>
            </button>
            <button
              onClick={() => setIsRefillModalOpen(true)}
              className="bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <Pill className="w-4 h-4 text-emerald-600" />
              <span>Request PHC Refill</span>
            </button>
          </div>
        </div>

        {/* Top 2 Hero Cards: ASHA Officer Card + Next Visit Schedule Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          
          {/* Card 1: Assigned ASHA Worker Profile (7 cols) */}
          <div className="lg:col-span-7 elder-card p-6 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">
                      👩🏽‍⚕️
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-800 font-['Outfit']">
                      {ashaData.workerName}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                      Govt. Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Community Health Activist • ID: <strong className="text-slate-700 font-mono">{ashaData.workerId}</strong>
                  </p>
                  <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{ashaData.phcCenter}</span>
                  </p>
                </div>
              </div>

              {/* Direct Call / Contact Buttons */}
              <div className="flex sm:flex-col gap-2">
                <a
                  href={`tel:${ashaData.phone}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call ASHA</span>
                </a>
                <a
                  href={`https://wa.me/${ashaData.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* ABHA National Health Card Banner */}
            <div className="mt-4 pt-1 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-base">🇮🇳</span>
                <div>
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">
                    Ayushman Bharat Health Account (ABHA ID):
                  </span>
                  <span className="font-mono text-slate-800 font-bold tracking-wider">
                    14-8921-4092-1102
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                NDHM Linked ✓
              </span>
            </div>
          </div>

          {/* Card 2: Next Home Visit Details (5 cols) */}
          <div className="lg:col-span-5 progress-hero-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-100 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Next Scheduled Home Visit</span>
                </span>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  Confirmed
                </span>
              </div>

              <h4 className="text-2xl font-black text-white font-['Outfit'] mb-1">
                {ashaData.nextVisit.date}
              </h4>
              <p className="text-emerald-100 text-sm font-semibold flex items-center gap-1.5 mb-3">
                <Clock className="w-4 h-4" />
                <span>{ashaData.nextVisit.time} (Morning)</span>
              </p>

              <div className="bg-black/20 rounded-xl p-3 border border-white/10 text-xs text-white leading-relaxed">
                <span className="text-emerald-200 font-bold block mb-0.5">Visit Purpose:</span>
                {ashaData.nextVisit.purpose}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-emerald-100">
              <span>Patient: <strong>{profile?.name || 'Lakshmi Garu'}</strong></span>
              <span className="font-bold">Home Checkup ✓</span>
            </div>
          </div>

        </div>

        {/* Two-Column Workspace: Vitals Log History & Medicine Dispensary Refills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Vitals Checkup History (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-lg font-['Outfit'] flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-700" />
                <span>Clinical Vitals Recorded by ASHA Worker</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">Synced with Doctor QR Passport</span>
            </div>

            <div className="space-y-3.5">
              {ashaData.vitalsHistory.map((item) => (
                <div key={item.id} className="elder-card p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>{item.date}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{item.time}</span>
                    </div>

                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                      ✓ Status: {item.status}
                    </span>
                  </div>

                  {/* 4 Vitals Badges Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Blood Pressure</span>
                      <span className="text-sm font-black text-slate-800 font-mono">{item.bp}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Blood Sugar</span>
                      <span className="text-sm font-black text-slate-800 font-mono">{item.sugar}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Pulse Rate</span>
                      <span className="text-sm font-black text-slate-800 font-mono">{item.pulse}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">SpO2 Oxygen</span>
                      <span className="text-sm font-black text-emerald-700 font-mono">{item.spo2}</span>
                    </div>
                  </div>

                  {/* Clinical Field Notes */}
                  {item.notes && (
                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-emerald-900 block mb-0.5">ASHA Field Observation:</strong>
                      "{item.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Government Medicine Refill & Pill Box Inspection (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Pill Box Physical Inspection Card */}
            <div className="elder-card p-5">
              <h4 className="font-extrabold text-slate-800 text-sm font-['Outfit'] mb-2 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>Pill Box Home Inspection Checklist</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                During each home visit, Savitri Devi inspects grandmother's 7-day pill box to verify physical dose adherence.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Morning BP strip verified</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Diabetes tablets restocked</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Calcium & Vitamin D3 present</span>
                </div>
              </div>
            </div>

            {/* Government Jan Aushadhi Refill Requisition History */}
            <div className="elder-card p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <h4 className="font-extrabold text-slate-800 text-sm font-['Outfit']">
                  PHC Medicine Refills
                </h4>
                <button
                  onClick={() => setIsRefillModalOpen(true)}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  + New Refill
                </button>
              </div>

              <div className="space-y-3">
                {ashaData.refillRequests.map(r => (
                  <div key={r.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    <span className="font-bold text-slate-800 block">{r.medicine}</span>
                    <span className="text-[11px] text-slate-500">{r.source}</span>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                      <span className="font-mono text-[10px] text-slate-400">{r.date}</span>
                      <span className="font-bold text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal: Record Home Vitals */}
        {isVitalsModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content max-w-md w-full p-6 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Record Home Visit Vitals</h3>
                </div>
                <button
                  onClick={() => setIsVitalsModalOpen(false)}
                  aria-label="Close Record Home Visit Vitals Modal"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleVitalsSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Blood Pressure (BP)</label>
                    <input
                      type="text"
                      required
                      value={vitalsForm.bp}
                      onChange={(e) => setVitalsForm({ ...vitalsForm, bp: e.target.value })}
                      placeholder="e.g. 120/80 mmHg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Blood Sugar (RBS)</label>
                    <input
                      type="text"
                      required
                      value={vitalsForm.sugar}
                      onChange={(e) => setVitalsForm({ ...vitalsForm, sugar: e.target.value })}
                      placeholder="e.g. 135 mg/dL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Pulse Rate</label>
                    <input
                      type="text"
                      value={vitalsForm.pulse}
                      onChange={(e) => setVitalsForm({ ...vitalsForm, pulse: e.target.value })}
                      placeholder="e.g. 72 bpm"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Oxygen SpO2</label>
                    <input
                      type="text"
                      value={vitalsForm.spo2}
                      onChange={(e) => setVitalsForm({ ...vitalsForm, spo2: e.target.value })}
                      placeholder="e.g. 98%"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Body Weight</label>
                    <input
                      type="text"
                      value={vitalsForm.weight}
                      onChange={(e) => setVitalsForm({ ...vitalsForm, weight: e.target.value })}
                      placeholder="e.g. 62 kg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">ASHA Clinical Observation Notes</label>
                  <textarea
                    rows={2}
                    value={vitalsForm.notes}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, notes: e.target.value })}
                    placeholder="Observations regarding grandmother's condition, diet, or mobility"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsVitalsModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 font-bold rounded-xl text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                  >
                    Save & Sync Vitals
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: PHC Refill Request */}
        {isRefillModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content max-w-md w-full p-6 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Request Government PHC Refill</h3>
                </div>
                <button
                  onClick={() => setIsRefillModalOpen(false)}
                  aria-label="Close Government PHC Refill Modal"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRefillSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Prescribed Medicine</label>
                  <select
                    value={selectedRefillMed}
                    onChange={(e) => setSelectedRefillMed(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  >
                    {medications.map(m => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.dosage})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800">
                  <p>This request is sent directly to the local Primary Health Centre (PHC) Jan Aushadhi dispensary. The ASHA worker will collect the free monthly quota and deliver it during her home visit.</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRefillModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 font-bold rounded-xl text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                  >
                    Submit Requisition
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <AvatarAssistant />
    </div>
  )
}
