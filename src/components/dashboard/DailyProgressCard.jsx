import { Check, AlertTriangle } from 'lucide-react'

export function DailyProgressCard({
  adherenceRate,
  takenDosesToday,
  totalDosesToday,
  isMed2Taken,
  onTakeAfternoonMedicine,
}) {
  return (
    <>
      {/* Daily Progress Green Trophy Hero Card */}
      <div className="progress-hero-card p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[170px]">
        <div className="flex items-center gap-2 text-emerald-100 text-xs sm:text-sm font-bold mb-4">
          <span className="text-base">🌿</span>
          <span className="tracking-wide">Your Daily Progress</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          {/* Donut Progress */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.25)"
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
            <span className="absolute font-black text-white text-base sm:text-lg font-['Outfit']">
              {adherenceRate}%
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-lg sm:text-xl font-extrabold text-white font-['Outfit'] leading-tight truncate">
              {adherenceRate === 100 ? 'All Completed! 🌟' : adherenceRate >= 50 ? 'Great Job!' : 'Keep Going!'}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
              You took <span className="font-bold text-white">{takenDosesToday}</span> of <span className="font-bold text-white">{totalDosesToday}</span> medicines today.
            </p>
          </div>

          {/* Golden Trophy 🏆 */}
          <div className="text-3xl sm:text-4xl filter drop-shadow-md select-none shrink-0 animate-bounce">
            🏆
          </div>
        </div>
      </div>

      {/* Attention Needed Warning Box with Roomy Responsive Layout */}
      {!isMed2Taken ? (
        <div className="attention-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold shadow-sm">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="font-extrabold text-amber-950 text-xs sm:text-sm font-['Outfit']">
                Attention Needed
              </h5>
              <p className="text-xs text-amber-900 font-medium mt-0.5">
                Afternoon medicine is pending.
              </p>
            </div>
          </div>

          <button
            onClick={onTakeAfternoonMedicine}
            className="self-end sm:self-center bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-xl shrink-0 shadow-sm transition-all cursor-pointer min-h-[40px]"
          >
            Take Medicine
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-xs sm:text-sm text-emerald-800 font-bold">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span>Afternoon medicine completed on schedule!</span>
        </div>
      )}
    </>
  )
}
