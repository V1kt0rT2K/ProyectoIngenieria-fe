import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class OrderWholesalerService {
    static async getAllOrders(page, size, sort) {
        const result = await fetch(`${Configuration.API_BASE_URL}/sales/orders/get/all/${page}/${size}/${sort}`,
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

export default OrderWholesalerService;