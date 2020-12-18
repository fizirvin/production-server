export default function moldesList(response) {
  const models = response.map((items) => {
    return items.model
  })

  const uniqueModelList = Array.from(
    new Set(
      models.map(({ _id }) => {
        const list = models.find((item) => item._id === _id)
        return list
      })
    )
  )

  return uniqueModelList
}
