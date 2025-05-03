"use server";

import { createClient } from "@/auth/server"
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils"

export const  LoginUserAction=async(email:string,password:string)=>{
    try {
        
        const {auth}=await createClient()

        const {error}=await auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error
        return {errorMessage:null}


        
    } catch (error) {
        return handleError(error)
    }
}


export const  SignUpUserAction=async(email:string,password:string)=>{
// console.log('in the action');

    
    try {
        
        const {auth}=await createClient()

        // console.log('auth',auth);

        const {data,error}=await auth.signUp({
            email,
            password,
        })

        // console.log('data',data);
        // console.log('error',error);
        
        const userId=data?.user?.id
        if(!userId)throw new Error("an error occured")

            await prisma.user.create({
                data:{
                    id:userId,
                    email,
                }
            })
        if (error) throw error
        return {errorMessage:null}


        
    } catch (error) {
        return handleError(error)
    }
}

export const  LogOutUserAction=async()=>{
    try {
        
        const {auth}=await createClient()

        const {error}=await auth.signOut()

        if (error) throw error
        return {errorMessage:null}


        
    } catch (error) {
        return handleError(error)
    }
}