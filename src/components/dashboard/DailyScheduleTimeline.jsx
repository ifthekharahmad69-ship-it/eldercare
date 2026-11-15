import { Link } from 'react-router-dom'
import { Pill, Check, Clock, ChevronRight } from 'lucide-react'

export default function DailyScheduleTimeline({
  isMed2Taken,
  isMed3Taken,
  handleTakeAfternoonMedicine,
  med3,
  toggleDoseTaken
}) {
  return (
    <div className="elder-card p-4 sm:p-6">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 sm:mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Pill className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg font-['Outfit'] leading-tight">
              Medication Schedule
            </h3>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">3 doses scheduled for today</p>
          </div>
        </div>
        <Link
          to="/medications"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Schedule Items with Generous Breathing Room */}
      <div className="space-y-3 sm:space-y-4">
        {/* 1. Morning Dose (Taken) */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-600 flex items-center justify-center text-lg shrink-0">
              ☀️
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-slate-600 font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  8:00 AM
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Morning
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 leading-snug mt-1">
                BP Medicine (Telma 40)
              </h4>
              <p className="text-xs text-slate-500">1 Tablet • After Breakfast</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 py-1.5 rounded-full text-xs font-bold shrink-0">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>Taken 8:25 AM</span>
          </div>
        </div>

        {/* 2. Afternoon Dose (Pending - Primary Action) */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50/70 to-orange-50/50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm transition-all">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg shrink-0">
              🌤️
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-amber-900 font-mono bg-white px-2 py-0.5 rounded-md border border-amber-200">
                  1:00 PM
                </span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Afternoon
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug mt-1">
                Diabetes Medicine (Glycomet-GP 1)
              </h4>
              <p className="text-xs text-slate-600">1 Tablet • 15 Mins Before Lunch</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {isMed2Taken ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <Check className="w-4 h-4 stroke-[3]" /> Taken
              </span>
            ) : (
              <button
                onClick={handleTakeAfternoonMedicine}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer min-h-[40px] flex items-center justify-center"
              >
                Take Now
              </button>
            )}
          </div>
        </div>

        {/* 3. Evening Dose (Upcoming) */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg shrink-0">
              🌙
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs text-slate-600 font-mono bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  8:00 PM
                </span>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                  Night
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 leading-snug mt-1">
                Heart & Calcium (Shelcal)
              </h4>
              <p className="text-xs text-slate-500">1 Tablet • After Dinner</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            {isMed3Taken ? (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                <Check className="w-4 h-4 stroke-[3]" /> Taken
              </span>
            ) : (
              <button
                onClick={() => med3 && toggleDoseTaken(med3.id, med3.timing?.[0] || '8:00 PM')}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[40px]"
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
