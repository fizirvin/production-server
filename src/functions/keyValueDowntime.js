export default function keyValueDowntime(downtimes, issue, min, max) {
  return (
    downtimes
      .filter(
        (filt) =>
          filt.date >= min && filt.date <= max && filt.issue._id === issue
      )
      .reduce((a, b) => {
        return +(a + +b.mins).toFixed(2)
      }, 0) || 0
  )
}
