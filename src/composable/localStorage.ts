export function useLocalStorage(key: string) {
  const data = localStorage.getItem(key)

  if (data !== null) {
    return JSON.parse(data)
  }

  return null
}
