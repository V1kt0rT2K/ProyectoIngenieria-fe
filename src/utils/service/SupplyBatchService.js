import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class SupplyBatchService {
    static async getSupplyBatch() {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/supply/batch/get/all`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
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
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
}
export default SupplyBatchService;