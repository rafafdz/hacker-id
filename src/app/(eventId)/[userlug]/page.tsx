import { notFound } from 'next/navigation'
import { FaGithub, FaLinkedin, FaVoteYea } from 'react-icons/fa'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/Button'
import { buildUrl } from '@/utils/buildUrl'
import { GithubAvatar } from '@/components/GithubAvatar'

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
    <section className="flex flex-col items-center gap-5 rounded-[10%] border border-primary bg-foreground p-10">
      <header className="flex flex-col items-center">
        <GithubAvatar className="" username={githubUsername} size={200} />
        <h1 className="font-mono text-3xl">{name}</h1>
        <p className="font-mono text-xl">@{githubUsername}</p>
        {proyectId ? <p className="font-mono text-2xl">{proyectId}</p> : null}
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
