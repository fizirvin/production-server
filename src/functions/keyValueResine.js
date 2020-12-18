export default function keyValueResine(resines, material, min, max) {
  return (
    resines
      .filter(
        (filt) =>
          filt.date >= min && filt.date <= max && filt.resine._id === material
      )
      .reduce((a, b) => {
        return +(a + +b.purge).toFixed(2)
      }, 0) || 0
  )
}
