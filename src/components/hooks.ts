import { useRef, useEffect } from 'react'
import { deletingChildIdAtom } from 'stores/state'
import { deleteChild } from 'stores/tree'

// https://developer.school/snippets/react/perform-an-action-when-component-is-mounted
export const useIsMounted = () => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export const useDeleteChild = () => {
  const isMounted = useIsMounted()

  return async (id: string, childId: string) => {
    if (!isMounted || deletingChildIdAtom.get() !== null) {
      return
    }
    deletingChildIdAtom.set(childId)
    await deleteChild(id, childId)
    if (!isMounted) {
      return
    }
    deletingChildIdAtom.set(null)
  }
}
