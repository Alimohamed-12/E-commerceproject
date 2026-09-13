

export interface productsType{
   images: string[];
   ratingsQuantity: number;
   _id: string;
   title: string;
   slug: string;
   description: string;
   quantity: number;
   price: number;
   priceAfterDiscount: number;
imageCover: string;
category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
},
brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
},
ratingsAverage: number;
createdAt: string;
updatedAt: string;
id: string;
}

 export interface getWishlistType {
    status:string,
    count:number,
    data:  productsType[]
}

