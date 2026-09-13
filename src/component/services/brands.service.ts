import { brand } from "../types/card.type";

export  async function getBrands():Promise<brand[] >{
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/brands')
    const data= await res.json()
    console.log(data,'brands');
    
    return data.data
}
