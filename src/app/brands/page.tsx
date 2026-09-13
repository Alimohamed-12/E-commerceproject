import { getBrands } from '@/component/services/brands.service';
import Image from 'next/image';
import React from 'react'
import { FaTags } from "react-icons/fa";
export default async function page() {

    const res=await getBrands()
       console.log(res,'btr');
       
  return (
    <div>
      <div className=' p-25 bg-linear-to-r from-[#7F22FE] to-[#8E51FF]'>
           <div >
           <div className=' flex gap-2 items-center'>
             <span>Home</span>
             <span>/</span>
             <span>Brands</span>
           </div>
           </div>
           <div className=' flex items-center gap-2'>
           <span className=' w-12 h-12 bg-[#92c41201] text-[#ffffff] rounded-2xl flex items-center justify-center p-3'> <FaTags /></span>
           <div>
             <h2 className=' font-bold text-[36px] text-[#FFFFFF]'>Top Brands</h2>
            <p className=' font-medium text-[#FFFFFFCC]'>Shop from your favorite brands</p>
           </div>
           </div>
      </div>

      <div className=' w-11/12 grid md:grid-cols-5 grid-cols-2 gap-4 mx-auto  '>
            {res.map((item)=>{
              return (
                 <div key={item._id} className='bg-[#FFFFFF] flex flex-col items-center gap-5 rounded-[16px] p-4 shadow-sm' >
                  <Image src={item.image} alt={item.name} width={50} height={50} />
                   <h3>{item.slug}</h3>
                 </div>
              )
            })}
      </div>
    </div>
  )
}
