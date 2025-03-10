import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

export const{handlers, signIn, signOut, auth} = NextAuth({
    providers:[
          
        Credentials({

            credentials: {
                email: {label:"Email", type:"email",placeholder:"Email"},
                password: {label:"Password", type:"password", placeholder:'password'},
            },

            async authorize(credentials){
                let user = null;

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
        
    ]
})