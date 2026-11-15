import { Check } from 'lucide-react'

export function DailyProgressCard({
  adherenceRate,
  takenDosesToday,
  totalDosesToday,
  isMed2Taken,
  onTakeAfternoonMedicine,
}) {
  return (
    <>
      {/* Daily Progress Green Trophy Card */}
      <div className="progress-hero-card p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
        <div className="flex items-center gap-1.5 text-emerald-100 text-xs font-bold mb-3">
          <span>🍃</span>
          <span>Your Daily Progress</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Donut Progress */}
          <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.2)"
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
            <span className="absolute font-black text-white text-base font-['Outfit']">
              {adherenceRate}%
            </span>
          </div>

          <div className="flex-1">
            <h4 className="text-xl font-extrabold text-white font-['Outfit'] leading-tight">
              {adherenceRate === 100 ? 'All Completed! 🌟' : adherenceRate >= 50 ? 'Great Job!' : 'Keep Going!'}
            </h4>
            <p className="text-xs text-emerald-100 font-medium mt-0.5">
              You took {takenDosesToday} of {totalDosesToday} medicines today.
            </p>
          </div>

          {/* Golden Trophy 🏆 */}
          <div className="text-4xl filter drop-shadow-md select-none shrink-0 animate-bounce">
            🏆
          </div>
        </div>
      </div>

      {/* Attention Needed Warning Box */}
      {!isMed2Taken ? (
        <div className="attention-card p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
              ⚠️
            </div>
            <div>
              <h5 className="font-extrabold text-amber-950 text-xs font-['Outfit']">
                Attention Needed
              </h5>
              <p className="text-[11px] text-amber-900 font-medium">
                Afternoon medicine is pending.
              </p>
            </div>
          </div>

          <button
            onClick={onTakeAfternoonMedicine}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 shadow-sm transition-all cursor-pointer"
          >
            Take Medicine
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
          <span>Afternoon medicine completed on schedule!</span>
        </div>
      )}
    </>
  )
}
