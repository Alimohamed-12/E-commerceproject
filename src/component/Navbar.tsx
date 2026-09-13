"use client"

import * as React from "react"
import Link from "next/link"
import { CiViewList } from "react-icons/ci";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from 'next/image'
import logo from '../assets/freshcart-logo.49f1b44d.svg fill.png'
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
import { FaAddressCard, FaShoppingCart } from "react-icons/fa";
import { cartContext } from "@/context/cardContext"

export default function Navbar() {
  const context=React.useContext(cartContext)
  if(!context) throw new Error('in error')
  const {numberOfCartItems,setnumberOfCartItems,countWishlist}=context
  console.log(numberOfCartItems,'uu99');
  
  return (
    <NavigationMenu className=' max-w-full! md:px-10 shadow-sm sticky top-0 z-20 bg-[#FFFFFF]'>
      <NavigationMenuList className=' flex justify-between p-3'>

   

          <NavigationMenuItem>
          <Link href='/'>
            <Image src={logo} alt="Logo" width={150} height={150} />
          </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem className={`hidden md:block`}>
             <input type="text" placeholder='Search for products, brands and more...' 
             className=" border border-1 rounded-3xl w-120 placeholder:text-[#36415380] placeholder:text-sm focus:outline-0 py-2 ps-5" />
          </NavigationMenuItem>
        <NavigationMenuItem className=' hidden  md:flex justify-between gap-5 items-center '>
        <Link  href="/">Home</Link>
        <Link  href="/cart">shop</Link>
        <Link  href="/docs">Categories</Link>
        <Link  href="/brands">Brands</Link>
        </NavigationMenuItem>

 <NavigationMenuItem className='flex justify-between gap-5 items-center'>
        <Link href={`/wishlist`} className=" text-[#6A7282] relative" ><CiHeart size={25} /> 
          <span className=" absolute top-[-10px] right-[-13px] bg-[#FB2C36] w-5 text-xs text-[#FFFFFF]  h-5 rounded-full flex justify-center items-center">{countWishlist}</span>
       </Link>
      <div className="relative ">
      <Link className=" text-[#6A7282]"  href="#"><FaCartShopping /></Link> 
       {numberOfCartItems > 0 && (
              <span className=" absolute top-[-16px] right-[-14px] flex justify-center items-center text-sm p-2 bg-[#16a34a] w-5 h-5 rounded-full text-[#dcfce7]">{numberOfCartItems}</span>
       )}
      </div>
        <Link className="text-[#6A7282] hidden md:block " href="#"><FaAddressCard /></Link>

          <NavigationMenuItem className='md:hidden '>
          <NavigationMenuTrigger className={ ` bg-[#16A34A] text-[#FFFFFF]`}><CiViewList size={20} /></NavigationMenuTrigger>
          <NavigationMenuContent className={` p-4 `}>
            <ul className="w-56 flex flex-col gap-3">
              <li className="w-full "><Link className=" block cursor-pointer w-full " href={`/`}>Home</Link> </li>
              <li ><Link className=" block cursor-pointer w-full" href={`/cart`}>Shop</Link> </li>
              <li><Link className=" block cursor-pointer w-full" href={`/brands`}>Brands</Link> </li>
            </ul>
            <ul className="w-56 flex flex-col my-5 gap-2">
               <li className=" flex justify-between items-center">
                 <Link href={`/wishlist`} className=" flex items-center gap-3">
                  <span className=" bg-[#FEF2F2] w-[36px] h-[36px] flex justify-center items-center rounded-full  text-[#FB2C36]"><CiHeart size={25} /> </span>
                  <span>wishlist</span>
                 </Link>
                 <span className=" bg-[#FB2C36] w-7 h-7 flex justify-center items-center rounded-full text-[#FFFFFF]">{countWishlist}</span>
               </li>
               <Link href={`/cart`}  className=" flex justify-between">
                <div  className=" cursor-pointer flex items-center gap-7">
                  <span className=" text-[#16A34A] "><FaShoppingCart /></span>
                  <span>Cart</span>
                </div>
                <span className=" w-6 h-6 bg-[#16A34A] rounded-full flex items-center text-sm text-[#FFFFFF] justify-center">{numberOfCartItems}</span>
               </Link>
            
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        </NavigationMenuItem>

   

      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div></Link>} />
    </li>
  )
}
