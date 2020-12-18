export default function keyValueResineSub(
  resines,
  material,
  min,
  max,
  machine
) {
  return (
    resines
      .filter(
        (filt) =>
          filt.date >= min &&
          filt.date <= max &&
          filt.resine._id === material &&
          filt.report.machine._id.toString() === machine.toString()
      )
      .reduce((a, b) => {
        return +(a + +b.purge).toFixed(2)
      }, 0) || 0
  )
}
