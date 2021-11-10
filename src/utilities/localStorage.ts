// TODO: All of this needs safety checks. We're doing this shit live.
export function getLocalUser() {
  const userKey = Object.keys(window.localStorage).find((s: string) =>
    s.includes('currentUser')
  )
  return JSON.parse(window.localStorage.getItem(userKey as string) as string)
}

export function getSessionToken() {
  return getLocalUser()?.sessionToken
}