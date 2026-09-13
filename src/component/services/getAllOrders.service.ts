import { getUserOrder } from "../types/orders.type"

 export async function getMyorders(id:string):Promise<getUserOrder[] | null >{ 

   try{
     const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,{
        method:'GET',    
    })

    const data =await res.json()
    
    // console.log(data,' my order iin' )
    return data
   }
  catch(error:unknown){
    console.error("Error occurred while processing payment:", error)
    throw error
  }
}
