import { Link } from 'react-router-dom'
import { Users, ChevronRight } from 'lucide-react'

export default function CareTeamCard() {
  return (
    <div className="elder-card p-4 sm:p-6">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base sm:text-lg font-['Outfit'] leading-tight">
              Your Care Team
            </h3>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">3 active supporters linked</p>
          </div>
        </div>
        <Link
          to="/family-access"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Care Team Members with Clean Responsive Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        {/* Member 1: ASHA Worker */}
        <Link
          to="/asha-worker"
          className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/60 hover:border-emerald-300 transition-all flex flex-col items-center group cursor-pointer"
        >
          <div className="relative mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-emerald-400 overflow-hidden shadow-sm bg-emerald-100 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-105 transition-transform">
              👩🏽‍⚕️
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <h5 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight group-hover:text-emerald-800 truncate w-full">
            Savitri Devi
          </h5>
          <p className="text-[10px] sm:text-xs text-emerald-700 font-bold mt-0.5">ASHA Worker</p>
          <span className="mt-2 bg-emerald-100 text-emerald-800 font-bold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full truncate max-w-full">
            Visit: Tomorrow
          </span>
        </Link>

        {/* Member 2: Caregiver */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 transition-all flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm bg-blue-50 flex items-center justify-center text-xl sm:text-2xl">
              👨🏽
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <h5 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight truncate w-full">
            Ramesh Kumar
          </h5>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">Caregiver</p>
          <span className="mt-2 flex items-center justify-center gap-1 text-emerald-700 font-bold text-[9px] sm:text-[10px] bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full truncate max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> Available
          </span>
        </div>

        {/* Member 3: Family */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 transition-all flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-slate-200 overflow-hidden shadow-sm bg-purple-50 flex items-center justify-center text-xl sm:text-2xl">
              👩🏽
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <h5 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight truncate w-full">
            Priya Sharma
          </h5>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-0.5">Daughter</p>
          <span className="mt-2 flex items-center justify-center gap-1 text-purple-700 font-bold text-[9px] sm:text-[10px] bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-full truncate max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span> Connected
          </span>
        </div>
      </div>
    </div>
  )
}
