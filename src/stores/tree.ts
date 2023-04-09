import { Atom, atom, computed, mapTemplate, keepMount } from 'nanostores'

export const Node = mapTemplate<TNode, [TData?, string[]?]>((newNode, id, data, childIds) => {
  newNode.setKey('data', data)
  newNode.setKey('childIds', childIds)
  keepMount(newNode) // otherwise it gets deleted suddenly - why?
  nodeIds.set([...nodeIds.get(), id])
})

export const nodeIds = atom<string[]>([])

export const ROOT_ID = ''

export const rootNode = () => Node(ROOT_ID)

export const result = computed<TDeepNode, Atom<string[]>>(nodeIds, () => {
  const toDeepNode = (id: string) => ({
    data: Node(id).get().data,
    children: Node(id)
      .get()
      .childIds.map((id) => toDeepNode(id)),
  })
  return toDeepNode(ROOT_ID)
})

export const initListeners = () => {
  result.subscribe((rootNode) => {
    console.log('result', rootNode)
  })
}

export const deleteChild = (id: string, childId: string) => {
  Node(id).setKey(
    'childIds',
    Node(id)
      .get()
      .childIds.filter((cid) => cid !== childId)
  )

  // recursively delete children
  // may take some time and has no implications to the UI
  // therefore run with timeout
  setTimeout(() => {
    _deleteSubTree(childId)
  }, 500)
}

const _deleteSubTree = (rootId: string) => {
  const deletedIds: string[] = []
  _collectTree(rootId, deletedIds)
  console.log('deletedIds', deletedIds)
  nodeIds.set(nodeIds.get().filter((cid) => !deletedIds.includes(cid)))
  deletedIds.forEach((cid) => {
    delete Node.cache[cid]
  })
}

const _collectTree = (id: string, treeIds: string[] = []) => {
  treeIds.push(id)
  Node(id)
    .get()
    .childIds.forEach((childId) => {
      _collectTree(childId, treeIds)
    })
}
