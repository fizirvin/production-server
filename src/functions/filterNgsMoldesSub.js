import keyValueNgMoldeSub from './keyValueNgMoldeSub'

export default function filterNgsMoldesSub(moldes, fields, ngs, defect) {
  const data = moldes.map((molde) => {
    const sub = fields.map((item) => {
      return {
        date: item.value,
        field: item.field,
        value: keyValueNgMoldeSub(ngs, defect, item.min, item.max, molde._id)
      }
    })
    const subtotal = {
      field: 'total',
      value:
        sub.reduce((a, b) => {
          return +(a + +b.value).toFixed(2)
        }, 0) || 0
    }

    return { row: molde.number, data: [...sub, subtotal] }
  })

  return data
    .filter(
      (item) =>
        item.data.reduce((a, b) => {
          return +(a + +b.value).toFixed(2)
        }, 0) !== 0
    )
    .sort((x, y) => {
      const valueA = y.data.find((d) => d.field === 'total').value
      const valueB = x.data.find((d) => d.field === 'total').value
      return valueA - valueB
    })
}
