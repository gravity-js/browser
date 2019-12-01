import Store, { action } from './Store'
import View from './View'


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
