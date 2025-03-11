import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

export const{handlers, signIn, signOut, auth} = NextAuth({
    providers:[
          
        Credentials({

            credentials: {
                email: {label:"Email", type:"email",placeholder:"Email"},
                password: {label:"Password", type:"password", placeholder:'password'},
            },

            async authorize(credentials){
                let user = null;

                const parsedCredentials = signInSchema.safeParse(credentials);

                if(!parsedCredentials.success){
                    console.error("Invalied credentials:", parsedCredentials.error.errors)
                    return null;
                }

                user ={
                  id:"1",
                  name: "Dinuja",
                  email:"ug.dinuja@gmail.com"
                }

                if(!user){
                    console.log("Invalid credentials");
                    return null;
                }

                return user;

            }
        })
        
    ],
    pages: {

        signIn:"/auth/signin"
    },

    callbacks:{
        authorized({request: {nextUrl}, auth}){
            const isLoggedIn = !!auth?.user;
            const {pathname} = nextUrl;

            if (pathname.startsWith('/auth/signin') && isLoggedIn){
            
                return Response.redirect(new URL('/', nextUrl));
            }

            return !!auth;
            
        }
    }
})