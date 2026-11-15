import React from 'react'
import { Link } from 'react-router-dom'
import { Pill, Heart, Calendar, Users } from 'lucide-react'

export default function StatsGrid({ takenDosesToday, totalDosesToday, adherenceRate }) {
  return (
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
  )
}
