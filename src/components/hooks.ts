import { useRef, useEffect, useState } from 'react'
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
  const [deletingChildId, setDeletingChildId] = useState<string | null>(null)

  return {
    deleteChild: async (id: string, childId: string) => {
      if (!isMounted) {
        return
      }
      setDeletingChildId(childId)
      await deleteChild(id, childId)
      if (!isMounted) {
        return
      }
      setDeletingChildId(null)
    },
    deletingChildId,
  }
}
