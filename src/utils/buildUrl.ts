export function buildUrl(base: string, username: string | null) {
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
