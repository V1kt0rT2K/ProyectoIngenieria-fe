import Configuration from "../../Configuration";

class SwineBatchService {
    constructor(){}

    static async getswinebatch() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/all`, 
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

export default SwineBatchService;