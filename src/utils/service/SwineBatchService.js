import Configuration from "../../Configuration";

class SwineBatchService {
    constructor(){}

    static async getSwineBatch() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/all`, 
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
    static async createSwineBatch(swineBatch) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/create`, 
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            },
            body: JSON.stringify(swineBatch)
        });

        return await result.json();
    }
    static async getSwineBatchById(id) {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/${id}`, 
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
    static async getSwineBatchByIdStage(idStage) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/swinebatch/get/stage/${idStage}`, 
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

export default SwineBatchService;