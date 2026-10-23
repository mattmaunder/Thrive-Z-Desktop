import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Bell,
  LayoutDashboard,
  Map,
  Target,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react'
import { Footer } from './Footer'
import { NotificationsModal } from './NotificationsModal'
import { ThriveLogo } from './thrivez/ThriveLogo'
import { NAV_ITEMS, type NavItem } from '../lib/constants'
import { INITIAL_NOTIFICATIONS } from '../lib/notifications'

const navIcons: Record<NavItem, typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  'vision-map': Map,
  goals: Target,
  roadmap: TrendingUp,
  accounts: Wallet,
}

export function AppLayout() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center gap-6 px-6">
          <div className="flex shrink-0 items-center gap-2">
            <ThriveLogo size="small" />
            <span className="pl-1 text-xs font-normal leading-[18px] text-black/40">Compass for Couples</span>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-1">
            {NAV_ITEMS.map(({ id, label, path }) => {
              const Icon = navIcons[id]
              return (
                <NavLink
                  key={id}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium leading-[19.5px] transition-colors',
                      isActive
                        ? 'bg-maroon text-white'
                        : 'text-black/55 hover:text-black/80',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`size-[15px] ${isActive ? '' : 'opacity-70'}`} />
                      {label}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setNotificationsOpen(true)}
              className="relative flex size-9 items-center justify-center rounded-full bg-black/[0.04] hover:bg-black/8"
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
            >
              <Bell className="size-[17px] text-black/55" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-teal" />
              )}
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border py-1.5 pl-3.5 pr-2.5">
              <span className="text-xs font-medium leading-[18px] text-black/55">demo-user</span>
              <span className="flex size-6 items-center justify-center rounded-full bg-lime">
                <User className="size-3 text-maroon" strokeWidth={2.5} />
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
