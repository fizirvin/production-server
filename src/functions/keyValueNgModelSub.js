export default function keyValueNgModelSub(ngs, defect, min, max, model) {
  return (
    ngs
      .filter(
        (filt) =>
          filt.date >= min &&
          filt.date <= max &&
          filt.defect._id.toString() === defect.toString() &&
          filt.model.toString() === model.toString()
      )
      .reduce((a, b) => {
        return +(a + +b.pieces).toFixed(2)
      }, 0) || 0
  )
}
