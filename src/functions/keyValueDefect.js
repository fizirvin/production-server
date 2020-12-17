export default function keyValueDefect(ngs, date, defect) {
  return (
    ngs
      .filter((filt) => filt.date === date && filt.defect._id === defect)
      .reduce((a, b) => {
        return +(a + +b.pieces).toFixed(2)
      }, 0) || 0
  )
}
