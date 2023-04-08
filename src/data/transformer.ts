export const transformData = (data: Record<string, any>[]): TDeepNode[] =>
  data.map((item) => ({
    data: item.data,
    children: transformData(records(item.children)),
  }))

const records = (item: Record<string, any>) => {
  const key = Object.keys(item)[0] // 'has_nemesis' or 'has_secrete' or undefined if item is empty
  return key ? item[key].records : []
}
