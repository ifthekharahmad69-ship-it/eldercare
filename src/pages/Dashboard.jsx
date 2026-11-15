import { useState } from 'react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import CompleteLoopDemo from '../components/demo/CompleteLoopDemo'
import GrandmaHeader from '../components/dashboard/GrandmaHeader'
import StatsGrid from '../components/dashboard/StatsGrid'
import DailyScheduleTimeline from '../components/dashboard/DailyScheduleTimeline'
import { CareTeamCard } from '../components/dashboard/CareTeamCard'
import { DailyProgressCard } from '../components/dashboard/DailyProgressCard'
import { HealthInsightsChart } from '../components/dashboard/HealthInsightsChart'
import { VoiceAssistantCard } from '../components/dashboard/VoiceAssistantCard'
import { useAuth } from '../context/auth-context'
import { useData } from '../context/data-context'

const LANGUAGES = [
  { code: 'te', label: 'తెలుగు (Telugu)', prompt: 'నాకు తదుపరి మందు ఎప్పుడు ఉంది?' },
  { code: 'hi', label: 'हिन्दी (Hindi)', prompt: 'मेरी अगली दवाई कब है?' },
  { code: 'en', label: 'English', prompt: 'When is my next medicine scheduled?' },
  { code: 'bn', label: 'বাংলা (Bengali)', prompt: 'আমার পরের ওষুধ কখন আছে?' },
  { code: 'ta', label: 'தமிழ் (Tamil)', prompt: 'எனது அடுத்த மருந்து எப்போது?' },
  { code: 'mr', label: 'मराठी (Marathi)', prompt: 'ماझे पुढचे औषध कधी आहे?' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)', prompt: 'મારી આગામી દવા ક્યારે છે?' },
]

