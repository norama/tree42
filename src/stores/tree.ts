import { Atom, atom, computed, mapTemplate, keepMount } from 'nanostores'

export const Node = mapTemplate<TNode, [TData?, string[]?]>((newNode, id, data, childIds) => {
  newNode.setKey('data', data)
  newNode.setKey('childIds', childIds)
  keepMount(newNode)
  nodeIds.set([...nodeIds.get(), id])
})

export const nodeIds = atom<string[]>([])

export const ROOT_ID = ''

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
  nodeIds.set(nodeIds.get().filter((cid) => cid !== childId))
}
