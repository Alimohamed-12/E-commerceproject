 import * as zod from 'zod'
 
export const registerSchema=zod.object({
    name:zod.string({ message: 'must be is text' })
    .nonempty('name is required ')
    .min(4,'min less is a 4')
    .max(10,'max length is 10'),
    email:zod.string().nonempty('email is required').email('email is invalid'),
    password:zod.string({message:'password is required'}).min(6,'minLength is 6').max(12,'maxLength is 12').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'repassword is not match regx '),
    phone:zod.string().nonempty('phone is required').regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,'invalid phone number '),
    rePassword:zod.string({message:'rePassword is required'}).min(6,'minLength is 6').max(12,'maxLength is 12').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'repassword is not match regx ')
  }).refine((obj)=>{
     return obj.password === obj.rePassword
  },{
    message:'password and repassword not matched',
    path:['rePassword']
  })
  

  
export const loginSchema=zod.object({
    email:zod.string().nonempty('email is required').email('email is invalid'),
    password:zod.string({message:'password is required'}).min(6,'minLength is 6').max(12,'maxLength is 12').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'repassword is not match regx '),
  })
  
  