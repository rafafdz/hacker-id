import Link from 'next/link'
import { ReactNode } from 'react'

export default async function EventLayout({
  params,
  children,
}: {
  params: Promise<{ eventId: string }>
  children: ReactNode
}) {
  const { eventId } = await params

  return (
    <>
      <header className="m-3 items-center self-stretch sm:grid">
        <Link href="https://platan.us" className="justify-self-start text-xl">
          Platanus
        </Link>
        <h1 className="justify-self-center font-mono text-4xl">
          Hackathon {eventId}
        </h1>
        <div className="" />
      </header>
      {children}
    </>
  )
}
