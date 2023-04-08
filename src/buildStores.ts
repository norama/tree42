import { transformData } from 'data/transformer'
import { Node, ROOT_ID, initListeners } from 'stores/tree'

const buildStores = (data: Record<string, any>[]) => {
  const treeData = transformData(data)

  const rootNode = {
    data: { ID: ROOT_ID },
    children: treeData,
  }

  buildNode(rootNode)

  initListeners()
}

const buildNode = (node: TDeepNode) => {
  Node(
    node.data.ID,
    node.data,
    node.children.map((child) => child.data.ID)
  )

  node.children.forEach((child) => buildNode(child))
}

export default buildStores
