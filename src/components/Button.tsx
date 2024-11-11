import Link from 'next/link'
import { ReactNode } from 'react'

export function Button({
  href,
  children,
}: {
  href: string | null
  children: ReactNode
}) {
  if (href == null) {
    return false
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-0.5 rounded-xl border-2 border-primary px-2"
    >
      {children}
    </Link>
  )
}
