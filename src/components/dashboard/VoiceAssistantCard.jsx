import { Link } from 'react-router-dom'
import { Mic } from 'lucide-react'

export function VoiceAssistantCard({
  aiVoiceDetail,
  selectedLang,
  isMicActive,
  onMicClick,
}) {
  return (
    <>
      {/* Talk to Your AI Assistant Card */}
      <div className="elder-card p-5 text-center flex flex-col items-center justify-between min-h-[300px]">
        <div className="w-full">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Mic className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm font-['Outfit']">
              Talk to Your AI Assistant
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mb-3">
            Ask in your language...
          </p>

          {/* Regional Speech Bubble with Type & Dosage Breakdown */}
          <div className="bg-[#f0fdf4] border border-emerald-200/80 rounded-2xl p-3 mb-4 shadow-sm relative text-left">
            {aiVoiceDetail ? (
              <div className="space-y-1 text-[11px] animate-in fade-in">
                <div className="text-emerald-900 font-extrabold">{aiVoiceDetail.type}</div>
                <div className="text-slate-800 font-bold">{aiVoiceDetail.medicine}</div>
                <div className="text-emerald-800 font-mono font-bold">{aiVoiceDetail.dosage}</div>
                <div className="text-slate-600 font-medium">{aiVoiceDetail.instructions}</div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm font-bold text-emerald-900 leading-snug font-['Plus_Jakarta_Sans'] text-center">
                "{selectedLang?.prompt || 'మీ మందుల సమయం ఎప్పుడు?'}"
              </p>
            )}
          </div>
        </div>

        {/* Big Glowing Microphone Button with Waves */}
        <div className="my-2 relative flex items-center justify-center">
          {isMicActive && (
            <div className="absolute w-24 h-24 rounded-full border-2 border-emerald-400 mic-ripple"></div>
          )}
          <button
            onClick={onMicClick}
            aria-label="Speak with AI Voice Assistant"
            className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
              isMicActive
                ? 'bg-emerald-600 text-white scale-110 shadow-emerald-500/50'
                : 'bg-gradient-to-tr from-[#059669] to-[#34d399] text-white hover:scale-105 shadow-emerald-600/30'
            }`}
            title="Click to speak with AI Assistant"
          >
            <Mic className="w-8 h-8 stroke-[2.5]" />
          </button>
        </div>

        {/* Powered By Badge */}
        <div className="pt-2">
          <p className="text-[10px] text-slate-400 font-semibold">
            Powered by Sarvam AI / Gemini
          </p>
          <p className="text-[9px] text-emerald-600 font-bold">
            (23+ Indian Languages)
          </p>
        </div>
      </div>

      {/* Emergency Help Red Glowing Button */}
      <Link
        to="/sos"
        className="emergency-hero-btn p-5 flex items-center justify-between text-left shadow-lg group cursor-pointer block"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
            🚨
          </div>
          <div>
            <h4 className="text-base font-black text-white font-['Outfit'] leading-tight">
              Emergency Help
            </h4>
            <p className="text-xs text-rose-100 font-medium">
              Tap for Assistance →
            </p>
          </div>
        </div>
        <span className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">
          ›
        </span>
      </Link>
    </>
  )
}
