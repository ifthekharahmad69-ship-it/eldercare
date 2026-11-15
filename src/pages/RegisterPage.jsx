import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/auth-context'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { registerElderly } = useAuth()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Female',
    blood_group: 'B+',
    address: '',
    medical_conditions: '',
    allergies: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    passcode: '',
    confirm_passcode: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.passcode.length !== 4) {
      setError('Passcode must be exactly 4 digits')
      return
    }

    if (formData.passcode !== formData.confirm_passcode) {
      setError('Passcodes do not match')
      return
    }

    setLoading(true)

    const conditionsArray = formData.medical_conditions
      ? formData.medical_conditions.split(',').map(s => s.trim()).filter(Boolean)
      : []

    const allergiesArray = formData.allergies
      ? formData.allergies.split(',').map(s => s.trim()).filter(Boolean)
      : []

    const res = await registerElderly({
      ...formData,
      medical_conditions: conditionsArray,
      allergies: allergiesArray
    })

    setLoading(false)

    if (res.success) {
      navigate('/dashboard')
    } else {
      setError(res.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#0f172a] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden rural-landscape-bg">
      
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#064e3b] flex items-center justify-center p-2 shadow-md">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#34d399]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div>
          <span className="text-2xl font-black text-[#064e3b] font-['Outfit']">
            ElderCare <span className="text-emerald-600">AI</span>
          </span>
          <p className="text-xs text-slate-500 font-medium">New Patient Health Profile</p>
        </div>
      </Link>

      <div className="w-full max-w-xl elder-card p-6 sm:p-8 shadow-xl relative z-10">
        
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                  step === num
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : step > num
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > num ? <Check className="w-5 h-5 stroke-[3]" /> : num}
              </div>
              <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                {num === 1 ? 'Personal' : num === 2 ? 'Medical' : 'Security'}
              </span>
              {num < 3 && <div className="w-8 sm:w-16 h-0.5 bg-slate-200 mx-1"></div>}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-xs">
          
          {/* STEP 1: Personal */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 font-['Outfit'] mb-2">Step 1: Personal Details (వ్యక్తిగత వివరాలు)</h3>
              
              <div>
                <label className="font-bold text-slate-700 block mb-1">Elderly Patient Full Name (పేరు)</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Lakshmi Garu / Rameshwar Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Phone (ఫోన్)</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age (వయస్సు)</label>
                  <input
                    type="number"
                    name="age"
                    required
                    placeholder="e.g. 72"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Gender (లింగం)</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                >
                  <option value="Female">Female (స్త్రీ / మహిళ)</option>
                  <option value="Male">Male (పురుషుడు / पुरुष)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!formData.name || !formData.phone || !formData.age) {
                    setError('Please fill in name, phone, and age')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 mt-4 shadow-sm"
              >
                <span>Continue to Medical Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Medical */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 font-['Outfit'] mb-2">Step 2: Health Info (ఆరోగ్య సమాచారం)</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Blood Group (రక్త వర్గం)</label>
                  <select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none font-bold text-red-600"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Village / District / Town</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Guntur / Varanasi"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Known Conditions (comma separated)</label>
                <input
                  type="text"
                  name="medical_conditions"
                  placeholder="e.g. Type 2 Diabetes, High Blood Pressure, Joint Arthritis"
                  value={formData.medical_conditions}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Drug Allergies (అలెర్జీలు)</label>
                <input
                  type="text"
                  name="allergies"
                  placeholder="e.g. Penicillin, Sulfa"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-slate-300 font-bold rounded-xl text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setError(''); setStep(3) }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Security & Contact */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 font-['Outfit'] mb-2">Step 3: Emergency Contact & PIN</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergency_contact_name"
                    required
                    placeholder="e.g. Priya Sharma (Daughter)"
                    value={formData.emergency_contact_name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emergency Mobile Number</label>
                  <input
                    type="tel"
                    name="emergency_contact_phone"
                    required
                    placeholder="e.g. +91 98765 00112"
                    value={formData.emergency_contact_phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Create 4-Digit PIN (పాస్‌కోడ్)</label>
                  <input
                    type="password"
                    maxLength={4}
                    name="passcode"
                    required
                    placeholder="••••"
                    value={formData.passcode}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xl font-mono text-center tracking-widest outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Confirm 4-Digit PIN</label>
                  <input
                    type="password"
                    maxLength={4}
                    name="confirm_passcode"
                    required
                    placeholder="••••"
                    value={formData.confirm_passcode}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xl font-mono text-center tracking-widest outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 border border-slate-300 font-bold rounded-xl text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{loading ? 'Registering...' : 'Complete & Open App'}</span>
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          )}

        </form>

        <div className="text-center mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-700 hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
