import { utcToZonedTime, format } from 'date-fns-tz'

export default function monthNumber(date) {
  const today = new Date(date)
  const mexDate = utcToZonedTime(today, 'America/Mexico_City')
  return format(mexDate, 'MMM', { timeZone: 'America/Mexico_City' })
}
