export default function keyValueNgMachineSub(ngs, defect, min, max, machine) {
  return (
    ngs
      .filter(
        (filt) =>
          filt.date >= min &&
          filt.date <= max &&
          filt.defect._id.toString() === defect.toString() &&
          filt.report.machine._id.toString() === machine.toString()
      )
      .reduce((a, b) => {
        return +(a + +b.pieces).toFixed(2)
      }, 0) || 0
  )
}
