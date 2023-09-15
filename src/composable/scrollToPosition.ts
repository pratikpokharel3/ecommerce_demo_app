export function useScrollToPosition(id: string) {
  const el = document.getElementById(id)

  if (el !== null) {
    const topPosition = el.offsetTop - 20
    window.scrollTo({ top: topPosition, behavior: 'smooth' })
  }
}
