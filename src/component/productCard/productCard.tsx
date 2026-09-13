import React from 'react'
import { productsType } from '../types/getProdutcs.type'
import { IoMdStar } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Link from 'next/link'
import Addbtn from '../addbtn/Addbtn';
import AddWishlist from '../addbtn/addWishlist';
export default function ProductCard({ product }: { product: productsType }) {

  
  return (
    <div>
        <div className=' relative border border-1 border-[#E5E7EB]  rounded-[8px] bg-[#FFFFFF] '>
            <Image className='h-48 w-full' src={product.imageCover} alt={product.title} width={300} height={300} />
           <div className='p-4 h-40'>
             <h2 className='text-[#6A7282] font-medium text-sm '>{product.category.name}</h2>
            <h3 className='my-2'>${product.title.split(' ').slice(0,4).join(' ')}</h3>
            
            <p className='flex  items-center  gap-3'>
              <span className=' flex'>   <IoMdStar size={20} fill='yellow' /><IoMdStar size={20} fill='yellow' /><IoMdStar size={20} fill='yellow' /><IoMdStar size={20} fill='yellow' /> </span>
              <span>{product.ratingsAverage} ({product.ratingsQuantity})</span>
              </p>
            <div className='flex justify-between py-2 items-center'>
             <div className='flex gap-2 items-center'>
               <span className='font-bold text-lg text-[#16A34A]'>{product.price} EGP</span> 
               <span className='text-[#6A7282] text-sm font-medium line-through'>{product.priceAfterDiscount ? product.priceAfterDiscount :null}</span>
               </div>
             {/* <span><FaPlus size={24} className='bg-[#16A34A] text-white p-1 rounded-full' /></span> */}
             <Addbtn id={product.id} className='bg-[#16A34A] text-white p-1 rounded-full' />
             </div>
           </div>
           <div className=' flex justify-between absolute  w-full ps-2 top-2'>
            <span className='bg-[#FB2C36] text-[#FFFFFF] w-14 h-7 rounded-sm flex justify-center items-center'>-49%</span>
            <ul className='flex gap-4 flex-col me-3'>
              <li>   <AddWishlist ProductId={product.id}/></li>
              <Link href={`/productdetails/${product.id}`}> <span className=' cursor-pointer bg-[#FFFFFF] flex justify-center text-[#4A5565] items-center w-8 h-8 rounded-full '><FaArrowsRotate /></span> </Link>
              <li> <span className=' bg-[#FFFFFF] flex justify-center text-[#4A5565] items-center w-8 h-8 rounded-full '><FaEye /></span> </li>
            </ul>
           </div>
        </div>
      
    </div>
  )
}


