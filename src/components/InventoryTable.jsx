import InventoryOptions from "./InventoryOptions";

const reorder = (obj) => {
    if (!obj["id"]) {
        return obj;
    }
    const { id: _, ...ordered} = obj;
    ordered["id"] = obj["id"];
    return ordered;
};

const InventoryTable = ({ columns, data, to }) => {
    return (
        <>
            <table className="flex-grow w-full table-fixed justify-self-center">
                <thead>
                    <tr>
                        {columns.map(col => <th className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">{col}</th>)}
                        <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data
                        .map(reorder)
                        .map((row, idx) =>
                            <tr key={idx}>
                                {
                                    Object.entries(row).map(([key, val], jdx) =>
                                            key === "id"
                                                ? (
                                                    <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                        <InventoryOptions id={val} to={to} />
                                                    </td>
                                                )
                                                : <td key={jdx} className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{val}</td>
                                    )
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
};

export default InventoryTable;