import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  PiggyBank,
  Shield,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react'

export type Notification = {
  id: string
  title: string
  message: string
  time: string
  unread: boolean
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Emergency Fund milestone',
    message: 'You\'ve reached 34% of your £25,000 emergency fund goal. Keep it up!',
    time: '2 hours ago',
    unread: true,
    icon: PiggyBank,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    id: '2',
    title: 'Spending worth discussing',
    message: 'A £87.50 restaurant charge was flagged as "Worth Discussing" — review with your partner.',
    time: 'Yesterday',
    unread: true,
    icon: AlertTriangle,
    iconBg: 'bg-warning/13',
    iconColor: 'text-warning',
  },
  {
    id: '3',
    title: 'Account synced successfully',
    message: 'Wells Fargo checking (••••9104) was linked and is now tracking in Compass.',
    time: '2 days ago',
    unread: true,
    icon: Wallet,
    iconBg: 'bg-teal/13',
    iconColor: 'text-teal',
  },
  {
    id: '4',
    title: 'Monthly savings on track',
    message: 'Your household is on pace to meet April savings targets. Combined rate: 34%.',
    time: '3 days ago',
    unread: false,
    icon: TrendingUp,
    iconBg: 'bg-teal/13',
    iconColor: 'text-teal',
  },
  {
    id: '5',
    title: 'Shared goal updated',
    message: 'Your partner added progress to the European Honeymoon goal — now 30% complete.',
    time: '5 days ago',
    unread: false,
    icon: Target,
    iconBg: 'bg-navy/13',
    iconColor: 'text-navy',
  },
  {
    id: '6',
    title: 'Secure sign-in detected',
    message: 'A new sign-in to Thrive Compass was detected from Chrome on macOS.',
    time: '1 week ago',
    unread: false,
    icon: Shield,
    iconBg: 'bg-navy/13',
    iconColor: 'text-navy',
  },
]
