import React from "react";
import {TableProps} from './Table.types'




export const Table: React.FC<TableProps> = ({
    columns,
    rows
}) => {
    return (
        <table className="relic-table">
            <thead className="relic-table-thead">
                <tr>
                    <th className="relic-table-header">#</th>
                    {columns.map((th, index) => (<th className="relic-table-header" key={index}>{th.label}</th>))}
                </tr>
            </thead>
            <tbody>
                {rows.map((tr, id) => {
                    let keys = Object.keys(tr);
                    return (
                        <tr key={id} className="relic-table-row">
                            <td className="relic-table-row-index">{id+1}</td>
                            {columns.map(col => {
                                let elem;
                                keys.forEach((key, idx) => {
                                    if(col.index === key){
                                        elem = <td className="relic-table-data" key={idx}>{tr[key]}</td>
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