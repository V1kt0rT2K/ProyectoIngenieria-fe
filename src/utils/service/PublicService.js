import Configuration from "../../Configuration";

class PublicService {
    static async getUserRolesForRegistration() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/public/get/roles`, 
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

export default PublicService;