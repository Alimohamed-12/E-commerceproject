
import { productDetailsType } from '@/component/types/productDetails.type'
import Image from 'next/image'
import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaBolt } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import Sliderdetails from '@/component/Sliderdetails';
import { IoMdHome } from "react-icons/io";
import { FaStar } from 'react-icons/fa'
export default async function Productdetails({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params


  async function getProductDetails(id: string): Promise<productDetailsType | undefined> {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      const data = await res.json()

      return data.data

    } catch (error) {
      console.log('error', error)
    }
  }


  const productDetails = await getProductDetails(id)
  console.log('productDetails', productDetails);



  return (
    <div className='w-11/12 mx-auto'>
    <div className=' flex items-center gap-3 py-5 mb-8'>
      <span className=' flex items-center gap-2 text-[#6A7282]'><IoMdHome /> Home </span> 
      <span className=' text-[#6A7282]'>{'>'}</span>
      <span className=' text-[#6A7282]'> {productDetails?.category.name}</span>
      <span className=' text-[#6A7282]'>{'>'}</span>
      <span className=' text-[#6A7282]'>{productDetails?.subcategory[0].name}</span>
      <span>{'>'}</span>
      <span>{productDetails?.title}</span>
    </div>

      <div className='  md:flex md:flex-row gap-5 '>

        <div className=' md:w-1/3 '>
          <div className=' bg-[#FFFFFF] shadow-sm p-4 rounded-sm' >
            {productDetails && (
              <Image
               className=' lg:sticky lg:top-1 h-80'
                src={productDetails.imageCover}
                width={300}
                height={140}
                alt={productDetails.title}
              />
            )}
               <div>
          
          {productDetails?.images && (<>
          <Sliderdetails listOfImages={productDetails?.images} spaceBetween={5} slidesPerView={3}/></>)}
          </div>
          </div>
       
        </div>

        <div className=' md:w-2/3 '>
          <div className=' rounded-[12px] bg-[#FFFFFF] shadow-sm flex flex-col gap-3 p-3 '>

            <div className=' flex gap-3 '>
              <span className=' w-[110px] h-[28px] inline-block py-[6px] px-[12px]  bg-[#F0FDF4] text-[#15803D] font-medium text-[12px] rounded-lg'>{productDetails?.category.name}</span>
              <span className=' inline-block bg-[#F3F4F6] w-[69px] h-[28px] rounded-lg py-[6px] px-[12px] font-medium text-xs'>{productDetails?.brand.name}</span>
            </div>
            <h3 className=' text-3xl font-[#101828] font-bold'>{productDetails?.title}</h3>
 <p className="flex items-center gap-1 my-3 text-yellow-400 text-xl">
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
</p>
            <h6 className=' font-bold text-3xl text-[#101828]'>{productDetails?.price} EGP</h6>
            <span className=' bg-[#F0FDF4] inline-block w-[90px] h-[32px] rounded-lg px-[12px] py-[6px] text-[#008236] text-sm'> <span className='w-2 rounded-full inline-block h-2 bg-[#00C950]'></span> In Stock</span>
            <p>{productDetails?.description}</p>
            <div className=' flex flex-col gap-2 '>
              <h5 className=' font-medium text-sm text-[#364153]'>Quantity</h5>
              <div className=' flex items-center gap-3'>
                <p className='flex flex-row p-1 border  w-[172px] h-[52px] rounded-[8px] '>
                  <span className='  w-[52px]  flex justify-center items-center text-[#4A5565]'><FaMinus /></span>
                  <span className='   w-[64px] flex justify-center items-center text-[#364153] text-[18px] '>1</span>
                  <span className='   w-[52px] flex justify-center items-center text-[#4A5565] '><FaPlus /></span>
                </p>
                <p className=' text-[#6A7282] font-medium text-sm'>{productDetails?.quantity} available</p>
              </div>
            </div>
            <p className=' flex justify-between items-center'>
              <span className=' text-[#4A5565] font-medium'>Total Price:</span>
              <span className=' font-bold text-[#16A34A] text-lg'>{productDetails?.price} EGP</span>
            </p>
            <div className=' flex items-center gap-2'> 
              <button className=' w-full flex items-center justify-center py-[14px] px-[24px] rounded-sm text-[#FFFFFF] gap-1 bg-[#16A34A]'><FaCartShopping /> Add to Cart</button>
              <button className=' flex items-center justify-center gap-1 text-[#FFFFFF] w-full rounded-sm py-[14px] px-[24px] bg-[#101828]'><FaBolt /> Buy Now</button>
            </div>
            <div className=' flex gap-2'>
              <button className=' hover:border-[#5bb27b] hover:text-[#084e22] w-full border border-2 border-[#E5E7EB] rounded-sm py-[12px] px-[16px] text-[#364153] flex justify-center
               items-center gap-1 text-[#364153] font-medium'><CiHeart /> Add to Wishlist</button>
              <span className=' hover:border-[#5bb27b]  hover:text-[#084e22] inline-block w-[56px] text-[#364153] h-[52px] rounded-sm py-[15px] px-[17px] border border-2 border-[#E5E7EB]'>
                  <CiShare2 className='  size-4 ' />
              </span> 
            </div>

            <div className=' flex justify-between p-2'>
              <div className=' flex gap-2 items-center'>
                <span className='  w-[40px] h-[40px] rounded-full flex justify-center items-center  bg-[#DCFCE7]'><FaTruckFast className=' text-[#16A34A]' /></span>
                
                <div >
                  <h2 className=' font-medium text-sm text-[#101828]'>Free Delivery</h2>
                  <p className=' text-[#6A7282] font-medium text-sm'> Orders over $50 </p>
                </div>
              </div>
                 <div className=' flex gap-2 items-center'>
                <span className='  w-[40px] h-[40px] rounded-full flex justify-center items-center  bg-[#DCFCE7]'><AiOutlineLoading3Quarters className=' text-[#16A34A]' /></span>
                
                <div >
                  <h2 className=' font-medium text-sm text-[#101828]'>30 Days Return</h2>
                  <p className=' text-[#6A7282] font-medium text-sm'> Money back </p>
                </div>
              </div>
                 <div className=' flex gap-2 items-center'>
                <span className='  w-[40px] h-[40px] rounded-full flex justify-center items-center  bg-[#DCFCE7]'><MdOutlineSecurity className=' text-[#16A34A]' /></span>
                
                <div >
                  <h2 className=' font-medium text-sm text-[#101828]'>Secure Payment</h2>
                  <p className=' text-[#6A7282] font-medium text-sm'> 100% Protected</p>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}





