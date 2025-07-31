import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import ArrayUtils from "../../utils/ArrayUtils";
import {useNavigate} from 'react-router-dom';
import SellerService from "../../utils/service/SellerService";
import { generateInvoicePdf } from "../../utils/generateCheckUtils";
import toast, { Toaster } from 'react-hot-toast';


const setCheckProductType = (products, idx, cutType, swineCuts) => {
    const cut = swineCuts.find(c => c.idProduct === cutType);
    console.log(products, idx, cutType, swineCuts);
    products[idx] = { ...products[idx], ...cut, quantity: 1, total: cut.price };
    return products;
};

const setCheckProductTotal = (products, idx, quantity) => {
    const product = products[idx];
    console.log()

    products[idx] = { ...product, quantity: quantity, total: quantity * product.price };
    return products;
};



const NewSalePage = () => {
    const [swineCuts, setSwineCuts] = useState([]);
    const [checkProducts, setCheckProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const isLoading = useRef(false);
    const identity = useRef("");

    const navigate = useNavigate();

    useEffect(() => {
        //setSwineCuts(cuts);
        setTotal(ArrayUtils.sum(checkProducts.map(product => product.idProduct ? product.total : 0)));
    }, [checkProducts]);


    useEffect(() => {
        SellerService.getAllProducts().then(response => {
            console.log(response);
            if (!response.hasError) {
                setSwineCuts(response.data);
            }

        });
    }, []);

    const removeProduct = (idx) => {
        const currentProducts = [...checkProducts];

        currentProducts.splice(idx,1);

        setCheckProducts(currentProducts);

    };

    const saveCheck = () => {
        if(isLoading.current)
            return;

        isLoading.current = true;

        let consumption = checkProducts.map((p) =>{
            return {
                idProduct : p.idProduct,
                quantity : p.quantity
            }
        });

        console.log(consumption);

        const payload = {
            identification: identity.current.value,
            consumption: consumption
        }

        console.log(payload);

        SellerService.generateCheck(payload).then(response => {
            console.log(response);
            if(!response.hasError){
                generateInvoicePdf(response.data);
                toast.success("La factura se ha generado con éxito.");

                navigate(-1);
            }else{
                toast.error(response.meta.message);
            }
        });

        isLoading.current = false
    };

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
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Crear factura</p>
                <div className="rounded overflow-y-auto p-0">
                    <div className="bg-orange-200 border border-orange-300 px-4 py-6 flex space-x-5 justify-between">
                        <div className="flex flex-col flex-grow space-y-4">
                            {/* <p className="text-orange-700 underline font-semibold">RTN: {Configuration.RTN_NUMBER}</p> */}
                            <div className="flex flex-col bg-orange-100 text-md text-orange-800 px-4 py-2 space-y-2 rounded">
                                <p>Numero de identidad del cliente</p>
                                <input ref={identity}  name="identification"  className="bg-orange-200 px-3 py-1 rounded font-bold focus:outline-none" />
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
                        <p className="text-xl font-semibold text-orange-800 underline">Productos</p>
                        <table className="flex-grow w-full table-auto justify-self-center mt-4">
                            <thead>
                                <tr>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Producto</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-64 px-2">Nota (opcional)</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Costo (Por libra)</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-24 px-2">Cantidad</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Total</th>
                                    <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    checkProducts
                                        .map((product, idx) =>
                                            <tr key={idx}>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    <select
                                                        className="bg-orange-300 px-2 py-1 rounded font-semibold text-orange-700"
                                                        value={product.idProduct || 0}
                                                        onChange={(e) => {
                                                            const selectedId = parseInt(e.target.value);
                                                            setCheckProducts(setCheckProductType(checkProducts, idx, selectedId, swineCuts).concat());
                                                        }}
                                                    >
                                                        <option key={0} value={0}>Producto</option>
                                                        {
                                                            swineCuts.map(cut =>
                                                                <option
                                                                    key={cut.idProduct}
                                                                    value={cut.idProduct}
                                                                >
                                                                    {cut.productName}
                                                                </option>)
                                                        }
                                                    </select>
                                                    
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idProduct ? product.productDescription : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idProduct ? product.price : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    {
                                                        product.idProduct
                                                            ? <input
                                                                className="bg-orange-300 py-1 px-2 rounded w-16 text-orange-700 font-extrabold focus:outline-none"
                                                                defaultValue={product.quantity}
                                                                type="number"
                                                                min="1"
                                                                onChange={(e) => setCheckProducts(setCheckProductTotal(checkProducts, idx, parseFloat(e.target.value)).concat())}
                                                            />
                                                            : ""
                                                    }
                                                </td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{product.idProduct ? product.total : ""}</td>
                                                <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                    <button
                                                        onClick={() => removeProduct(idx)}
                                                        className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer rounded-full hover:bg-orange-900"
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
                            <button onClick={() => setCheckProducts(checkProducts.concat({}))} className="bg-orange-700 rounded px-3 py-1 font-semibold text-white mt-2">+ Añadir producto</button>
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
                                onClick={() => saveCheck()}
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

export default NewSalePage;