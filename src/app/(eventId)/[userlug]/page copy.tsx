import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaVoteYea } from 'react-icons/fa'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/Button'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET!,
)

function buildUrl(base: string, username: string | null) {
  if (username == null) {
    return null
  }

  try {
    const url = new URL(username, base)
    return url.toString()
  } catch (TypeError) {
    return null
  }
}

export default async function ParticipantPage({
  params,
}: {
  params: Promise<{ userlug: string }>
}) {
  const { userlug } = await params

  const { data, error } = await supabase
    .from('Participant')
    .select()
    .eq('slug', userlug.toLowerCase())
    .limit(1)

  if (error != null) {
    throw RangeError('Participante no encontrado')
  }

  if (data.length == 0) {
    notFound()
  }

  const { name, proyectId, linkedinUsername, githubUsername } = data[0]

  const githubProfileUrl = buildUrl('https://github.com/', githubUsername)
  const githubAvatarUrl = githubProfileUrl + '.png'
  const linkedinProfileUrl = buildUrl(
    'https://linkedin.com/in/',
    linkedinUsername,
  )
  const projectUrl = buildUrl('https://vote.hack.platan.us/', proyectId)

  const buttonData = [
    githubUsername
      ? { text: 'Perfil de Github', icon: <FaGithub />, href: githubProfileUrl }
      : null,
    linkedinProfileUrl
      ? {
          text: 'Perfil de LinkedIn',
          icon: <FaLinkedin />,
          href: linkedinProfileUrl,
        }
      : null,
    {
      text: 'Página de Proyecto',
      icon: <FaVoteYea />,
      href: projectUrl,
    },
  ].filter((data) => data !== null)

  return (
    <section className="my-10 flex flex-col items-center gap-5">
      <header className="flex flex-col items-center">
        <Image
          className="rounded-full"
          src={githubAvatarUrl}
          unoptimized={true}
          alt="test"
          width={200}
          height={200}
        />
        <h1 className="font-mono text-3xl">{name}</h1>
        <p className="font-mono text-xl">@{userlug}</p>
      </header>

      <nav className="flex flex-col gap-2">
        {buttonData.map((data, index) => {
          return (
            <Button key={index} href={data.href}>
              {data.icon}
              <span className="flex-grow text-center text-primary">
                {data.text}
              </span>
            </Button>
          )
        })}
      </nav>
    </section>
  )
}
