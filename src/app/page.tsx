import Slider from '@/component/slider/slider'
import React from 'react'
import img1 from '../assets/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png'
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa";
import GetAllCategories from '@/component/getAllCategories/getAllCategories';
import ProductCard from '@/component/productCard/productCard';
import { getProducts } from '@/component/services/getProducts.service';
export default async function Home() {

  const products = await getProducts()
  // console.log('products', products)

  return (
    <div>
     
       <Slider 
        spaceBetween={0}
        slidesPerview={1}
        listOfImages={[img1.src, img1.src, img1.src]}
        height='h-95'
/>

<div className='w-11/12 mx-auto py-7'>
 
 <div className='flex justify-between items-center   '>
   <h3 className=' border-s-4 ps-2  border-s-[#00BC7D] text-[30px] font-bold'>Shop By <span className='text-[#009966]'>Category</span></h3>
   <Link className='flex items-center gap-2 text-[#009966]' href="/categories">View All Categories <FaArrowRight /></Link>
 </div>
 

<GetAllCategories/>

   <div className='products mt-15'>
    <h3 className=' border-s-4 ps-2  border-s-[#00BC7D] text-[30px] font-bold'>Featured <span className='text-[#009966]'> Products</span></h3>
    
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>

   </div>
</div>

    <h6>footer</h6>
    </div>
  )
}
