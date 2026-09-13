


'use client'
import { deleteProductWishlist, getAllWishlist } from '@/action/wishlist.action'
import Addbtn from '@/component/addbtn/Addbtn'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cartContext } from '@/context/cardContext'
import { MdDelete } from "react-icons/md";
import Image from 'next/image'
import  { useContext, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa6'

export default function page() {
  const context =useContext(cartContext)
  if(!context) throw new Error('in error in wishlist')
  const {dataWishlist,setdataWishlist,setcountWishlist} =context
async function handlewishlist() {
  const res = await getAllWishlist()

  if (res?.status === 'success') {
    setdataWishlist(res)
    setcountWishlist(res.count)
  }
}

async function handledeleteProductWishlist(id: string) {
  const res = await deleteProductWishlist(id)

  if (res?.status === 'success') {
    setcountWishlist(res.count)
    setdataWishlist(res)
  }
}

useEffect(() => {
  handlewishlist()
}, [])
  
  return (
   
       <div className=' w-11/12 mx-auto'>
            <div className=' py-8 px-4'>
         <div className=' flex gap-2 items-center'><span className=' font-medium text-sm text-[#6A7282] '>Home</span>
         <span className=' text-[#6A7282]'>/</span>
            <span className=' text-[#101828] font-sm '>Wishlist</span>
         </div>
         <div className='my-4 flex items-center gap-3'>
             <span className=' bg-[#FEF2F2] rounded-[12px] p-3 flex justify-center items-center '><FaHeart color='#FB2C36' /></span>
             <div>
                 <h2 className=' font-bold text-[#101828]'>My Wishlist</h2>
                 <p className=' font-medium text-sm text-[#6A7282]'>5 items saved</p>
             </div>
         </div>
          </div>
   
           <Table>
   
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=' '>
        {dataWishlist?.data.map((item) => (
          <TableRow key={item._id} className=' border border-1 border-[#F3F4F6] py-5 px-6' >
              <TableCell className="font-medium flex  px-6 py-4 items-center gap-5">
             <Image src={item.imageCover} width={50} className=' w-15 h-15 rounded-[12px] ' height={20} alt={item.title}  />
               <div>
                 <h3 className=' font-medium text-[#101828]'>{item.title}</h3>
                 <p className=' font-medium text-sm text-[#99A1AF]'>{item.category?.name}</p>
               </div>
             </TableCell>
           
           <TableCell className=' '>{item.price} EGP</TableCell>
          <TableCell className=''> <span className=' bg-[#F0FDF4] text-[#008236] py-2 px-4 rounded-[12px]'>In Stock</span> </TableCell>
           <TableCell className="text-right  flex items-center justify-center">
               <div className=' flex justify-center items-end gap-2'>
                
                <Addbtn className=' bg-[#16A34A] text-[#FFFFFF] rounded-[8px] py-[10px] px-[16px]' text='Add To Cart' id={item._id}  />

                <span onClick={()=>handledeleteProductWishlist(item._id)} className=' text-[#99A1AF]  w-10 h-10 rounded-[8px] border border-1 flex justify-center items-center border-[#E5E7EB]'><MdDelete /></span>
                 
               </div>
           </TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
          
       </div>
  )
}
