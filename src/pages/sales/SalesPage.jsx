import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SaleOptions from "../../components/SaleOptions";

const Type = {
    RETAIL: "Minorista",
    WHOLESALE: "Mayorista",
};

const filters = Object.values(Type);

const ventas = [
  { idCheck: 1, idClient: 1001, total: 1500.75, date: "2025-07-01", status: "paid" },
  { idCheck: 2, idClient: 1002, total: 980.00, date: "2025-07-02", status: "pending" },
  { idCheck: 3, idClient: 1003, total: 2350.40, date: "2025-07-02", status: "paid" },
  { idCheck: 4, idClient: 1004, total: 510.90, date: "2025-07-03", status: "canceled" },
  { idCheck: 5, idClient: 1005, total: 1225.00, date: "2025-07-03", status: "paid" },
  { idCheck: 6, idClient: 1006, total: 845.20, date: "2025-07-04", status: "pending" },
  { idCheck: 7, idClient: 1001, total: 3000.00, date: "2025-07-05", status: "paid" },
  { idCheck: 8, idClient: 1007, total: 175.35, date: "2025-07-05", status: "canceled" },
  { idCheck: 9, idClient: 1008, total: 920.00, date: "2025-07-06", status: "pending" },
  { idCheck: 10, idClient: 1009, total: 1100.00, date: "2025-07-06", status: "paid" },
  { idCheck: 11, idClient: 1010, total: 1340.50, date: "2025-07-07", status: "paid" },
  { idCheck: 12, idClient: 1002, total: 450.75, date: "2025-07-08", status: "pending" },
  { idCheck: 13, idClient: 1003, total: 600.60, date: "2025-07-09", status: "paid" },
  { idCheck: 14, idClient: 1011, total: 2100.00, date: "2025-07-09", status: "paid" },
  { idCheck: 15, idClient: 1004, total: 1750.80, date: "2025-07-10", status: "canceled" },
  { idCheck: 16, idClient: 1005, total: 330.30, date: "2025-07-10", status: "paid" },
  { idCheck: 17, idClient: 1012, total: 1999.99, date: "2025-07-11", status: "pending" },
  { idCheck: 18, idClient: 1006, total: 875.00, date: "2025-07-12", status: "paid" },
  { idCheck: 19, idClient: 1013, total: 1540.45, date: "2025-07-12", status: "paid" },
  { idCheck: 20, idClient: 1007, total: 700.00, date: "2025-07-13", status: "pending" },
  { idCheck: 21, idClient: 1014, total: 1280.99, date: "2025-07-14", status: "paid" },
  { idCheck: 22, idClient: 1015, total: 199.99, date: "2025-07-14", status: "canceled" },
  { idCheck: 23, idClient: 1016, total: 875.75, date: "2025-07-15", status: "pending" },
  { idCheck: 24, idClient: 1017, total: 1675.00, date: "2025-07-15", status: "paid" },
  { idCheck: 25, idClient: 1008, total: 320.50, date: "2025-07-16", status: "pending" },
  { idCheck: 26, idClient: 1018, total: 1420.60, date: "2025-07-16", status: "paid" },
  { idCheck: 27, idClient: 1019, total: 630.00, date: "2025-07-17", status: "canceled" },
  { idCheck: 28, idClient: 1020, total: 890.40, date: "2025-07-17", status: "paid" },
  { idCheck: 29, idClient: 1009, total: 770.75, date: "2025-07-18", status: "paid" },
  { idCheck: 30, idClient: 1010, total: 1520.00, date: "2025-07-18", status: "pending" },
  { idCheck: 31, idClient: 1021, total: 2999.99, date: "2025-07-19", status: "paid" },
  { idCheck: 32, idClient: 1022, total: 490.20, date: "2025-07-19", status: "canceled" },
  { idCheck: 33, idClient: 1011, total: 1010.00, date: "2025-07-20", status: "paid" },
  { idCheck: 34, idClient: 1023, total: 380.85, date: "2025-07-20", status: "pending" },
  { idCheck: 35, idClient: 1003, total: 690.40, date: "2025-07-21", status: "paid" },
  { idCheck: 36, idClient: 1004, total: 1480.10, date: "2025-07-21", status: "paid" },
  { idCheck: 37, idClient: 1005, total: 210.99, date: "2025-07-22", status: "canceled" },
  { idCheck: 38, idClient: 1024, total: 805.00, date: "2025-07-22", status: "paid" },
  { idCheck: 39, idClient: 1025, total: 945.60, date: "2025-07-23", status: "pending" },
  { idCheck: 40, idClient: 1006, total: 1115.00, date: "2025-07-23", status: "paid" }
];

const N_TOTAL_ROWS = ventas.length;

const SalesPage = () => {
    const [loading, setLoading] = useState(true);

    const [filterBy, setFilterBy] = useState(null);

    const [size, setSize] = useState(15);
    const [page, setPage] = useState(1);

    const [sales, setSales] = useState([]);

    useEffect(() => {
        setLoading(true);

        setSales(ventas.slice(size * (page - 1), page * size));
        setTimeout(() => setLoading(false), 1000);
    }, [page]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <select className="focus:outline-none flex-grow bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md">
                            <option onClick={() => setFilterBy(null)}>
                                {filterBy ? "Mostrar todas" : "Filtrar ventas"}
                            </option>
                            {
                                filters.map((filter, idx) =>
                                    <option
                                        key={idx}
                                        onClick={() => setFilterBy(filter)}
                                    >
                                        {filter}
                                    </option>
                                )
                            }
                        </select>
                        <Link to="new_sale" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Nueva venta</Link>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Historial de ventas</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">No. de factura</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Id cliente</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Monto</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Fecha</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Estado</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sales
                                                .map((sale, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.idCheck}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.idClient}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.total}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.date}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {sale.status}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <SaleOptions idSale={sale.idCheck} />
                                                        </td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
                {
                    !loading
                    && (
                        <div className="flex justify-center space-x-4">
                            {
                                [...Array(Math.floor(N_TOTAL_ROWS / size)).keys()].map(n =>
                                    <button
                                        className={`text-orange-800 ${page == n + 1 ? "font-extrabold bg-orange-400 rounded px-1" : ""}`}
                                        onClick={() => { setPage(n + 1); }}
                                    >
                                        {n + 1}
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default SalesPage;