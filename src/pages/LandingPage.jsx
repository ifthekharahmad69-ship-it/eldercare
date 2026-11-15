import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Heart,
  Sparkles,
  Pill,
  ShieldAlert,
  QrCode,
  Globe2,
  Users,
  BellRing,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Lock,
  ChevronRight,
  Activity,
  Calendar,
  Clock,
  Mic,
  Award
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Instant one-click demo login for judges
  const quickDemoLogin = async () => {
    await login('9876543210', '1234')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#0f172a] relative overflow-hidden rural-landscape-bg selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-[#f0fdf4]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#064e3b] flex items-center justify-center p-1.5 shadow-md">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#34d399]" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#064e3b] font-['Outfit']">
                  ElderCare <span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  National Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Beyond Reminders. Towards Proactive Care.</p>
            </div>
          </Link>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={quickDemoLogin}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-4 py-2 rounded-xl hover:bg-emerald-200 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>1-Click Judge Preview</span>
            </button>
            <Link
              to="/login"
              className="bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs px-4 py-2 rounded-xl font-bold transition-all shadow-sm"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-5 py-2 rounded-xl font-bold transition-all shadow-sm"
            >
              Register
            </Link>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto">
        
        <div className="text-center max-w-4xl mx-auto mb-14">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold mb-6 shadow-sm">
            <span>🌿</span>
            <span>Empowering Rural & Urban Indian Elderly with Respect and Dignity</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.12] mb-6 text-[#064e3b] font-['Outfit']">
            Healthy Today, <br />
            <span className="text-emerald-600">Happier Tomorrow ❤️</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Voice-driven regional AI assistant in 23+ Indian languages, 2.5 Lakh Indian medicines database, live Leaflet location tracking, and printable doctor emergency QR cards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={quickDemoLogin}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Live Platform</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 font-bold text-base px-6 py-3.5 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Lock className="w-5 h-5 text-slate-400" />
              <span>Passcode Login</span>
            </Link>
          </div>

        </div>

        {/* Feature Cards Grid (Warm White & Emerald Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          
          <div className="elder-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mb-4">
                👵
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-['Outfit']">
                Regional Indian Voice AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rural elderly who cannot read English menus can speak naturally in Telugu, Hindi, Bengali, Tamil, Telugu, Marathi, or Gujarati to inspect medicines and schedule checkups.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Web Speech API & Regional TTS</span>
            </div>
          </div>

          <div className="elder-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-4">
                💊
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-['Outfit']">
                2.5 Lakh Indian Medicines
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Indexed from verified Indian pharmacopoeia records. Sub-millisecond autocomplete of brand names (*Augmentin, Glycomet, Telma*), salt compositions, and MRP.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Verified Indian Formulations</span>
            </div>
          </div>

          <div className="elder-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl mb-4">
                🚨
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 font-['Outfit']">
                Doctor Emergency QR & SOS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Printable QR passport for the fridge or wallet. Rural doctors and 108 ambulance staff can scan with any camera to see blood group, allergies, and contacts without any app.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-rose-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Zero-Install Doctor Portal</span>
            </div>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-900/10 py-8 px-6 text-center text-xs text-slate-500 bg-white/60">
        <p className="font-semibold text-slate-700 mb-1 font-['Outfit']">
          ElderCare AI — Developed for the Elderly Care & Medication Management Platform Challenge
        </p>
        <p>Built with Supabase, Leaflet OpenStreetMap, Indian Medicines Dataset, and Web Speech AI.</p>
      </footer>

    </div>
  )
}
