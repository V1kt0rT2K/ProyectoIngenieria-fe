import { useRef } from "react";
import BackButton from "../../components/BackButton";

const NewMeatTypePage = () => {
    const fieldsRef = useRef(null);

    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Nuevo tipo de carne</p>

                <div className="bg-orange-200 rounded overflow-y-auto">
                    <div ref={fieldsRef} className="py-4 px-2 pr-6 ml-2 flex flex-col justify-center mt-2 space-y-8">
                        <div className="flex justify-between">
                            <label className="text-md text-orange-900">Nombre</label>
                            <input className="w-120 focus:outline-none rounded py-1 px-3 text-md" name="name" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <label className="text-md text-orange-900">Precio (Lempiras)</label>
                            <input className="w-120 focus:outline-none rounded py-1 px-3 text-md" name="price" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <label className="text-md text-orange-900">Cantidad en stock</label>
                            <input className="w-120 focus:outline-none rounded py-1 px-3 text-md" name="quantity" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <label className="text-md text-orange-900">Cantidad minima en stock</label>
                            <input className="w-120 focus:outline-none rounded py-1 px-3 text-md" name="min_quantity" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <label className="text-md text-orange-900">Fecha de ingreso</label>
                            <input className="w-120 focus:outline-none rounded py-1 px-3 text-md" name="date" type="date" />
                        </div>    
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="px-3 py-1 bg-green-600 rounded text-md text-white font-semibold">Guardar</button>
                </div>
            </div>
        </>
    );
};

export default NewMeatTypePage;