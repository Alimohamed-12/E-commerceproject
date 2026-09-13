'use client'

import { getMycart } from '@/action/card-action'
import { getAllWishlist } from '@/action/wishlist.action'
import { productType } from '@/component/types/card.type'
import { getWishlistType } from '@/component/types/getWishlist.type'
import React, {
  createContext,
  useEffect,
  useState
} from 'react'

type CartContextType = {
  numberOfCartItems: number
  setnumberOfCartItems: React.Dispatch<
    React.SetStateAction<number>
  >

  totalPrice: number
  setTotalPrice: React.Dispatch<
    React.SetStateAction<number>
  >

  countWishlist: number
  setcountWishlist: React.Dispatch<
    React.SetStateAction<number>
  >

  dataWishlist: getWishlistType | null
  setdataWishlist: React.Dispatch<
    React.SetStateAction<getWishlistType | null>
  >

  cartData: productType[] | null
  setcartData: React.Dispatch<
    React.SetStateAction<productType[] | null>
  >

  userId: string | null
  setuserId: React.Dispatch<
    React.SetStateAction<string | null>
  >
}

export const cartContext =
  createContext<CartContextType | null>(null)

export default function CardContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [
    numberOfCartItems,
    setnumberOfCartItems
  ] = useState<number>(0)

  const [
    totalPrice,
    setTotalPrice
  ] = useState<number>(0)

  const [
    cartData,
    setcartData
  ] = useState<productType[] | null>(null)

  const [
    userId,
    setuserId
  ] = useState<string | null>(null)

  const [
    countWishlist,
    setcountWishlist
  ] = useState<number>(0)

  const [
    dataWishlist,
    setdataWishlist
  ] = useState<getWishlistType | null>(null)

  async function handleGetCrts() {
    try {
      const res = await getMycart()

      console.log(
        res?.data?.products,
        'res in context'
      )

      setTotalPrice(
        res?.data?.totalCartPrice ?? 0
      )

      setcartData(
        res?.data?.products ?? []
      )

      let sum = 0

      res?.data?.products?.forEach(
        (product: productType) => {
          sum += product.count
        }
      )

      setnumberOfCartItems(sum)

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  async function handleGetWishlist() {
    try {
      const res = await getAllWishlist()

      if (res?.status === 'success') {
        setcountWishlist(res.count ?? 0)
        setdataWishlist(res)
      }

    } catch (error: unknown) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetCrts()
    handleGetWishlist()
  }, [])

  return (
    <cartContext.Provider
      value={{
        dataWishlist,
        setdataWishlist,

        countWishlist,
        setcountWishlist,

        numberOfCartItems,
        setnumberOfCartItems,

        totalPrice,
        setTotalPrice,

        cartData,
        setcartData,

        userId,
        setuserId
      }}
    >
      {children}
    </cartContext.Provider>
  )
}