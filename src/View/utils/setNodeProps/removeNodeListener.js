import propKeyToListenerType from './propKeyToListenerType'
import checkIsValidListener from './checkIsValidListener'


const removeNodeListener = (node, key, value) => {
  if (checkIsValidListener(value)) return

  node.removeEventListener(
    propKeyToListenerType(key), 
    value,
  )
}


export default removeNodeListener
