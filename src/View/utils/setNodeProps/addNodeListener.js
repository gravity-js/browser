import propKeyToListenerType from './propKeyToListenerType'
import checkIsValidListener from './checkIsValidListener'


const addNodeListener = (node, key, value) => {
  if (!checkIsValidListener(value)) return

  node.addEventListener(
    propKeyToListenerType(key),
    value,
  )
}


export default addNodeListener
