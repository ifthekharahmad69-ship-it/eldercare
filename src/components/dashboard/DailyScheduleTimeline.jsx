import React from 'react'
import { Link } from 'react-router-dom'
import { Pill, Check, Bell, Clock } from 'lucide-react'

export default function DailyScheduleTimeline({
  isMed2Taken,
  isMed3Taken,
  handleTakeAfternoonMedicine,
  med3,
  toggleDoseTaken
}) {
  return (
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
  )
}
