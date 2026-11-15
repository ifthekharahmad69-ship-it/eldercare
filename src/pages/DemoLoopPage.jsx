import React from 'react'
import CompleteLoopDemo from '../components/demo/CompleteLoopDemo'
import Sidebar from '../components/shared/Sidebar'

export default function DemoLoopPage() {
  return (
    <div className="flex min-h-screen bg-[#f0fdf4] text-[#0f172a] rural-landscape-bg">
      <Sidebar />
      <div className="flex-1 p-4 flex items-center justify-center">
        <CompleteLoopDemo isOpen={true} onClose={() => window.location.href = '/dashboard'} />
      </div>
    </div>
  )
}
