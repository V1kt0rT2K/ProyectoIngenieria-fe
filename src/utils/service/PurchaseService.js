import Configuration from "../../Configuration";

class PurchaseService {
    static async getAll(page,size,sort) {
        const result = await fetch(
            `${Configuration.API_BASE_URL}/order/purcharse/get/all/${page}/${size}/${sort}`, 
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

    static async getById(id) {
        const result = await fetch(
            `${Configuration.API_BASE_URL}/order/purcharse/get/${id}`, 
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

export default PurchaseService;