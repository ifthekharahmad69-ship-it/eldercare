import React, { useState } from 'react'
import { MapPin } from 'lucide-react'
import Sidebar from '../components/shared/Sidebar'
import AvatarAssistant from '../components/avatar/AvatarAssistant'
import MapView from '../components/map/MapView'
import NearbyHospitals from '../components/map/NearbyHospitals'

export default function MapPage() {
  const [coords, setCoords] = useState([25.3176, 82.9739])
  const [hospitals, setHospitals] = useState([])

  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />

      <main className="flex-1 pt-20 md:pt-8 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-y-auto relative z-10 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Location & Nearby Community Clinics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] font-['Outfit']">
              Live Location & Hospitals (సమీప ఆసుపత్రులు)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Shows your live location to family members and locates nearby primary health centers and emergency hospitals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span>Live GPS Active</span>
            </span>
          </div>
        </div>

        {/* Map View */}
        <div className="mb-6 elder-card p-3 overflow-hidden">
          <MapView
            userCoords={coords}
            onLocationFound={(newCoords) => setCoords(newCoords)}
            hospitals={hospitals}
          />
        </div>

        {/* Nearby Hospitals List */}
        <div className="elder-card p-5">
          <NearbyHospitals
            userCoords={coords}
            onHospitalsLoaded={(list) => setHospitals(list)}
          />
        </div>

      </main>

      <AvatarAssistant />
    </div>
  )
}
