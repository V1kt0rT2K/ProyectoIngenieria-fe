import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class ProductBatchService {
    constructor(){}

    static async getAllProductBatch(page,size, sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/product/batch/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async createProductBatch(productBatch) {
        const result = await fetch(`${Configuration.API_BASE_URL}/stock/product/batch/create`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productBatch)
        });

        return await result.json();
    }
    static async searchProductBatch(searchParam, page, size, sort) {
        const result = await fetch(`${Configuration.API_BASE_URL}/stock/product/batch/search/${searchParam}/${page}/${size}/${sort}`, 
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

export default ProductBatchService;