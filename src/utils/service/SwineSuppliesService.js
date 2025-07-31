import Configuration from "../../Configuration";
class SwineSuppliesService {

    static async getSwineSupplies() {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/swinesupply/get/all/swine`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        });

        return await result.json();
    }
    static async getSuppliesByBatchId(idLote) {
        const result = await fetch(`${Configuration.API_BASE_URL}/supply/swinesupply/get/all/swine/${idLote}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        });

        return await result.json();
    }

}
export default SwineSuppliesService;