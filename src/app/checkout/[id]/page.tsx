'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaCity } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldTitle } from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { MdOutlinePayment } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MdPayments } from "react-icons/md";
import { cartContext } from '@/context/cardContext';
import { productType } from '@/component/types/card.type';
import Image from 'next/image';
import { TypeSubmitValueas } from '@/component/types/checkOut.type';
import { handlePaymentCash, handlePaymentVisa } from '@/action/payment-action';
import { useParams } from 'next/navigation';


export default function page() {
  const context=useContext(cartContext)
  if(!context) throw new Error(' in error in context')
  const { cartData, numberOfCartItems, totalPrice } = context

  const { control, handleSubmit } = useForm<TypeSubmitValueas>({
    defaultValues: {
      "details": "",
      "phone": "",
      "city": "",
      'type': ''
    }
  })



  const { id }: { id: string } = useParams();
  // console.log(params,'params in checkout');
  // console.log(totalPrice,'total price');

  async function handleValues(values: TypeSubmitValueas) {
    console.log(values, 'data in checkout');


    if (values.type === 'cash') {
      const res = await handlePaymentCash(values, id)
      console.log(res, 'res in checkout');

      if (res?.status === 'success') {
        alert('all correct cach')
      }

    }
    else {

      
      const res = await handlePaymentVisa(values, '', id)
       console.log(res,'res visa')
      if (res.status === 'success') {
        window.location.href = res.session.url

      }
    }


  }

  return (
    <div className=' w-11/12 mx-auto mt-5 flex flex-col gap-5'>
      <div className=" flex gap-3">
        <span className='text-[#6A7282] text-sm '>Home </span> <span className='text-[#6A7282] text-sm '>/</span> <span className='text-[#6A7282] text-sm '>Cart</span> <span className='text-[#6A7282] text-sm '>/</span> <span >Checkout</span>
      </div>
      <div className='flex justify-between items-center'>
        <div >
          <div className='flex gap-3 items-center'>
            <span className=' bg-linear-to-r from-[#16A34A] to-[#15803D] inline-block p-2 rounded-[8px] text-[#FFFFFF]'><CgNotes /></span>
            <h2 className='text-[#101828] font-bold text-3xl'>Complete Your Order</h2>
          </div>
          <p className=' font-medium text-[#6A7282]'>Review your items and complete your purchase</p>
        </div>
        <Link className='flex items-center gap-2' href="/cart"><FaArrowLeft /> Back to Cart</Link>
      </div>

      <form onSubmit={handleSubmit(handleValues)} className=' md:grid md:grid-cols-12 gap-3 '>
        <div className=' md:col-span-8 '>
          <div className=' rounded-[16px] overflow-hidden border border-1 border-[#F3F4F6] shadow-sm bg-[#FFFFFF]'>
            <div className='py-4 px-7 flex flex-col gap-2 bg-linear-to-r from-[#16A34A] to-[#15803D]'>
              <div className=' flex gap-3 items-center'>
                <span className='  text-[#FFFFFF]'> <IoMdHome size={25} /> </span>
                <h3 className=' font-bold text-[18px] text-[#FFFFFF]'>Shipping Address</h3>
              </div>
              <p className=' font-medium text-[14px] text-[#DCFCE7] '>Where should we deliver your order?</p>
            </div>
            <div className=' p-[24px] flex flex-col gap-4'>

              <div className=' flex flex-col gap-2'>
                <div className=' flex gap-3 items-center'>
                  <IoBookmarkSharp size={20} className=' text-[#22C55E] ' /> <h2 className=' font-semibold text-[#1E2939]'>Saved Addresses</h2>
                </div>
                <p className=' font-medium text-sm text-[#4A5565]'>Select a saved address or enter a new one below</p>
              </div>

              <div className=' flex  gap-2 border border-2 border-[#E5E7EB] rounded-[12px] p-4'>
                <span className=' w-10 h-10 flex justify-center items-center bg-[#F3F4F6] text-[#6A7282] rounded-[8px]'><MdLocationPin /></span>
                <div>
                  <h4 className=' font-semibold text-[#101828] '>Sadat City</h4>
                  <p className=' font-medium text-sm text-[#4A5565]'>Sadat City</p>
                  <p className=' flex items-center gap-3 mt-2 '>
                    <div className=' flex items-center gap-1'> <span className=' text-[#6A7282] text-xs'><FaPhone /></span> <span className=' text-xs font-medium text-[#6A7282]'>01027392104</span></div>
                    <div className=' flex items-center gap-1'> <span className=' text-[#6A7282] text-xs'><FaCity /></span> <span className=' text-xs font-medium text-[#6A7282]'>Sadat City</span></div>
                  </p>
                </div>

              </div>

              <div className=' flex gap-3 items-center border border-2 border-dashed p-[16] rounded-[12px] border-[#22C55E]'>
                <span className=' text-[#6A7282] text-[#FFFFFF] flex justify-center items-center bg-[#22C55E] p-2 rounded-[8px]'><FaPlus /></span>
                <div>
                  <h3 className=' font-semibold text-[#15803D]'>Use a different address</h3>
                  <p className=' font-medium text-xs text-[#6A7282]'>Enter a new shipping address manually</p>
                </div>
              </div>

              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      type="text"
                      className='py-4 focus:outline-0'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      autoComplete="off"
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />


              <Controller
                name="details"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Street Address *</FieldLabel>
                    <Input
                      type="text"
                      className='py-4 focus:outline-0'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Street name, building number, floor, apartment..."
                      autoComplete="off"
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
                    <FieldLabel htmlFor={field.name}>Phone Number *</FieldLabel>
                    <Input
                      type="tel"
                      className='py-4 focus:outline-0'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="01xxxxxxxxx"
                      autoComplete="off"
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

            </div>
          </div>
          <div className=' rounded-[16px] bg-[#FFFFFF] border border-1 border-[#F3F4F6] shadow-sm overflow-hidden'>
            <div className=' bg-linear-to-r from-[#16A34A] to-[#15803D] py-4 px-6'>
              <div className=' flex gap-2 items-center'>
                <MdOutlinePayment color='#FFFFFF' />
                <h2 className=' font-bold text-[18px] text-[#FFFFFF]'>Payment Method</h2>
              </div>
              <p className=' text-[14px] font-medium text-[#DCFCE7]'>Choose how you'd like to pay</p>
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full gap-3 flex flex-col p-5"
                  >

                    {/* Cash */}
                    <FieldLabel htmlFor="cash">
                      <Field orientation="horizontal">
                        <FieldContent className="flex gap-3">
                          <FieldDescription className="flex items-center gap-3">
                            <span className="bg-[#F3F4F6] flex justify-center items-center p-3 rounded-[7px]">
                              <MdPayments />
                            </span>

                            <div>
                              <h2 className="font-bold text-[16px] text-[#15803D]">
                                Cash on Delivery
                              </h2>

                              <p className="font-medium text-[14px] text-[#6A7282]">
                                Pay when your order arrives at your doorstep
                              </p>
                            </div>
                          </FieldDescription>
                        </FieldContent>

                        <RadioGroupItem value="cash" id="cash" />
                      </Field>
                    </FieldLabel>

                    {/* Visa */}
                    <FieldLabel htmlFor="visa">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldDescription className="flex items-center gap-3">
                            <span className="bg-[#F3F4F6] flex justify-center items-center p-3 rounded-[7px]">
                              <MdPayments />
                            </span>

                            <div>
                              <h2 className="font-bold text-[16px] text-[#15803D]">
                                Pay Online
                              </h2>

                              <p className="font-medium text-[14px] text-[#6A7282]">
                                Secure payment with Credit/Debit Card via Stripe
                              </p>
                            </div>
                          </FieldDescription>
                        </FieldContent>

                        <RadioGroupItem value="visa" id="visa" />
                      </Field>
                    </FieldLabel>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                  </RadioGroup>
                </Field>
              )}
            />

          </div>
        </div>
        <div className=' md:col-span-4'>
          <div className=' rounded-[16px] border border-1 flex flex-col gap-3 overflow-hidden p-4 bg-[#FFFFFF] shadow-sm '>
            <div className=' bg-linear-to-r from-[#16A34A] to-[#15803D] py-4 px-6 '>
              <div className=' flex gap-2 items-center'>
                <h3 className=' font-bold text-lg text-[#FFFFFF] '>Order Summary</h3>
              </div>
              <p>items</p>
            </div>
            <div className=' p-4'>
              <div className=' h-[224px]  overflow-y-scroll flex flex-col gap-3'>

                {
                 cartData &&(
                  cartData.map((item:productType) => {
                    return <div key={item.product.id} className=' flex flex-row gap-2 justify-between items-center'>

                      <div className=' flex gap-3 items-center'>
                        <Image src={item.product.imageCover} alt={item.product.title} width={40} height={30} />
                        <div>
                          <h2 className=' font-medium text-sm text-[#101828]'>{item.product.title.split(' ').slice(0, 3).join(' ')}</h2>
                          <p className=' text-[12px] font-medium text-[#6A7282]'>{item.count}*{item.price} EGP</p>
                        </div>
                      </div>
                      <div>
                        <p className=' text-[14px] text-[#101828] font-bold text-[#6A7282]'>{item.count * item.price}</p>
                      </div>
                    </div>
                  })
                 )
                }

              </div>

            </div>
            <div className='  flex flex-col gap-3'>
              <div className=' flex justify-between items-center'> <span>Subtotal</span><span className=' font-medium text-[#4A5565]'>{totalPrice} EGP</span></div>
              <div className=' flex justify-between items-center'> <span className='font-medium text-[#4A5565]'>Shipping</span><span className=' font-semibold text-[#00A63E]'>FREE</span> </div>
              <div className=' flex justify-between items-center'>
                <span className=' font-bold text-[#101828]'>Total</span>
                <span className=' font-bold text-[#16A34A]'>{totalPrice} <span className=' text-[#4A5565]'>EGP</span></span>

              </div>
            </div>

            <button className=' bg-[#16A34A] text-[#FFFFFF] font-bold p-3  rounded-[12px] w-full' >Place Order</button>
          </div>
        </div>
      </form>
    </div>
  )
}