import React, { useState } from 'react'
import {
  Pill,
  Plus,
  Search,
  Clock,
  Trash2,
  X
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import { useData } from '../context/DataContext'
import { useMedicineSearch } from '../hooks/useMedicineSearch'

export default function MedicationsPage() {
  const { medications, addMedication, deleteMedication, toggleDoseTaken } = useData()
  const { searchTerm, setSearchTerm, searchResults, totalMedicinesCount } = useMedicineSearch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dosage: '1 Tablet',
    frequency: 'twice_daily',
    timing: '09:00, 21:00',
    food_relation: 'after_food',
    instructions: '',
    mfr: '',
    composition: '',
    price: ''
  })

  const handleSelectMedicineFromSearch = (med) => {
    setFormData(prev => ({
      ...prev,
      name: med.name,
      mfr: med.mfr || '',
      composition: med.comp || '',
      price: med.price || '',
      instructions: `Prescribed Indian brand (${med.pack || 'Standard pack'}).`
    }))
    setSearchTerm('')
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name) return

    const timingArray = formData.timing
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    await addMedication({
      ...formData,
      timing: timingArray
    })

    setIsModalOpen(false)
    setFormData({
      name: '',
      dosage: '1 Tablet',
      frequency: 'twice_daily',
      timing: '09:00, 21:00',
      food_relation: 'after_food',
      instructions: '',
      mfr: '',
      composition: '',
      price: ''
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
              <Pill className="w-4 h-4 text-emerald-600" />
              <span>Prescriptions & Daily Dosage</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              My Medications (నా మందులు / मेरी दवाइयाँ)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Connected with Indian dataset of {totalMedicinesCount.toLocaleString()}+ verified brands and salts.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm px-5 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Add New Medicine</span>
          </button>
        </div>

        {/* Medication Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="elder-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-800 leading-tight font-['Outfit']">
                      {med.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded-lg">
                        {med.dosage}
                      </span>
                      <span className="capitalize text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        {med.food_relation ? med.food_relation.replace('_', ' ') : 'After Food'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteMedication(med.id)}
                    aria-label="Remove Medication"
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Remove Medication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Salt Composition */}
                {med.composition && (
                  <div className="mt-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold block mb-0.5">Salt / Composition:</span>
                    <span className="text-slate-700 font-medium">{med.composition}</span>
                  </div>
                )}

                {/* Manufacturer & Price */}
                {(med.mfr || med.price) && (
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 mt-2 px-1">
                    {med.mfr && <span className="truncate max-w-[200px]">{med.mfr}</span>}
                    {med.price && <span className="font-mono text-emerald-700 font-bold">MRP: ₹{med.price}</span>}
                  </div>
                )}

                {/* Instructions */}
                {med.instructions && (
                  <p className="text-xs text-slate-600 mt-2 italic px-1">
                    "{med.instructions}"
                  </p>
                )}
              </div>

              {/* Schedule Timings */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 mb-2 block">Dose Timings:</span>
                <div className="flex flex-wrap gap-2">
                  {(med.timing || ['09:00']).map((time) => {
                    const taken = med.taken_today?.[time] || false
                    return (
                      <button
                        key={time}
                        onClick={() => toggleDoseTaken(med.id, time)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                          taken
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{time}</span>
                        <span>{taken ? '✓ Taken' : 'Pending'}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal: Add Medication with 2.5L Indian Medicines Dataset Autocomplete */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Pill className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Add Medicine (దవా జోడించండి)</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Autocomplete Search */}
              <div className="mb-4">
                <label className="text-xs font-bold uppercase text-slate-600 block mb-1 flex items-center justify-between">
                  <span>Search Indian Medicines Database</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    2.5 Lakh Medicines
                  </span>
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Type brand name (e.g. Augmentin, Paracetamol, Glycomet)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none"
                  />
                </div>

                {/* Instant Results */}
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white border border-slate-200 rounded-2xl max-h-48 overflow-y-auto p-1 shadow-xl space-y-1 z-50">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => handleSelectMedicineFromSearch(result)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 transition-colors flex items-start justify-between gap-2"
                      >
                        <div>
                          <p className="font-bold text-xs text-slate-800">{result.name}</p>
                          <p className="text-[11px] text-slate-500">{result.comp || result.mfr}</p>
                        </div>
                        {result.price && (
                          <span className="text-[11px] font-mono text-emerald-700 font-bold shrink-0">
                            ₹{result.price}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Medicine Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Augmentin 625 Duo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Tablet"
                      value={formData.dosage}
                      onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Food Timing</label>
                    <select
                      value={formData.food_relation}
                      onChange={(e) => setFormData({ ...formData, food_relation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-emerald-500"
                    >
                      <option value="after_food">After Food (ఆహారం తర్వాత)</option>
                      <option value="before_food">Before Food (ఆహారానికి ముందు)</option>
                      <option value="with_food">With Food (ఆహారంతో పాటు)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dose Timings (24hr comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00, 21:00"
                    value={formData.timing}
                    onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Doctor's Instructions</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Drink water, do not miss dose."
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
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
                    Save Medicine
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
