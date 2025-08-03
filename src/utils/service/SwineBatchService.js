import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();

class SwineBatchService {
    constructor(){}

    static async getSwineBatch(page,size,sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async createSwineBatch(swineBatch) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/create`, 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            },
            body: JSON.stringify(swineBatch)
        });

        return await result.json();
    }
    static async getSwineBatchById(id) {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/${id}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            }
        });

        return await result.json();
    }
    static async getSwineBatchByIdStage(idStage) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/stage/${idStage}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            }
        });

        return await result.json();
    }
    static async decrementStockSwineBatch(idSwineBatch, quantitySwine) {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/update/stockquantity`, 
        {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            },
            body: JSON.stringify({ idSwineBatch,quantitySwine })
        });

        return await result.json();
    }
}

export default SwineBatchService;