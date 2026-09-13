'use client'
import React, { useContext, useEffect } from 'react'
import { FaTruck } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { cartContext } from '@/context/cardContext';


export default function FirstNavbar() {
    // const {userId,setuserId}=useContext(cartContext)
    const { data: mydata, status } = useSession()
    // console.log(mydata,'vv');
    // // console.log(mydata?.user.id,'vvtt');
    // setuserId(mydata?.user.id)

    // console.log(status);
//      useEffect(() => {
//     if (mydata?.user?.id) {
//       setuserId(mydata.user.id)
//     }
//   }, [mydata, setuserId])


    function logOut(){
        signOut({redirect:true ,callbackUrl:'/login'})
    }

    return (
        <div className='px-15 hidden md:flex border border-b-1 border-b-bg-[#F3F4F6] py-3 flex justify-between'>
            <div className="left-side flex items-center gap-5 ">
                <span className=' flex items-center font-medium text-sm gap-2 text-[#6A7282]'><FaTruck /> Free Shipping on Orders 500 EGP</span>
                <span className=' flex items-center font-medium text-sm gap-2 text-[#6A7282]'><FaGift />New Arrivals Daily</span>
            </div>
            <div className="right-side flex items-center gap-5">
                <div className=' flex items-center gap-5'>
                    <span className=' flex items-center gap-2 font-medium text-sm text-[#6A7282]'><FaPhone />  +1 (800) 123-4567 </span>
                    <span className=' flex items-center gap-2 font-medium text-sm text-[#6A7282]'><FaEnvelope /> support@freshcart.com</span>
                </div>
                {
                    status === 'authenticated' ? (

                        <div className=' flex items-center gap-4 text-sm font-medium text-[#4A5565]'>
                            <span className='flex items-center gap-1'>
                                <CiUser /> {mydata?.user?.name}
                            </span>
                            <span onClick={logOut} className='flex items-center gap-1 cursor-pointer'>
                                <CiLogin /> Sign Out
                            </span>
                        </div>
                    ) :
                        (
                            <div className=' flex items-center gap-4 text-sm font-medium text-[#4A5565]'>
                                <Link href={`/login`} className='flex items-center gap-1'><CiUser />

                                    Signin</Link>
                            <Link href={`/register`} className='flex items-center gap-1'><CiLogin /> Sign Up</Link>
                            </div>
                        )
                }


            </div>
        </div>
    )
}




