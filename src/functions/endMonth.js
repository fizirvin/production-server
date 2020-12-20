import { endOfMonth } from 'date-fns'
import stringDate from './stringDate'

export default function endMonth(date) {
  const end = endOfMonth(date)
  return stringDate(end)
}
