import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { Notification } from '../lib/notifications'

type NotificationsModalProps = {
  open: boolean
  notifications: Notification[]
  onClose: () => void
  onMarkAllRead: () => void
}

export function NotificationsModal({
  open,
  notifications,
  onClose,
  onMarkAllRead,
}: NotificationsModalProps) {
  const unreadCount = notifications.filter((n) => n.unread).length

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
      <button
        type="button"
        className="absolute inset-0 bg-navy/40"
        aria-label="Close notifications"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-none border border-[var(--color-border)] bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <div>
            <h2 id="notifications-title" className="text-lg font-medium text-navy">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <p className="text-sm text-muted">{unreadCount} unread</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-sm font-medium text-teal hover:underline"
              >
                Mark all read
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted hover:bg-[#ececf0] hover:text-navy"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <ul className="max-h-[420px] overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <li
                key={notification.id}
                className={[
                  'flex gap-4 border-b border-[var(--color-border)] px-6 py-4 last:border-b-0',
                  notification.unread ? 'bg-teal/[0.03]' : '',
                ].join(' ')}
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${notification.iconBg}`}
                >
                  <Icon className={`size-5 ${notification.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-navy">{notification.title}</p>
                    {notification.unread && (
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal" />
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-5 text-muted">{notification.message}</p>
                  <p className="mt-2 text-xs text-muted">{notification.time}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
