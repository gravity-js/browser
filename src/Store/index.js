import { PROPS_MAP, CHILDREN_MAP, STORES_MAP } from '../View/config/data'

import action from './action'


const updateComponent = component => component.$renderByStore()


class Store {
  constructor() {
    this.$components = {}
  }

  $updateWrapper = (method) => (...args) => {
    const result = method.apply(this, args);
    this.$updateComponents();
    return result;
  }

  $updateComponents = () => Object.values(this.$components).forEach(updateComponent)

  $connect = component => this.$components[component.$key] = component

  $disconnect = component => delete this.$components[component.$key]
}


export default Store

export {
  action,
}
