export default function resinesList(resines) {
  const resinesArray = resines.map((items) => {
    return items.resine
  })

  const uniqueResinesList = Array.from(
    new Set(
      resinesArray.map(({ _id }) => {
        const list = resinesArray.find((item) => item._id === _id)
        return list
      })
    )
  )

  return uniqueResinesList
}
