const checkIsEqualChildren = (a, b) => {
  if (a === b) return true
  if (!a.length && !b.length) return true
  if (a.length !== b.length) return false

  return a.every((child, index) => child === b[index])
}


export default checkIsEqualChildren
