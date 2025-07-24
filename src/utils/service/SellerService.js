import Configuration from "../../Configuration";

class SellerService {
    constructor(){}

    static async getAllProducts() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/product/get/all`, 
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

export default SellerService;