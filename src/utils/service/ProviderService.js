import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class ProviderService {
    static async getAllProviders() {
        const result = await fetch(`${Configuration.API_BASE_URL}/order/provider/get/all`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

        return await result.json();
    }

    static async saveProvider(payload) {
        const result = await fetch(`${Configuration.API_BASE_URL}/order/provider/create`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

        return await result.json();
    }

    static async getProviderById(id) {
        const result = await fetch(`${Configuration.API_BASE_URL}/order/provider/get/${id}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });

        return await result.json();
    }

    static async updateProvider(payload) {
        const result = await fetch(`${Configuration.API_BASE_URL}/order/provider/update`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        return await result.json();
    }

    static async deleteProvider(payload) {
        const result = await fetch(`${Configuration.API_BASE_URL}/order/provider/delete`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

        return await result.json();
    }


}
export default ProviderService;