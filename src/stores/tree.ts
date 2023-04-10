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

export const deleteChild = async (id: string, childId: string) =>
  new Promise<void>((resolve) => {
    setTimeout(async () => {
      console.log('DELETING ', childId)
      Node(id).setKey(
        'childIds',
        Node(id)
          .get()
          .childIds.filter((cid) => cid !== childId)
      )

      await _deleteSubTree(childId)

      resolve()
    }, 0)
  })

const _deleteSubTree = async (rootId: string) => {
  const deletedIds: string[] = []
  await _collectTree(rootId, deletedIds)
  console.log('deletedIds', deletedIds)
  nodeIds.set(nodeIds.get().filter((cid) => !deletedIds.includes(cid)))
  deletedIds.forEach((cid) => {
    delete Node.cache[cid]
  })
}

const _collectTree = async (id: string, treeIds: string[] = []) =>
  new Promise<void>((resolve) => {
    setTimeout(async () => {
      treeIds.push(id)
      await Promise.all(
        Node(id)
          .get()
          .childIds.map((childId) => _collectTree(childId, treeIds))
      )
      resolve()
    }, 0)
  })
