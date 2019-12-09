import checkIsEqualProps from './utils/checkIsEqualProps'
import checkIsEqualChildren from './utils/checkIsEqualChildren'

import { PARENT_COMPONENTS } from './config/data'


let instanceCounter = 0

class View {
  constructor() {
    this.$key = instanceCounter++

    this._$props = null
    this._$children = null
    this._$stores = null
    this._$storesList = null

    this._$rootNode = null

    this.$isMounted = false

    this.$childrenComponentsToRemove = null
    this.$childrenComponents = {}
  }

  // STORES
  _$connectStores = (props, children) => {
    this._$stores = this.onCreate ? this.onCreate(props, children) : null
    if (this._$stores) {
      this._$storesList = Object.values(this._$stores)
      this._$storesList.forEach(store => store.$connect(this))
    }
  }

  _$disconnectStores = () => {
    if (this._$storesList) Object.values(this._$stores).forEach(store => store.$disconnect(this))
  }

  // UPDATES
  $initialRenderByParent = (props, children) => {
    this._$connectStores(props, children)
    return this._$render(props, children)
  }

  $renderByParent = (props, children) => {
    if (
      checkIsEqualProps(props, this._$props) &&
      checkIsEqualChildren(children, this._$children)
    ) return this._$rootNode

    return this._$render(props, children)
  }

  $renderByStore = () => this._$render(this._$props, this._$children)

  _$render = (props, children) => {
    if (
      this.beforeRender &&
      this.beforeRender(props, children) === false
    ) return this._$rootNode

    const prevProps = this._$props
    const prevChildren = this._$children

    this._$props = props
    this._$children = children


    this.$childrenComponentsToRemove = this.$childrenComponents
    this.$childrenComponents = {}

    PARENT_COMPONENTS.push(this)
    if (this.render) this._$rootNode = this.render()
    PARENT_COMPONENTS.pop()

    if (this.$isMounted){
      if (this.afterRender) this.afterRender()
      this._$notifyChildrenAboutMount()
      this._$notifyChildrenAboutUnmount()
    }

    return this._$rootNode
  }

  get props() {
    return this._$props
  }

  get children() {
    return this._$children
  }

  get stores () {
    return this._$stores
  }

  get isMounted () {
    return this.$isMounted
  }

  $mounted = () => {
    this.$isMounted = true
    if (this.afterRender) this.afterRender()
    this._$notifyChildrenAboutMount()
  }

  _$notifyChildrenAboutMount = () => {
    Object.values(this.$childrenComponents).forEach(component => {
      if (!component.$isMounted) component.$mounted()
    })
  }

  _$notifyChildrenAboutUnmount = () => {
    Object.values(this.$childrenComponentsToRemove).forEach(component => {
      if (component.$isMounted) component.$unmounted()
    })
  }

  $unmounted = () => {
    this.$isMounted = false
    if (this.onRemove) this.onRemove()
    this._$notifyChildrenAboutUnmount()
  }
}


export default View
