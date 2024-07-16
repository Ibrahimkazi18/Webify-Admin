import { db } from "@/lib/firebase";
import { Website } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { addDoc, and, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { NextResponse } from "next/server";


export const POST = async (req : Request, {params} : {params : {storeId : string}}) => {
    try {
        const {userId} = auth() 
        const body = await req.json()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }

        const {name, price, images, isFeatured, owner, url, ownerId, category  } = body;

        if(!name){
            return new NextResponse("Website Name is missing", {status: 400})  
        }
        
        if(!images || !images.length){
            return new NextResponse("Images are required!", {status: 400})  
        }

        if(!price){
            return new NextResponse("Website Price is missing", {status: 400})  
        }

        if(!owner){
            return new NextResponse("Website owner is missing", {status: 400})  
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

        const websiteData = {
            name,
            price,
            images, 
            isFeatured,
            owner, 
            url, 
            ownerId, 
            category,
            createdAt: serverTimestamp(),
        }

        const productRef = await addDoc(
            collection(db, "stores", params.storeId, "websites"), 
            websiteData
        )

        const id = productRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "websites", id), {
            ...websiteData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({id, ...websiteData})

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

        // get the searchParams from the req.url
        const {searchParams} = new URL(req.url)

        const productRef = collection(doc(db, "stores", params.storeId), "websites")

        let productQuery;

        let queryConstraints = [];

        // construct the query based on the searchParams
        if(searchParams.has("url")){
            queryConstraints.push(where("url", "==", searchParams.get("url")))
        }

        if(searchParams.has("owner")){
            queryConstraints.push(where("owner", "==", searchParams.get("owner")))
        }

        if(searchParams.has("ownerId")){
            queryConstraints.push(where("ownerId", "==", searchParams.get("ownerId")))
        }
        
        if(searchParams.has("categpry")){
            queryConstraints.push(where("categpry", "==", searchParams.get("categpry")))
        }

        if(searchParams.has("isFeautured")){
            queryConstraints.push(where("isFeautured", "==", searchParams.get("isFeautured") === "true" ? true : false))
        }


        if(queryConstraints.length > 0) {
            productQuery = query(productRef, and(...queryConstraints))
        } else {
            productQuery = query(productRef)
        }

        // execute the query
        const querySnapshot = await getDocs(productQuery)
        
        const websiteData : Website[] = querySnapshot.docs.map(doc => doc.data() as Website) 

        return NextResponse.json(websiteData)

    } catch (error) {
        console.log('WEBSITES_GET', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
} 