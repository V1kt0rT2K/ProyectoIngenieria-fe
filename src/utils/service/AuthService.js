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

        const responseData = await result.json();
        const responseHeaders = Object.fromEntries(result.headers.entries());
        
        return {
            ...responseData,
            headers: responseHeaders
        };
    }

    static async registerUser(payload) {
        
        const result = await fetch(`${Configuration.API_BASE_URL}/users/register`, {
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