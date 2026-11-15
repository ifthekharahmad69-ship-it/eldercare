import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Navigation, Crosshair } from 'lucide-react'

// Fix default Leaflet icon paths in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapView({ userCoords, onLocationFound, hospitals = [] }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const userMarkerRef = useRef(null)
  const hospitalMarkersRef = useRef([])

  // Default coordinate: Varanasi / Central India (25.3176, 82.9739)
  const defaultCoords = [25.3176, 82.9739]
  const activeCoords = userCoords || defaultCoords

  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(activeCoords, 14)

      // OpenStreetMap Tile Layer (100% Free & Open Source)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map)

      mapInstanceRef.current = map
    }

    const map = mapInstanceRef.current

    // Custom pulse icon for user's elderly live location
    const elderlyIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="
          width: 36px;
          height: 36px;
          background: #6366f1;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        ">
          👴
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    })

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(activeCoords)
    } else {
      userMarkerRef.current = L.marker(activeCoords, { icon: elderlyIcon })
        .addTo(map)
        .bindPopup('<strong>Elderly Patient Live Location</strong><br/>Tracking Active')
    }

    map.panTo(activeCoords)

    // Render hospital markers
    hospitalMarkersRef.current.forEach(m => map.removeLayer(m))
    hospitalMarkersRef.current = []

    const hospitalIcon = L.divIcon({
      className: 'custom-hospital-marker',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #ef4444;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        ">
          🏥
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })

    hospitals.forEach(h => {
      if (h.lat && h.lon) {
        const marker = L.marker([h.lat, h.lon], { icon: hospitalIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: sans-serif; min-width: 160px;">
              <strong style="color: #ef4444; font-size: 14px;">${h.name}</strong><br/>
              <span style="font-size: 12px; color: #475569;">${h.type || 'Hospital / Emergency'}</span><br/>
              <span style="font-size: 11px; color: #16a34a; font-weight: bold;">Distance: ${h.distance || 'Nearby'}</span>
            </div>
          `)
        hospitalMarkersRef.current.push(marker)
      }
    })

  }, [activeCoords, hospitals])

  // Get current live GPS position
  const fetchLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude]
        if (onLocationFound) onLocationFound(coords)
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView(coords, 15)
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message)
        alert('Could not access live GPS. Using pre-registered home coordinates.')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Recenter / Geolocation Button */}
      <button
        onClick={fetchLiveLocation}
        className="absolute top-4 right-4 z-[400] bg-slate-900/90 hover:bg-indigo-600 text-white p-3 rounded-2xl border border-indigo-500/40 shadow-xl flex items-center gap-2 text-xs font-semibold backdrop-blur transition-all"
        title="Find My Live Location"
      >
        <Crosshair className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">Locate Me</span>
      </button>

      <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/90 text-xs text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg backdrop-blur flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></span>
        <span>OpenStreetMap Live Satellite Grid</span>
      </div>
    </div>
  )
}
