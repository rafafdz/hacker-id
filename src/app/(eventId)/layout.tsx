import Link from 'next/link'
import { ReactNode } from 'react'

export default async function EventLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <header className="m-3 items-center self-stretch sm:grid">
        <Link href="https://platan.us" className="justify-self-start text-xl">
          Platanus
        </Link>
        <h1 className="justify-self-center font-mono text-4xl">
          Platanus Hack
        </h1>
        <div className="" />
      </header>
      {children}
    </>
  )
}
