import { getMyorders } from '@/component/services/getAllOrders.service'
import { getUserOrder } from '@/component/types/orders.type'
import { cartContext } from '@/context/cardContext'
import { authOptions } from '@/Next-Auth/auth-options'
import { GrNotes } from "react-icons/gr";
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { MdOutlineDateRange } from "react-icons/md";
import { FaFolderClosed } from "react-icons/fa6";

export  default async function page() {
  const session = await getServerSession(authOptions)
  // const userId = session?.user?.id as string
  const userId = (session?.user as { id?: string })?.id
  console.log('userID',userId)
  
  if (!userId) {
    return <div>Please login</div>
  }

  const res = await getMyorders(userId)
  console.log(res,'ee')


     
  return (
    <div className=' w-11/12 mx-auto'>
      all orders
      
          <div className=' flex flex-col gap-2 '>
               {res?.map((order:getUserOrder)=>{
                return <div key={order._id} className=' rounded-[16px] flex flex-col gap-3 border border-1 border-[#BBF7D0] p-6 bg-[#FFFFFF]'>
                    <div className=' flex gap-5'>
                      <Image src={order.cartItems[0].product.imageCover} alt={order.cartItems[0].product.title} width={60} height={30} />
                      <div className=' flex flex-col gap-3'>
                         <h3 className=' font-bold text-[18px] text-[#101828]'><span className=' text-[#99A1AF]'>#</span>{order.id}</h3>
                         <div className=' flex items-center gap-4 text-sm font-medium text-[#6A7282]'>
                          <span className=' flex items-center gap-1'><MdOutlineDateRange /> {new Date(order.createdAt).toLocaleDateString('en-US', {
 year: 'numeric',
  month: 'short',
  day: 'numeric'})} </span>
                          <span className=' flex items-center gap-1'><FaFolderClosed /> {order.cartItems[0].count} item</span>
                        
                         </div>
                         <h5 className=' font-bold text-[#101828] text-lg'> {order.cartItems[0].price} <span className=' text-[#99A1AF] text-sm font-medium'>EGP</span> </h5>
                      </div>
                    </div>
                      <h5 className=' flex items-center gap-3 font-semibold text-sm text-[#101828] '> <span className=' bg-[#DCFCE7] flex justify-center rounded-[8px] items-center p-3  '><GrNotes color='#16A34A' size={15} /></span> Order Items</h5>
                    <div className=' border border-1 flex justify-between items-center border-[#F3F4F6] rounded-[12px] p-4 bg-[#FFFFFF]'>
                    <div className=' flex items-center gap-3'>
                      <Image src={order.cartItems[0].product.imageCover} width={35} height={15} alt={order.cartItems[0].product.title} />
                      <div>
                          <h2 className=' font-medium text-[#101828]'>{order.cartItems[0].product.title}</h2>
                          <p className=' text-sm font-medium text-[#364153]'> <span>{order.cartItems[0].count}</span> <span>x</span> <span>{order.cartItems[0].price}</span> EGP</p>
                      </div>
                    </div>
                      <h5>
                        {order.cartItems[0].count * order.cartItems[0].price} EGP
                      </h5>
                    </div>
                </div>
               })}
          </div>
    </div>

  
  )
}







