import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Pill,
  FileText,
  Users,
  Bell,
  Settings,
  Heart,
  LogOut,
  MapPin,
  ShieldAlert,
  BadgeCheck,
  Calendar
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

export default function Sidebar() {
  const { user, profile, logout } = useAuth()
  const { notifications } = useData()
  const navigate = useNavigate()

  const navItems = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/medications', label: 'My Medicines', icon: Pill },
    { to: '/appointments', label: 'Doctor Visits', icon: Calendar },
    { to: '/asha-worker', label: 'ASHA Worker (ఆశా)', icon: BadgeCheck },
    { to: '/profile', label: 'Health Records', icon: FileText },
    { to: '/family-access', label: 'My Care Team', icon: Users },
    { to: '/alerts', label: 'Alerts & Emails', icon: Bell, badge: 2 },
    { to: '/map', label: 'Nearby Care', icon: MapPin },
    { to: '/sos', label: 'Emergency', icon: ShieldAlert, emergency: true },
  ]

  return (
    <>
      {/* Desktop Forest Green Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-[#064e3b] text-white p-5 z-40 select-none shadow-2xl shrink-0">
        
        {/* Brand Header */}
        <div className="flex flex-col mb-8 px-1">
          <div className="flex items-center gap-3">
            {/* Heart + Care Silhouette Logo */}
            <div className="w-11 h-11 rounded-2xl bg-[#047857] flex items-center justify-center p-1.5 shadow-md">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#34d399]" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white font-['Outfit']">
                ElderCare <span className="text-[#34d399]">AI</span>
              </h1>
            </div>
          </div>
          <p className="text-[11px] text-emerald-200/80 mt-1.5 leading-tight font-medium">
            Beyond Reminders. Towards Proactive Care.
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    item.emergency
                      ? isActive
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40'
                        : 'text-rose-300 hover:bg-rose-950/40'
                      : isActive
                      ? 'bg-[#047857] text-white shadow-md shadow-[#047857]/30'
                      : 'text-emerald-100/80 hover:bg-[#065f46] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom Couple Art & Motto */}
        <div className="pt-4 border-t border-emerald-800/60 flex flex-col items-center text-center">
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#059669] to-[#34d399] p-0.5 shadow-lg overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-[#064e3b] rounded-full flex items-center justify-center text-2xl">
                👵🌾
              </div>
            </div>
          </div>
          <p className="text-xs font-semibold text-emerald-100">
            Healthy Today,
          </p>
          <p className="text-xs font-bold text-[#34d399] flex items-center gap-1 justify-center">
            Happier Tomorrow <span className="text-rose-400">❤️</span>
          </p>

          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-300/80 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#064e3b] text-white flex items-center justify-around px-2 z-40 shadow-2xl border-t border-emerald-700/50">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold ${
              isActive ? 'text-[#34d399]' : 'text-emerald-200/80'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/medications"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold ${
              isActive ? 'text-[#34d399]' : 'text-emerald-200/80'
            }`
          }
        >
          <Pill className="w-5 h-5" />
          <span>Meds</span>
        </NavLink>

        <NavLink
          to="/sos"
          className="flex flex-col items-center justify-center -mt-6"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-xl shadow-rose-600/40 border-4 border-[#064e3b] animate-pulse">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold text-rose-300 mt-0.5">SOS</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold ${
              isActive ? 'text-[#34d399]' : 'text-emerald-200/80'
            }`
          }
        >
          <FileText className="w-5 h-5" />
          <span>Records</span>
        </NavLink>

        <NavLink
          to="/family-access"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold ${
              isActive ? 'text-[#34d399]' : 'text-emerald-200/80'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Care Team</span>
        </NavLink>
      </nav>
    </>
  )
}
