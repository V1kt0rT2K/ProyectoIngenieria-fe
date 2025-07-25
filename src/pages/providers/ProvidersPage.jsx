import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProviderOptions from "../../components/ProviderOptions";
import ProvidersService from "../../utils/service/ProviderService";
/*
const proveedores = [
    { id: 1, name: "Proveedor A", contact: "Juan Pérez", category: "Carnes", product: "Carne de res" },
    { id: 2, name: "Proveedor B", contact: "Laura Gómez", category: "Carnes", product: "Carne de cerdo" },
    { id: 3, name: "Proveedor C", contact: "carnes_c@gmail.com", category: "Carnes", product: "Carne de pollo" },
    { id: 4, name: "Proveedor D", contact: "0987-123456", category: "Insumos", product: "Bolsas plásticas" },
    { id: 5, name: "Proveedor E", contact: "proveedore@empresa.com", category: "Alimentos", product: "Condimentos" },
    { id: 6, name: "Proveedor F", contact: "Carlos López", category: "Insumos", product: "Guantes de látex" },
    { id: 7, name: "Proveedor G", contact: "proveedorg@supply.com", category: "Carnes", product: "Carne de cordero" },
    { id: 8, name: "Proveedor H", contact: "Ana Ruiz", category: "Alimentos", product: "Salsas preparadas" },
    { id: 9, name: "Proveedor I", contact: "504-99887766", category: "Limpieza", product: "Desinfectante" },
    { id: 10, name: "Proveedor J", contact: "ventasJ@empresa.com", category: "Limpieza", product: "Detergente industrial" }
];
*/
const ProvidersPage = () => {
    const [loading, setLoading] = useState(true);

    const inputRef = useRef();
    const [input, setInput] = useState(null);

    const [providers, setProviders] = useState([]);

useEffect(() => {
    const loadProviders = async () => {
        const data = await fetchProviders();
        setProviders(data);
        setLoading(false);
    };

    loadProviders();
    
}, []);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full">
                        <input ref={inputRef} onInput={() => setInput(inputRef.current.value)} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar proveedores" />
                        <Link to="" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Agregar</Link>
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
                                                            {prov.name}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.rtn}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.contact}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {prov.location}
                                                        </td>                                                        
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5">
                                                            <ProviderOptions id={prov.id} />
                                                        </td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
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
    } }catch (error) {
        console.error("Error fetching providers:", error);
        return [];
    }};


export default ProvidersPage;