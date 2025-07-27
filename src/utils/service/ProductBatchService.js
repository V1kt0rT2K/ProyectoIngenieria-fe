import Configuration from "../../Configuration";

class ProductBatchService {
    constructor(){}

    static async getAllProductBatch() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/product/batch/get/all`, 
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
}

export default ProductBatchService;