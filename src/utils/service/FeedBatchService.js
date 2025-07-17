import Configuration from "../../Configuration";

class FeedBatchService {
    constructor(){}

    static async getAllFeedBacth() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/supply/feedbatch/get/all`, 
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

export default FeedBatchService  ;