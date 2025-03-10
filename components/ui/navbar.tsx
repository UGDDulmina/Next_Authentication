import Link from "next/link";

import { Button } from "./button";

export default async function Navbar(){

return(
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">

    <Link href="/" className="text-xl font-bold">
     Auth.js
    </Link>
    <Link href="/auth/signin" className="text-xl font-bold">
     <Button variant="default">Sign In</Button>
    </Link>
    <form>
    <Button variant="default" type="submit">
        Sign Out
    </Button>    
    </form>
    </nav>
)



}