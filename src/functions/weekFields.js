import stringDate from './stringDate'

function todayIs(date, number) {
  const dayOfWeek = date.getDay()
  switch (dayOfWeek) {
    case 0:
      return number - 6
    case 1:
      return number - 0
    case 2:
      return number - 1
    case 3:
      return number - 2
    case 4:
      return number - 3
    case 5:
      return number - 4
    case 6:
      return number - 5
    default:
      return 0
  }
}

export default function weekFields(number, aDate) {
  const today = new Date(aDate)

  const timesNumber = number * 7
  const pastWeek = today.getDate() - timesNumber

  const daysToMonday = todayIs(today, 0)

  const newMondayDate = today.setDate(pastWeek + daysToMonday)

  const sun = new Date(newMondayDate)
  const sunDate = sun.getDate() + 6
  const newSunDate = sun.setDate(sunDate)

  const min = stringDate(newMondayDate)
  const max = stringDate(newSunDate)
  return { min, max }
}
