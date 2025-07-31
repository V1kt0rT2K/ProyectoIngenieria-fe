import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class PurchaseService {

    static async getStatusForPurcharses() {
        const result = await fetch(
            `${Configuration.API_BASE_URL}/asset/status/get/purcharses`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getAll(page,size,sort) {
        const result = await fetch(
            `${Configuration.API_BASE_URL}/order/purcharse/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getPurcharsesByStatus(idStatus,page,size,sort) {
        const result = await fetch(
            `${Configuration.API_BASE_URL}/order/purcharse/get/status/${idStatus}/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getById(id) {
        const result = await fetch(
            `${Configuration.API_BASE_URL}/order/purcharse/get/${id}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }    
}

export default PurchaseService;