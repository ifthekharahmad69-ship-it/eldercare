import React, { useState } from 'react'
import {
  Users,
  Plus,
  KeyRound,
  Trash2,
  Mail,
  Phone,
  Copy,
  Check,
  X,
  Pill,
  Calendar,
  MessageCircle,
  Eye,
  CheckCircle2,
  Activity
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import { useData } from '../context/data-context'
import { useAuth } from '../context/auth-context'
import { Link } from 'react-router-dom'

export default function FamilyAccessPage() {
  const {
    familyMembers,
    addFamilyMember,
    deleteFamilyMember,
    medications,
    appointments,
    ashaData,
    toggleDoseTaken,
    adherenceRate
  } = useData()
  const { profile } = useAuth()

  const [activeTab, setActiveTab] = useState('remote_view') // 'remote_view' or 'manage_access'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState(null)
  const [nudgeSentToast, setNudgeSentToast] = useState(null)

  const [formData, setFormData] = useState({
    member_name: '',
    member_email: '',
    member_phone: '',
    role: 'caretaker',
    permissions: ['view', 'manage_meds', 'manage_appts']
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.member_name) return

    await addFamilyMember(formData)
    setIsModalOpen(false)
    setFormData({
      member_name: '',
      member_email: '',
      member_phone: '',
      role: 'caretaker',
      permissions: ['view', 'manage_meds', 'manage_appts']
    })
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleNudgeMother = (type) => {
    if (type === 'call') {
      window.location.href = 'tel:9876543210'
    } else if (type === 'whatsapp') {
      setNudgeSentToast('WhatsApp reminder sent: "Amma, did you take your afternoon medicine?"')
      setTimeout(() => setNudgeSentToast(null), 4000)
    }
  }

  const med2 = medications.find(m => m.name.toLowerCase().includes('diabetes') || m.id === 'med-02') || medications[1]
  const isMed2Taken = med2 ? Boolean(med2.taken_today?.[med2.timing?.[0] || '1:00 PM']) : false

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto overflow-y-auto pb-24 md:pb-8 relative z-10">
        
        {/* Toast */}
        {nudgeSentToast && (
          <div className="fixed top-5 right-5 z-50 bg-[#064e3b] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold">{nudgeSentToast}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Multi-User Ecosystem • Remote Caregiver Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              Family & Caregiver Ecosystem (రక్షణ బృందం)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Empowering children living in other cities, local caregivers, and ASHA health workers to monitor Lakshmi Garu's health routines with complete peace of mind.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Invite New Member</span>
            </button>
          </div>
        </div>

        {/* Top Perspective Switcher Tabs */}
        <div className="flex bg-slate-200/80 p-1.5 rounded-2xl mb-6 max-w-xl">
          <button
            onClick={() => setActiveTab('remote_view')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'remote_view'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>👩‍⚕️ Daughter's Remote Portal (Priya View)</span>
          </button>

          <button
            onClick={() => setActiveTab('manage_access')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'manage_access'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>🔑 Passcodes & Delegation ({familyMembers.length})</span>
          </button>
        </div>

        {/* TAB 1: REMOTE FAMILY PORTAL */}
        {activeTab === 'remote_view' && (
          <div className="space-y-6">
            
            {/* Active Family Persona Banner */}
            <div className="elder-card p-5 border-l-4 border-l-emerald-600 bg-gradient-to-r from-emerald-50/80 to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-3xl shadow-sm border border-indigo-200">
                  👩🏽
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Logged in as Remote Family Member
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• Code: SEVA99</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-800 font-['Outfit']">
                    Priya Sharma (Daughter • Living in Bangalore)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Remotely overseeing mother: <strong>Lakshmi Garu (72 Yrs, Guntur)</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNudgeMother('call')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Mother</span>
                </button>
                <button
                  onClick={() => handleNudgeMother('whatsapp')}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Nudge</span>
                </button>
              </div>
            </div>

            {/* 3 Quick Status Widgets for Daughter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Widget 1: Today's Adherence */}
              <div className="elder-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Mother's Daily Adherence</span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {adherenceRate}% Today
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2.5 rounded-full transition-all" style={{ width: `${adherenceRate}%` }}></div>
                </div>
                <p className="text-xs text-slate-600">
                  {isMed2Taken ? '✓ All scheduled morning and afternoon doses taken.' : '⚠️ Afternoon dose still awaiting confirmation.'}
                </p>
              </div>

              {/* Widget 2: ASHA Worker Visit Info */}
              <div className="elder-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">ASHA Worker Home Care</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Savitri Devi
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Next Home Checkup: <strong>Tomorrow, 10:00 AM</strong></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>Last BP: <strong>{ashaData?.vitalsHistory?.[0]?.bp || '128/82 mmHg'}</strong></span>
                </div>
              </div>

              {/* Widget 3: Proactive Email Alerts */}
              <div className="elder-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Proactive Email Alerts</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  <span className="block font-bold text-slate-800">priya.sharma@example.com</span>
                  <span>Escalation enabled if medicine delayed &gt; 30 mins.</span>
                </div>
                <Link
                  to="/alerts"
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <span>View Dispatched Email Outbox →</span>
                </Link>
              </div>

            </div>

            {/* Mother's Live Medication Schedule with Family Override */}
            <div className="elder-card p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-800 text-base font-['Outfit']">
                    Live Prescription Schedule & Remote Actions
                  </h3>
                </div>
                <Link to="/medications" className="text-xs font-bold text-emerald-700 hover:underline">
                  Manage Prescriptions →
                </Link>
              </div>

              <div className="space-y-3">
                {medications.map((m) => {
                  const isTaken = Object.values(m.taken_today || {}).some(Boolean)
                  const slot = m.timing?.[0] || '8:00 AM'

                  return (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-2xl border border-slate-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                          isTaken ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isTaken ? '✓' : '⏰'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-700">{slot}</span>
                            <span className="text-[10px] text-slate-400 capitalize">• {m.food_relation?.replace('_', ' ')}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800">{m.name}</h4>
                          <p className="text-xs text-slate-500">{m.dosage} • {m.composition || m.instructions}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        {isTaken ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            <span>Confirmed Taken</span>
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleNudgeMother('whatsapp')}
                              className="border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl"
                            >
                              Send Reminder
                            </button>
                            <button
                              onClick={() => toggleDoseTaken(m.id, slot)}
                              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all"
                            >
                              Mark Taken for Mother
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Hospital Visits */}
            <div className="elder-card p-5 sm:p-6">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-slate-800 text-base font-['Outfit']">
                    Doctor Consultations Arranged by Family
                  </h3>
                </div>
                <Link to="/appointments" className="text-xs font-bold text-blue-700 hover:underline">
                  Add Appointment →
                </Link>
              </div>

              <div className="space-y-3">
                {appointments.map((a) => (
                  <div key={a.id} className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-extrabold text-blue-800">
                        {a.appointment_date} at {a.appointment_time}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">{a.doctor_name} ({a.specialty})</h4>
                      <p className="text-xs text-slate-600">{a.hospital_name} • Purpose: {a.purpose}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1 rounded-full self-start sm:self-center">
                      Confirmed Upcoming
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PASSCODES & DELEGATION */}
        {activeTab === 'manage_access' && (
          <div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <KeyRound className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950 text-xs sm:text-sm">
                  Passcode-Based Multi-Member Security
                </h4>
                <p className="text-xs text-emerald-900/80 mt-0.5">
                  Authorized members sign in on the login screen using their unique 6-character access pass. Each role holds customizable permissions to protect Lakshmi Garu's medical autonomy.
                </p>
              </div>
            </div>

            {/* Caregiver & Family Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyMembers.map((fam) => (
                <div
                  key={fam.id}
                  className="elder-card p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow-sm">
                          {fam.role === 'caretaker' ? '👩🏽‍⚕️' : '👨🏽'}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-800 font-['Outfit']">{fam.member_name}</h3>
                          <span className="capitalize text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {fam.title || fam.role}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteFamilyMember(fam.id)}
                        aria-label="Revoke Care Team Member Access"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                        title="Revoke Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Contact info */}
                    <div className="mt-4 space-y-1 text-xs text-slate-600">
                      {fam.member_email && (
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{fam.member_email}</span>
                        </div>
                      )}
                      {fam.member_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{fam.member_phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Permissions */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(fam.permissions || ['view', 'manage_meds']).map((p, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-[9px] font-semibold px-2 py-0.5 rounded-md">
                          ✓ {p.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Access Code Box */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                        Access Passcode:
                      </span>
                      <span className="font-mono text-base font-black text-emerald-700 tracking-wider">
                        {fam.access_code}
                      </span>
                    </div>
                    <button
                      onClick={() => copyCode(fam.access_code)}
                      className="border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs py-1 px-2.5 flex items-center gap-1 rounded-xl font-bold transition-all"
                    >
                      {copiedCode === fam.access_code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Invite Care Team Member */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Add Care Team Member</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close Add Care Team Member Modal"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar / Priya Sharma"
                    value={formData.member_name}
                    onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. priya@example.com"
                      value={formData.member_email}
                      onChange={(e) => setFormData({ ...formData, member_email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 00112"
                      value={formData.member_phone}
                      onChange={(e) => setFormData({ ...formData, member_phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role in Care Team</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="family">Family Member (Son, Daughter, Relative)</option>
                    <option value="caretaker">Primary Caregiver / Attendant</option>
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800">
                  <p>A secure 6-character pass will be generated automatically (e.g. <code>SEVA99</code>). They can enter this pass in the login screen to access and monitor {profile?.name || 'Lakshmi Garu'}'s daily medication status.</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 font-bold rounded-xl text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
                  >
                    Generate Passcode
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
