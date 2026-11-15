import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Lock,
  Phone,
  KeyRound,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Users,
  Stethoscope,
  BadgeCheck,
  Heart,
  QrCode
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ROLES = [
  { id: 'elderly', label: '👵 Elderly', title: 'Elderly Patient (లక్ష్మి గారు)', color: 'emerald' },
  { id: 'family', label: '👨‍👩‍👧 Family', title: 'Remote Family Member (Priya Sharma)', color: 'indigo' },
  { id: 'asha', label: '👩🏽‍⚕️ ASHA', title: 'ASHA Health Worker (Savitri Devi)', color: 'teal' },
  { id: 'caregiver', label: '👨🏽 Caregiver', title: 'Village Caregiver (Ramesh Kumar)', color: 'amber' },
  { id: 'doctor', label: '🩺 Doctor', title: 'Emergency Doctor / Paramedic', color: 'rose' }
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loginAsFamily } = useAuth()

  const [activeTab, setActiveTab] = useState('elderly')
  const [phone, setPhone] = useState('')
  const [passcode, setPasscode] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleElderlyLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const targetPhone = (phone || '').trim() || '9876543210'
    const targetPasscode = (passcode || '').trim() || '1234'

    const res = await login(targetPhone, targetPasscode)
    setLoading(false)

    if (res.success) {
      navigate('/dashboard')
    } else {
      setError(res.error || 'Invalid phone number or 4-digit PIN')
    }
  }

  const handlePasscodeLogin = async (codeToUse, customRedirect) => {
    setError('')
    setLoading(true)

    const fallbackCode = activeTab === 'asha' ? 'ASHA26' : activeTab === 'caregiver' ? 'CARE24' : 'SEVA99'
    const targetCode = typeof codeToUse === 'string' && codeToUse.trim() ? codeToUse.trim() : (accessCode || '').trim() || fallbackCode

    const res = await loginAsFamily(targetCode)
    setLoading(false)

    if (res.success) {
      navigate(customRedirect || res.redirect || '/dashboard')
    } else {
      setError(res.error || 'Invalid access passcode')
    }
  }

  // Quick 1-click test fill for each category
  const quickDemoLogin = (roleId) => {
    setError('')
    if (roleId === 'elderly') {
      setActiveTab('elderly')
      setPhone('9876543210')
      setPasscode('1234')
      login('9876543210', '1234').then(() => navigate('/dashboard'))
    } else if (roleId === 'family') {
      setActiveTab('family')
      setAccessCode('SEVA99')
      handlePasscodeLogin('SEVA99', '/family-access')
    } else if (roleId === 'asha') {
      setActiveTab('asha')
      setAccessCode('ASHA26')
      handlePasscodeLogin('ASHA26', '/asha-worker')
    } else if (roleId === 'caregiver') {
      setActiveTab('caregiver')
      setAccessCode('CARE24')
      handlePasscodeLogin('CARE24', '/medications')
    } else if (roleId === 'doctor') {
      navigate('/qr/elderly-demo-01')
    }
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#0f172a] flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative overflow-hidden rural-landscape-bg">
      
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-3 mb-6 group relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-[#064e3b] flex items-center justify-center p-2 shadow-md">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#34d399]" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div>
          <span className="text-2xl font-black text-[#064e3b] font-['Outfit']">
            ElderCare <span className="text-emerald-600">AI</span>
          </span>
          <p className="text-xs text-slate-500 font-medium">Beyond Reminders. Towards Proactive Care.</p>
        </div>
      </Link>

      {/* Main Container Card */}
      <div className="w-full max-w-xl elder-card p-5 sm:p-8 shadow-xl relative z-10">
        
        <div className="text-center mb-5">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Role-Based Authentication Portals
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-['Outfit'] mt-2">
            Select Your Login Category
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dedicated secure access points for every stakeholder in grandmother's care circle.
          </p>
        </div>

        {/* 5 Distinct Category Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-6">
          {ROLES.map((r) => {
            const isActive = activeTab === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setActiveTab(r.id)
                  setError('')
                  if (r.id === 'family') setAccessCode('SEVA99')
                  if (r.id === 'asha') setAccessCode('ASHA26')
                  if (r.id === 'caregiver') setAccessCode('CARE24')
                }}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                  isActive
                    ? 'bg-[#064e3b] text-white shadow-md scale-102'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span>{r.label}</span>
              </button>
            )
          })}
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-bold">
            {error}
          </div>
        )}

        {/* 1. ELDERLY PATIENT LOGIN */}
        {activeTab === 'elderly' && (
          <form onSubmit={handleElderlyLogin} className="space-y-4">
            <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
              <span className="text-xl">👵</span>
              <div>
                <strong>Elderly Individual Portal:</strong> Designed with large fonts, voice assistant, and 4-digit PIN authentication.
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Mobile Number (ఫోన్ నంబర్ / फोन नंबर)
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl pl-11 pr-4 py-3 text-base font-mono tracking-wider outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                4-Digit PIN Passcode (4-అంకెల పాస్‌కోడ్)
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  maxLength={4}
                  placeholder="1234"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl pl-11 pr-4 py-3 text-2xl font-mono tracking-widest text-center outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Default demo passcode: <code>1234</code></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer"
            >
              <span>{loading ? 'Verifying...' : 'Sign In as Lakshmi Garu (Dashboard)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 2. FAMILY MEMBER LOGIN */}
        {activeTab === 'family' && (
          <form onSubmit={(e) => { e.preventDefault(); handlePasscodeLogin(accessCode, '/family-access') }} className="space-y-4">
            <div className="bg-indigo-50/70 border border-indigo-200 p-3 rounded-xl text-xs text-indigo-900 flex items-center gap-2">
              <span className="text-xl">👨‍👩‍👧</span>
              <div>
                <strong>Remote Family Portal:</strong> For children living in other cities to monitor adherence and receive missed-dose alerts.
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Family Passcode Access Pass
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. SEVA99"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl pl-11 pr-4 py-3 text-lg font-mono tracking-widest uppercase font-bold outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Demo Family Passcode: <code className="font-bold text-indigo-700">SEVA99</code> (Priya Sharma - Daughter)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer"
            >
              <span>{loading ? 'Connecting...' : 'Sign In as Family Member (/family-access)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. ASHA HEALTH WORKER LOGIN */}
        {activeTab === 'asha' && (
          <form onSubmit={(e) => { e.preventDefault(); handlePasscodeLogin(accessCode, '/asha-worker') }} className="space-y-4">
            <div className="bg-teal-50/70 border border-teal-200 p-3 rounded-xl text-xs text-teal-900 flex items-center gap-2">
              <span className="text-xl">👩🏽‍⚕️</span>
              <div>
                <strong>ASHA Community Worker Portal:</strong> National Health Mission pass for logging home visit vitals & PHC Jan Aushadhi refills.
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                ASHA Worker Access Passcode / ID
              </label>
              <div className="relative">
                <BadgeCheck className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. ASHA26"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 rounded-xl pl-11 pr-4 py-3 text-lg font-mono tracking-widest uppercase font-bold outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Demo ASHA Passcode: <code className="font-bold text-teal-700">ASHA26</code> (Savitri Devi - PHC Mangalagiri)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer"
            >
              <span>{loading ? 'Authorizing...' : 'Sign In as ASHA Worker (/asha-worker)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 4. VILLAGE CAREGIVER LOGIN */}
        {activeTab === 'caregiver' && (
          <form onSubmit={(e) => { e.preventDefault(); handlePasscodeLogin(accessCode, '/medications') }} className="space-y-4">
            <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <span className="text-xl">👨🏽</span>
              <div>
                <strong>Primary Caregiver Portal:</strong> Village assistant helper for pillbox dispensing and scheduling follow-ups.
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1">
                Caregiver Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. CARE24"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl pl-11 pr-4 py-3 text-lg font-mono tracking-widest uppercase font-bold outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Demo Caregiver Passcode: <code className="font-bold text-amber-700">CARE24</code> (Ramesh Kumar - Caregiver)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 transition-all cursor-pointer"
            >
              <span>{loading ? 'Verifying...' : 'Sign In as Caregiver (/medications)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 5. DOCTOR & EMERGENCY PARAMEDIC */}
        {activeTab === 'doctor' && (
          <div className="space-y-4 text-center">
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs text-rose-950 text-left">
              <div className="flex items-center gap-2 font-bold mb-1 text-sm text-rose-800">
                <Stethoscope className="w-5 h-5 text-rose-600" />
                <span>Zero-Login Emergency Clinical Access</span>
              </div>
              <p className="leading-relaxed">
                Emergency hospital doctors and 108 ambulance staff do <strong>NOT</strong> need an account or password. Scanning the patient's QR code on the fridge or medical bracelet immediately displays live allergies, blood group, medications, and ASHA vitals.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/qr/elderly-demo-01')}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <QrCode className="w-5 h-5" />
              <span>Open Public Clinical Emergency Sheet (/qr/elderly-demo-01)</span>
            </button>
          </div>
        )}

        {/* FAST 1-CLICK DEMO LOGIN BUTTONS FOR EVALUATION */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-[11px] text-slate-500 text-center font-bold mb-2.5 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Judge Fast-Fill: 1-Click Instant Sign In</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => quickDemoLogin('elderly')}
              className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-[10px] text-emerald-800 rounded-xl border border-emerald-200 font-bold transition-all text-center"
            >
              👵 1-Click Elderly
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('family')}
              className="py-2 px-2 bg-indigo-50 hover:bg-indigo-100 text-[10px] text-indigo-800 rounded-xl border border-indigo-200 font-bold transition-all text-center"
            >
              👨‍👩‍👧 1-Click Family
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('asha')}
              className="py-2 px-2 bg-teal-50 hover:bg-teal-100 text-[10px] text-teal-800 rounded-xl border border-teal-200 font-bold transition-all text-center"
            >
              👩🏽‍⚕️ 1-Click ASHA
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('caregiver')}
              className="py-2 px-2 bg-amber-50 hover:bg-amber-100 text-[10px] text-amber-800 rounded-xl border border-amber-200 font-bold transition-all text-center"
            >
              👨🏽 1-Click Caregiver
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            Need to register a new elderly individual?{' '}
            <Link to="/register" className="text-emerald-700 hover:underline font-bold">
              Register Health Profile
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
