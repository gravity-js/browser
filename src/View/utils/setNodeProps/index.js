import checkIsListener from './checkIsListener'
import addNodeListener from './addNodeListener'
import checkIsEqualListeners from './checkIsEqualListeners'
import removeNodeListener from './removeNodeListener'


const PROPS_MAP = {}


// TODO, use node.attributes instead PROPS_MAP[key] ???
const setNodeProps = (key, node, props) => {
  const prevProps = key in PROPS_MAP ? PROPS_MAP[key] : null
  
  if (props !== null) Object.entries(props).forEach(prop => {
    const [propKey, propValue] = prop

    const isNew = prevProps === null || !(propKey in prevProps)
    const isListener = checkIsListener(propKey)

    if (isNew) {
      if (isListener) {
        addNodeListener(node, propKey, propValue)
        return
      }
        
      node.setAttribute(propKey, propValue)
      return
    }

    const prevPropValue = prevProps[propKey]
    delete prevProps[propKey]

    if (isListener) {
      if (!checkIsEqualListeners(prevPropValue, propValue)) {
        removeNodeListener(node, propKey, prevPropValue)
        addNodeListener(node, propKey, propValue)
      }
      return
    }
    
    if (prevPropValue !== propValue) node.setAttribute(propKey, propValue)
  })

  if (prevProps !== null) Object.entries(prevProps).forEach(prop => {
    const [propKey, propValue] = prop

    if (checkIsListener(propKey)) {
      removeNodeListener(key, node, propValue)
      return
    }

    node.removeAttribute(propKey)
  })

  PROPS_MAP[key] = props
}


export default setNodeProps
