import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { buildUrl } from '@/utils/buildUrl'

export const runtime = 'edge'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export default async function ProfileImage({
  params,
}: {
  params: Promise<{ eventId: string; githubUsername: string }>
}) {
  const { eventId, githubUsername } = await params
  const githubProfileUrl = buildUrl('https://github.com/', githubUsername)
  const githubAvatarUrl = githubProfileUrl + '.png'

  const { data, error } = await supabase
    .from('Participant')
    .select()
    .eq('githubUsername', githubUsername.toLowerCase())
    .eq('eventId', eventId)

  if (error != null) {
    throw RangeError('Participante no encontrado')
  }

  if (data.length == 0) {
    notFound()
  }

  const { name, proyectId } = data[0]
  const response = await fetch(
    new URL('../../../../public/Oxanium.ttf', import.meta.url),
  )
  //const response = await fetch(new URL("/Oxanium.ttf"))
  console.log(response)
  const oxanium = await response.arrayBuffer()
  console.log(oxanium)

  const backgroundGradient = {
    backgroundImage: 'linear-gradient(to bottom right, #09090b, #18181b)',
  }
  const jsx = (
    <article
      tw="h-full w-full flex flex-col p-5 text-white items-center"
      style={backgroundGradient}
    >
      <img
        tw="absolute opacity-10 top-10 right-5 h-140"
        src={defaultUrl + '/banana.svg'}
      />
      <section tw="px-5 grow flex items-center self-stretch">
        <img
          tw="rounded-full mr-6"
          src={githubAvatarUrl}
          width={400}
          height={400}
        />
        <div tw="flex flex-col grow">
          <div tw="flex flex-col justify-center">
            <h1 tw="text-7xl text-mono text-[#ffec40] text-wrap">{name}</h1>
            <p tw="text-mono text-4xl">{'@' + githubUsername}</p>
          </div>
          <h2 tw="font-mono text-8xl self-center text-wrap uppercase">
            {proyectId}
          </h2>
        </div>
      </section>
      <footer tw="text-center text-mono text-4xl">platanus hack</footer>
    </article>
  )

  const fonts = [
    {
      name: 'Oxanium',
      data: oxanium,
    },
  ]

  return new ImageResponse(jsx, { width: 1200, height: 630, fonts })
}
