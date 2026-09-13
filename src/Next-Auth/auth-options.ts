
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
async jwt({ token, user }) {
  if (user) {
    const currentUser = user as any

    ;(token as any).id = currentUser.id
    ;(token as any).routeToken = currentUser.accessToken
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
