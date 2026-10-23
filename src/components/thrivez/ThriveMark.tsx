type ThriveMarkProps = {
  size?: number
  className?: string
}

export function ThriveMark({ size = 30, className }: ThriveMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M15 0.6C16.5 0.6 17.7 4.8 19.5 6.6C21.3 8.4 25.5 9.6 25.5 11.1C25.5 12.6 21.3 13.8 19.5 15.6C17.7 17.4 16.5 21.6 15 21.6C13.5 21.6 12.3 17.4 10.5 15.6C8.7 13.8 4.5 12.6 4.5 11.1C4.5 9.6 8.7 8.4 10.5 6.6C12.3 4.8 13.5 0.6 15 0.6Z"
        fill="#1D6FE8"
      />
      <path
        d="M15 8.4C15.48 11.16 18.84 14.52 21.6 15C18.84 15.48 15.48 18.84 15 21.6C14.52 18.84 11.16 15.48 8.4 15C11.16 14.52 14.52 11.16 15 8.4Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

type DecorativeBlobProps = {
  variant: 'reward' | 'balance'
  className?: string
}

export function DecorativeBlob({ variant, className }: DecorativeBlobProps) {
  if (variant === 'reward') {
    return (
      <svg
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <path
          d="M48 0C52.8 0 56.64 13.44 62.4 19.2C68.16 24.96 81.6 28.8 81.6 33.6C81.6 38.4 68.16 42.24 62.4 48C56.64 53.76 52.8 67.2 48 67.2C43.2 67.2 39.36 53.76 33.6 48C27.84 42.24 14.4 38.4 14.4 33.6C14.4 28.8 27.84 24.96 33.6 19.2C39.36 13.44 43.2 0 48 0Z"
          fill="#FFC6F8"
          opacity={0.7}
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M45 0C49.5 0 53.1 12.6 58.5 18C63.9 23.4 76.5 27 76.5 31.5C76.5 36 63.9 39.6 58.5 45C53.1 50.4 49.5 63 45 63C40.5 63 36.9 50.4 31.5 45C26.1 39.6 13.5 36 13.5 31.5C13.5 27 26.1 23.4 31.5 18C36.9 12.6 40.5 0 45 0Z"
        fill="#0F5D00"
        opacity={0.5}
      />
    </svg>
  )
}
