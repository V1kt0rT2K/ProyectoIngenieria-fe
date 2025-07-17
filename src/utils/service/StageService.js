import Configuration from "../../Configuration";

class StageService {
    constructor(){}

    static async getStagebyid(id) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/asset/stage/get/${id}`, 
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

export default StageService ;