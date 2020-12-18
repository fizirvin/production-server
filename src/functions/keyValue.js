export default function keyValue(response, resines, key, min, max) {
  if (
    key === 'real' ||
    key === 'ng' ||
    key === 'ok' ||
    key === 'plan' ||
    key === 'wtime' ||
    key === 'dtime'
  ) {
    return (
      response
        .filter((filt) => filt.date >= min && filt.date <= max)
        .reduce((a, b) => {
          return +(a + +b[key]).toFixed(2)
        }, 0) || 0
    )
  }
  if (key === 'oee') {
    return +(
      (response
        .filter((filt) => filt.date >= min && filt.date <= max)
        .reduce((a, b) => {
          return +(a + +b.oee).toFixed(2)
        }, 0) || 0) /
        response.filter((filt) => filt.date >= min && filt.date <= max)
          .length || 0
    ).toFixed(2)
  }
  if (key === 'purge') {
    return (
      resines
        .filter((filt) => filt.date >= min && filt.date <= max)
        .reduce((a, b) => {
          return +(a + +b.purge).toFixed(2)
        }, 0) || 0
    )
  }
  return 0
}
