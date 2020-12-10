import weekDate from './weekDate'

export default function setFields(period, today, filter) {
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
      { field: 'Mon', value: monday },
      { field: 'Tue', value: tuesday },
      { field: 'Wed', value: wednesday },
      { field: 'Thu', value: thursday },
      { field: 'Fri', value: friday },
      { field: 'Sat', value: saturday },
      { field: 'Sun', value: sunday }
      // { field: 'Total', value: 'Week' }
    ]
    return fields
  }
}
