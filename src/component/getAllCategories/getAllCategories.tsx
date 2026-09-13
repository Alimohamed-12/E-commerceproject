import Image from 'next/image'
import React from 'react'
interface categoryType{
    _id:string,
    name:string,
    image:string
}
export default async function GetAllCategories() {

   async function getCategories():Promise<categoryType[] | undefined>{
        try{
            const res=await fetch('https://ecommerce.routemisr.com/api/v1/categories')
            const data=await res.json()
            return data.data

        }catch(error){
            console.log(error)
        }
    }

    const allData=await getCategories()
    console.log(allData)

  return (
    <div className=' grid grid-cols-2 gap-6 p-4 md:grid-cols-6'>
        {allData?.map((category:categoryType)=>(
            <div key={category._id} className='flex flex-col gap-3 items-center shadow bg-[#FFFFFF] p-4 rounded-[8px]'>
                {/* <p>{category.description}</p> */}
                <Image src={category.image} alt={category.name} className='rounded-full w-20 h-20' width={70} height={70}/>
                  <h4>{category.name}</h4>
            </div>
        ))}
    </div>
  )
}
