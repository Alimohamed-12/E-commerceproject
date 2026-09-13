'use server'

import { addCardType, getCartsType } from "@/component/types/card.type"
import { getMytoken } from "@/utilites"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"



export async function addCard(productId:string):Promise<addCardType | undefined>{
    

      const token  =await getMytoken()
     
      

if(!token){
    throw new Error('please login first .....')

}

   try{
     const res= await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
        method:'POST',
        headers:{
             token:token as string ,
            'Content-Type':'application/json'
        } ,
        body:JSON.stringify({productId: productId})
    })
 
    
     const data= await res.json()
      
     return data
   }
   catch(e){
    console.log(e);
    
   }
}

export async function getMycart():Promise<getCartsType | undefined>{

   const token  =await getMytoken()
   if(!token){
      throw new Error('please Login ....')
   }
  try{
    const res=await fetch('https://ecommerce.routemisr.com/api/v2/cart',{
      method:'GET',
      headers:{
         token:token as string
      }
   })
   const data=await res.json()
   console.log(data,'data cart');
   return data
  }
  catch(e){
    console.log(e);
    
  }

}

export async function updateMyProduct(productId:string,count:number):Promise<getCartsType | undefined>{
      const  token=await getMytoken()

   try{
      const res=await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
         method:'PUT',
      headers:{
         token:token as string,
         'Content-Type':'application/json',

      },
      body:JSON.stringify({count:count})
   })
   const data=await res.json()
   console.log(data,'play ');
   

   return data
   }
   catch(e){
       console.log(e);   
   }

}

 export async function deleteMyProduct(id:string):Promise<getCartsType |undefined >{
      const token = await getMytoken()
     
  try{
    const res=await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
      method:"DELETE",
      headers:{
         token:token as string
      }
   })
   const data= await res.json()
   console.log(data ,'dara');
   
   return data
  }
  catch(e){
   console.log(e);
   
  }

 }
