import stringDate from './stringDate'
import endMonth from './endMonth'

export default function monthFields(number, aDate) {
  const today = new Date(aDate)

  const month = today.getMonth() - number

  const newMonth = today.setMonth(month)

  const date = new Date(newMonth)
  const firstDate = date.setDate(1)
  const lastDate = endMonth(firstDate)

  const min = stringDate(firstDate)
  const max = lastDate
  return { min, max, month: (month + 1).toString() }
}
