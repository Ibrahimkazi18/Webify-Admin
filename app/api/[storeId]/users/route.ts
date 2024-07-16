import { db } from "@/lib/firebase";
import { User } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
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

export const POST = async (req : Request, {params} : {params : {storeId : string}}) => {
    try {
        const body = await req.json()

        const {name, email} = body;

        if(!name){
            return new NextResponse("User Name is missing", {status: 400})  
        }
        
        if(!email){
            return new NextResponse("User Email is missing", {status: 400})  
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        const userData = {
            name,
            email,
            websiteCount : 0,
            websites : [],
            request : false,
            member : false, 
            createdAt: serverTimestamp(),
        }

        const userRef = await addDoc(
            collection(db, "stores", params.storeId, "users"), 
            userData
        )

        const id = userRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "users", id), {
            ...userData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({id, ...userData}, { headers : corsHeaders })

    } catch (error) {
        console.log('SIZES_POST', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const GET = async (req : Request, {params} : {params : {storeId : string}}) => {
    try {
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        const userData = (await getDocs(
                collection(doc(db, "stores", params.storeId), "users")
            )).docs.map(doc => doc.data()) as User[]
        
        return NextResponse.json(userData)
    } catch (error) {
        console.log('SIZES_GET', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
} 