import React, { useState } from 'react'
import {
  Heart,
  AlertTriangle,
  Phone,
  Edit2,
  FileText
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import QRGenerator from '../components/qr/QRGenerator'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth()
  const { medications } = useData()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile?.name || 'Lakshmi Garu',
    age: profile?.age || 72,
    blood_group: profile?.blood_group || 'B+',
    address: profile?.address || 'H.No. 12, Potti Sreeramulu Street, Guntur, Andhra Pradesh',
    emergency_contact_name: profile?.emergency_contact_name || 'Priya Sharma (Daughter)',
    emergency_contact_phone: profile?.emergency_contact_phone || '+91 98765 00112',
    medical_conditions: (profile?.medical_conditions || ['Type 2 Diabetes', 'Hypertension (BP)', 'Mild Arthritis']).join(', '),
    allergies: (profile?.allergies || ['Penicillin', 'Sulfa Drugs']).join(', ')
  })

  const handleSave = async (e) => {
    e.preventDefault()
    const conditions = formData.medical_conditions.split(',').map(s => s.trim()).filter(Boolean)
    const allergies = formData.allergies.split(',').map(s => s.trim()).filter(Boolean)

    await updateProfile({
      ...formData,
      medical_conditions: conditions,
      allergies: allergies
    })
    setIsEditing(false)
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto overflow-y-auto pb-24 md:pb-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Personal Health Records & QR Passport</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              Medical Profile (ఆరోగ్య రికార్డులు)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Digital health passport accessible to your family and scanning emergency doctors.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white border border-slate-300 hover:border-emerald-500 font-bold text-xs text-slate-700 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Edit2 className="w-4 h-4 text-emerald-600" />
              <span>Edit Profile Details</span>
            </button>
          )}
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Records */}
          <div className="lg:col-span-8 space-y-6">
            
            {isEditing ? (
              <form onSubmit={handleSave} className="elder-card p-6 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-800 font-['Outfit'] mb-2">Edit Medical Profile Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Blood Group</label>
                    <input
                      type="text"
                      value={formData.blood_group}
                      onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none font-bold text-red-600"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Address / Village</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Medical Conditions (comma separated)</label>
                  <input
                    type="text"
                    value={formData.medical_conditions}
                    onChange={(e) => setFormData({ ...formData, medical_conditions: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-600 block mb-1">Known Drug Allergies (comma separated)</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Emergency Contact Name</label>
                    <input
                      type="text"
                      value={formData.emergency_contact_name}
                      onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Emergency Contact Phone</label>
                    <input
                      type="text"
                      value={formData.emergency_contact_phone}
                      onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2.5 border border-slate-300 font-bold rounded-xl text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="elder-card p-6 sm:p-7 space-y-6">
                
                {/* Patient Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-sm">
                    👵
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 font-['Outfit']">
                      {profile?.name || 'Lakshmi Garu'}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-md text-slate-700 font-semibold">
                        Age: <strong>{profile?.age || 72} Yrs</strong>
                      </span>
                      <span className="text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-md font-bold">
                        Blood: {profile?.blood_group || 'B+'}
                      </span>
                      <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md font-semibold">
                        Phone: {profile?.phone || '9876543210'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Medical Conditions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    <span>Diagnosed Medical Conditions</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(profile?.medical_conditions || ['Type 2 Diabetes', 'Hypertension (BP)', 'Mild Arthritis']).map((c, i) => (
                      <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Allergies Warning */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Known Drug & Food Allergies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(profile?.allergies || ['Penicillin', 'Sulfa Drugs']).map((a, i) => (
                      <span key={i} className="bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl">
                        ⚠️ {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Active Prescriptions */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Active Medications ({medications.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {medications.map(m => (
                      <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                        <p className="font-bold text-slate-800">{m.name}</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">{m.dosage} • {m.timing?.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="pt-4 border-t border-slate-100 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-500 mb-1">Primary Emergency Contact</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">{profile?.emergency_contact_name || 'Priya Sharma (Daughter)'}</span>
                    <a
                      href={`tel:${profile?.emergency_contact_phone || '+919876500112'}`}
                      className="font-mono text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{profile?.emergency_contact_phone || '+91 98765 00112'}</span>
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: QR Generator */}
          <div className="lg:col-span-4 space-y-4">
            <QRGenerator
              userId={profile?.id}
              patientName={profile?.name || 'Lakshmi Garu'}
              bloodGroup={profile?.blood_group || 'B+'}
              emergencyPhone={profile?.emergency_contact_phone || '+91 98765 00112'}
            />

            <div className="elder-card p-4 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 block mb-1">💡 Rural Healthcare Integration:</strong>
              This printable card can be stuck on the refrigerator or kept in the grandmother's pouch. Local village doctors or 108 ambulance staff can scan it with any camera to see her complete medical history without needing any app or login.
            </div>
          </div>

        </div>

      </main>

      <AvatarAssistant />
    </div>
  )
}
