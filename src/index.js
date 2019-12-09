import Store, { action } from './Store'
import View from './View'
import getOrCreateNode from './View/utils/getOrCreateNode'


const mount = (component, targetNode=window.document.body) => {
  const node = component.$initialRenderByParent({}, [])
  
  // THERE
  targetNode.appendChild(node)
  component.$mounted()
}

const unmount = () => {
  console.log('const unmount = () => {}')
}

// TODO refactor structure of exports
export {
  mount,
  unmount,
  Store,
  View,
  action,
}

export default getOrCreateNode
