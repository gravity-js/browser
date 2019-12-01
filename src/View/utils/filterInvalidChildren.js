const filter = child => child instanceof Node || typeof child === 'string'


const filterInvalidChildren = children => children.filter(filter)


export default filterInvalidChildren
