export function formatTime(time: string): string {
  if (!time) return ''
  const [hourStr, minuteStr] = time.split(':')
  const hour = parseInt(hourStr, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  const minutes = minuteStr === '00' ? '' : `:${minuteStr}`
  return `${displayHour}${minutes} ${ampm}`
}
