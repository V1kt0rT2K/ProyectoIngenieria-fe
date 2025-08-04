import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class SupplyBatchService {
    static async getSupplyBatch(page, size, sort) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async getSupplyBatchByType(type, page, size, sort) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/get/type/${type}/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async getSuppbyBatchbyMayorExpirationDate(){
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/get/date/expiration`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async updateStckSupplyBatch(idSupplyBatch, quantity) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/update/stock`, 
        {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                idSupplyBatch,
                quantity
            })
        });

        return await result.json();
    }
    static async searchSupplyBatch(searchParam,page,size,sort) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/search/${searchParam}/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async searchSupplyBatchbyType(idSupplyType,searchParam,page,size,sort) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/type/search/${idSupplyType}/${searchParam}/${page}/${size}/${sort}`, 
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
export default SupplyBatchService;