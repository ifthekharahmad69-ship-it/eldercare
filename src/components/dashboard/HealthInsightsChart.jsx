import { Activity, ChevronDown } from 'lucide-react'

export function HealthInsightsChart() {
  return (
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
  )
}
