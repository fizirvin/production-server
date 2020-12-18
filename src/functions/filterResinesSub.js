import keyValueResineSub from './keyValueResineSub'

export default function filterResinesSub(machines, fields, resines, material) {
  const data = machines.map((machine) => {
    const sub = fields.map((item) => {
      return {
        date: item.value,
        field: item.field,
        value: keyValueResineSub(
          resines,
          material,
          item.min,
          item.max,
          machine._id
        )
      }
    })
    const subtotal = {
      field: 'total',
      value:
        sub.reduce((a, b) => {
          return +(a + +b.value).toFixed(2)
        }, 0) || 0
    }
    return { row: machine.number, data: [...sub, subtotal] }
  })
  return data.filter(
    (item) =>
      item.data.reduce((a, b) => {
        return +(a + +b.value).toFixed(2)
      }, 0) !== 0
  )
}
