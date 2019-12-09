const filter = child => child instanceof Node || typeof child === 'string' || Array.isArray(child)


const filterInvalidChildren = children => children.filter(filter)


export default filterInvalidChildren
