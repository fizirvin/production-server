export default function defectList(ngs) {
  const defectsArray = ngs.map((items) => {
    return items.defect
  })

  const uniqueDefectsList = Array.from(
    new Set(
      defectsArray.map(({ _id }) => {
        const list = defectsArray.find((item) => item._id === _id)
        return list
      })
    )
  )

  return uniqueDefectsList
}
