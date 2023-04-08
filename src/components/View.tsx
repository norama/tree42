import * as React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import { useStore } from '@nanostores/react'
import { Node, ROOT_ID, deleteChild, rootNode } from 'stores/tree'
import { HeaderRow, HeaderCell, DataRow, DataCell, DeleteCell } from 'components/Layout'

const View = () => {
  const root = useStore(rootNode())

  return root.childIds.length ? (
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 216, flexGrow: 1, width: '90vw', overflowY: 'auto' }}
    >
      <TableHeader id={root.childIds[0]} />
      {root.childIds.map((childId, index) => (
        <Item
          key={childId + '_' + index}
          id={childId}
          onDelete={() => deleteChild(ROOT_ID, childId)}
        />
      ))}
    </TreeView>
  ) : (
    <Empty />
  )
}

const Empty = () => <div>EMPTY TREE</div>

type IdProps = { id: string }
type DeleteProps = { onDelete: () => void }
type ItemProps = IdProps & DeleteProps

const Item = ({ id, onDelete }: ItemProps) => {
  const node = useStore(Node(id))

  return node.childIds.length ? (
    <TreeItem nodeId={id} label={<TableRow id={id} onDelete={onDelete} />}>
      <TableHeader id={node.childIds[0]} />
      {node.childIds.map((childId, index) => (
        <Item key={childId + '_' + index} id={childId} onDelete={() => deleteChild(id, childId)} />
      ))}
    </TreeItem>
  ) : (
    <TreeItem nodeId={id} label={<TableRow id={id} onDelete={onDelete} />} />
  )
}

const fields = (data: Record<string, string>) =>
  Object.keys(data)
    .filter((f) => f !== 'ID')
    .sort()

const TableHeader = ({ id }: IdProps) => {
  const node = useStore(Node(id))

  return (
    <HeaderRow>
      <HeaderCell key="ID">ID</HeaderCell>
      {fields(node.data).map((field) => (
        <HeaderCell key={field}>{field}</HeaderCell>
      ))}
      <HeaderCell key="">delete</HeaderCell>
    </HeaderRow>
  )
}

const TableRow = ({ id, onDelete }: ItemProps) => {
  const node = useStore(Node(id))

  return (
    <DataRow>
      <DataCell key="ID">{id}</DataCell>
      {fields(node.data).map((field) => (
        <DataCell key={field}>{node.data[field]}</DataCell>
      ))}
      <DataCell key="">
        <Delete onDelete={onDelete} />
      </DataCell>
    </DataRow>
  )
}

const Delete = ({ onDelete }: DeleteProps) => {
  return (
    <div onClick={() => onDelete()}>
      <DeleteCell />
    </div>
  )
}

export default View
