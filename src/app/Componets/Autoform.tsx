'use client'

import { useRouter } from "next/navigation"
import { CardContent, CardFooter } from "./card"
import { Label } from "./label"
import { Input } from "./input"
import { Button } from "./button"
import { Link, Loader2 } from "lucide-react"
import { useTransition } from "react"
import { LoginUserAction, SignUpUserAction } from "@/Action/user"

type Props={
    type:"login" | "signup"
}

function AuthForm ({type}:Props){
    const isLoginForm=type ==='login'

    // console.log('isLoginForm',isLoginForm);
    

    const router=useRouter()
    const [isPending,startTransition]=useTransition();

    const handleSubmit=(formData:FormData)=>{
        startTransition(async()=>{
            const email=formData.get("email") as string
            const password=formData.get("password") as string

            let errorMessage;
            let title;
            let description;
            if (isLoginForm){
                console.log('in the if');
                errorMessage=(await LoginUserAction(email,password)).errorMessage;
                title="logged in"
                description="you have been logged successfully"
                router.push('/')
            }
         
            else {
                console.log('in the else');
                
                errorMessage=(await SignUpUserAction(email,password)).errorMessage;
                title="signup"
                description="check your email for confirmation link"
            }
        })

    } 

   
        return (
            <form action={handleSubmit}>
              <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    disabled={isPending}
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex flex-col gap-6">
                <Button className="w-full">
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : isLoginForm ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <p className="text-xs">
                  {isLoginForm
                    ? "Don't have an account yet?"
                    : "Already have an account?"}{" "}
                  <Link
                    href={isLoginForm ? "/sign-up" : "/Login"}
                    className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
                  >
                    {isLoginForm ? "Sign Up" : "Login"}
                  </Link>
                </p>
              </CardFooter>
            </form>
    )


    

}

export default AuthForm