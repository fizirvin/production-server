import keyValueMolde from './keyValueMolde'

export default function filterMoldes(moldes, fields, response, rowKey) {
  const data = moldes.map((molde) => {
    const sub = fields.map((item) => {
      return {
        date: item.value,
        field: item.field,
        value: keyValueMolde(response, rowKey, molde._id, item.min, item.max)
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
}
