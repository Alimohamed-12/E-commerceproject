
export interface brand{
    
  _id:string,
  name:string,
   slug:string,
 image:string
                                       
}
export interface category{
    
   _id:string,
   name:string,
  slug:string,
 image:string                     
                    
}
export interface subcategory {
    
 category:string,
 name:string,
  slug:string,
  _id:string
                
}
export interface addCardType{
    cartId:string,
    data:{
        cartOwner:string,
        products:[
            {
                count:number,
                price:number,
                product:{
                    brand:brand,
                    category:category
                }
            }
        ],
        id:string,
        imageCover:string,
        quantity:number,
      ratingsAverage:number,
      slug:string,
      title:string
    },
    message:string,
    numOfCartItems:number,
    status:string

}

export interface productType{
     
              count:number,
              price:number,
              product:{
                brand:brand,
                category:category,
                id:string,
                imageCover:string,        
                quantity:number,
                ratingsAverage:number,
                title:string,
                subcategory:subcategory[]

              }
            
}


export interface getCartsType{
    status:string,
    numOfCartItems:number,
    message:string,
    cartId:string,
    data:{
        cartOwner:string,
        totalCartPrice:number,
        products:productType[]
    }

}

