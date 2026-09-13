import { productsType } from "../types/getProdutcs.type"

export async function getProducts():Promise<productsType[] | undefined> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/products')
        const data = await res.json()
        return data.data
    } catch (error) {
        console.log(error)
    }


}