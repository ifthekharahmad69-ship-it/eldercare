import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, ChevronDown, Check, Bell, Sparkles } from 'lucide-react'

export default function GrandmaHeader({ profile, selectedLang, setSelectedLang, languages }) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [familyDropdownOpen, setFamilyDropdownOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pt-1">
      {/* Left: Grandma Avatar & Warm Greeting */}
      <div className="flex items-center gap-3.5 sm:gap-4.5">
        <div className="relative shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full border-3 sm:border-4 border-white shadow-md overflow-hidden bg-emerald-100 flex items-center justify-center text-2xl sm:text-3xl select-none">
            <span role="img" aria-label="Grandmother Avatar">👵</span>
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#064e3b] font-['Outfit'] truncate">
              Namaste, {profile?.name ? profile.name.split(' ')[0] : 'Lakshmi'} Garu!
            </h1>
            <span className="text-xl sm:text-2xl shrink-0">👋</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Take care. You are always supported.</span>
          </p>
        </div>
      </div>

      {/* Right: Language Dropdown + Bell Badge + Family Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-center">
        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            aria-label="Select Language"
            className="bg-white border border-slate-200 hover:border-emerald-500 rounded-full px-3 sm:px-4 py-2 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[90px] sm:max-w-none">{selectedLang.label.split(' ')[0]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {langDropdownOpen && (
            <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Language / భాష
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang)
                    setLangDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 flex items-center justify-between cursor-pointer transition-colors ${
                    selectedLang.code === lang.code ? 'text-emerald-700 font-bold bg-emerald-50/60' : 'text-slate-700'
                  }`}
                >
                  <span>{lang.label}</span>
                  {selectedLang.code === lang.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell with Red Badge */}
        <Link
          to="/alerts"
          aria-label="2 Caregiver Alerts and Proactive Emails"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 hover:border-emerald-500 flex items-center justify-center text-slate-600 shadow-sm relative transition-all active:scale-95 cursor-pointer"
          title="2 Caregiver Alerts & Proactive Emails"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
            2
          </span>
        </Link>

        {/* Care Team / Family Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFamilyDropdownOpen(!familyDropdownOpen)}
            aria-label="Care Team Menu"
            className="bg-white border border-slate-200 hover:border-emerald-500 rounded-full py-1.5 pl-2 pr-3 sm:pr-3.5 flex items-center gap-2 text-xs font-bold text-slate-700 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-slate-200">
              <span className="text-xs">👩‍⚕️</span>
            </div>
            <span>Family</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {familyDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100 mb-2">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
                  👩🏽
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">Priya Sharma</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Daughter (Bangalore)</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <Link
                  to="/family-access"
                  onClick={() => setFamilyDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 font-semibold hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  👨‍👩‍👧 Open Remote Family Portal →
                </Link>
                <Link
                  to="/alerts"
                  onClick={() => setFamilyDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-slate-700 font-semibold hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  ✉️ Proactive Email Outbox →
                </Link>
                <Link
                  to="/login"
                  onClick={() => setFamilyDropdownOpen(false)}
                  className="block px-3 py-2 rounded-xl text-emerald-700 font-bold hover:bg-emerald-50 transition-colors"
                >
                  🔄 Switch Login Persona
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
