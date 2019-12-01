const checkIsEqualProps = (a, b) => {
  if (a === b) return true

  if (
    a === null && b !== null ||
    a !== null && b === null
  ) return false

  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) return false

  return aKeys.every(key => a[key] === b[key])
}


export default checkIsEqualProps
