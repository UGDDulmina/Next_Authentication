import { Button } from "./button";

export default function LoadingButton({pending}:{pending:boolean}){

return(

   < Button className="w-full" type="submit" disabled={pending}>
    {pending ? (
        <div className="flex items-center justify-center">

             <svg

               className="animate-spin h-5 w-5 text-white mr-2"

               xmlns="http://www.w3.org/2000/svg"

               fill="nine"

               viewBox="0 0 24 24"

              ></svg> 

        </div>
    ):(
        "Sign in"
    )}
   </Button>
)


}