import { NODES_MAP, COMPONENTS_MAP } from '../config/data'

import setNodeProps from './setNodeProps'
import setNodeChildren from './setNodeChildren'


const createNode = (parentComponent, key, nodeTypeOrComponent, props, children) => {
	if (typeof nodeTypeOrComponent === 'string') {
		const node = document.createElement(nodeTypeOrComponent)

		NODES_MAP[key] = node

		setNodeProps(key, node, props)
		setNodeChildren(key, node, children)
		return node
	}

	const component = new nodeTypeOrComponent()
	COMPONENTS_MAP[key] = component
	delete parentComponent.$childrenComponentsToRemove[component.$key]
	parentComponent.$childrenComponents[component.$key] = component
	return component.$initialRenderByParent(props, children)
}


export default createNode
