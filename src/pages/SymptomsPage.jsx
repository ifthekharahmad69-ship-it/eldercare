import React, { useState } from 'react'
import {
  Stethoscope,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  X,
  ShieldAlert,
  Send,
  HeartCrack,
  Bell
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import { useData } from '../context/DataContext'

const COMMON_SYMPTOMS = [
  { name: 'Dizziness / Chakkar (తలతిరుగుడు)', defaultSeverity: 'mild' },
  { name: 'Knee & Joint Ache (మోకాళ్ళ నొప్పులు)', defaultSeverity: 'mild' },
  { name: 'Mild Fever / Chills (తేలికపాటి జ్వరం)', defaultSeverity: 'mild' },
  { name: 'Stomach Acidity / Gas (గ్యాస్ / ఎసిడిటీ)', defaultSeverity: 'mild' },
  { name: 'Chest Heaviness (ఛాతీలో అసౌకర్యం)', defaultSeverity: 'severe' },
  { name: 'Extreme Fatigue (తీవ్రమైన అలసట)', defaultSeverity: 'moderate' },
  { name: 'Difficulty Breathing (శ్వాస ఆడకపోవడం)', defaultSeverity: 'severe' },
  { name: 'Headache (తలనొప్పి)', defaultSeverity: 'mild' }
]

export default function SymptomsPage() {
  const { symptoms, addSymptom } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    symptom_name: '',
    severity: 'mild',
    notes: ''
  })
  const [showAlertModal, setShowAlertModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.symptom_name) return

    await addSymptom(formData)
    setIsModalOpen(false)

    if (formData.severity === 'severe') {
      setShowAlertModal(true)
    }

    setFormData({
      symptom_name: '',
      severity: 'mild',
      notes: ''
    })
  }

  const handleQuickPick = (sym) => {
    setFormData({
      symptom_name: sym.name,
      severity: sym.defaultSeverity,
      notes: ''
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
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Symptom Tracker & Caregiver Alerts</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              Health Concern Reporter (లక్షణాలు & హెచ్చరికలు)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Log how you are feeling each day so your ASHA health worker and family members are immediately updated.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Log How You Feel Today</span>
          </button>
        </div>

        {/* Symptoms Log Timeline */}
        <div className="space-y-3.5">
          {symptoms.map((sym) => {
            const isSevere = sym.severity === 'severe'
            const isModerate = sym.severity === 'moderate'

            return (
              <div
                key={sym.id}
                className={`elder-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSevere
                    ? 'border-2 border-rose-300 bg-rose-50/50'
                    : isModerate
                    ? 'border border-amber-200 bg-amber-50/40'
                    : 'bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">
                      {isSevere ? '⚠️' : isModerate ? '⚡' : '🩺'}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 font-['Outfit']">{sym.symptom_name}</h3>
                    <span
                      className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                        isSevere
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : isModerate
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {sym.severity}
                    </span>
                  </div>

                  {sym.notes && (
                    <p className="text-xs text-slate-600 mt-2 pl-7 italic">
                      "{sym.notes}"
                    </p>
                  )}
                </div>

                <div className="text-xs text-slate-500 font-mono sm:text-right shrink-0 pl-7 sm:pl-0">
                  <span className="flex items-center sm:justify-end gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sym.logged_at}</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                    Caregiver Notified ✓
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal: Log Health Concern */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Log Health Feeling</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Pick */}
              <div className="mb-4">
                <span className="text-xs text-slate-500 font-bold block mb-2 uppercase">Quick Pick Common Symptoms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SYMPTOMS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickPick(s)}
                      className="text-xs bg-slate-50 hover:bg-emerald-50 text-slate-700 border border-slate-200 hover:border-emerald-500 rounded-xl px-2.5 py-1.5 transition-all text-left font-semibold"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Symptom Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mild headache or knee pain"
                    value={formData.symptom_name}
                    onChange={(e) => setFormData({ ...formData, symptom_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Severity Level (తీవ్రత)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['mild', 'moderate', 'severe'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity: lvl })}
                        className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          formData.severity === lvl
                            ? lvl === 'severe'
                              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : lvl === 'moderate'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {lvl === 'mild' ? 'Mild (తేలికపాటి)' : lvl === 'moderate' ? 'Moderate (మధ్యస్థ)' : 'Severe (తీవ్రమైన)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Additional Observations / Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Started around 7 AM. Took warm water and rested."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                    Save & Notify Caregiver
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Severe Alert Warning */}
        {showAlertModal && (
          <div className="modal-overlay">
            <div className="modal-content max-w-md w-full p-6 text-center border-2 border-rose-300">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 font-['Outfit']">Severe Symptom Recorded</h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                An urgent notification has been sent to your primary caregiver and ASHA worker. If you have acute chest pain or difficulty breathing, please tap SOS or call 108 ambulance immediately.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 font-bold text-xs rounded-xl"
                >
                  Understood
                </button>
                <a
                  href="tel:108"
                  className="flex-1 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Call 108 Ambulance</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </main>

      <AvatarAssistant />
    </div>
  )
}
