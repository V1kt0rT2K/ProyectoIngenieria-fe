import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ClientOptions from "../../components/ClientOptions";
import ClientService from "../../utils/service/ClientService";
import Pagination from "react-js-pagination";

const ClientsPage = () => {
    const [loading, setLoading] = useState(true);

    const [searchBox, setSearchBox] = useState(null);

    const [sort, setSort] = useState("0");
    const [size, setSize] = useState(4);
    const [page, setPage] = useState(1);

    const [totalRows, setTotalRows] = useState(0);

    const [clients, setClients] = useState([]);

    useEffect(() => {
        setLoading(true);

        ClientService.getAll(page, size, sort).then(response => {
            if (!response.hasError) {
                setClients(response.data.data);
                setTotalRows(response.data.totalItems);
            }
        });

        setLoading(false);
    }, [page, size, sort]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <input value={searchBox} onInput={(e) => { }} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar clientes" />
                        <Link to="new_client" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Registar cliente</Link>
                    </div>
                    <div>
                        <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                            <option value="0">Descendente</option>
                            <option value="1">Ascendente</option>
                        </select>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Clientes</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Identidad</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Nombre</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Contacto</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Direccion</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clients
                                                .map((client, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.identification ?? "_"}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.fullName ?? "_"}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.contact ?? "_"}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.address ?? "_"}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md"><ClientOptions id={client.idClient} /></td>
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
                            <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={totalRows}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber)=>{setPage(pageNumber)}}
                            innerClass="flex list-none rounded-md overflow-hidden shadow-sm"
                            itemClass="flex items-center justify-center"
                            linkClass="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                            activeLinkClass="px-3 py-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                            disabledClass="opacity-50 cursor-not-allowed"
                            prevPageText="<<"
                            nextPageText=">>"
                            firstPageText="Primera"
                            lastPageText="Última"
                            />
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ClientsPage;