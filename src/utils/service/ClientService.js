import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();

class ClientService {
    static async getAll(page,size,sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/client/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async searchClients(searchParam) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/client/search/${searchParam}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async saveClient(payload) {
        const result = await fetch(`${Configuration.API_BASE_URL}/sales/client/create`,
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
}

export default ClientService;