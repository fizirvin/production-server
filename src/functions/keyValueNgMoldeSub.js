export default function keyValueNgMoldeSub(ngs, defect, min, max, molde) {
  return (
    ngs
      .filter(
        (filt) =>
          filt.date >= min &&
          filt.date <= max &&
          filt.defect._id.toString() === defect.toString() &&
          filt.molde.toString() === molde.toString()
      )
      .reduce((a, b) => {
        return +(a + +b.pieces).toFixed(2)
      }, 0) || 0
  )
}
