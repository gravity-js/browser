const CHILDREN_MAP = {}


// TODO, use node.chidlren instead CHILDREN_MAP[key] ???
const setNodeChildren = (key, node, children) => {
  const prevChildren = key in CHILDREN_MAP ? CHILDREN_MAP[key] : []

  children.forEach((child, index) => {
    const isSame = child === prevChildren[index]

    if (isSame) return

    if (typeof child === 'string') child = document.createTextNode(child)

    if (!node.children.length) {
      node.appendChild(child)
    } else {
      node.insertBefore(child, node.children[index])
    }
  })

  while (node.children.length > children.length) {
    node.children[children.length].remove()
  }

  CHILDREN_MAP[key] = children
}


export default setNodeChildren
