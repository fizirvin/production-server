import weekDate from './weekDate'
import weekFields from './weekFields'
import weekNumber from './weekNumber'

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
      { field: 'Mon', value: monday, max: monday, min: monday },
      { field: 'Tue', value: tuesday, max: tuesday, min: tuesday },
      { field: 'Wed', value: wednesday, max: wednesday, min: wednesday },
      { field: 'Thu', value: thursday, max: thursday, min: thursday },
      { field: 'Fri', value: friday, max: friday, min: friday },
      { field: 'Sat', value: saturday, max: saturday, min: saturday },
      { field: 'Sun', value: sunday, max: sunday, min: sunday }
    ]

    return fields
  }
  if (period === 'week') {
    const currentWeek = weekFields(0, today)
    const oneWeekAgo = weekFields(1, today)
    const twoWeeksAgo = weekFields(2, today)
    const threeWeeksAgo = weekFields(3, today)
    const fourWeeksAgo = weekFields(4, today)
    // const fiveWeeksAgo = weekFields(5, today)
    // const sixWeeksAgo = weekFields(6, today)
    // const sevenWeeksAgo = weekFields(7, today)
    // const eightWeeksAgo = weekFields(8, today)
    // const nineWeeksAgo = weekFields(9, today)

    const fields = [
      // {
      //   field: 'Week1',
      //   value: weekNumber(nineWeeksAgo.min),
      //   max: nineWeeksAgo.max,
      //   min: nineWeeksAgo.min
      // },
      // {
      //   field: 'Week2',
      //   value: weekNumber(eightWeeksAgo.min),
      //   max: eightWeeksAgo.max,
      //   min: eightWeeksAgo.min
      // },
      // {
      //   field: 'Week3',
      //   value: weekNumber(sevenWeeksAgo.min),
      //   max: sevenWeeksAgo.max,
      //   min: sevenWeeksAgo.min
      // },
      // {
      //   field: 'Week4',
      //   value: weekNumber(sixWeeksAgo.min),
      //   max: sixWeeksAgo.max,
      //   min: sixWeeksAgo.min
      // },
      // {
      //   field: 'Week5',
      //   value: weekNumber(fiveWeeksAgo.min),
      //   max: fiveWeeksAgo.max,
      //   min: fiveWeeksAgo.min
      // },
      {
        field: 'Week1',
        value: weekNumber(fourWeeksAgo.min),
        max: fourWeeksAgo.max,
        min: fourWeeksAgo.min
      },
      {
        field: 'Week2',
        value: weekNumber(threeWeeksAgo.min),
        max: threeWeeksAgo.max,
        min: threeWeeksAgo.min
      },
      {
        field: 'Week3',
        value: weekNumber(twoWeeksAgo.min),
        max: twoWeeksAgo.max,
        min: twoWeeksAgo.min
      },
      {
        field: 'Week4',
        value: weekNumber(oneWeekAgo.min),
        max: oneWeekAgo.max,
        min: oneWeekAgo.min
      },
      {
        field: 'Week5',
        value: weekNumber(currentWeek.min),
        max: currentWeek.max,
        min: currentWeek.min
      }
    ]
    return fields
  }
}
