import InventoryOptions from "./InventoryOptions";

const InventoryTable = ({ columns, data, to }) => {

    console.log(columns,data,to);
    data.map((row,idx) => {
        //console.log(row);
        columns.map((col,jdx) => {
            //console.log(row.keys());
            console.log(row[col.field]);
        })
    })

    return (
        <table className="flex-grow w-full table-auto justify-self-center">
            <thead>
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">
                            {col.label}
                        </th>
                    ))}
                    <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => ( 
                    <tr key={idx}>
                        {columns.map((col, jdx) => (
                            <td key={jdx} className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                {col.field.includes('.') 
                                    ? col.field.split('.').reduce((obj, key) => obj?.[key], row)
                                    : row[col.field]}
                            </td>
                        ))}
                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                            <InventoryOptions id={row.id} to={to} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

    

export default InventoryTable;