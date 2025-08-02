import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProviderOptions from "../../components/ProviderOptions";
import ProvidersService from "../../utils/service/ProviderService";
import Pagination from "react-js-pagination";

const ProvidersPage = () => {
    const [loading, setLoading] = useState(true);

    const [sort, setSort] = useState("0");
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);

    const [totalRows, setTotalRows] = useState(0);

    const inputRef = useRef();
    const [input, setInput] = useState(null);

    const [providers, setProviders] = useState([]);


    useEffect(() => {
        const loadProviders = async () => {
            setLoading(true);

            const response = await ProvidersService.getAllProviders(page, size, sort);

            if (!response.hasError && response.data) {
                setProviders(response.data.data);
                setTotalRows(response.data.totalItems);
            }

            setLoading(false);
        };

        loadProviders();
    }, [page, size, sort]);
 

    const deleteProvider = async (id) => {

        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este proveedor?");

        if (!confirmed) return;

        const payload = { idProvider: id };
        const response = await ProvidersService.deleteProvider(payload);
        if (!response.hasError) {
            setProviders(prev => prev.filter(provider => provider.id !== id));
        } else {
            console.error("Error al eliminar proveedor:", response.meta?.message);
        }
    };

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full">
                        <input ref={inputRef} onInput={() => setInput(inputRef.current.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar proveedores" />
                        <Link to="new_provider" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
                    </div>
                    <div>
                        <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                            <option value="0">Descendente</option>
                            <option value="1">Ascendente</option>
                        </select>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Informacion general</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">Nombre</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">RTN</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Contacto</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Ubicacion</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            providers
                                                .filter(prov => !input ? true : (new RegExp(`.*${input}.*`, "i")).test(prov.name + prov.contact))
                                                .map((prov, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.providerName}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.RTN}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.providerContact}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.location}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <ProviderOptions id={prov.idProvider} onDelete={deleteProvider} />
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
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={size}
                                totalItemsCount={totalRows}
                                pageRangeDisplayed={5}
                                onChange={(pageNumber) => { setPage(pageNumber) }}
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
const fetchProviders = async () => {
    try {
        const response = await ProvidersService.getAllProviders();

        if (!response.hasError && response.data) {
            return response.data.map(item => ({
                id: item.idProvider,
                name: item.providerName,
                rtn: item.RTN,
                contact: item.providerContact,
                location: item.location,
            }));
        }
    } catch (error) {
        console.error("Error fetching providers:", error);
        return [];
    }
};


export default ProvidersPage;