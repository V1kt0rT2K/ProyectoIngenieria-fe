import Configuration from "../../Configuration";
class ProviderService {
    constructor(){}

    static async getAllProviders() {
        const result = await fetch(`${Configuration.API_BASE_URL}/order/provider/get/all`, 
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
export default ProviderService;