import Configuration from "../../Configuration";

class AuthService {
    constructor(){}

    static async loginUser(payload) {
        
        const result = await fetch(`${Configuration.API_BASE_URL}/auth/login`, {
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

export default AuthService;