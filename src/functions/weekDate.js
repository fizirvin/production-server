import stringDate from './stringDate'

function todayIs(date) {
  const dayOfWeek = date.getDay()
  switch (dayOfWeek) {
    case 0:
      return 7
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 3
    case 4:
      return 4
    case 5:
      return 5
    case 6:
      return 6
    default:
      return 6
  }
}

export default function weekDate(number, aDate) {
  const today = new Date(aDate)
  const dayOfMonth = today.getDate()
  const difference = number - todayIs(today)
  const set = dayOfMonth + difference
  const date = today.setDate(set)

  return stringDate(date)
}
