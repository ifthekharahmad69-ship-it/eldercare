import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Pill,
  FileText,
  Users,
  Bell,
  LogOut,
  MapPin,
  ShieldAlert,
  BadgeCheck,
  Calendar
} from 'lucide-react'
import { useAuth } from '../../context/auth-context'

export default function Sidebar() {
  const { logout } = useAuth()
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
      {/* Mobile Top App Bar (Visible only on < md screens) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#064e3b]/95 backdrop-blur-md text-white flex items-center justify-between px-4 z-40 border-b border-emerald-800/60 shadow-sm">
        <NavLink to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#047857] flex items-center justify-center p-1.5 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#34d399]" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white font-['Outfit'] leading-none">
              ElderCare <span className="text-[#34d399]">AI</span>
            </h1>
            <span className="text-[10px] text-emerald-200/90 font-medium">Rural Geriatric Care</span>
          </div>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink
            to="/alerts"
            aria-label="Caregiver Alerts"
            className="w-9 h-9 rounded-full bg-emerald-800/80 flex items-center justify-center text-white relative transition-all active:scale-95"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
              2
            </span>
          </NavLink>

          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            aria-label="Sign Out"
            className="w-9 h-9 rounded-full bg-emerald-800/80 flex items-center justify-center text-emerald-200 hover:text-white transition-all active:scale-95"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Desktop Forest Green Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen sticky top-0 bg-[#064e3b] text-white p-6 z-40 select-none shadow-2xl shrink-0">
        
        {/* Brand Header */}
        <div className="flex flex-col mb-8 px-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#047857] flex items-center justify-center p-2 shadow-md">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#34d399]" xmlns="http://www.w3.org/2000/svg">
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

        {/* Bottom Art & Motto */}
        <div className="pt-4 border-t border-emerald-800/60 flex flex-col items-center text-center">
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#059669] to-[#34d399] p-0.5 shadow-md overflow-hidden flex items-center justify-center">
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
            className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-300/80 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Navigation with iPhone / Android Safe-Area Inset Support */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#064e3b]/95 backdrop-blur-lg text-white flex items-center justify-around px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] z-40 shadow-2xl border-t border-emerald-700/60">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-[#34d399] font-bold' : 'text-emerald-200/75 hover:text-white'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </NavLink>

        <NavLink
          to="/medications"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-[#34d399] font-bold' : 'text-emerald-200/75 hover:text-white'
            }`
          }
        >
          <Pill className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Meds</span>
        </NavLink>

        <NavLink
          to="/sos"
          className="flex flex-col items-center justify-center -mt-5 active:scale-95 transition-transform"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 border-3 border-[#064e3b] animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold text-rose-300 mt-0.5">SOS</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-[#34d399] font-bold' : 'text-emerald-200/75 hover:text-white'
            }`
          }
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Records</span>
        </NavLink>

        <NavLink
          to="/family-access"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-[#34d399] font-bold' : 'text-emerald-200/75 hover:text-white'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Care Team</span>
        </NavLink>
      </nav>
    </>
  )
}