export default function Dashboard() {
  const { profile } = useAuth()
  const {
    medications,
    adherenceRate,
    totalDosesToday,
    takenDosesToday,
    toggleDoseTaken,
  } = useData()

  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])
  const [isLoopDemoOpen, setIsLoopDemoOpen] = useState(false)
  const [isMicActive, setIsMicActive] = useState(false)
  const [aiVoiceDetail, setAiVoiceDetail] = useState(null)

  // Derived state from central DataContext
  const med2 = medications.find(m => m.name.toLowerCase().includes('diabetes') || m.id === 'med-02') || medications[1]
  const med3 = medications.find(m => m.name.toLowerCase().includes('heart') || m.name.toLowerCase().includes('calcium') || m.id === 'med-03') || medications[2]

  const isMed2Taken = med2 ? Boolean(med2.taken_today?.[med2.timing?.[0] || '1:00 PM']) : false
  const isMed3Taken = med3 ? Boolean(med3.taken_today?.[med3.timing?.[0] || '8:00 PM']) : false

  const handleTakeAfternoonMedicine = () => {
    if (med2) {
      toggleDoseTaken(med2.id, med2.timing?.[0] || '1:00 PM')
    }
  }

  // Voice trigger: States Medicine Name, Type & Exact Dosage in selected Indian language
  const handleMicClick = () => {
    setIsMicActive(true)

    const voiceData = selectedLang.code === 'te'
      ? {
          type: '🩺 రకం: మధుమేహం & బ్లడ్ షుగర్ నియంత్రణ (Type 2 Diabetes Control)',
          medicine: '💊 మందు: గ్లైకోమెట్-జిపి 1 (Glycomet-GP 1 PR)',
          dosage: '⚖️ మోతాదు: సరిగ్గా 1 టాబ్లెట్ (500mg మెట్ఫార్మిన్)',
          instructions: '⏰ సమయం: మధ్యాహ్నం 1:00 PM (భోజనానికి 15 నిమిషాల ముందు)',
          speech: 'నమస్తే లక్ష్మి గారూ! మీ తదుపరి మందు వివరాలు: రకం: ఇది మీ మధుమేహం మరియు బ్లడ్ షుగర్ నియంత్రణ మందు, గ్లైకోమెట్ జీపీ వన్. మోతాదు: సరిగ్గా ఒక టాబ్లెట్, ఐదు వందల మిల్లీగ్రాములు. సమయం: మధ్యాహ్నం ఒకటి గంటలకు, భోజనానికి పదిహేను నిమిషాల ముందు ఒక గ్లాసు గోరువెచ్చని నీటితో వేసుకోండి.'
        }
      : selectedLang.code === 'hi'
      ? {
          type: '🩺 प्रकार: डायबिटीज और ब्लड शुगर नियंत्रण (Type 2 Diabetes Control)',
          medicine: '💊 दवाई: ग्लाइकोमेट-जीपी 1 (Glycomet-GP 1 PR)',
          dosage: '⚖️ खुराक: ठीक 1 टैबलेट (500mg मेटफॉर्मिन)',
          instructions: '⏰ समय: दोपहर 1:00 PM (भोजन से 15 मिनट पहले)',
          speech: 'नमस्ते लक्ष्मी गारू! आपकी अगली दवाई का विवरण: प्रकार: यह आपकी डायबिटीज और ब्लड शुगर नियंत्रण दवाई, ग्लाइकोमेट जीपी एक है। खुराक: ठीक एक टैबलेट, 500 मिलीग्राम। समय: दोपहर एक बजे, भोजन से पंद्रह मिनट पहले एक गिलास पानी के साथ लें।'
        }
      : {
          type: '🩺 Type: Blood Sugar & Type 2 Diabetes Regulation',
          medicine: '💊 Medicine: Glycomet-GP 1 PR (Metformin 500mg + Glimepiride 1mg)',
          dosage: '⚖️ Dosage: Exactly 1 Tablet (500mg)',
          instructions: '⏰ Schedule: 1:00 PM (15 mins before lunch with warm water)',
          speech: 'Namaste Lakshmi Garu! Here are your next medicine details: Type: Diabetes and blood sugar regulation medicine, Glycomet-GP 1. Dosage: Exactly 1 tablet, 500 milligrams. Schedule: At 1:00 PM, 15 minutes before lunch with a glass of warm water.'
        }

    setAiVoiceDetail(voiceData)

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(voiceData.speech)
      utter.lang = selectedLang.code === 'te' ? 'te-IN' : selectedLang.code === 'hi' ? 'hi-IN' : 'en-IN'
      utter.rate = 0.93
      utter.pitch = 1.05
      utter.onend = () => setIsMicActive(false)
      utter.onerror = () => setIsMicActive(false)
      window.speechSynthesis.speak(utter)
    } else {
      setTimeout(() => setIsMicActive(false), 3000)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1400px] mx-auto overflow-y-auto pb-24 md:pb-8 relative z-10">
        {/* Top Header */}
        <GrandmaHeader
          profile={profile}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          languages={LANGUAGES}
        />

        {/* 4 Stats Cards */}
        <StatsGrid
          takenDosesToday={takenDosesToday}
          totalDosesToday={totalDosesToday}
          adherenceRate={adherenceRate}
        />

        {/* 3 Columns Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Column 1: Medication Schedule & Care Team */}
          <div className="lg:col-span-5 space-y-5">
            <DailyScheduleTimeline
              isMed2Taken={isMed2Taken}
              isMed3Taken={isMed3Taken}
              handleTakeAfternoonMedicine={handleTakeAfternoonMedicine}
              med3={med3}
              toggleDoseTaken={toggleDoseTaken}
            />
            <CareTeamCard />
          </div>

          {/* Column 2: Progress, Alert & Line Chart */}
          <div className="lg:col-span-4 space-y-5">
            <DailyProgressCard
              adherenceRate={adherenceRate}
              takenDosesToday={takenDosesToday}
              totalDosesToday={totalDosesToday}
              isMed2Taken={isMed2Taken}
              onTakeAfternoonMedicine={handleTakeAfternoonMedicine}
            />
            <HealthInsightsChart />
          </div>

          {/* Column 3: AI Voice & Emergency SOS */}
          <div className="lg:col-span-3 space-y-5">
            <VoiceAssistantCard
              aiVoiceDetail={aiVoiceDetail}
              selectedLang={selectedLang}
              isMicActive={isMicActive}
              onMicClick={handleMicClick}
            />
          </div>
        </div>
      </main>

      {/* Persistent floating AI avatar helper */}
      <AvatarAssistant />

      {/* 7-Step Hackathon Judge Workflow Loop Modal */}
      <CompleteLoopDemo
        isOpen={isLoopDemoOpen}
        onClose={() => setIsLoopDemoOpen(false)}
      />
    </div>
  )
}
