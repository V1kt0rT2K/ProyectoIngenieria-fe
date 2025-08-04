import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Pagination from "react-js-pagination";
import toast, { Toaster } from 'react-hot-toast';
import ProviderService from '../../utils/service/ProviderService';
import DropDown from "../../components/DropDown";

const UpdateProviderModal = ({ isOpen, onClose, idProvider, isEnabled, reloadProviders }) => {
    if (!isOpen) return null;
    
    const updateProvider = async () => {
        const payload = {
            idProvider: idProvider,
            enabled: !isEnabled
        };

        try {
            const response = await ProviderService.updateProviderStatus(payload);
            if (!response.hasError) {
                toast.success("Proveedor actualizado con éxito.");
                onClose();
                await reloadProviders();
            } else {
                toast.error(response.meta.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar proveedor.");
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    width: '80%', // Añade un ancho máximo
                    maxWidth: '400px', // Ancho máximo para no hacerlo muy ancho
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Centra horizontalmente los elementos hijos
                    gap: '20px', // Espacio uniforme entre elementos
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col justify-center w-full'>
                    <p className="text-center my-5">¿Está seguro de que desea actualizar el proveedor?</p>
                    <div className="flex items-center justify-center space-x-4">
                        <button onClick={updateProvider} className="bg-orange-700 py-1 px-3 border text-white font-semibold rounded">Aceptar</button>
                        <button onClick={onClose} className="bg-orange-700 py-1 px-3 border text-white font-semibold rounded">Cancelar</button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                    }}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const ProviderOptions = ({ id, isEnabled, onToggleStatus }) => {

    if (!isEnabled) {
        return (
            <button
                onClick={() => onToggleStatus(id, isEnabled, 1)}
                className="w-full px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:bg-orange-800 rounded"
            >
                Habilitar
            </button>
        );
    }
    return (
        <DropDown links={[
            <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="view_provider" state={{ id: id }}>Ver Detalles</Link>,
            <Link className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900" to="edit_provider" state={{ id: id }}>Editar</Link>,
            <button
                onClick={() => onToggleStatus(id, isEnabled, 0)}
                className="w-full block px-4 py-2 font-semibold text-md text-white bg-red-700 hover:cursor-pointer hover:bg-orange-900">
                Deshabilitar
            </button>
        ]} />
    );
};

const AdminProvidersPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [enabled, setEnabled] = useState(null);

    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState(1);
    const [searchBox, setSearchBox] = useState("");
    const [sort, setSort] = useState("0");
    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);

    const [totalRows, setTotalRows] = useState(0);

    const inputRef = useRef();
    const [input, setInput] = useState(null);

    const [providers, setProviders] = useState([]);
    const currentData = useRef([]);

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (searchBox === "") {
                setProviders(currentData.current);
            } else {
                ProviderService.searchProvider(searchBox).then(response => {
                    if (!response.hasError) {
                        setProviders(response.data);
                    } else {
                        setProviders([]);
                    }
                });
            }
        }, 500);

        return () => clearTimeout(timeOut);
    }, [searchBox]);

    const loadProviders = async () => {
        setLoading(true);

        setProviders([]);
        const response = await ProviderService.getAllProviders(page, size, sort, statusFilter);

        if (!response.hasError && response.data) {
            setProviders(response.data.data);
            setTotalRows(response.data.totalItems);
            currentData.current = response.data.data;
        }

        setLoading(false);
    };



    useEffect(() => {
        loadProviders();
        console.log("ejectuado.");
    }, [page, size, sort, statusFilter]);

    const toggleProviderStatus = async (idProvider, enabled) => {
        setSelectedProvider(idProvider);
        setEnabled(enabled);
        setShowModal(true);
        console.log(enabled);
    };

    return (
        <>
            <UpdateProviderModal
                isEnabled={enabled}
                idProvider={selectedProvider}
                onClose={handleCloseModal}
                isOpen={showModal}
                reloadProviders={loadProviders}
            />
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div class="flex w-full space-x-24">
                        {/* <input ref={inputRef} onInput={() => setInput(inputRef.current.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar proveedores" /> */}
                        <input value={searchBox} onInput={(e) => setSearchBox(e.target.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Buscar por proveedor..." />
                        <select
                            className="focus:outline-none flex-grow bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md"
                            value={statusFilter}
                            onChange={e => { setStatusFilter(Number(e.target.value)) }}
                        >
                            <option value="1">Proveedores habilitados</option>
                            <option value="0">Proveedores deshabilitados</option>
                        </select>
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
                                                            <ProviderOptions
                                                                id={prov.idProvider}
                                                                isEnabled={prov.isEnabled}
                                                                onToggleStatus={toggleProviderStatus}
                                                            />
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

export default AdminProvidersPage;