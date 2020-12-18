export default function keyValueMolde(response, key, molde, min, max) {
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
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.molde._id === molde
        )
        .reduce((a, b) => {
          return +(a + +b[key]).toFixed(2)
        }, 0) || 0
    )
  }
  if (key === 'oee') {
    return +(
      (response
        .filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.molde._id === molde
        )
        .reduce((a, b) => {
          return +(a + +b.oee).toFixed(2)
        }, 0) || 0) /
        response.filter(
          (filt) =>
            filt.date >= min && filt.date <= max && filt.molde._id === molde
        ).length || 0
    ).toFixed(2)
  }
  if (key === 'purge') {
    return 0
  }
  return 0
}
