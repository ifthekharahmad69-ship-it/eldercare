import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock,
  Pill,
  Calendar,
  Heart,
  Bell,
  Activity,
  Check,
  ChevronDown,
  Globe,
  Users,
  Mic
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import CompleteLoopDemo from '../components/demo/CompleteLoopDemo'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

const LANGUAGES = [
  { code: 'te', label: 'తెలుగు (Telugu)', prompt: 'నాకు తదుపరి మందు ఎప్పుడు ఉంది?' },
  { code: 'hi', label: 'हिन्दी (Hindi)', prompt: 'मेरी अगली दवाई कब है?' },
  { code: 'en', label: 'English', prompt: 'When is my next medicine scheduled?' },
  { code: 'bn', label: 'বাংলা (Bengali)', prompt: 'আমার পরের ওষুধ কখন আছে?' },
  { code: 'ta', label: 'தமிழ் (Tamil)', prompt: 'எனது அடுத்த மருந்து எப்போது?' },
  { code: 'mr', label: 'मराठी (Marathi)', prompt: 'माझे पुढचे औषध कधी आहे?' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)', prompt: 'મારી આગામી દવા ક્યારે છે?' },
]

export default function Dashboard() {
  const { profile } = useAuth()
  const {
    medications,
    adherenceRate,
    totalDosesToday,
    takenDosesToday,
    toggleDoseTaken
  } = useData()

  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [familyDropdownOpen, setFamilyDropdownOpen] = useState(false)
  const [isLoopDemoOpen, setIsLoopDemoOpen] = useState(false)
  const [isMicActive, setIsMicActive] = useState(false)

  // Derived direct state from central DataContext
  const med2 = medications.find(m => m.name.toLowerCase().includes('diabetes') || m.id === 'med-02') || medications[1]
  const med3 = medications.find(m => m.name.toLowerCase().includes('heart') || m.name.toLowerCase().includes('calcium') || m.id === 'med-03') || medications[2]

  const isMed2Taken = med2 ? Boolean(med2.taken_today?.[med2.timing?.[0] || '1:00 PM']) : false
  const isMed3Taken = med3 ? Boolean(med3.taken_today?.[med3.timing?.[0] || '8:00 PM']) : false

  const handleTakeAfternoonMedicine = () => {
    if (med2) {
      toggleDoseTaken(med2.id, med2.timing?.[0] || '1:00 PM')
    }
  }

  const [aiVoiceDetail, setAiVoiceDetail] = useState(null)

  // Voice trigger from the right AI card: States Medicine Name, Type & Exact Dosage
  const handleMicClick = () => {
    setIsMicActive(true)

    const voiceData = selectedLang.code === 'te'
      ? {
          type: '🩺 రకం: మధుమేహం & బ్లడ్ షుగర్ నియంత్రణ (Type 2 Diabetes Control)',
          medicine: '💊 మందు: గ్లైకోమెట్-జిపి 1 (Glycomet-GP 1 PR)',
          dosage: '⚖️ మోతాదు: సరిగ్గా 1 టాబ్లెట్ (500mg మెట్ఫార్మిన్)',
          instructions: '⏰ సమయం: మధ్యాహ్నం 1:00 PM (భోజనానికి 15 నిమిషాల ముందు)',
          speech: 'నమస్తే లక్ష్మి గారూ! మీ తదుపరి మందు వివరాలు: రకం: ఇది మీ మధుమేహం మరియు బ్లడ్ షుగర్ నియంత్రణ మందు, గ్లైకోమెట్ జీపీ వన్. మోతాదు: సరిగ్గా ఒక టాబ్లెట్, ఐదు వందల మిల్లీగ్రాములు. సమయం: మధ్యాహ్నం ఒకటి గంటలకు, భోజనానికి పదిహేను నిమిషాల ముందు ఒక గ్లాసు గోరువెచ్చని నీటితో వేసుకోండి.'
        }
      : selectedLang.code === 'hi'
      ? {
          type: '🩺 प्रकार: डायबिटीज और ब्लड शुगर नियंत्रण (Type 2 Diabetes Control)',
          medicine: '💊 दवाई: ग्लाइकोमेट-जीपी 1 (Glycomet-GP 1 PR)',
          dosage: '⚖️ खुराक: ठीक 1 टैबलेट (500mg मेटफॉर्मिन)',
          instructions: '⏰ समय: दोपहर 1:00 PM (भोजन से 15 मिनट पहले)',
          speech: 'नमस्ते लक्ष्मी गारू! आपकी अगली दवाई का विवरण: प्रकार: यह आपकी डायबिटीज और ब्लड शुगर नियंत्रण दवाई, ग्लाइकोमेट जीपी एक है। खुराक: ठीक एक टैबलेट, 500 मिलीग्राम। समय: दोपहर एक बजे, भोजन से पंद्रह मिनट पहले एक गिलास पानी के साथ लें।'
        }
      : {
          type: '🩺 Type: Blood Sugar & Type 2 Diabetes Regulation',
          medicine: '💊 Medicine: Glycomet-GP 1 PR (Metformin 500mg + Glimepiride 1mg)',
          dosage: '⚖️ Dosage: Exactly 1 Tablet (500mg)',
          instructions: '⏰ Schedule: 1:00 PM (15 mins before lunch with warm water)',
          speech: 'Namaste Lakshmi Garu! Here are your next medicine details: Type: Diabetes and blood sugar regulation medicine, Glycomet-GP 1. Dosage: Exactly 1 tablet, 500 milligrams. Schedule: At 1:00 PM, 15 minutes before lunch with a glass of warm water.'
        }

    setAiVoiceDetail(voiceData)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(voiceData.speech)
      utter.lang = selectedLang.code === 'te' ? 'te-IN' : selectedLang.code === 'hi' ? 'hi-IN' : 'en-IN'
      utter.rate = 0.93
      utter.pitch = 1.05
      utter.onend = () => setIsMicActive(false)
      utter.onerror = () => setIsMicActive(false)
      window.speechSynthesis.speak(utter)
    } else {
      setTimeout(() => setIsMicActive(false), 3000)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto overflow-y-auto pb-24 md:pb-8 relative z-10">
        
        {/* TOP HEADER: Grandma Greeting + Language + Notifications + Family */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          {/* Left: Grandma Avatar & Warm Greeting */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white shadow-md overflow-hidden bg-emerald-100 flex items-center justify-center text-3xl">
                <span role="img" aria-label="Grandmother Avatar">👵</span>
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#064e3b] font-['Outfit'] flex items-center gap-2">
                <span>Namaste, {profile?.name ? profile.name.split(' ')[0] : 'Lakshmi'} Garu!</span>
                <span className="text-2xl">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                Take care. You are not alone.
              </p>
            </div>
          </div>

          {/* Right: Language Dropdown + Bell Badge + Family Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Select Language"
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-full px-3.5 py-2 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-sm transition-all"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>{selectedLang.label.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang)
                        setLangDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-emerald-50 flex items-center justify-between ${
                        selectedLang.code === lang.code ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {selectedLang.code === lang.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell with Red Badge 2 */}
            <Link
              to="/alerts"
              aria-label="2 Caregiver Alerts and Proactive Emails"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-emerald-500 flex items-center justify-center text-slate-600 shadow-sm relative transition-all"
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
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-full py-1.5 pl-2 pr-3.5 flex items-center gap-2 text-xs font-bold text-slate-700 shadow-sm transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-slate-200">
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
                      🔑 Switch Passcode (SEVA99) →
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* HACKATHON JUDGE SPECIAL: 7-STEP COMPLETE LOOP BANNER */}
        <div className="bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#059669] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 border border-emerald-400/40 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0 shadow-sm animate-pulse">
              🔄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 bg-white/10 px-2 py-0.5 rounded-md">
                  Complete End-to-End Workflow
                </span>
                <span className="text-xs text-emerald-100 hidden sm:inline">• Hackathon Core Loop</span>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white mt-0.5 font-['Outfit']">
                Doctor Rx ➔ Caregiver Input ➔ Scheduler ➔ Sarvam Telugu Voice ➔ Elderly Ack ➔ Caregiver Alert ➔ ASHA
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsLoopDemoOpen(true)}
            className="bg-white hover:bg-emerald-50 active:scale-95 text-[#064e3b] font-black text-xs px-5 py-2.5 rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <span>▶ Run Live 7-Step Demo</span>
          </button>
        </div>

        {/* TOP 4 STAT CARDS (Pill format) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          
          {/* Stat 1: Today's Medicines */}
          <div className="elder-card p-4 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Pill className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-slate-500 block truncate">Today's Medicines</span>
              <p className="text-base sm:text-lg font-extrabold text-slate-800 font-['Outfit']">
                {takenDosesToday} / {totalDosesToday} Taken
              </p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden flex items-center">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${adherenceRate}%` }}
                ></div>
                <span className="text-[10px] font-bold text-slate-500 ml-2">
                  {adherenceRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Stat 2: Health Status */}
          <div className="elder-card p-4 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 block">Health Status</span>
              <p className="text-base sm:text-lg font-extrabold text-emerald-600 font-['Outfit']">
                Good
              </p>
            </div>
          </div>

          {/* Stat 3: Next Visit */}
          <Link to="/asha-worker" className="elder-card p-4 flex items-center gap-3.5 hover:border-emerald-400 group transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 block">Next Visit</span>
              <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight font-['Outfit']">
                Tomorrow
              </p>
              <p className="text-[10px] font-semibold text-emerald-700 font-bold">(ASHA Worker) →</p>
            </div>
          </Link>

          {/* Stat 4: Care Team */}
          <div className="elder-card p-4 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 block">Care Team</span>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-slate-800 font-['Outfit']">
                  Connected
                </span>
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* MAIN THREE-COLUMN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* ================= LEFT COLUMN: Schedule & Care Team (5 Cols) ================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Medication Schedule Card */}
            <div className="elder-card p-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Pill className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base font-['Outfit']">
                    Medication Schedule
                  </h3>
                </div>
                <Link to="/medications" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                  <span>View All</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Schedule Items */}
              <div className="space-y-3.5">
                
                {/* 1. Morning Dose (Taken) */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                      ☀️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-700 font-mono">8:00 AM</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                        BP Medicine (Telma 40)
                      </h4>
                      <p className="text-[11px] text-slate-500">1 Tablet • After Breakfast</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px] font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Taken 8:25 AM</span>
                  </div>
                </div>

                {/* 2. Afternoon Dose (Pending - Take Now) */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg">
                      🌤️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-700 font-mono">1:00 PM</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                        Diabetes Medicine (Glycomet)
                      </h4>
                      <p className="text-[11px] text-slate-500">1 Tablet • Before Lunch</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isMed2Taken ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Taken
                      </span>
                    ) : (
                      <button
                        onClick={handleTakeAfternoonMedicine}
                        className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
                      >
                        Take Now
                      </button>
                    )}
                    <button aria-label="Medicine Notification Reminder" className="text-slate-400 hover:text-amber-600 p-1" title="Notification set">
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 3. Evening Dose (Upcoming) */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg">
                      🌙
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-700 font-mono">8:00 PM</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                        Heart & Calcium (Shelcal)
                      </h4>
                      <p className="text-[11px] text-slate-500">1 Tablet • After Dinner</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isMed3Taken ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Taken
                      </span>
                    ) : (
                      <button
                        onClick={() => med3 && toggleDoseTaken(med3.id, med3.timing?.[0] || '8:00 PM')}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer"
                        title="Click to take evening medicine"
                      >
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Upcoming</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Your Care Team Card (Bottom Left) */}
            <div className="elder-card p-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Users className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base font-['Outfit']">
                    Your Care Team
                  </h3>
                </div>
                <Link to="/family-access" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
                  <span>View All</span>
                  <span>→</span>
                </Link>
              </div>

              {/* 3 Care Team Members Avatars */}
              <div className="grid grid-cols-3 gap-2 text-center">
                
                {/* Member 1: ASHA Worker */}
                <Link to="/asha-worker" className="p-2.5 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-300 transition-all flex flex-col items-center group">
                  <div className="relative mb-1.5">
                    <div className="w-13 h-13 rounded-full border-2 border-emerald-400 overflow-hidden shadow-sm bg-emerald-50 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                      👩🏽‍⚕️
                    </div>
                  </div>
                  <h5 className="font-bold text-xs text-slate-800 leading-tight group-hover:text-emerald-800">Savitri Devi</h5>
                  <p className="text-[10px] text-emerald-700 font-bold">ASHA Worker</p>
                  <span className="mt-1.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] px-2 py-0.5 rounded-full">
                    Next Visit: Tomorrow →
                  </span>
                </Link>

                {/* Member 2: Caregiver */}
                <div className="p-2.5 rounded-2xl hover:bg-slate-50 transition-all flex flex-col items-center">
                  <div className="relative mb-1.5">
                    <div className="w-13 h-13 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm bg-blue-50 flex items-center justify-center text-xl">
                      👨🏽
                    </div>
                  </div>
                  <h5 className="font-bold text-xs text-slate-800 leading-tight">Ramesh Kumar</h5>
                  <p className="text-[10px] text-slate-500 font-medium">Caregiver</p>
                  <span className="mt-1.5 flex items-center gap-1 text-emerald-700 font-bold text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available
                  </span>
                </div>

                {/* Member 3: Family */}
                <div className="p-2.5 rounded-2xl hover:bg-slate-50 transition-all flex flex-col items-center">
                  <div className="relative mb-1.5">
                    <div className="w-13 h-13 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm bg-purple-50 flex items-center justify-center text-xl">
                      👩🏽
                    </div>
                  </div>
                  <h5 className="font-bold text-xs text-slate-800 leading-tight">Priya Sharma</h5>
                  <p className="text-[10px] text-slate-500 font-medium">Family (Daughter)</p>
                  <span className="mt-1.5 flex items-center gap-1 text-emerald-700 font-bold text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* ================= MIDDLE COLUMN: Progress, Alert & Line Chart (4 Cols) ================= */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Daily Progress Green Trophy Card */}
            <div className="progress-hero-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-1.5 text-emerald-100 text-xs font-bold mb-3">
                <span>🍃</span>
                <span>Your Daily Progress</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                {/* Donut Progress 67% */}
                <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#ffffff"
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={(2 * Math.PI * 40) * (1 - (adherenceRate / 100))}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <span className="absolute font-black text-white text-base font-['Outfit']">
                    {adherenceRate}%
                  </span>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-extrabold text-white font-['Outfit'] leading-tight">
                    {adherenceRate === 100 ? 'All Completed! 🌟' : adherenceRate >= 50 ? 'Great Job!' : 'Keep Going!'}
                  </h4>
                  <p className="text-xs text-emerald-100 font-medium mt-0.5">
                    You took {takenDosesToday} of {totalDosesToday} medicines today.
                  </p>
                </div>

                {/* Golden Trophy 🏆 */}
                <div className="text-4xl filter drop-shadow-md select-none shrink-0 animate-bounce">
                  🏆
                </div>
              </div>
            </div>

            {/* Attention Needed Warning Box */}
            {!isMed2Taken ? (
              <div className="attention-card p-4 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
                    ⚠️
                  </div>
                  <div>
                    <h5 className="font-extrabold text-amber-950 text-xs font-['Outfit']">
                      Attention Needed
                    </h5>
                    <p className="text-[11px] text-amber-900 font-medium">
                      Afternoon medicine is pending.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleTakeAfternoonMedicine}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 shadow-sm transition-all"
                >
                  Take Medicine
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Afternoon medicine completed on schedule!</span>
              </div>
            )}

            {/* Health Insights Chart Card (Bottom Middle) */}
            <div className="elder-card p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <h3 className="font-extrabold text-slate-800 text-sm font-['Outfit']">
                    Health Insights
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                  <span>Last 7 Days</span>
                  <ChevronDown className="w-3 h-3" />
                </span>
              </div>

              {/* Adherence Line Chart (SVG) */}
              <div className="w-full h-36 pt-2">
                <svg className="w-full h-full" viewBox="0 0 320 120" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="310" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <text x="5" y="24" fill="#94a3b8" fontSize="9" fontWeight="bold">100%</text>

                  <line x1="30" y1="60" x2="310" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <text x="10" y="64" fill="#94a3b8" fontSize="9" fontWeight="bold">50%</text>

                  <line x1="30" y1="100" x2="310" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <text x="15" y="104" fill="#94a3b8" fontSize="9" fontWeight="bold">0%</text>

                  {/* Primary Green Line: Adherence */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="45,45 85,38 125,42 165,35 205,33 245,28 285,25"
                  />
                  {/* Blue Line: Vital Stability */}
                  <polyline
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="45,70 85,60 125,58 165,65 205,55 245,52 285,50"
                  />

                  {/* Dots on Green Line */}
                  {[
                    [45, 45], [85, 38], [125, 42], [165, 35], [205, 33], [245, 28], [285, 25]
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  ))}

                  {/* Dots on Blue Line */}
                  {[
                    [45, 70], [85, 60], [125, 58], [165, 65], [205, 55], [245, 52], [285, 50]
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                  ))}
                </svg>

                {/* Day Labels */}
                <div className="flex justify-between px-6 text-[10px] font-bold text-slate-400 mt-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: AI Voice & Emergency SOS (3 Cols) ================= */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Talk to Your AI Assistant Card */}
            <div className="elder-card p-5 text-center flex flex-col items-center justify-between min-h-[300px]">
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Mic className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-sm font-['Outfit']">
                    Talk to Your AI Assistant
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mb-3">
                  Ask in your language...
                </p>

                {/* Regional Speech Bubble with Type & Dosage Breakdown */}
                <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-3 mb-4 shadow-sm relative text-left">
                  {aiVoiceDetail ? (
                    <div className="space-y-1 text-[11px] animate-in fade-in">
                      <div className="text-emerald-900 font-extrabold">{aiVoiceDetail.type}</div>
                      <div className="text-slate-800 font-bold">{aiVoiceDetail.medicine}</div>
                      <div className="text-emerald-800 font-mono font-bold">{aiVoiceDetail.dosage}</div>
                      <div className="text-slate-600 font-medium">{aiVoiceDetail.instructions}</div>
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-snug font-['Plus_Jakarta_Sans'] text-center">
                      "{selectedLang.prompt}"
                    </p>
                  )}
                </div>
              </div>

              {/* Big Glowing Microphone Button with Waves */}
              <div className="my-2 relative flex items-center justify-center">
                {isMicActive && (
                  <div className="absolute w-24 h-24 rounded-full border-2 border-emerald-400 mic-ripple"></div>
                )}
                <button
                  onClick={handleMicClick}
                  aria-label="Speak with AI Voice Assistant"
                  className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isMicActive
                      ? 'bg-emerald-600 text-white scale-110 shadow-emerald-500/50'
                      : 'bg-gradient-to-tr from-[#059669] to-[#34d399] text-white hover:scale-105 shadow-emerald-600/30'
                  }`}
                  title="Click to speak with AI Assistant"
                >
                  <Mic className="w-8 h-8 stroke-[2.5]" />
                </button>
              </div>

              {/* Powered By Badge */}
              <div className="pt-2">
                <p className="text-[10px] text-slate-400 font-semibold">
                  Powered by Sarvam AI / Gemini
                </p>
                <p className="text-[9px] text-emerald-600 font-bold">
                  (23+ Indian Languages)
                </p>
              </div>
            </div>

            {/* Emergency Help Red Glowing Button */}
            <Link
              to="/sos"
              className="emergency-hero-btn p-5 flex items-center justify-between text-left shadow-lg group cursor-pointer block"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  🚨
                </div>
                <div>
                  <h4 className="text-base font-black text-white font-['Outfit'] leading-tight">
                    Emergency Help
                  </h4>
                  <p className="text-xs text-rose-100 font-medium">
                    Tap for Assistance →
                  </p>
                </div>
              </div>
              <span className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">
                ›
              </span>
            </Link>

          </div>

        </div>

      </main>

      {/* Persistent floating AI avatar helper */}
      <AvatarAssistant />

      {/* 7-Step Hackathon Judge Workflow Loop Modal */}
      <CompleteLoopDemo
        isOpen={isLoopDemoOpen}
        onClose={() => setIsLoopDemoOpen(false)}
      />
    </div>
  )
}
