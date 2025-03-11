import Link from "next/link";
import { Button } from "./button";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authActions";

export default async  function Navbar(){

   const session = await auth();

return(
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">

    <Link href="/" className="text-xl font-bold">
     Auth.js
    </Link>

    {!session ? (
    <Link href="api/auth/signin" className="text-xl font-bold">
     <Button variant="default">Sign In</Button>
    </Link>
    ):(
    
    <form action={handleSignOut}>
    <Button variant="default" type="submit">
        Sign Out
    </Button>    
    </form>
     )}
    </nav>
)



}