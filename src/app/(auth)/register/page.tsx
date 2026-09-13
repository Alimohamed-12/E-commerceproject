"use client"
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaTruckFast } from 'react-icons/fa6';
import { MdOutlineSecurity } from 'react-icons/md';
import { FaGoogle } from "react-icons/fa";
import imge from '../../../assets/img33.png'
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import {Controller, useForm} from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FaUserPlus } from "react-icons/fa";
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod'
import { UserRegistr } from '@/action/auth-action';
import { toast} from 'react-hot-toast';
 import { useRouter } from 'next/navigation';
import {  registerSchema } from '@/Schema/Auth.schema';

export interface formTYpe{
    name:string,
    email:string,
    password:string,
    rePassword:string,
    phone:string,
   }
export default function page() {
  const router=useRouter()



 
 
   const { handleSubmit ,control,} =useForm<formTYpe>({
    defaultValues:{ 
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""

    },
    resolver:zodResolver(registerSchema)
   })

   
   async function submitForm(values:formTYpe){
      console.log(values);

      const isRegister =await UserRegistr(values)
    
    
       if(isRegister){
        toast.success('your register successfully ',{position:'top-center'})
        // toast.add({
        //   type: "success",
        //   description:'Your Register successfully',
        // })
        router.push('/login')
       }
      else{
      toast.error('this a Count exist',{position:'top-center'})
      }
    }

    
  return (
    <div className=' md:flex w-10/12 mx-auto mt-5 p-4'>


      <div className=' flex flex-col gap-2'>

        <h2 className=' font-bold text-4xl'>Welcome to <span className='text-[#16A34A] '>FreshCart</span></h2>
        <p className=' md:w-[500px] font-medium text-[20px] text-[#364153]'>Join thousands of happy customers who enjoy fresh groceries
          delivered right to their doorstep.</p>

        <ul className=' flex flex-col gap-4 py-6'>
          <li className=' flex items-center gap-3'>
            <span className=' w-[48px] h-[48px] rounded-full bg-[#BBF7D0] flex items-center justify-center'><FaStar color='#16A34A' size={20} /></span>
            <div>
              <h2>Premium Quality</h2>
              <p>Premium quality products sourced from trusted suppliers.</p>
            </div>
          </li>

          <li className=' flex items-center gap-3'>
            <span className=' w-[48px] h-[48px] rounded-full bg-[#BBF7D0] flex items-center justify-center'><FaTruckFast color='#16A34A' size={20} /></span>
            <div>
              <h2>Premium Quality</h2>
              <p>Premium quality products sourced from trusted suppliers.</p>
            </div>
          </li>
          <li className=' flex items-center gap-3'>
            <span className=' w-[48px] h-[48px] rounded-full bg-[#BBF7D0] flex items-center justify-center'><MdOutlineSecurity color='#16A34A' size={20} /></span>
            <div>
              <h2>Premium Quality</h2>
              <p>Premium quality products sourced from trusted suppliers.</p>
            </div>
          </li>

        </ul>

        <div className=' flex items-center gap-2'>
          
            <Image
              src={imge}
              alt="FreshCart"
              width={20}
              height={20}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className=' font-medium text-[#364153]'>Sarah Johnson</h2>
              <p className="flex items-center gap-1  text-yellow-400 text-xl">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </p>
            </div>

          </div>

          <p className='my-2 md:m-0 font-medium text-[#4A5565] italic md:w-[568px]'>"FreshCart has transformed my shopping experience. The quality of the
products is outstanding, and the delivery is always on time. Highly
recommend!"</p>

      </div>
      <div className='  w-full'>
        <h2 className=' font-semibold text-4xl text-[#364153] text-center '>Create Your Account</h2>
        <p className=' font-medium text-center text-[#364153]'>Start your fresh journey with us today</p>
        <div className='flex items-center gap-2 my-5'> 
          <button className=' w-full border border-1 border-[#D1D5DC] rounded-[8px] py-2 px-4 flex items-center justify-center gap-2'><FaGoogle color='#E7000B' /> Google</button>
          <button className=' w-full w-full border border-1 border-[#D1D5DC] rounded-[8px] py-2 px-4 flex items-center gap-2 justify-center'> <FaFacebook color='#155DFC' /> Facebook</button> 
        </div>

     
         
        <form  onSubmit={handleSubmit(submitForm)} className=' flex flex-col gap-6' >
             
  <Controller
  name="name"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className=' text-[#364153]' htmlFor={field.name}>Name:</FieldLabel>  
      <Input
      type='text'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter Name"
        autoComplete="on"
      />
   
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

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
  <Controller
  name="rePassword"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className=' text-[#364153]' htmlFor={field.name}>Confirm Password*</FieldLabel>  
      <Input
      type='password'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="confirm your password"
        autoComplete="on"
      />
   
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

  <Controller
  name="phone"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel className=' text-[#364153]' htmlFor={field.name}>Phone Number*</FieldLabel>  
      <Input
      type='tel'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="+1 234 567 8900"
        autoComplete="on"
      />
   
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
            <div className=' flex items-center gap-2'><input type="checkbox" /><div className=' font-medium'>I agree to the <span className=' text-[#16A34A]'>Terms of Service</span> and <span className=' text-[#16A34A]'>Privacy Policy</span> *</div></div>
            <button className=' flex items-center bg-[#16A34A] justify-center rounded-[8px] font-semibold py-2 gap-2 text-[#FFFFFF] '><FaUserPlus /> Create My Account</button>
            <hr />
            <p className=' text-center'>Already have an account? <Link href={'/login'} className='text-[#16A34A] '>Sign In</Link></p>
        </form>

      </div>
    </div>
  )
}
