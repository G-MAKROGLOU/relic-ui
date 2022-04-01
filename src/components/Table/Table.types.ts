export type Column = {
    label: string,
    index: string,
    key: number
}


export type TableProps = {
    columns:Column[],
    rows:any[]
}