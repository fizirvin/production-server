export default function keyValueDowntimeSub(
  downtimes,
  issue,
  min,
  max,
  machine
) {
  return (
    downtimes
      .filter(
        (filt) =>
          filt.date >= min &&
          filt.date <= max &&
          filt.issue._id.toString() === issue.toString() &&
          filt.report.machine._id.toString() === machine.toString()
      )
      .reduce((a, b) => {
        return +(a + +b.mins).toFixed(2)
      }, 0) || 0
  )
}
