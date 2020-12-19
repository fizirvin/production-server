import weekDate from './weekDate'

export default function setFields(period, today) {
  if (period === 'day') {
    const monday = weekDate(1, today)
    const tuesday = weekDate(2, today)
    const wednesday = weekDate(3, today)
    const thursday = weekDate(4, today)
    const friday = weekDate(5, today)
    const saturday = weekDate(6, today)
    const sunday = weekDate(7, today)

    const fields = [
      // { field: 'Production by', value: filter.toUpperCase() },
      { field: 'Mon', value: monday, max: monday, min: monday },
      { field: 'Tue', value: tuesday, max: tuesday, min: tuesday },
      { field: 'Wed', value: wednesday, max: wednesday, min: wednesday },
      { field: 'Thu', value: thursday, max: thursday, min: thursday },
      { field: 'Fri', value: friday, max: friday, min: friday },
      { field: 'Sat', value: saturday, max: saturday, min: saturday },
      { field: 'Sun', value: sunday, max: sunday, min: sunday }
      // { field: 'Total', value: 'Week' }
    ]
    return fields
  }
}
