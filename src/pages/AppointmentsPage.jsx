import React, { useState } from 'react'
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  Stethoscope,
  Trash2,
  Calendar,
  X,
  Building2,
  Bell,
  CheckCircle2
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import { useData } from '../context/DataContext'

export default function AppointmentsPage() {
  const { appointments, addAppointment, deleteAppointment } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    doctor_name: '',
    specialty: 'Senior Physician & Geriatric Specialist',
    hospital_name: '',
    appointment_date: '',
    appointment_time: '11:00 AM',
    purpose: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.doctor_name || !formData.hospital_name || !formData.appointment_date) return

    await addAppointment(formData)
    setIsModalOpen(false)
    setFormData({
      doctor_name: '',
      specialty: 'Senior Physician & Geriatric Specialist',
      hospital_name: '',
      appointment_date: '',
      appointment_time: '11:00 AM',
      purpose: ''
    })
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto overflow-y-auto pb-24 md:pb-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              <span>Doctor Consultations & ASHA Worker Visits</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              Doctor Appointments (వైద్యుల సంప్రదింపులు)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Scheduled clinical visits and community ASHA worker home checkups.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Book / Log Visit</span>
          </button>
        </div>

        {/* Appointment Cards */}
        {appointments.length === 0 ? (
          <div className="elder-card text-center p-12">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 font-['Outfit']">No upcoming appointments</h3>
            <p className="text-xs text-slate-500 mt-1">Click the button above to add a doctor checkup or ASHA worker visit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="elder-card p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-800 leading-tight font-['Outfit']">
                          {appt.doctor_name}
                        </h3>
                        <p className="text-xs text-blue-600 font-bold">{appt.specialty}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteAppointment(appt.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Cancel Appointment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{appt.hospital_name}</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-700 font-mono">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span>{appt.appointment_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>{appt.appointment_time}</span>
                      </div>
                    </div>

                    {appt.purpose && (
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2">
                        <strong>Purpose:</strong> {appt.purpose}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Bell className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Auto Caretaker Reminder Active</span>
                  </span>
                  <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200 capitalize">
                    {appt.status || 'Confirmed'}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content max-w-md w-full p-6 relative">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Schedule Doctor Visit</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Doctor's / Specialist Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. K. Venkateshwar Rao / Savitri Devi (ASHA)"
                    value={formData.doctor_name}
                    onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiologist, Diabetologist, ASHA Worker"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hospital / Clinic / PHC Center *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary Health Centre (PHC), District Hospital"
                    value={formData.hospital_name}
                    onChange={(e) => setFormData({ ...formData, hospital_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.appointment_date}
                      onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 11:30 AM"
                      value={formData.appointment_time}
                      onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Purpose / Symptoms to discuss</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Routine BP checkup, blood sugar review"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  ></textarea>
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
                    Schedule Visit
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
