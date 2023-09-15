export function useRandomNumber(n: number) {
  const random = Math.random()
  const randomNumber = Math.floor(random * n)
  return randomNumber
}
