'use client'
import React from 'react'
import img from '@/assets/381609d78c4d97f9277837bc4bdf05035b888463.png'
import Image from 'next/image'
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaClock, FaUserPlus } from "react-icons/fa";
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
// import { UserLogin } from '@/action/auth-action';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { signIn } from "next-auth/react";

export interface loginType{
  email:string,
  password:string
}

export default function page() {
  const router=useRouter()

  const { handleSubmit, control } = useForm({
defaultValues:{
   "email":"",
     "password":""
}
  })

  async function submitForm(values:loginType){
    console.log(values);

    // const isLogin = await UserLogin(values)
  
     
     const res =await signIn('credentials',{...values,redirect:false})
     console.log(res);
     

    if(res?.ok){
      toast.success('login is successfully',{position:"top-center"})
      router.push('/')
    }else{
      toast.error(
  res?.error ?? 'Login failed',
  {
    duration: 3000,
    position: 'top-center'
  }
)
    }
    

  }
  return (
    <div className='md:w-10/12 mx-auto flex flex-col md:flex-row  gap-5'>

      <div className='w-full flex flex-col gap-2'>
        <Image className=' md:w-[616px] md:h-[384px]' src={img} width={159} height={120} alt={`no-photo`} />
        <h3 className=' font-bold text-[30px] text-center px-2 md:w-[580px]'>FreshCart - Your One-Stop Shop for Fresh
          Products</h3>
        <p className=' md:w-[526px] text-center font-medium text-[18px] text-[#4A5565]'>Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
        <ul className=' flex items-center justify-around w-[500px]'>
          <li className=' flex gap-2 items-center '><FaTruckFast color='#16A34A' /> <span className='text-[#6A7282]'>Free Delivery</span> </li>
          <li className=' flex gap-2 items-center'> <span><MdOutlineSecurity color='#16A34A' /></span> <span className=' text-[#6A7282]'>Secure Payment</span></li>
          <li className=' flex gap-2 items-center'><FaClock color='#16A34A' /> <span className=' text-[#6A7282]'>24/7 Support</span></li>
        </ul>
      </div>
      <div className='md:w-full flex flex-col gap-5 bg-[#FFFFFF] p-7 rounded-[16px] shadow-sm'>
        <h2 className=' text-[30px] font-bold text-center'><span className=' text-[#16A34A]'>Fresh</span>Cart <br /> Welcome Back!</h2>
        <p className=' font-medium text-[#4A5565] text-center'>Sign in to continue your fresh shopping experience</p>
        <button className=' border border-2 rounded-[12px] py-3 text-[#364153] px-5 flex items-center gap-2 justify-center'><FaGoogle /> Continue with Google</button>
        <button className=' font-medium text-[#364153] border border-2 py-3 px-5 rounded-[12px] flex items-center justify-center gap-2'><FaFacebook />Continue with Facebook</button>
        <form onSubmit={handleSubmit(submitForm)} className=' flex flex-col gap-6' >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className=' text-[#364153] font-medium' htmlFor={field.name}>Email*</FieldLabel>
                <Input
                  type='email'
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  autoComplete="on"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className=' text-[#364153]' htmlFor={field.name}>Password*</FieldLabel>
                <Input
                  type='password'
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Create a strong password"
                  autoComplete="on"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <div className=' flex items-center gap-2'><input type="checkbox" /><div className=' font-medium'>I agree to the <span className=' text-[#16A34A]'>Terms of Service</span> and <span className=' text-[#16A34A]'>Privacy Policy</span> *</div></div>
          <button className=' flex items-center bg-[#16A34A] justify-center rounded-[8px] font-semibold py-2 gap-2 text-[#FFFFFF] '><FaUserPlus /> Create My Account</button>
          <hr />
          <p className=' text-center'>New to FreshCart? <Link href={'/register'} className='text-[#16A34A] '>Create an account</Link></p>
        </form>
      </div>

    </div>
  )
}


// types token
// access token --> return from back DB
// Increpted token --> next-auth save in cookies --> decreption use secret key

