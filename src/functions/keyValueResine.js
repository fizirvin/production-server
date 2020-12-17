export default function keyValueResine(resines, date, material) {
  return (
    resines
      .filter((filt) => filt.date === date && filt.resine._id === material)
      .reduce((a, b) => {
        return +(a + +b.purge).toFixed(2)
      }, 0) || 0
  )
}
