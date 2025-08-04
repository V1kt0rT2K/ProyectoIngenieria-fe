import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class SupplyService {
    static async getAll() {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/supply/get/all`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }
    static async getAllSuppliesbyStage(stage) {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/supply/get/stage/${stage}`, 
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


export default SupplyService;