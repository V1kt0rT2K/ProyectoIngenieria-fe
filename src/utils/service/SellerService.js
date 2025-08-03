import Configuration from "../../Configuration";
import registerInterceptor from "../Interceptor";


registerInterceptor();
class SellerService {
    static async getClientTypes() {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/client/get/types`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getAllSalesChecksForUserByClientType(idClientType,page,size,sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/salescheck/cashier/get/type/${idClientType}/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getSalesCheckById(idSalesCheck) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/salescheck/get/${idSalesCheck}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async getAllProducts(page, size, sort) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/stock/product/get/all/${page}/${size}/${sort}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async searchSalesCheckForUser(searchParam) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/salescheck/cashier/search/${searchParam}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async searchSalesCheck(searchParam) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/salescheck/search/${searchParam}`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        return await result.json();
    }

    static async createProduct(product) {
        const result = await fetch(`${Configuration.API_BASE_URL}/stock/product/create`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        return await result.json();
    }

    static async generateCheck(payload) {
        
        const result = await fetch(`
            ${Configuration.API_BASE_URL}/sales/salescheck/generate`, 
        {
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

export default SellerService;