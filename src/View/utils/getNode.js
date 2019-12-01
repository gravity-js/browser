import { NODES_MAP, COMPONENTS_MAP } from '../config/data'

import setNodeProps from './setNodeProps'
import setNodeChildren from './setNodeChildren'


const getNode = (parentComponent, key, nodeTypeOrComponent, props, children) => {
	if (typeof nodeTypeOrComponent === 'string') {
		const node = NODES_MAP[key]
		
		setNodeProps(key, node, props)
		setNodeChildren(key, node, children)

		return node
	}

	const component = COMPONENTS_MAP[key]
	delete parentComponent.$childrenComponentsToRemove[component.$key]
	parentComponent.$childrenComponents[component.$key] = component
	return component.$renderByParent(props, children)
}


export default getNode
