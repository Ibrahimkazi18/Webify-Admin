import getUser from "@/actions/getUser";
import { db } from "@/lib/firebase";
import { Requests, User } from "@/types-db";
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

        const {name, email, type, copyId, price} = body;

        const users = await getUser()

        const user = users.find(item => item.email === email)

        const member = user?.member

        if(!name){
            return new NextResponse("Requests name is missing", {status: 400})  
        }
        
        if(!email){
            return new NextResponse("Requests Email is missing", {status: 400})  
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(user) {
            const userRef = await getDoc(
                doc(db, "stores", params.storeId, "users", user.id)
            )

            if(userRef.exists()){
                await updateDoc(
                    doc(db, "stores", params.storeId, "users", user.id), {
                        ...userRef.data(),
                        request : true,
                        updatedAt : serverTimestamp(),
                    }
                )
            } else {
                return new NextResponse("User Not Found", {status: 404})
            }
    
            const userData = (
                await getDoc(
                    doc(db, "stores", params.storeId, "users", user.id)
                )
            ).data() as User
    
            
            const requestData = {
                name,
                email,
                type,
                member,
                price,
                status: "On Hold",
                createdAt: serverTimestamp(),
            }
            
            const requestRef = await addDoc(
                collection(db, "stores", params.storeId, "requests"), 
                requestData
            )
            
            const id = requestRef.id;
            
            await updateDoc(doc(db, "stores", params.storeId, "requests", id), {
                ...requestData,
                id,
                updatedAt: serverTimestamp()
            })
            return NextResponse.json({id, ...requestData, userData}, {headers: corsHeaders})
        }


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

        const requestData = (await getDocs(
                collection(doc(db, "stores", "rDEO7aSbZBqc5Jpi3RnV"), "requests")
            )).docs.map(doc => doc.data()) as Requests[]
        
        if(requestData){

            return NextResponse.json(requestData)
        }
        else {
            return "No reuquests found"
        }

    } catch (error) {
        console.log('SIZES_GET', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
} 