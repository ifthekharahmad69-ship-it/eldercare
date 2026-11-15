import { Link } from 'react-router-dom'
import { Mic, ArrowRight } from 'lucide-react'

export function VoiceAssistantCard({
  aiVoiceDetail,
  selectedLang,
  isMicActive,
  onMicClick,
}) {
  return (
    <>
      {/* Talk to Your AI Assistant Card */}
      <div className="elder-card p-5 sm:p-6 text-center flex flex-col items-center justify-between min-h-[320px]">
        <div className="w-full">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Mic className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base font-['Outfit']">
              Talk to AI Assistant
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-3 sm:mb-4">
            Voice guidance in 23+ Indian languages
          </p>

          {/* Regional Speech Bubble with Type & Dosage Breakdown */}
          <div className="bg-[#f0fdf4] border border-emerald-200/90 rounded-2xl p-3.5 sm:p-4 mb-4 shadow-2xs relative text-left">
            {aiVoiceDetail ? (
              <div className="space-y-1.5 text-xs animate-in fade-in">
                <div className="text-emerald-900 font-extrabold">{aiVoiceDetail.type}</div>
                <div className="text-slate-800 font-bold">{aiVoiceDetail.medicine}</div>
                <div className="text-emerald-800 font-mono font-bold">{aiVoiceDetail.dosage}</div>
                <div className="text-slate-600 font-medium">{aiVoiceDetail.instructions}</div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-relaxed font-['Plus_Jakarta_Sans'] text-center py-1">
                "{selectedLang?.prompt || 'మీ మందుల సమయం ఎప్పుడు?'}"
              </p>
            )}
          </div>
        </div>

        {/* Big Glowing Microphone Button with Waves */}
        <div className="my-2 sm:my-3 relative flex items-center justify-center">
          {isMicActive && (
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-400 mic-ripple"></div>
          )}
          <button
            onClick={onMicClick}
            aria-label="Speak with AI Voice Assistant"
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer active:scale-95 ${
              isMicActive
                ? 'bg-emerald-600 text-white scale-110 shadow-emerald-500/50'
                : 'bg-gradient-to-tr from-[#059669] to-[#34d399] text-white hover:scale-105 shadow-emerald-600/30'
            }`}
            title="Click to speak with AI Assistant"
          >
            <Mic className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
          </button>
        </div>

        {/* Powered By Badge */}
        <div className="pt-2 text-center">
          <p className="text-[11px] text-slate-500 font-semibold">
            Powered by Sarvam AI / Gemini
          </p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
            Voice First • Rural Accessible
          </span>
        </div>
      </div>

      {/* Emergency Help Red Hero Button */}
      <Link
        to="/sos"
        className="emergency-hero-btn p-5 sm:p-5.5 flex items-center justify-between text-left shadow-lg group cursor-pointer block"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform shrink-0">
            🚨
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-white font-['Outfit'] leading-tight">
              Emergency SOS
            </h4>
            <p className="text-xs text-rose-100 font-medium mt-0.5">
              One-Tap ASHA & Ambulance Alert
            </p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform shrink-0">
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </div>
      </Link>
    </>
  )
}
