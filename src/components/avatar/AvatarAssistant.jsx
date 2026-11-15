import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Volume2, Mic, MicOff, X, Send, ShieldAlert, Heart, Calendar, Pill } from 'lucide-react'
import { useData } from '../../context/DataContext'

const LANGUAGES = [
  { code: 'hi-IN', name: 'हिन्दी (Hindi)', flag: '🇮🇳', greeting: 'नमस्ते! मैं "सेवा" हूँ, आपकी व्यक्तिगत स्वास्थ्य साथी। मैं आपकी क्या सहायता करूँ?', nameTag: 'सेवा (Seva)' },
  { code: 'en-IN', name: 'English (Indian)', flag: '🇬🇧', greeting: 'Namaste! I am "Seva", your personal elder health companion. How may I assist you today?', nameTag: 'Seva AI' },
  { code: 'bn-IN', name: 'বাংলা (Bengali)', flag: '🇧🇩', greeting: 'নমস্কার! আমি "সেবা", আপনার স্বাস্থ্য সহায়ক। আজ কীভাবে সাহায্য করতে পারি?', nameTag: 'সেবা (Seva)' },
  { code: 'ta-IN', name: 'தமிழ் (Tamil)', flag: '🇮🇳', greeting: 'வணக்கம்! நான் "சேவா", உங்கள் சுகாதார உதவியாளர். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?', nameTag: 'சேவா (Seva)' },
  { code: 'te-IN', name: 'తెలుగు (Telugu)', flag: '🇮🇳', greeting: 'నమస్కారం! నేను "సేవ", మీ ఆరోగ్య సహాయకురాలిని. నేను మీకు ఎలా సహాయపడగలను?', nameTag: 'సేవ (Seva)' },
  { code: 'mr-IN', name: 'मराठी (Marathi)', flag: '🇮🇳', greeting: 'नमस्कार! मी "सेवा" आहे, तुमची आरोग्य सहाय्यक. मी आपल्याला कशी मदत करू शकते?', nameTag: 'सेवा (Seva)' },
  { code: 'gu-IN', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', greeting: 'નમસ્તે! હું "સેવા" છું, તમારી આરોગ્ય સહાયક. હું તમને કેવી રીતે મદદ કરી શકું?', nameTag: 'સેવા (Seva)' }
]

export default function AvatarAssistant() {
  const navigate = useNavigate()
  const { appointments } = useData()

  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      sender: 'avatar',
      text: LANGUAGES[0].greeting,
      time: 'Just now'
    }
  ])
  const [inputText, setInputText] = useState('')
  const recognitionRef = useRef(null)
  const chatBottomRef = useRef(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = currentLang.code
    utterance.rate = 0.92
    utterance.pitch = 1.05

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Please use Chrome/Edge or type below.')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = currentLang.code
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        handleUserMessage(transcript)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
      recognition.start()
    } catch {
      setIsListening(false)
    }
  }

  const processQuery = (query) => {
    const q = query.toLowerCase()

    if (q.includes('dawai') || q.includes('medicine') || q.includes('medication') || q.includes('goli') || q.includes('mandu') || q.includes('dosage')) {
      if (currentLang.code === 'te-IN') {
        return `మీ మందుల వివరాలు: 1. రక్తపోటు మందు: టెల్మా 40, మోతాదు 1 టాబ్లెట్ ఉదయం 8:00 AM. 2. మధుమేహం మందు: గ్లైకోమెట్ 500mg, మోతాదు 1 టాబ్లెట్ మధ్యాహ్నం 1:00 PM. 3. గుండె & ఎముకల బలం: షెల్కాల్, మోతాదు 1 టాబ్లెట్ రాత్రి 8:00 PM.`
      } else if (currentLang.code === 'hi-IN') {
        return `आपकी दवाइयों का विवरण: 1. बीपी दवाई: टेल्मा 40, खुराक 1 टैबलेट सुबह 8:00 बजे। 2. डायबिटीज दवाई: ग्लाइकोमेट 500mg, खुराक 1 टैबलेट दोपहर 1:00 बजे। 3. कैल्शियम सप्लीमेंट: शेलकल, खुराक 1 टैबलेट रात 8:00 बजे।`
      } else {
        return `Here are your scheduled medicines: 1. Blood Pressure: Telma 40, dosage 1 tablet at 8:00 AM. 2. Type 2 Diabetes: Glycomet-GP 1 (500mg), dosage 1 tablet at 1:00 PM before lunch. 3. Heart & Bone Supplement: Shelcal 500, dosage 1 tablet at 8:00 PM.`
      }
    }

    if (q.includes('doctor') || q.includes('hospital') || q.includes('appointment') || q.includes('checkup')) {
      navigate('/appointments')
      return currentLang.code === 'hi-IN'
        ? `डॉक्टर मुलाक़ात पृष्ठ खुल गया है। आपके पास ${appointments.length} आगामी अपॉइंटमेंट्स हैं।`
        : `Navigated to Doctor Appointments. You have ${appointments.length} upcoming visits.`
    }

    if (q.includes('sos') || q.includes('emergency') || q.includes('help') || q.includes('madad')) {
      navigate('/sos')
      return currentLang.code === 'hi-IN'
        ? `आपातकालीन SOS स्क्रीन खोल दी गई है। क्या मैं तुरंत एम्बुलेंस को कॉल करूँ?`
        : `Emergency SOS screen active. Ready to contact 108 and family.`
    }

    if (q.includes('map') || q.includes('nearby') || q.includes('aspatal')) {
      navigate('/map')
      return currentLang.code === 'hi-IN'
        ? `आपके निकटतम सभी अस्पताल और ट्रामा सेंटर मैप पर दिखाए जा रहे हैं।`
        : `Showing nearby hospitals and clinics on the live Leaflet map.`
    }

    if (q.includes('profile') || q.includes('qr') || q.includes('card')) {
      navigate('/profile')
      return currentLang.code === 'hi-IN'
        ? `आपका डिजिटल मेडिकल प्रोफ़ाइल और डॉक्टर क्यूआर कार्ड यहाँ उपलब्ध है।`
        : `Here is your Medical Health Profile and Doctor QR Code Passport.`
    }

    if (currentLang.code === 'hi-IN') {
      return `मैंने सुना: "${query}"। मैं आपकी दवाइयाँ, डॉक्टर मुलाक़ात, लाइव मैप या आपातकालीन सहायता में मदद करने के लिए तैयार हूँ।`
    } else {
      return `I received: "${query}". You can ask me to show medications, appointments, nearby hospitals, or trigger SOS emergency help.`
    }
  }

  const handleUserMessage = (text) => {
    if (!text.trim()) return

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')

    setTimeout(() => {
      const response = processQuery(text)
      const aiMsg = {
        sender: 'avatar',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMsg])
      speakText(response)
    }, 350)
  }

  return (
    <>
      {/* Floating Avatar Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="hidden sm:flex bg-[#0b1122]/90 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-full text-xs text-indigo-200 shadow-2xl items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold">AI साथी "सेवा" से बात करें</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true)
              speakText(currentLang.greeting)
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 p-[2px] shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all duration-300 relative group"
            aria-label="Open AI Avatar Assistant"
          >
            <div className="w-full h-full bg-[#090d1c] rounded-full flex items-center justify-center relative overflow-hidden">
              <span className="text-3xl avatar-float select-none">🧕</span>
              <span className="absolute bottom-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#090d1c]"></span>
            </div>
            <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-pink-500 rounded-full text-[9px] font-black tracking-wider text-white border-2 border-[#060913]">
              AI
            </div>
          </button>
        </div>
      )}

      {/* Expanded Luxury Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[94vw] sm:w-[420px] max-h-[85vh] h-[650px] bg-[#090e1c]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/70 to-[#070b16] px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] ${isSpeaking ? 'ring-4 ring-pink-500/40 animate-pulse' : ''}`}>
                  <div className="w-full h-full bg-[#080d1a] rounded-2xl flex items-center justify-center text-2xl">
                    🧕
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base leading-tight font-['Space_Grotesk']">सेवा (Seva AI)</h3>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-indigo-300 mt-0.5">
                  {isSpeaking ? (
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-3 bg-pink-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-4 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
                      <span className="text-[11px] text-pink-300 font-medium ml-1">Speaking...</span>
                    </div>
                  ) : (
                    <span>बहुभाषी ग्रामीण स्वास्थ्य साथी</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={currentLang.code}
                onChange={(e) => {
                  const selected = LANGUAGES.find(l => l.code === e.target.value) || LANGUAGES[0]
                  setCurrentLang(selected)
                  speakText(selected.greeting)
                }}
                className="bg-[#0b1122] text-xs text-indigo-200 border border-white/15 rounded-xl px-2.5 py-1.5 outline-none cursor-pointer"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#090d1c] text-white">
                    {lang.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  window.speechSynthesis.cancel()
                  setIsOpen(false)
                }}
                aria-label="Close AI Avatar Assistant"
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Voice / Tap Commands */}
          <div className="bg-[#060913]/90 px-4 py-2 border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">Command:</span>
            <button
              onClick={() => handleUserMessage('Show my medications')}
              className="bg-indigo-950/70 hover:bg-indigo-800 text-indigo-200 px-2.5 py-1 rounded-lg border border-indigo-500/30 shrink-0 flex items-center gap-1"
            >
              <Pill className="w-3 h-3 text-indigo-400" />
              <span>दवाइयाँ</span>
            </button>
            <button
              onClick={() => handleUserMessage('Doctor appointments')}
              className="bg-cyan-950/70 hover:bg-cyan-800 text-cyan-200 px-2.5 py-1 rounded-lg border border-cyan-500/30 shrink-0 flex items-center gap-1"
            >
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>डॉक्टर</span>
            </button>
            <button
              onClick={() => handleUserMessage('Show nearby hospitals')}
              className="bg-emerald-950/70 hover:bg-emerald-800 text-emerald-200 px-2.5 py-1 rounded-lg border border-emerald-500/30 shrink-0 flex items-center gap-1"
            >
              <Heart className="w-3 h-3 text-emerald-400" />
              <span>अस्पताल</span>
            </button>
            <button
              onClick={() => handleUserMessage('Emergency SOS help')}
              className="bg-rose-950/70 hover:bg-rose-800 text-rose-200 px-2.5 py-1 rounded-lg border border-rose-500/40 shrink-0 flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3 text-rose-400" />
              <span>SOS</span>
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#060913]/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-lg leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-[#0f172a]/90 text-slate-100 border border-white/10 rounded-bl-none'
                  }`}
                >
                  <p className="font-medium">{msg.text}</p>
                  <div className="flex items-center justify-between gap-2 mt-1.5 pt-1.5 border-t border-white/[0.08] text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {msg.sender === 'avatar' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-pink-300 flex items-center gap-1 transition-colors"
                        title="Replay Audio"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Replay (सुनें)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Controls: Microphone & Input Form */}
          <div className="p-3 bg-[#070b16] border-t border-white/[0.08]">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUserMessage(inputText)
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                aria-label={isListening ? 'Stop voice listening' : 'Start microphone voice input'}
                className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center shrink-0 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50'
                    : 'bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Click to speak in your language'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? 'बोलिए, मैं सुन रही हूँ...' : 'माइक दबाकर बोलें या यहाँ लिखें...'}
                className="flex-1 bg-[#0b1122] border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                aria-label="Send message to AI assistant"
                className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white rounded-2xl transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  )
}
