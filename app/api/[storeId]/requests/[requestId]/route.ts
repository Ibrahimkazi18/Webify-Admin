
import { db, storage } from "@/lib/firebase";
import { Requests } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
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


export const PATCH = async (req : Request, {params} : {params : {storeId : string, requestId : string}}) => {

    try {
        const {userId} = auth() 
        const body = await req.json()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }

        const {status} = body;
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!params.requestId){
            return new NextResponse("Product Id is missing", {status: 400})  
        }

        const requestRef = await getDoc(
            doc(db, "stores", params.storeId, "requests", params.requestId)
        )
    

        if(requestRef.exists()){
            await updateDoc(
                doc(db, "stores", params.storeId, "requests", params.requestId), {
                    ...requestRef.data(),
                    status,
                    updatedAt : serverTimestamp(),
                }
            )

        } else {
            return new NextResponse("Product Not Found", {status: 404})
        }

        const request = (
            await getDoc(
                doc(db, "stores", params.storeId, "requests", params.requestId)
            )
        ).data() as Requests

        return NextResponse.json(request , {headers: corsHeaders})

    } catch (error) {
        console.log('REEQUEST_PATCH', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const DELETE = async (req : Request, {params} : {params : {storeId : string, requestId : string}}) => {
    try {
        const {userId} = auth() 

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!params.requestId){
            return new NextResponse("Website Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if(store.exists()){
            let storeData = store.data()
            if(storeData?.userId !== userId){
                return new NextResponse("Un-Authorized Access", {status : 500}) 
            }
        }

        const requestRef = doc(db, "stores", params.storeId, "requests", params.requestId)

        const requestDoc = await getDoc(requestRef)

        if(!requestDoc.exists()){
            return new NextResponse("Website Not Found", {status : 404})
        }
        
        await deleteDoc(requestRef)

        return NextResponse.json({msg : "Website and associated images deleted succesfully"})

    } catch (error) {
        
        console.log('REQUEST_DELETE', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const GET = async (req : Request, {params} : {params : {storeId : string, requestId : string}}) => {
    try {
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!params.requestId){
            return new NextResponse("Request Id is missing", {status: 400})  
        }

        const request = (
            (await getDoc(doc(db, "stores", params.storeId, "requests", params.requestId))).data() as Requests
        )
        
        return NextResponse.json(request)
    } catch (error) {
        console.log('REQUESTS_GET', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
} 
