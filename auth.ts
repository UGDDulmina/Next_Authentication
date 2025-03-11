import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

export const{handlers, signIn, signOut, auth} = NextAuth({
   
   
   
    providers:[

        Github({

            profile(profile){
                return {id: "some random id goes here...."}
            }
        }),
          
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
                  email:"ug.dinuja@gmail.com",
                  role:"admin"
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
            const role = auth?.user.role || 'user';

            if (pathname.startsWith('/auth/signin') && isLoggedIn){
            
                return Response.redirect(new URL('/', nextUrl));
            }
            if (pathname.startsWith("/page2") && role == "admin"){

                return Response.redirect(new URL('/', nextUrl))
            }

            return !!auth;
            
        },

        jwt({ token, user}){
            if(user){
                token.id = user.id as string;

                token.role = user.role as string;
            }

            return token;
        },

        session({session, token })
        {

            session.user.id = token.id;

            session.user.role = token.role;

            return session;
        }
    }
})