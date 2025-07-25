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
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        });

        return await result.json();
    }

    static async generateCheck(payload) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/salescheck/generate`, 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify(payload)
        });

        return await result.json();
    }

}

export default SellerService;