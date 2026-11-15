import React, { useState, useEffect, useCallback } from 'react'
import {
  ShieldAlert,
  Phone,
  CheckCircle2,
  Radio,
  Ambulance
} from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import { useAuth } from '../context/auth-context'
import { useData } from '../context/data-context'

export default function SOSPage() {
  const { profile } = useAuth()
  const { familyMembers, addNotification } = useData()

  const [countdown, setCountdown] = useState(null)
  const [alertSent, setAlertSent] = useState(false)

  const triggerSOS = useCallback(() => {
    setCountdown(null)
    setAlertSent(true)

    // Voice announcement in regional Telugu / Hindi
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(
        'సహాయం కోసం అత్యవసర సమాచారం పంపబడింది. ఆందోళన చెందకండి.'
      )
      utter.lang = 'te-IN'
      window.speechSynthesis.speak(utter)
    }

    addNotification({
      title: '🚨 CRITICAL SOS ALERT BROADCAST',
      message: `Emergency signal dispatched for ${profile?.name || 'Lakshmi Garu'}. Family notified with live coordinates.`,
      type: 'danger'
    })
  }, [addNotification, profile])

  // Countdown timer for cancellation
  useEffect(() => {
    let timer
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        if (countdown === 1) {
          triggerSOS()
        } else {
          setCountdown(c => (c !== null ? c - 1 : null))
        }
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown, triggerSOS])

  const startCountdown = () => {
    setCountdown(3)
  }

  const cancelCountdown = () => {
    setCountdown(null)
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-8 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-y-auto flex flex-col items-center justify-center relative z-10 w-full">
        
        <div className="w-full max-w-2xl text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold mb-4 shadow-sm">
            <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>24/7 Rural & Community Emergency Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#064e3b] mb-2 tracking-tight font-['Outfit']">
            Emergency SOS (అత్యవసర సహాయం)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed font-medium">
            Press the red button below. Your live location, blood group, allergies, and emergency medical passport will be sent to your family, ASHA worker, and nearest 108 ambulance.
          </p>

          {/* SOS Pulsing Button */}
          <div className="my-6 flex justify-center relative">
            
            {countdown !== null ? (
              <div className="flex flex-col items-center">
                <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 flex flex-col items-center justify-center text-white shadow-2xl animate-pulse border-4 border-white">
                  <span className="text-7xl font-black font-['Outfit']">{countdown}</span>
                  <span className="text-xs uppercase font-extrabold tracking-widest mt-2 text-rose-100">
                    Broadcasting in...
                  </span>
                </div>
                <button
                  onClick={cancelCountdown}
                  className="mt-6 border border-slate-300 bg-white hover:bg-slate-50 text-sm font-bold px-8 py-3 rounded-2xl text-slate-700 shadow-sm"
                >
                  Cancel (పొరపాటున నొక్కాను)
                </button>
              </div>
            ) : alertSent ? (
              <div className="elder-card p-8 max-w-md w-full shadow-2xl text-center border-2 border-rose-300 bg-white">
                <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg shadow-rose-600/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2 font-['Outfit']">
                  SOS Broadcast Dispatched!
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  SMS alerts with live GPS coordinates, blood group (<strong>{profile?.blood_group || 'B+'}</strong>), and active prescriptions have been dispatched to <strong>{familyMembers.length} care team members</strong>.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="tel:108"
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-rose-600/30"
                  >
                    <Ambulance className="w-5 h-5" />
                    <span>Call 108 Ambulance Directly</span>
                  </a>
                  <button
                    onClick={() => setAlertSent(false)}
                    className="w-full py-2.5 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50"
                  >
                    Reset Emergency State
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <div className="absolute w-72 h-72 rounded-full border-2 border-rose-400 mic-ripple pointer-events-none"></div>

                <button
                  onClick={startCountdown}
                  className="w-56 h-56 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 p-2 shadow-2xl shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border-4 border-white"
                >
                  <div className="w-full h-full rounded-full border-2 border-rose-300/60 flex flex-col items-center justify-center text-white">
                    <ShieldAlert className="w-16 h-16 mb-1 text-white drop-shadow-md" />
                    <span className="text-3xl font-black tracking-wider font-['Outfit']">SOS</span>
                    <span className="text-[11px] font-bold text-rose-100 mt-1">నొక్కండి (Press Now)</span>
                  </div>
                </button>
              </div>
            )}

          </div>

          {/* Quick Helplines Grid */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 block">
              Direct National Emergency Helplines (India)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="tel:108"
                className="elder-card p-4 hover:border-rose-400 flex items-center justify-between text-left transition-all"
              >
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Ambulance (108)</h4>
                  <p className="text-[11px] text-slate-500">Emergency Medical Service</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                  <Phone className="w-4 h-4" />
                </div>
              </a>

              <a
                href="tel:112"
                className="elder-card p-4 hover:border-rose-400 flex items-center justify-between text-left transition-all"
              >
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">National Emergency (112)</h4>
                  <p className="text-[11px] text-slate-500">All-in-One Helpline</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                  <Phone className="w-4 h-4" />
                </div>
              </a>

              <a
                href={`tel:${profile?.emergency_contact_phone || '+919876500112'}`}
                className="elder-card p-4 hover:border-emerald-400 flex items-center justify-between text-left transition-all"
              >
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Primary Caregiver</h4>
                  <p className="text-[11px] text-slate-500">{profile?.emergency_contact_name || 'Family'}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                  <Phone className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

        </div>

      </main>

      <AvatarAssistant />
    </div>
  )
}
