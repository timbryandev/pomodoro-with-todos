export const millisToMinuteSeconds = (millis: number) => {
  const d = new Date(millis)

  let seconds = d.getSeconds().toString().padStart(2, '0')
  let minutes = d.getMinutes().toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}
