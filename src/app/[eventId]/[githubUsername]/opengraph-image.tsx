import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { buildUrl } from '@/utils/buildUrl'

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

  const jsx = (
    <article tw="h-full w-full flex flex-col bg-[#18181b] p-5 text-white items-center">
      <img
        tw="absolute opacity-10 top-10 right-5 h-140"
        src={defaultUrl + '/banana.svg'}
      />
      <section tw="px-10 grow flex items-center self-stretch">
        <img
          tw="rounded-full object-scale-down"
          src={githubAvatarUrl}
          width={400}
          height={400}
        />
        <div tw="flex flex-col grow">
          <div tw="flex flex-col justify-center">
            <h1 tw="text-7xl text-mono text-[#ffec40] text-wrap">{name}</h1>
            <p tw="text-mono text-4xl text-ellipsis">{'@' + githubUsername}</p>
          </div>
          <h2 tw="font-mono text-8xl self-center text-wrap uppercase">
            {proyectId}
          </h2>
        </div>
      </section>
      <footer tw="text-center text-mono text-4xl">platanus hack</footer>
    </article>
  )

  return new ImageResponse(jsx, { width: 1200, height: 630 })
}
