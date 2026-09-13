'use server'

import { loginType } from "@/app/(auth)/login/page";
import { formTYpe } from "@/app/(auth)/register/page";
import { cookies } from "next/headers";




 export async function  UserRegistr(data:formTYpe){
    try{
       const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{ "content-type":'application/json' }
       })
        const result=await res.json()
            console.log(result);

           return res.ok       
    }
    catch (e){
 console.log(e);
 
    }
}


 export async function  UserLogin(data:loginType){
//     try{
//        const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
//         method:'POST',
//         body:JSON.stringify(data),
//         headers:{ "content-type":'application/json' }
//        })
//         const result=await res.json()
//         console.log(result);
//         if(res.ok){
//            const cookess =await cookies()
//            cookess.set('userToken',result.token,{
//         //   expires: new Date('2026-09-01'),
//         //   secure :true,
//         //   maxAge:60 * 60 *24,
//              httpOnly:true

//            })
           
//         }
        
//            return res.ok  
//     }
//     catch (e){
//  console.log(e);
 
//     }
}











// NEXTAuth --> library depends on Route handler 
// 1-> secure token (encription) 
// 2-> secure api
// 3-> secure response
// 4-> provider login with (google-facebok)
