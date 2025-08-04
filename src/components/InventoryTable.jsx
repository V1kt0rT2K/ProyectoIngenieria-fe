import InventoryOptions from "./InventoryOptions";

const InventoryTable = ({ columns, data, to }) => {
    return (
        <table className="flex-grow w-full table-auto justify-self-center">
            <thead>
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">
                            {col.label}
                        </th>
                    ))}
                    {to && ( 
                        <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map((col, jdx) => (
                            <td key={jdx} className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                {typeof col.field === "function"
                                    ? col.field(row)
                                    : col.field.includes('.')
                                        ? col.field.split('.').reduce((obj, key) => obj?.[key], row)
                                        : row[col.field]}
                            </td>
                        ))}
                        {to && (  
                            <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                <InventoryOptions id={row.id} to={to} />
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InventoryTable;