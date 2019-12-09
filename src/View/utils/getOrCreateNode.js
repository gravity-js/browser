import { NODES_MAP, COMPONENTS_MAP, PARENT_COMPONENTS } from '../config/data'

import filterInvalidChildren from './filterInvalidChildren'
import createNode from './createNode'
import getNode from './getNode'


const getOrCreateNode = (ownKey, nodeTypeOrComponent, props, ...children) => {
	children = filterInvalidChildren(children)

	const parentComponent = PARENT_COMPONENTS[PARENT_COMPONENTS.length - 1]

	const key = `${parentComponent.$key}.${ownKey}`

	const node = ((key in NODES_MAP) || (key in COMPONENTS_MAP)) ?
		getNode(parentComponent, key, nodeTypeOrComponent, props, children) :
		createNode(parentComponent, key, nodeTypeOrComponent, props, children)

	return node
}


export default getOrCreateNode
