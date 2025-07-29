import Configuration from "../../Configuration";

class SupplyService {
    static async getAll() {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/supply/get/all`, 
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

export default SupplyService;