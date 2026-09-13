import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"


 export async function getMytoken(){
     const cooks=await cookies()
    
     const mytoken=cooks.get('next-auth.session-token')?.value ||
        cooks.get(`_Secure-next-auth.session-token`)?.value
    
        const tokenDecoded =await decode({token:mytoken,secret:process.env.NEXTAUTH_SECRET!})
    
       const token=tokenDecoded?.routeToken


   return token
        
}


