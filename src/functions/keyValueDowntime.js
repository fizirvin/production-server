export default function keyValueDowntime(downtimes, date, issue) {
  return (
    downtimes
      .filter((filt) => filt.date === date && filt.issue._id === issue)
      .reduce((a, b) => {
        return +(a + +b.mins).toFixed(2)
      }, 0) || 0
  )
}
