'use server'

import { TypeSubmitValueas } from "@/component/types/checkOut.type"
import { getMytoken } from "@/utilites"

export async function handlePaymentCash(values:TypeSubmitValueas,productID:string){

    const token= await getMytoken()
  try{
      const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${productID}`,{
        headers:{
            'content-type':'application/json',
           token:token as string
        },
        method:'POST',
        body:JSON.stringify({ shippingAddress:values})
    })

    const data=await res.json()
    console.log(data ,' data in payment')
    return data
  }
  catch(error:unknown){
    console.error("Error occurred while processing payment:", error)
    throw error
  }

}


 export async function handlePaymentVisa ( values:TypeSubmitValueas, url:string = process.env.NEXTAUTH_URL!, productID:string){
 
  const token= await getMytoken()
try{
     const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productID}?url=${url}`,{
       method:'POST',
       headers:{
        token:token as string
       },
       body:JSON.stringify({shippingAddress:values})

   })

   const data=res.json()
    console.log(data,'res visa server')
   return data
}
catch(error:unknown){
    console.error("Error occurred while processing payment:", error)
    throw error
  }
}
