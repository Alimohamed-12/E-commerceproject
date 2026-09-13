'use server'

import { getWishlistType } from "@/component/types/getWishlist.type"
import { getMytoken } from "@/utilites"

export async function addMyWishlist(id: string) {
  const token = await getMytoken()

  if (!token) {
    throw new Error("Please login first")
  }

  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        method: 'POST',
        headers : {
          token: token as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    )

    const data = await res.json()

    console.log('wishlist response:', data)

    if (!res.ok) {
      throw new Error(data.message || 'Failed to add wishlist')
    }

    return data
  } catch (error) {
    console.error('Wishlist error:', error)
    throw error
  }
}

 export async function getAllWishlist():Promise<getWishlistType | undefined >{
   const token=await getMytoken()
    if (!token) {
    throw new Error("Please login first")
  }

    try{
        const res=await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
        method:'GET',
        headers:{
            token:token as string
        }
   
    })
     const data=await res.json()
     console.log('getWishlist',data);
    return data

    }

    catch(error:unknown){
    console.error('Wishlist error:', error)
    throw error
        
    }
}

export async function deleteProductWishlist(id:string):Promise<getWishlistType | undefined>{
   const token =await getMytoken()
try{
     const res=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
      method:'DELETE',
        headers:{
         token:token as string
        }
   })
   const data=await res.json()
    console.log(data,'delete-wishlist')
   return data
}
catch(e){
  console.log(e);
  throw new Error('throw new Error')
}
}

