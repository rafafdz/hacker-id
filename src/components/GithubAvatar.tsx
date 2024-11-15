import Image from 'next/image'
import { buildUrl } from '@/utils/buildUrl'

export function GithubAvatar({
  className = '',
  username,
  size,
}: {
  className: string
  username: string
  size: number | undefined
}) {
  const githubProfileUrl = buildUrl('https://github.com/', username)
  const githubAvatarUrl = githubProfileUrl + '.png'

  return (
    <Image
      className={'rounded-full ' + className}
      src={githubAvatarUrl}
      unoptimized={true}
      alt={'@' + username}
      width={size}
      height={size}
    />
  )
}
