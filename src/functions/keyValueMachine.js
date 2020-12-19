export default function keyValueMachine(
  response,
  resines,
  key,
  machine,
  min,
  max
) {
  if (
    key === 'real' ||
    key === 'ng' ||
    key === 'ok' ||
    key === 'plan' ||
    key === 'cycles' ||
    key === 'wtime' ||
    key === 'dtime'
  ) {
    return (
      response
        .filter(
          (filt) =>
            filt.date >= min &&
            filt.date <= max &&
            filt.report.machine._id === machine
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
            filt.date >= min &&
            filt.date <= max &&
            filt.report.machine._id === machine
        )
        .reduce((a, b) => {
          return +(a + +b.oee).toFixed(2)
        }, 0) || 0) /
        response.filter(
          (filt) =>
            filt.date >= min &&
            filt.date <= max &&
            filt.report.machine._id === machine
        ).length || 0
    ).toFixed(2)
  }
  if (key === 'purge') {
    return (
      resines
        .filter(
          (filt) =>
            filt.date >= min &&
            filt.date <= max &&
            filt.report.machine._id.toString() === machine.toString()
        )
        .reduce((a, b) => {
          return +(a + +b.purge).toFixed(2)
        }, 0) || 0
    )
  }
  return 0
}
