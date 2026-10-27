import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Bell, User } from 'lucide-react'
import { Footer } from './Footer'
import { NotificationsModal } from './NotificationsModal'
import { ThriveLogo } from './thrivez/ThriveLogo'
import { NAV_ITEMS } from '../lib/constants'
import { INITIAL_NOTIFICATIONS } from '../lib/notifications'

export function AppLayout() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-black/8 bg-maroon">
        <div className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8">
          <div className="flex shrink-0 items-center gap-2">
            <ThriveLogo size="toolbar" />
            <span className="hidden text-xs font-medium leading-[18px] text-white/60 sm:inline">Compass for Couples</span>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {NAV_ITEMS.map(({ id, label, path }) => (
              <NavLink
                key={id}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  [
                    'flex items-center rounded-full px-4 py-2 text-[13px] font-medium leading-[19.5px] transition-colors',
                    isActive
                      ? 'bg-pink text-maroon'
                      : 'text-white/60 hover:text-white',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="relative flex size-10 items-center justify-center rounded-full bg-black/20 hover:bg-black/30"
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            >
              <Bell className="size-[17px] fill-black text-black" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-pink" />
              )}
            </button>
            <div className="flex items-center gap-2 rounded-full border border-pink/60 py-1.5 pl-3.5 pr-2">
              <span className="hidden text-xs font-medium leading-[18px] text-white/70 sm:inline">demo-user</span>
              <span className="flex size-7 items-center justify-center rounded-full bg-pink">
                <User className="size-4 fill-maroon text-maroon" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <NotificationsModal
        open={notificationsOpen}
        notifications={notifications}
        onClose={() => setNotificationsOpen(false)}
        onMarkAllRead={handleMarkAllRead}
      />
    </div>
  )
}
