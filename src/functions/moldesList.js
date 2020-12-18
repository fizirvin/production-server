export default function moldesList(response) {
  const moldes = response.map((items) => {
    return items.molde
  })

  const uniqueMoldeList = Array.from(
    new Set(
      moldes.map(({ _id }) => {
        const list = moldes.find((item) => item._id === _id)
        return list
      })
    )
  )

  return uniqueMoldeList
}
