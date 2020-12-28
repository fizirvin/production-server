export default function keyValueModel(response, key, model, min, max) {
  if (
    key === 'real' ||
    key === 'ng' ||
    key === 'ok' ||
    key === 'plan' ||
    key === 'wtime' ||
    key === 'dtime' ||
    key === 'cycles'
  ) {
    return (
      response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.model._id === model
        )
        .reduce((a, b) => {
          return +(a + +b[key]).toFixed(2)
        }, 0) || 0
    )
  }
  if (key === 'oee') {
    const wtime =
      response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.model._id === model
        )
        .reduce((a, b) => {
          return +(a + +b.wtime).toFixed(2)
        }, 0) || 0
    const dtime =
      response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.model._id === model
        )
        .reduce((a, b) => {
          return +(a + +b.dtime).toFixed(2)
        }, 0) || 0
    const real =
      response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.model._id === model
        )
        .reduce((a, b) => {
          return a + +b.real
        }, 0) || 0
    const ok =
      response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.model._id === model
        )
        .reduce((a, b) => {
          return +(a + +b.ok).toFixed(0)
        }, 0) || 0
    const prod =
      response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.model._id === model
        )
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
    return oee
    // return +(
    //   (response
    //     .filter(
    //       (filt) =>
    //         filt.date >= min && filt.date <= max && filt.model._id === model
    //     )
    //     .reduce((a, b) => {
    //       return +(a + +b.oee).toFixed(2)
    //     }, 0) || 0) /
    //     response.filter(
    //       (filt) =>
    //         filt.date >= min && filt.date <= max && filt.model._id === model
    //     ).length || 0
    // ).toFixed(2)
  }
  if (key === 'purge') {
    return 0
  }
  return 0
}
