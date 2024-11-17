import Link from 'next/link'
import { ReactNode } from 'react'
import platanusLogoHorizontal from './platanus-logo-horizontal.svg'
import Image from 'next/image'

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
      <header className="m-3 grid items-center self-stretch">
        <Link href="https://platan.us" className="justify-self-start">
          <Image src={platanusLogoHorizontal} alt="Platanus" height={30} />
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
