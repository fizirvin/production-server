import keyValueModel from './keyValueModel'

export default function filterModels(models, fields, response, rowKey) {
  const data = models.map((model) => {
    const sub = fields.map((item) => {
      return {
        date: item.value,
        field: item.field,
        value: keyValueModel(response, rowKey, model._id, item.min, item.max)
      }
    })
    const subtotal = {
      field: 'total',
      value:
        sub.reduce((a, b) => {
          return +(a + +b.value).toFixed(2)
        }, 0) || 0
    }
    return { row: model.name, data: [...sub, subtotal] }
  })
  return data
}
