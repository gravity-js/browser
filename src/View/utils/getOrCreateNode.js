import { NODES_MAP, COMPONENTS_MAP } from '../config/data'

import filterInvalidChildren from './filterInvalidChildren'
import createNode from './createNode'
import getNode from './getNode'


const getOrCreateNode = (parentComponent, ownKey, nodeTypeOrComponent, props, ...children) => {
	children = filterInvalidChildren(children)

	const key = `${parentComponent.$key}.${ownKey}`

	const node = ((key in NODES_MAP) || (key in COMPONENTS_MAP)) ?
		getNode(parentComponent, key, nodeTypeOrComponent, props, children) :
		createNode(parentComponent, key, nodeTypeOrComponent, props, children)

	return node
}


export default getOrCreateNode
