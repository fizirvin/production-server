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
    if (rowKey === 'oee') {
      const wtime =
        response
          .filter((filt) => filt.model._id === model._id)
          .reduce((a, b) => {
            return +(a + +b.wtime).toFixed(2)
          }, 0) || 0
      const dtime =
        response
          .filter((filt) => filt.model._id === model._id)
          .reduce((a, b) => {
            return +(a + +b.dtime).toFixed(2)
          }, 0) || 0
      const real =
        response
          .filter((filt) => filt.model._id === model._id)
          .reduce((a, b) => {
            return a + +b.real
          }, 0) || 0
      const ok =
        response
          .filter((filt) => filt.model._id === model._id)
          .reduce((a, b) => {
            return +(a + +b.ok).toFixed(0)
          }, 0) || 0
      const prod =
        response
          .filter((filt) => filt.model._id === model._id)
          .reduce((a, b) => {
            return +(a + +b.prod).toFixed(0)
          }, 0) || 0
      const time = wtime + dtime
      const preperf = (real / prod) * 100
      const perf = +preperf.toFixed(2) || 0
      const preav = (wtime / time) * 100
      const avail = +preav.toFixed(2) || 0
      const preq = (ok / real) * 100
      const qual = +preq.toFixed(2) || 0
      const preoee = (avail * perf * qual) / 10000
      const oee = +preoee.toFixed(2) || 0
      const subtotaloee = {
        field: 'total',
        value: oee
      }
      return { row: model.name, data: [...sub, subtotaloee] }
    }
    const subtotal = {
      field: 'total',
      value:
        sub.reduce((a, b) => {
          return +(a + +b.value).toFixed(2)
        }, 0) || 0
    }
    return { row: model.name, data: [...sub, subtotal] }
  })
  const data2 = data.sort((x, y) => {
    const valueA = y.data.find((d) => d.field === 'total').value
    const valueB = x.data.find((d) => d.field === 'total').value
    return valueA - valueB
  })

  return data2
}
