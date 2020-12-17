import keyValueMachine from './keyValueMachine'

export default function filterMachines(
  machines,
  fields,
  response,
  resines,
  rowKey
) {
  const data = machines.map((machine) => {
    const sub = fields.map((item) => {
      return {
        date: item.value,
        field: item.field,
        value: keyValueMachine(
          response,
          resines,
          rowKey,
          item.value,
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
  return data
}
