import Image from 'next/image'
import { buildUrl } from '@/utils/buildUrl'

export function GithubAvatar({
  username,
  className = '',
  size = 200,
}: {
  username: string
  className?: string
  size?: number
}) {
  const githubProfileUrl = buildUrl('https://github.com/', username)
  const githubAvatarUrl = githubProfileUrl + '.png'

  return (
    <Image
      className={'rounded-full ' + className}
      src={githubAvatarUrl}
      alt={'@' + username}
      width={size}
      height={size}
    />
  )
}
