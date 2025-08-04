import { generateInvoicePdf } from "../utils/generateCheckUtils";
import SellerService from "../utils/service/SellerService";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const SaleOptions = ({ idSalesCheck }) => {

    const generateSalesCheck = () =>{
        console.log(idSalesCheck);
        SellerService.getSalesCheckById(idSalesCheck).then(response =>{
            if(!response.hasError){
                generateInvoicePdf(response.data)
            }
        });
    };

    return (
        <>
            <DropDown links={[
                <Link
                    to="sale_detail"
                    state={{
                        idSalesCheck: idSalesCheck
                    }}
                    className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                >
                    Ver detalles
                </Link>
            ,<button
                onClick={()=>{generateSalesCheck()}}
                className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
            >
                Generar Factura
            </button>]}
            />
        </>
    );
};

export default SaleOptions;