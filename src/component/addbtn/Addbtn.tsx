'use client'

import { addCard } from '@/action/card-action'
import { cartContext } from '@/context/cardContext'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa6'

export default function Addbtn({
  className,
  id,
  text
}: {
  className: string
  id: string
  text?: string
}) {
  const context = useContext(cartContext)

  if (!context) {
    throw new Error('Addbtn must be inside CardContextProvider')
  }

  const { setnumberOfCartItems } = context

  async function addProduct() {
    const res = await addCard(id)

    if (res?.status === 'success') {
      setnumberOfCartItems(res.numOfCartItems)

      toast.success(res.message, {
        position: 'top-center'
      })
    } else {
      toast.error(res?.status ?? 'Something went wrong', {
        position: 'top-center'
      })
    }
  }

  if (text) {
    return (
      <button
        className={className}
        onClick={addProduct}
      >
        {text}
      </button>
    )
  }

  return (
    <button onClick={addProduct}>
      <FaPlus
        size={24}
        className={className}
      />
    </button>
  )
}