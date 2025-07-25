import Configuration from "../../Configuration";
class SupplyBatchService {
    constructor() {}

    static async getSupplyBatch() {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/supply/batch/get/all`, 
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
    static async getSupplyBatchByType(type) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/batch/get/type/${type}`, 
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
export default SupplyBatchService;