import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Fingerprint, User } from 'lucide-react'
import { THRIVE_LOGO } from '../lib/constants'

type AuthMode = 'password' | 'passkey'

export function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('password')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = () => {
    navigate('/dashboard')
  }

  return (
    <div className="gradient-login-bg relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md">
        <div className="rounded-none border border-[var(--color-border)] bg-white p-8 shadow-[0_25px_25px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col items-center text-center">
            <img src={THRIVE_LOGO} alt="Thrive Bank" className="h-12 w-auto" />
            <h1 className="mt-4 text-2xl font-medium text-navy">Welcome to Thrive Compass</h1>
            <p className="mt-2 text-sm text-muted">Sign in to continue your financial journey</p>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              type="button"
              onClick={() => setMode('password')}
              className={[
                'flex-1 rounded-xl py-2 text-sm font-medium transition-colors',
                mode === 'password' ? 'gradient-primary text-white' : 'bg-[#ececf0] text-muted',
              ].join(' ')}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setMode('passkey')}
              className={[
                'flex-1 rounded-xl py-2 text-sm font-medium transition-colors',
                mode === 'passkey' ? 'gradient-primary text-white' : 'bg-[#ececf0] text-muted',
              ].join(' ')}
            >
              Passkey
            </button>
          </div>

          {mode === 'password' ? (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSignIn()
              }}
            >
              <div>
                <label htmlFor="username" className="text-sm font-medium text-navy">
                  Username
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-surface py-3 pl-10 pr-4 text-base text-navy placeholder:text-navy/50 outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-navy">
                  Password
                </label>
                <div className="relative mt-2">
                  <svg
                    className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-surface py-3 pl-10 pr-12 text-base text-navy placeholder:text-navy/50 outline-none focus:border-teal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="gradient-primary w-full rounded-xl py-3 text-base font-medium text-white"
              >
                Sign In
              </button>

              <p className="text-center">
                <button type="button" className="text-sm text-teal hover:underline">
                  Forgot password?
                </button>
              </p>
            </form>
          ) : (
            <div className="mt-6 flex flex-col items-center pb-8 pt-4 text-center">
              <div className="gradient-primary flex size-20 items-center justify-center rounded-full">
                <Fingerprint className="size-10 text-white" />
              </div>
              <h2 className="mt-4 text-lg font-medium text-navy">Sign in with Passkey</h2>
              <p className="mt-2 max-w-xs text-sm text-muted">
                Use your device&apos;s biometric authentication or security key
              </p>
              <button
                type="button"
                onClick={handleSignIn}
                className="gradient-primary mt-6 rounded-xl px-8 py-3 text-base font-medium text-white"
              >
                Authenticate with Passkey
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-[var(--color-border)] pt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{' '}
            <button type="button" className="text-teal hover:underline">
              Sign up
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          Your connection is secure and encrypted
        </p>
      </div>
    </div>
  )
}
