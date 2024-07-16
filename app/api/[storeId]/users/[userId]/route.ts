
import { db } from "@/lib/firebase";
import { User } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

export const OPTIONS = () => {
    return NextResponse.json({}, {headers : headers()})
}



export const PATCH = async (req : Request, {params} : {params : {storeId : string, sizeId : string}}) => {

    try {
        const {data, userId} = await req.json()
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }
        
        const {name, email} = data || {};

        if(!name){
            return new NextResponse("User Name is missing", {status: 400})  
        }
        
        if(!email){
            return new NextResponse("User Value is missing", {status: 400})  
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        console.log("before userRef")

        const userRef = await getDoc(
            doc(db, "stores", params.storeId, "users", userId)
        )

        if(userRef.exists()){
            await updateDoc(
                doc(db, "stores", params.storeId, "users", userId), {
                    ...userRef.data(),
                    name,
                    email,
                    updatedAt : serverTimestamp(),
                }
            )
        } else {
            return new NextResponse("User Not Found", {status: 404})
        }

        const user = (
            await getDoc(
                doc(db, "stores", params.storeId, "users", userId)
            )
        ).data() as User

        return NextResponse.json(user, {headers: corsHeaders})

    } catch (error) {
        console.log('SIZE_POST', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const DELETE = async (req : Request, {params} : {params : {storeId : string, sizeId : string}}) => {
    try {
        const userId = await req.json() 

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!userId){
            return new NextResponse("Size Id is missing", {status: 400})  
        }

        const userRef = doc(db, "stores", params.storeId, "users", userId)
        
        await deleteDoc(userRef)

        return NextResponse.json({msg : "Size Deleted"}, {headers: corsHeaders})

    } catch (error) {
        
        console.log('SIZE_DELETE', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   
