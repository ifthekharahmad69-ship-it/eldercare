import React, { useState } from 'react'
import {
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  X
} from 'lucide-react'
import { useData } from '../../context/data-context'

export default function CompleteLoopDemo({ isOpen, onClose }) {
  const {
    medications,
    toggleDoseTaken,
    addNotification,
    logAshaVitals
  } = useData()

  // 7 steps
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const teluguSpeechText =
    'నమస్తే లక్ష్మి గారూ! మీ తదుపరి మందు వివరాలు: రకం: ఇది మీ మధుమేహం మరియు బ్లడ్ షుగర్ నియంత్రణ మందు, గ్లైకోమెట్ జీపీ వన్. మోతాదు: సరిగ్గా ఒక టాబ్లెట్, ఐదు వందల మిల్లీగ్రాములు. సమయం: మధ్యాహ్నం ఒకటి గంటలకు, భోజనానికి పదిహేను నిమిషాల ముందు ఒక గ్లాసు గోరువెచ్చని నీటితో వేసుకోండి.'

  // Voice player using Web Speech API
  const playTeluguVoice = () => {
    setIsPlayingAudio(true)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(teluguSpeechText)
      utter.lang = 'te-IN'
      utter.rate = 0.95
      utter.pitch = 1.05
      utter.onend = () => setIsPlayingAudio(false)
      utter.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utter)
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000)
    }
  }

  // Handle step advance
  const goToStep = (stepNum) => {
    setCurrentStep(stepNum)
    if (stepNum === 4) {
      playTeluguVoice()
    }
  }

  const handleElderlyAcknowledge = () => {
    const med2 = medications.find(m => m.id === 'med-02') || medications[1]
    if (med2 && !med2.taken_today?.['1:00 PM']) {
      toggleDoseTaken(med2.id, '1:00 PM')
    }
    setCurrentStep(5)
  }

  const handleSimulateMissedDose = () => {
    addNotification({
      title: '🚨 Missed Dose Escalation',
      message: 'Afternoon Diabetes Medicine overdue by 30 mins. Caregiver notified.',
      type: 'medication'
    })
    setCurrentStep(6)
  }

  const handleAshaComplete = () => {
    logAshaVitals({
      bp: '130/84 mmHg',
      sugar: '142 mg/dL',
      pulse: '76 bpm',
      spo2: '98%',
      notes: 'Visited Lakshmi Garu following missed dose alert. Inspected pill box and confirmed afternoon medication taken.'
    })
    setCurrentStep(7)
  }

  const handleReset = () => {
    setCurrentStep(1)
    setIsPlayingAudio(false)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-[#f0fdf4] border-2 border-emerald-500 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#064e3b] text-white p-4 sm:p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-xl font-bold shadow-inner">
              🔄
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-emerald-300 block">
                Hackathon Judge Showcase • Complete 7-Step Workflow
              </span>
              <h2 className="text-lg sm:text-xl font-black font-['Outfit']">
                The Complete Healthcare Loop
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Restart Workflow"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Loop</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close Complete Healthcare Loop Demo"
              className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-rose-600 text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7-Step Interactive Progress Bar */}
        <div className="bg-white border-b border-emerald-100 px-4 py-3 sm:px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {[
              { num: 1, label: '1. Doctor Rx' },
              { num: 2, label: '2. Caregiver Input' },
              { num: 3, label: '3. Backend Scheduler' },
              { num: 4, label: '4. Sarvam Telugu Voice' },
              { num: 5, label: '5. Elderly Ack' },
              { num: 6, label: '6. Missed Dose Alert' },
              { num: 7, label: '7. ASHA Follow-up' }
            ].map((step) => {
              const isActive = currentStep === step.num
              const isPast = currentStep > step.num

              return (
                <button
                  key={step.num}
                  onClick={() => goToStep(step.num)}
                  className={`flex items-center gap-1.5 text-xs font-bold py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm scale-105'
                      : isPast
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-slate-400 hover:text-slate-600 bg-slate-50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-white text-emerald-700' : isPast ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isPast ? '✓' : step.num}
                  </span>
                  <span className="whitespace-nowrap">{step.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* WORKFLOW STAGE CONTENT CONTAINER */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto">
          
          {/* ================= STEP 1: DOCTOR PRESCRIBED SCHEDULE ================= */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">Stage 1 of 7</span>
                <span>Clinical Consultation & Diagnosis</span>
              </div>

              <div className="elder-card p-6 border-l-4 border-l-emerald-600 bg-white">
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold">
                      👨‍⚕️
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-700">District Community Health Centre (CHC)</span>
                      <h3 className="text-lg font-black text-slate-800 font-['Outfit']">
                        Dr. Anand K. Verma, MD (Cardiologist)
                      </h3>
                      <p className="text-xs text-slate-500">Patient: <strong>Lakshmi Garu (72 Yrs, Female)</strong></p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    Rx #CHC-AP-8921
                  </span>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 mb-4">
                  <h4 className="text-xs font-extrabold uppercase text-amber-900 mb-2 flex items-center gap-1.5">
                    <span>📋</span>
                    <span>Prescribed Daily Regimen</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-amber-100">
                      <strong className="text-slate-800 block text-sm">Glycomet-GP 1 PR</strong>
                      <span className="text-slate-500 block">Metformin 500mg + Glimepiride 1mg</span>
                      <span className="font-bold text-amber-700 block mt-1">⏰ 1:00 PM • 1 Tablet Before Lunch</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-amber-100">
                      <strong className="text-slate-800 block text-sm">Telma 40</strong>
                      <span className="text-slate-500 block">Telmisartan 40mg</span>
                      <span className="font-bold text-emerald-700 block mt-1">⏰ 8:00 AM • 1 Tablet After Breakfast</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic">
                  Clinical Note: "Strict compliance with 1:00 PM Glycomet timing is critical to prevent post-prandial blood sugar spikes."
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => goToStep(2)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>Proceed to Step 2: Caregiver Enters Medication</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: CAREGIVER ENTERS MEDICATION ================= */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">Stage 2 of 7</span>
                <span>Passcode-Authenticated Caregiver Entry</span>
              </div>

              <div className="elder-card p-6 bg-white space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
                    👩🏽
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-800 font-['Outfit']">
                      Priya Sharma (Daughter in Bangalore)
                    </h3>
                    <p className="text-xs text-slate-500">Authenticated via Passcode <code>SEVA99</code></p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Database Source:</span>
                    <span className="font-bold text-emerald-700">2.5 Lakh Indian Medicines (Desktop CSV Indexed)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Medicine:</span>
                    <span className="font-bold text-slate-900">Glycomet-GP 1 PR (USV Ltd)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dosage & Timing:</span>
                    <span className="font-bold text-slate-900">1 Tablet at 1:00 PM (Before Lunch)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Grace Escalation Timer:</span>
                    <span className="font-bold text-rose-600">30 Minutes (Escalate at 1:30 PM if unconfirmed)</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  ✓ Schedule committed to central <code>DataContext</code> & synced with Supabase <code>medications</code> table.
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => goToStep(1)}
                  className="text-slate-500 hover:text-slate-800 text-xs font-bold"
                >
                  ← Back to Step 1
                </button>
                <button
                  onClick={() => goToStep(3)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>Proceed to Step 3: Backend Schedules Reminder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: BACKEND SCHEDULES REMINDER ================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">Stage 3 of 7</span>
                <span>Proactive Healthcare Automation Engine</span>
              </div>

              <div className="elder-card p-6 bg-white space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl font-bold">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800 font-['Outfit']">
                      Automated Schedule Registered
                    </h3>
                    <p className="text-xs text-slate-500">Supabase Edge Function & Local Cron Webhook</p>
                  </div>
                </div>

                {/* Timeline visual */}
                <div className="relative pl-6 border-l-2 border-emerald-300 space-y-4 text-xs">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                    <strong className="text-slate-800 font-bold block">12:45 PM (15 Mins Before)</strong>
                    <span className="text-slate-500">Pre-meal dietary notification queued.</span>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-white animate-ping"></span>
                    <strong className="text-amber-900 font-bold block text-sm">01:00 PM (Trigger Time)</strong>
                    <span className="text-slate-600 font-medium">Activate Sarvam Regional Indian Voice AI broadcast in Telugu.</span>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-rose-500 border-2 border-white"></span>
                    <strong className="text-rose-700 font-bold block">01:30 PM (Grace Threshold)</strong>
                    <span className="text-slate-500">If no acknowledgment: Dispatch Caregiver Email & ASHA task.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => goToStep(2)}
                  className="text-slate-500 hover:text-slate-800 text-xs font-bold"
                >
                  ← Back to Step 2
                </button>
                <button
                  onClick={() => goToStep(4)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>Proceed to Step 4: Sarvam Speaks in Telugu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: SARVAM SPEAKS IN TELUGU ================= */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">Stage 4 of 7</span>
                <span>Voice AI Assistant (Sarvam / Seva Model)</span>
              </div>

              <div className="elder-card p-6 bg-gradient-to-b from-emerald-50/50 to-white text-center flex flex-col items-center">
                
                {/* Audio Wave Equalizer Animation */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 mb-4 relative">
                  {isPlayingAudio && (
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-300 animate-ping"></div>
                  )}
                  <Volume2 className="w-10 h-10" />
                </div>

                <span className="text-[10px] uppercase font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-3">
                  🗣️ Sarvam Voice AI Speaking Aloud
                </span>

                {/* Telugu Spoken Script Box with Explicit Type & Dosage Badges */}
                <div className="bg-white border-2 border-emerald-400 rounded-2xl p-5 shadow-sm max-w-lg mb-4 text-left">
                  
                  {/* Visual clinical badges */}
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Medicine Type & Purpose</span>
                      <strong className="text-emerald-900 text-xs">🩺 మధుమేహం (Type 2 Diabetes Control)</strong>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Exact Dosage Announced</span>
                      <strong className="text-emerald-900 text-xs font-mono">⚖️ 1 Tablet (ఒక టాబ్లెట్, 500mg)</strong>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-emerald-950 font-['Plus_Jakarta_Sans'] leading-relaxed">
                    "{teluguSpeechText}"
                  </p>
                  
                  <div className="text-xs text-slate-500 font-medium mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                    <p><strong>English Audio Translation:</strong></p>
                    <p className="italic">"Namaste Lakshmi Garu! Here are your medicine details: <strong>Type:</strong> Diabetes & blood sugar regulation medicine, Glycomet-GP 1. <strong>Dosage:</strong> Exactly 1 tablet, 500 milligrams. <strong>Timing:</strong> 1:00 PM, 15 minutes before lunch with a glass of warm water."</p>
                  </div>
                </div>

                {/* Audio replay button */}
                <button
                  onClick={playTeluguVoice}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-all mb-4"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Speaking Voice...' : 'Replay Voice Aloud (శబ్దం వినండి)'}</span>
                </button>

                {/* THE FORK: Choose which branch to test */}
                <div className="w-full pt-4 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-700 uppercase mb-3">
                    Choose Test Path to Complete the Demonstration:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleElderlyAcknowledge}
                      className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm p-3.5 rounded-2xl shadow-md transition-all flex flex-col items-center"
                    >
                      <span className="text-base">👵 Path A: Elderly Acknowledges</span>
                      <span className="text-[11px] font-normal text-emerald-100">Taps "వేసుకున్నాను (I took it)"</span>
                    </button>

                    <button
                      onClick={handleSimulateMissedDose}
                      className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm p-3.5 rounded-2xl shadow-md transition-all flex flex-col items-center"
                    >
                      <span className="text-base">⏰ Path B: Simulate Missed Dose</span>
                      <span className="text-[11px] font-normal text-rose-100">30 min delay ➔ Caregiver alert & ASHA</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= STEP 5: ELDERLY PERSON ACKNOWLEDGES ================= */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">Stage 5 of 7</span>
                <span>Grandmother Acknowledgment Recorded</span>
              </div>

              <div className="elder-card p-6 bg-white space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold">
                    👵
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800 font-['Outfit']">
                      Lakshmi Garu Confirmed Medication Taken
                    </h3>
                    <p className="text-xs text-slate-500">Method: 1-Tap Touchscreen Button on Dashboard</p>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800 text-sm block">Glycomet-GP 1 Marked as TAKEN</strong>
                      <span className="text-xs text-slate-600">Recorded at 01:05 PM • Adherence updated to 67%</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
                    On Schedule ✓
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Daily Progress Card updated: The golden trophy shines and the "Attention Needed" warning banner is cleared automatically.
                </p>

                {/* Allow checking the other branch too */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Want to see what happens if she misses it?</span>
                  <button
                    onClick={handleSimulateMissedDose}
                    className="bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all"
                  >
                    Simulate Missed Dose Escalation →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: MISSED DOSE TRIGGERS CAREGIVER ALERT ================= */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                <span className="bg-rose-200 text-rose-900 px-2 py-0.5 rounded-md">Stage 6 of 7</span>
                <span>Proactive Caregiver Alert Dispatched</span>
              </div>

              <div className="elder-card p-6 border-l-4 border-l-rose-500 bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl font-bold">
                      🚨
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-800 font-['Outfit']">
                        Missed Dose Grace Period Expired (01:30 PM)
                      </h3>
                      <p className="text-xs text-slate-500">Automated multi-channel escalation triggered</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full">
                    30 Mins Overdue
                  </span>
                </div>

                {/* Simulated Email Envelope */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono space-y-1.5">
                  <div>
                    <strong className="text-slate-500">To:</strong> priya.sharma@example.com (Daughter in Bangalore)
                  </div>
                  <div>
                    <strong className="text-slate-500">Subject:</strong> <span className="text-rose-700 font-bold">🚨 Alert: Afternoon Diabetes Medicine Pending - Lakshmi Garu</span>
                  </div>
                  <div>
                    <strong className="text-slate-500">Channel:</strong> TLS 1.3 Automated Email & SMS Push to +91 98765 00112
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-slate-700 font-sans whitespace-pre-line leading-relaxed">
                    Dear Priya,\n\nElderCare AI detected that Lakshmi Garu has not confirmed taking her 1:00 PM Diabetes Medicine (Glycomet-GP 1 PR).\n\nStatus: 30 minutes elapsed without confirmation.\nRecommended Action: Please call her or alert local ASHA worker Savitri Devi.
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleAshaComplete}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <span>Proceed to Step 7: ASHA Worker Follow-up</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 7: ASHA FOLLOW-UP ================= */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">Stage 7 of 7 • Completed Loop</span>
                <span>Grassroots Rural Health Worker In Action</span>
              </div>

              <div className="elder-card p-6 bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl font-bold">
                      👩🏽‍⚕️
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-800 font-['Outfit']">
                        Savitri Devi (Village ASHA Worker)
                      </h3>
                      <p className="text-xs text-slate-500">PHC Mangalagiri • Assigned Emergency Home Inspection</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Home Visit Logged ✓
                  </span>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
                  <strong className="text-emerald-950 block text-sm font-['Outfit']">
                    Vitals Recorded at Grandmother's Home:
                  </strong>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 block uppercase">Blood Pressure</span>
                      <strong className="text-slate-800 text-xs font-mono">130/84 mmHg</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 block uppercase">Blood Sugar</span>
                      <strong className="text-slate-800 text-xs font-mono">142 mg/dL</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 block uppercase">Pulse</span>
                      <strong className="text-slate-800 text-xs font-mono">76 bpm</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <span className="text-[10px] text-slate-500 block uppercase">SpO2</span>
                      <strong className="text-slate-800 text-xs font-mono">98%</strong>
                    </div>
                  </div>
                  <p className="text-slate-600 italic pt-1">
                    ASHA Note: "Visited Lakshmi Garu at 02:00 PM. Inspected pillbox; grandmother had taken the pill at 01:45 PM after a brief nap. Vitals stable. Requested free Jan Aushadhi refill at PHC."
                  </p>
                </div>

                {/* Grand celebration closure */}
                <div className="p-4 bg-gradient-to-r from-emerald-600 to-[#064e3b] text-white rounded-2xl text-center space-y-2 shadow-lg">
                  <div className="text-3xl">🏆</div>
                  <h4 className="text-base font-black font-['Outfit']">
                    7-Step Closed Healthcare Loop Successfully Verified!
                  </h4>
                  <p className="text-xs text-emerald-100 max-w-xl mx-auto">
                    From doctor prescription to regional voice AI, elderly acknowledgment, missed-dose escalation, and physical ASHA verification — every touchpoint is interconnected, reliable, and human-centric.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Run Complete Loop Again</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
                  >
                    Return to Live Dashboard
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
