export default function downtimeList(downtimes) {
  const downtimesArray = downtimes.map((items) => {
    return items.issue
  })

  const uniqueDowntimesList = Array.from(
    new Set(
      downtimesArray.map(({ _id }) => {
        const list = downtimesArray.find((item) => item._id === _id)
        return list
      })
    )
  )

  return uniqueDowntimesList
}
