'use client'
import { addMyWishlist } from '@/action/wishlist.action';
import { cartContext } from '@/context/cardContext';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { CiHeart } from 'react-icons/ci'
    
export default function AddWishlist({ProductId}:{ProductId:string}) {
      
  const context=useContext(cartContext)
  if(!context) throw new Error('throw new error')

 const  {countWishlist,setcountWishlist} =context
   async function addProductWishlist(ProductId:string){
        console.log('add product to wishlist',ProductId);
        const res= await addMyWishlist(ProductId)
        
          if(res.status === 'success'){
            setcountWishlist(res.count)
            toast.success(res.message,{
                position:'top-center'
            })
          }
    }

  return (
    <>
     <button onClick={()=>addProductWishlist(ProductId)} className=' cursor-pointer bg-[#FFFFFF] text-[#4A5565] 
      flex justify-center items-center w-8 h-8 rounded-full '><CiHeart size={20} /></button> 
    </>
      
  )
}

