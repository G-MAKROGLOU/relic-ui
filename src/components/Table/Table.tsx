import React from "react";


export type Column = {
    label: string,
    index: string,
    key: number
}


export type TableProps = {
    columns:Column[],
    rows:any[]
}


export const Table: React.FC<TableProps> = ({
    columns,
    rows
}) => {
    return (
        <table className="relic-table">
            <thead className="relic-table-thead">
                <tr>
                    <th className="relic-table-header">#</th>
                    {columns.map(th => (<th className="relic-table-header" key={th.key}>{th.label}</th>))}
                </tr>
            </thead>
            <tbody>
                {rows.map((tr, id) => {
                    let keys = Object.keys(tr);
                    return (
                        <tr className="relic-table-row">
                            <td className="relic-table-row-index" key={id}>{id+1}</td>
                            {columns.map(col => {
                                let elem;
                                keys.forEach(key => {
                                    if(col.index === key){
                                        elem = <td className="relic-table-data" key={tr[key]}>{tr[key]}</td>
                                    }
                                })
                                return elem
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}