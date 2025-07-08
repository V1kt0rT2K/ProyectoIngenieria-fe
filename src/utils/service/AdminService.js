import Configuration from "../../Configuration";

class AdminService {
    constructor(){}

    static async getAllUsers(page,size,sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/users/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getUserRequestsByIdStatus(status,page,size,sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/requests/get/status/${status}/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getUserRequestsById(idUserRequest) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/requests/get/${idUserRequest}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async manageUserRequest(payload) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/requests/manage`, 
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

    static async searchUsers(searchParam) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/users/search/${searchParam}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getStatus() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/asset/status/get/all`, 
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

export default AdminService;