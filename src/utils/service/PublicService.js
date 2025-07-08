import Configuration from "../../Configuration";

class PublicService {
    constructor(){}

    static async getUserRoles() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/roles/get/all`, 
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