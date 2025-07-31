import Configuration from "../../Configuration";

class NotificationService {

    static async getNotificationsForUser() {
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/asset/notification/get/all`, 
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

    static async checkNotification(payload) {
        
        const result = await fetch(`${Configuration.API_BASE_URL}/asset/notification`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : localStorage.getItem("jwt")
            },
            body: JSON.stringify(payload)
        });

        return await result.json();
    }
}

export default NotificationService;