'use client'
import { deleteMyProduct, getMycart, updateMyProduct } from '@/action/card-action';
import { getCartsType, productType } from '@/component/types/card.type';
import React, { useContext, useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cartContext } from '@/context/cardContext';


export default function page() {
  const [data, setData] = useState<getCartsType["data"] | null>(null)
  const context = useContext(cartContext)

if (!context) {
  throw new Error('in error')
}

const { setnumberOfCartItems, numberOfCartItems } = context
   const [countProduct ,setcountProduct]=useState(0)
   const [cartId,setcartId]=useState('')

  async function getCarts() {
    const res = await getMycart()
    setData(res?.data ?? null)
    setcountProduct(res?.numOfCartItems ?? 0)
    setcartId(res?.cartId!)
    console.log(res,'all product');
  }

 async function updateProduct(id:string,count:number,signal:string){
  console.log(id,count,'44');
       const res= await updateMyProduct(id,count)
      if(res?.status === 'success'){
        toast.success(res.message,{position:'top-center'})
        setData(res.data ?? null)
        if(signal == '+'){
          setnumberOfCartItems(numberOfCartItems+1)
        }
        else{
           setnumberOfCartItems(numberOfCartItems - 1)
        }   

      }
       
  }

 
 async function deleteProduct(id:string,count:number){
    const res =await deleteMyProduct(id)
    
     if(res?.status === 'success'){
        toast.success(res.message)
        setData(res.data ?? null)
        setnumberOfCartItems(numberOfCartItems - count)
     }  

 }

  useEffect(() => {
    getCarts()
  }, [])


  return (
    <div className='p-5 w-11/12 mx-auto'>


      <p className=' flex gap-2 items-center'>
        <span className='font-medium text-sm text-[#6A7282] '>Home</span>
        <span className=' text-[#6A7282] text-sm'>/</span>
        <span className='text-sm text-[#101828]'>Shopping Cart</span>
      </p>

      <div className=' flex flex-col gap-2 my-3'>
        <div className=' flex items-center gap-2'>
          <span className=' flex items-center justify-center w-[48px]  h-[48px] bg-[#15803D] rounded-[12px] text-[#FFFFFF] '>  <FaShoppingCart size={25} /></span>
          <span className=' font-bold text-3xl text-[#101828]'>Shopping Cart</span>
        </div>

        <p className=' font-medium text-[#6A7282]'>You have {countProduct} items in your cart</p>
      </div>


      {

        data && (<>
          <div className=' md:grid grid-cols-12 gap-5'>
            <div className=' col-span-8  flex flex-col gap-4'>
              {data.products.map((product:productType) => {
                return (
                  <div key={product.product.id} className=' gap-4 flex border border-1 border-[#F3F4F6] rounded-[16px] p-5
                    shadow-sm bg-[#FFFFFF] '>
                    <div className=' w-[128px] rounded-[12px] p-4 border border-1 '>
                      <img className='w-25 h-25' src={product.product.imageCover} alt={product.product.title} />
                    </div>
                    <div className=' flex w-full flex-col gap-2'>
                      <h3 className=' font-semibold text-lg text-[#101828]'>{product.product.title}</h3>
                      <p><span className=' rounded-[15px] py-[4px] px-[10px] bg-[#F0FDF4] text-sm text-[#15803D]'> {product.product.category.name}</span>
                        <span className=' text-[#6A7282] text-sm font-medium'>SKU: 5CA0AD</span></p>
                      <h5 className=' flex items-center gap-3'>
                        <span className=' text-[#16A34A] font-bold text-[18px]'>{product.price}EGP</span>
                        <span className=' text-[#99A1AF] text-sm font-medium'>per unit</span></h5>

                      <div className=' flex  justify-between w-full'>

                        <div className=' w-fit gap-3 flex items-center rounded-[12px] border border-1 border-[#E5E7EB] p-1 bg-[#F9FAFB]'>
                          <button onClick={()=>updateProduct(product.product.id,product.count - 1,'-')} className=' w-8 shadow-sm flex items-center justify-center italic h-8 rounded-[8px] bg-[#FFFFFF]'><FaMinus /></button>
                          <span>{product.count}</span>
                          <button onClick={()=>updateProduct(product.product.id,product.count +1,'+')}  className=' shadow-sm flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#FFFFFF]'><FaPlus /></button>
                        </div>



                        <div className=' w-fit flex items-center gap-2'>
                          <div className=' flex flex-col '>
                            <span className=' font-medium text-sm text-[#99A1AF]'>Total</span>
                            <span className=' font-bold text-lg'>{product.count * product.price} EGP</span>
                          </div>
                          <button onClick={()=> deleteProduct(product.product.id,product.count)} className=' w-10 cursor-pointer h-10 flex justify-center text-[#FB2C36] items-center rounded-[12px] bg-[#FEF2F2] border border-1 border-[#FFC9C9]'>
                            <MdDelete />
                          </button>
                        </div>


                      </div>


                    </div>
                  </div>
                )
              })}
            </div>
            <div className='col-span-4'>

              <div className=' flex flex-col overflow-hidden gap-4 border border-1 border-[#F3F4F6] rounded-[16px] bg-[#FFFFFF] '>

                <div className='py-4 px-6  bg-linear-to-r from-[#16A34A] to-[#15803D] '>
                  <p className=' flex items-center gap-1 font-bold text-lg text-[#FFFFFF]'> <IoLockClosed color='#FFFFFF' />Order Summary</p>
                  <p className=' font-medium text-sm text-[#DCFCE7]'>{countProduct} items in your cart</p>
                </div>

                <div className=' rounded-[12px] p-4 bg-linear-to-r from-[#F0FDF4] to-[#F3F4F6] flex gap-2'>
                  <span className=' w-10 h-10 rounded-full bg-[#DCFCE7] flex justify-center items-center text-[#00A63E]'><FaTruck /></span>
                  <div >
                    <h2 className=' font-semibold text-[#008236]'>Free Shipping!</h2>
                    <p className=' font-medium text-[14px] text-[#00A63E]'>You qualify for free delivery</p>
                  </div>
                </div>
                <div className=' p-6 flex flex-col gap-3'>

                  <div className=' flex flex-col gap-2 border-b py-2 border-b-1 border-b-dotted border-b-[#E5E7EB] '>
                    <p className=' flex justify-between items-center'><span className=' font-medium text-[#4A5565]'>Subtotal</span> <span className=' text-[#101828]'>1,994 EGP</span></p>
                    <p className=' flex justify-between items-center'><span className=' font-medium text-[#4A5565]'>Shipping</span> <span className=' font-medium text-[#00A63E]'>FREE</span></p>
                  </div>

                  <div className=' flex items-center justify-between'>
                    <span className=' font-semibold text-[#101828]'>Total</span>
                    <span className=' text-[#101828] text-8 font-bold'>{data.totalCartPrice} <span className=' text-sm font-medium text-[#6A7282]'>EGP</span>
                    </span>
                  </div>

                  <button className=' border-dashed text-sm text-[#4A5565] border-1 border-[#D1D5DC] rounded-[12px] py-[12px]'>Apply Promo Code</button>
                  <Link  href={`/checkout/${cartId}`}className=' cursor-pointer flex gap-2 justify-center py-[16px] px-[24px] text-[#FFFFFF] bg-linear-to-r  from-[#16A34A] to-[#15803D] items-center rounded-[12px] text-[#FFFFFF01] '  > <IoLockClosed /> Secure Checkout</Link>
                  <Link className=' text-[#16A34A] text-sm text-center my-2 ' href={`#`} >← Continue Shopping</Link>
                </div>

              </div>
            </div>
          </div>
        </>)
      }

    </div>
  )
}

