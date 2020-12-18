export default function keyValueDefect(ngs, defect, min, max) {
  return (
    ngs
      .filter(
        (filt) =>
          filt.date >= min && filt.date <= max && filt.defect._id === defect
      )
      .reduce((a, b) => {
        return +(a + +b.pieces).toFixed(2)
      }, 0) || 0
  )
}
