import { db } from "@/lib/firebase";
import { SubscriptionPlan } from "@/types-db";
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
        const {userId} = auth() 
        const body = await req.json()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }

        const {name, price, description } = body;

        if(!name){
            return new NextResponse("SubscribtionPlan Name is missing", {status: 400})  
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if(store.exists()){
            let storeData = store.data()
            if(storeData?.userId !== userId){
                return new NextResponse("Un-Authorized Access", {status : 500}) 
            }
        }

        const subscribtionPlanData = {
            name,
            price,
            description,
            createdAt: serverTimestamp(),
        }

        const subscriptionPlanRef = await addDoc(
            collection(db, "stores", params.storeId, "subscribtion-plans"), 
            subscribtionPlanData
        )

        const id = subscriptionPlanRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "subscribtion-plans", id), {
            ...subscribtionPlanData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({id, ...subscribtionPlanData})

    } catch (error) {
        console.log('WEBSITES_POST', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const GET = async (req : Request, {params} : {params : {storeId : string}}) => {
    try {
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        const subscribtionPlansData = (await getDocs(
                collection(doc(db, "stores", params.storeId), "subscribtion-plans")
            )).docs.map(doc => doc.data()) as SubscriptionPlan[]
        
        return NextResponse.json(subscribtionPlansData, {headers : corsHeaders})
    } catch (error) {
        console.log('SIZES_GET', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
} 