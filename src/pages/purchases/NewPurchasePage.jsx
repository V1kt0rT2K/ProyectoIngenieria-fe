import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import ArrayUtils from "../../utils/ArrayUtils";
import SupplyService from "../../utils/service/SupplyService";
import ProvidersService from "../../utils/service/ProviderService";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import PurchaseService from "../../utils/service/PurchaseService";
import { useNavigate } from "react-router-dom";

const setCheckSupplyType = (checkSupplies, idx, supplyType, supplies) => {
    console.log(supplies, supplyType);
    const supply = supplies.find(c => c.idSupply === supplyType);
    checkSupplies[idx] = { ...checkSupplies[idx], ...supply, quantity: 1, total: supply.price };
    return checkSupplies;
};

const setCheckSupplyTotal = (supplies, idx, quantity) => {
    const supply = supplies[idx];
    console.log()

    supplies[idx] = { ...supply, quantity: quantity, total: quantity * supply.price };
    return supplies;
};

const NewPurchasePage = () => {
    const navigate = useNavigate();

    const [supplies, setSupplies] = useState([]);
    const [providers, setProviders] = useState([]);
    const [checkSupplies, setCheckSupplies] = useState([]);
    const [total, setTotal] = useState(0);

    const location = useLocation();
    const { preSelectedProvider, prevPage } = location.state ?? { preSelectedProvider: 0, prevPage: "../" };

    const isLoading = useRef(false);
    const [provider, setProvider] = useState(preSelectedProvider);

    const removeProduct = (idx) => {
        const currentProducts = [...checkSupplies];

        currentProducts.splice(idx,1);

        setCheckSupplies(currentProducts);
    };

    const saveOrder = () => {
        if(isLoading.current)
            return;

        const idProvider = parseInt(provider);

        if (idProvider === 0) {
            toast.error("Seleccionar proveedor");
            return;
        }

        const selectedSupplies = checkSupplies.filter(supply => supply.idSupply).map(supply => ({
            idSupply: supply.idSupply,
            quantity: supply.quantity,
        }));

        if (selectedSupplies.length === 0) {
            toast.error("Seleccionar insumos");
            return;
        }

        let obj = {
            idProvider: idProvider,
            detail: selectedSupplies
        };

        isLoading.current = true;

        PurchaseService.savePurchase(obj).then(response => {
            if (!response.hasError) {
                toast.success("Compra guardada con exito");
                navigate(-1);
            }
        });

        isLoading.current = false;
    }

    useEffect(() => {
        console.log(prevPage);
        //setSupplies(cuts);
        setTotal(ArrayUtils.sum(checkSupplies.map(supply => supply.idSupply ? supply.total : 0)));
    }, [checkSupplies]);


    useEffect(() => {
        SupplyService.getAll().then(response => {
            console.log(response);
            if (!response.hasError) {
                setSupplies(response.data);
            }
        });

        ProvidersService.getAllProviders().then(response => {
            console.log(response);
            if (!response.hasError) {
                setProviders(response.data);
            }
        });
    }, []);

    return (
        <>
            <div><Toaster 
              toastOptions={{
                className: '',
                duration: 1500,
                removeDelay: 1000
                }}/>
            </div>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton previousPage={prevPage} />
                <div className="flex justify-between">
                    <p className="mb-2 text-lg text-orange-800 font-semibold underline">Nueva orden de compra</p>
                </div>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Proveedor</p>
                                <select onChange={(e) => { setProvider(e.target.value) }} value={provider} className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none">
                                    <option value={0}>Seleccionar proveedor</option>
                                    {
                                        providers.map(p => <option value={p.idProvider}>{p.providerName}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="flex-grow space-y-4 justify-center rounded pl-2">
                            {/* <p className="text-orange-700 underline font-semibold">CAI: {666}</p> */}
                            <div className="bg-orange-100 py-2 flex flex-col ">
                                <div className="flex justify-between items-center text-md text-orange-800 font-bold px-4">
                                    <p>Fecha de creacion</p>
                                    <input className="bg-orange-200 rounded px-3 py-2" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 bg-orange-200 border border-orange-300 p-6">
                        <p className="text-xl font-semibold text-orange-800 underline">Insumos</p>
                        <table className="flex-grow w-full table-auto justify-self-center mt-4">
                            <thead>
                                <tr>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Insumo</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Precio</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-24 px-2">Cantidad</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Total</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkSupplies
                                        .map((supply, idx) =>
                                            <tr key={idx}>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    <select
                                                        className="bg-orange-300 px-2 py-1 rounded font-semibold text-orange-700"
                                                        onChange={(e) => setCheckSupplies(setCheckSupplyType(checkSupplies, idx, parseInt(e.target.value), supplies).concat())}
                                                    >
                                                            <option
                                                                key={0}
                                                            >
                                                                Insumo
                                                            </option>
                                                            {
                                                                supplies
                                                                    .map(supply =>
                                                                        <option
                                                                            className=""
                                                                            key={supply.idSupply}
                                                                            value={supply.idSupply}
                                                                        >
                                                                            {supply.nameSupply}
                                                                        </option>)
                                                            }
                                                    </select> 
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{supply.idSupply ? supply.price : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    {
                                                        supply.idSupply
                                                            ? <input
                                                                className="bg-orange-300 py-1 px-2 rounded w-16 text-orange-700 font-extrabold focus:outline-none"
                                                                defaultValue={supply.quantity}
                                                                type="number"
                                                                min="1"
                                                                onChange={(e) => setCheckSupplies(setCheckSupplyTotal(checkSupplies, idx, parseFloat(e.target.value)).concat())}
                                                            />
                                                            : ""
                                                    }
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{supply.idSupply ? supply.total : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    <button
                                                        onClick={() => removeProduct(idx)}
                                                        className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer rounded hover:bg-orange-900"
                                                        aria-label="Delete"
                                                    >
                                                    Borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                        <div className="flex justify-center">
                            <button onClick={() => setCheckSupplies(checkSupplies.concat({}))} className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2">+ Añadir insumo</button>
                        </div>

                        <div className="mt-4 font-semibold text-orange-800 inline-block flex flex-col space-y-3 bg-orange-300 p-6 rounded">
                            <p className="flex justify-between"><span>Subtotal</span><span className="font-extrabold">L. {total}</span></p>
                            <p className="flex justify-between"><span>ISV</span><span className="font-extrabold">L. {(total * 0.15).toFixed(2)}</span></p>
                            <hr />
                            <p className="flex justify-between"><span>Total</span><span className="font-extrabold">L. {(total * 1.15).toFixed(2)}</span></p>
                        </div>

                        <div className="mt-2 flex justify-center">
                            <button 
                                className="bg-green-600 rounded px-3 py-1 font-semibold text-white mt-2"
                                onClick={() => saveOrder()}
                            >
                                    Guardar
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default NewPurchasePage;