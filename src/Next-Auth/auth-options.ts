import page from "@/app/(auth)/login/page"
import {NextAuthOptions} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {jwtDecode} from 'jwt-decode'

export const authOptions: NextAuthOptions={
    providers:[
        
        Credentials({
            name:'Credentials',

            credentials:{
                email:{label:'email',type:'email',placeholder:'ali@gmail.com'},
                password:{label:'password',type:'password',placeholder:'*******'}

            },

           async authorize(credentials,req){

            try{
                   const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                    method:'POST',
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password   
                    }),
                    headers:{ "content-type":'application/json' }
                   })
                    const result=await res.json()
                    console.log(result);
                   
                    if(!res.ok) {
                        throw new Error(result.message)
                    }

                 const decodetoken :{id:string}=  jwtDecode(result.token)
                 console.log('jwtDecode',decodetoken);
                 
                 //   decription token in cookies from next auth
                   return {
                    id:decodetoken.id,
                    name:result.user.name,
                    email:result.user.email,
                    accessToken:result.token
                   }
                }
                catch (e){
              console.log(e);
               console.log('eror from catch',e);
               throw new Error((e as Error).message)
             
                }
            }
        }),
      
    ],
    callbacks:{
              
        // call after authorzie
      async jwt({token ,user}) {
            // params has two object 
            // token and user
            // token --> object to next auth save in cookies
            // user -->object return from params login

           if(user){
             console.log('params jwt token',token);
             console.log('params jwt user',user);
            //    token.id=user.id
            //    token.routeToken=user.accessToken 
            (token as any).id = (user as any).id
           (token as any).routeToken = (user as any).accessToken
              
           } 
           
           return token
           
        },

// session call with usesession() | getServerSession() | api/auth/session
   async session({ session, token }) {
  ;(session.user as any).id = (token as any).id
  return session
}

        

    },
    pages:{
     signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    }
}
