import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'

export function CareTeamCard() {
  return (
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
  )
}
