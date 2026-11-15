import { Link } from 'react-router-dom'
import { Pill, Heart, Calendar, Users, ArrowUpRight } from 'lucide-react'

export default function StatsGrid({ takenDosesToday, totalDosesToday, adherenceRate }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5 lg:gap-5 mb-6 sm:mb-8">
      {/* Stat 1: Today's Medicines */}
      <div className="elder-card p-3.5 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Pill className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            Today
          </span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 block truncate">
            Today's Medicines
          </span>
          <p className="text-base sm:text-xl font-black text-slate-800 font-['Outfit'] mt-0.5">
            {takenDosesToday} <span className="text-xs sm:text-sm text-slate-400 font-semibold">/ {totalDosesToday} Taken</span>
          </p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 sm:mt-2.5 overflow-hidden flex items-center">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${adherenceRate}%` }}
            ></div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 block mt-1">
            {adherenceRate}% completed
          </span>
        </div>
      </div>

      {/* Stat 2: Health Status */}
      <div className="elder-card p-3.5 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            Stable
          </span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">
            Health Status
          </span>
          <p className="text-base sm:text-xl font-black text-emerald-600 font-['Outfit'] mt-0.5">
            Good
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 truncate">
            BP & Glucose Normal
          </p>
        </div>
      </div>

      {/* Stat 3: Next Visit */}
      <Link
        to="/asha-worker"
        className="elder-card p-3.5 sm:p-5 flex flex-col justify-between hover:border-emerald-400 group transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">
            Next Visit
          </span>
          <p className="text-sm sm:text-lg font-black text-slate-800 leading-tight font-['Outfit'] mt-0.5">
            Tomorrow, 10 AM
          </p>
          <span className="text-[10px] sm:text-xs text-emerald-700 font-bold block mt-1 truncate">
            ASHA: Savitri Devi →
          </span>
        </div>
      </Link>

      {/* Stat 4: Caregiver Sync */}
      <Link
        to="/family-access"
        className="elder-card p-3.5 sm:p-5 flex flex-col justify-between hover:border-emerald-400 group transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
        </div>
        <div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 block">
            Care Network
          </span>
          <p className="text-base sm:text-xl font-black text-slate-800 font-['Outfit'] mt-0.5">
            3 Active
          </p>
          <span className="text-[10px] sm:text-xs text-purple-700 font-bold block mt-1 truncate">
            ASHA • Family • Caregiver
          </span>
        </div>
      </Link>
    </div>
  )
}
