declare type TData = Record<string, string>

declare type TNode = {
  data: TData
  childIds: string[]
}

declare type TDeepNode = {
  data: TData
  children: TDeepNode[]
}

declare type TCounter = {
  value: number
}
