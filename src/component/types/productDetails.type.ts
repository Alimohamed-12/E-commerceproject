

export interface productDetailsType{
    sold:number,
    images:string[],
  subcategory: Subcategory[]
     ratingsQuantity:number,
     _id:string,
     title:string,
     slug:string,
    description:string,
    quantity:number,
    price:number,
    priceAfterDiscount:number,
     imageCover:string,
     category:{
     _id: string,
    name: string,
    slug: string,
    image: string
     },
     brand:{
      _id:string,
      name:string,
     slug: string,
    image: string
     },
     ratingsAverage:number,
     reviews:[{
       
      _id: string,
      review: string,
      rating: number,
      product: string,
      user: [Object],
      createdAt: string,
      updatedAt: string,
      __v: 0
     }]
     
}
interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}