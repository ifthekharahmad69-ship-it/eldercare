import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Download, Printer, ShieldCheck, Share2, Check } from 'lucide-react'

export default function QRGenerator({ userId, patientName, bloodGroup, emergencyPhone }) {
  const canvasRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const profileUrl = `${window.location.origin}/qr/${userId || 'elderly-demo-01'}`

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        profileUrl,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#064e3b',
            light: '#ffffff'
          }
        },
        (error) => {
          if (error) console.error('QR code generation error:', error)
        }
      )
    }
  }, [profileUrl])

  const downloadQR = () => {
    if (!canvasRef.current) return
    const url = canvasRef.current.toDataURL('image/png')
    const a = document.createElement('a')
    a.download = `Medical_QR_${patientName ? patientName.replace(/\s+/g, '_') : 'Emergency'}.png`
    a.href = url
    a.click()
  }

  const printQR = () => {
    window.print()
  }

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="elder-card p-6 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2 text-emerald-700 font-extrabold text-sm font-['Outfit']">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <span>Doctor Emergency QR Passport</span>
      </div>

      <p className="text-xs text-slate-500 max-w-xs mb-4 font-medium leading-relaxed">
        Paramedics and emergency doctors scan this QR code with their mobile phone camera to instantly view blood group, allergies, medications, and family contacts.
      </p>

      {/* QR Code Canvas */}
      <div className="p-3 bg-white rounded-2xl shadow-md mb-4 border-2 border-emerald-100">
        <canvas ref={canvasRef} />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 mb-4 w-full text-left text-xs">
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500 font-medium">Patient:</span>
          <span className="font-bold text-slate-800">{patientName || 'Lakshmi Garu'}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-200">
          <span className="text-slate-500 font-medium">Blood Group:</span>
          <span className="font-extrabold text-red-600">{bloodGroup || 'B+'}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500 font-medium">Emergency Phone:</span>
          <span className="font-bold text-emerald-700">{emergencyPhone || '+91 98765 00112'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-full">
        <button
          onClick={downloadQR}
          className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Save PNG</span>
        </button>
        <button
          onClick={printQR}
          className="flex-1 py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print</span>
        </button>
        <button
          onClick={copyLink}
          className="p-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-slate-600"
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
