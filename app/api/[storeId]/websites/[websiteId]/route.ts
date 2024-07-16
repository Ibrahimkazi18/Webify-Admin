import getAllWebsites from "@/actions/getAllWebsites";
import getUser from "@/actions/getUser";
import getWebsitesUser from "@/actions/getWebsitesUser";
import { db, storage } from "@/lib/firebase";
import { User, Website } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";


export const PATCH = async (req : Request, {params} : {params : {storeId : string, websiteId : string}}) => {

    try {
        const {userId} = auth() 
        const body = await req.json()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }

        const {name, price, images, isFeatured, owner, url, ownerId, category } = body;

        const allWebsites = await  getAllWebsites({})
        const users = await getUser()

        const user = users.find(item => item.email === ownerId)
        
        const websites = await getWebsitesUser(ownerId, allWebsites)
        const websiteCount = websites.length

        if(user) {
            const userRef = await getDoc(
                doc(db, "stores", params.storeId, "users", user.id)
            )

            if(userRef.exists()){
                await updateDoc(
                    doc(db, "stores", params.storeId, "users", user.id), {
                        ...userRef.data(),
                        websites,
                        websiteCount,
                        updatedAt : serverTimestamp(),
                    }
                )
    
            } else {
                return new NextResponse("User Not Found", {status: 404})
            }
    
            const userDoc = (
                await getDoc(
                    doc(db, "stores", params.storeId, "users", user.id)
                )
            ).data() as User
    
            return NextResponse.json(userDoc)
        }
        

        if(!name){
            return new NextResponse("Product Name is missing", {status: 400})  
        }
        
        if(!images || !images.length){
            return new NextResponse("Images are required!", {status: 400})  
        }

        if(!price){
            return new NextResponse("Product Price is missing", {status: 400})  
        }

        if(!owner){
            return new NextResponse("Product owner is missing", {status: 400})  
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!params.websiteId){
            return new NextResponse("Product Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if(store.exists()){
            let storeData = store.data()
            if(storeData?.userId !== userId){
                return new NextResponse("Un-Authorized Access", {status : 500}) 
            }
        }

        const websiteRef = await getDoc(
            doc(db, "stores", params.storeId, "websites", params.websiteId)
        )
    

        if(websiteRef.exists()){
            await updateDoc(
                doc(db, "stores", params.storeId, "websites", params.websiteId), {
                    ...websiteRef.data(),
                    name,
                    price,
                    images, 
                    isFeatured,
                    owner, 
                    url, 
                    ownerId, 
                    category,
                    updatedAt : serverTimestamp(),
                }
            )

        } else {
            return new NextResponse("Product Not Found", {status: 404})
        }

        const website = (
            await getDoc(
                doc(db, "stores", params.storeId, "websites", params.websiteId)
            )
        ).data() as Website

        return NextResponse.json(website)

    } catch (error) {
        console.log('WEBSITE_PATCH', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const DELETE = async (req : Request, {params} : {params : {storeId : string, websiteId : string}}) => {
    try {
        const {userId} = auth() 

        if(!userId){
            return new NextResponse("Unauthorized", {status: 400})
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!params.websiteId){
            return new NextResponse("Website Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if(store.exists()){
            let storeData = store.data()
            if(storeData?.userId !== userId){
                return new NextResponse("Un-Authorized Access", {status : 500}) 
            }
        }

        const websiteRef = doc(db, "stores", params.storeId, "websites", params.websiteId)

        const websiteDoc = await getDoc(websiteRef)
        if(!websiteDoc.exists()){
            return new NextResponse("Website Not Found", {status : 404})
        }
        
        //delete all the images form the storage
        const images = websiteDoc.data()?.images;

        if(images && Array.isArray(images)) {
            await Promise.all(
                images.map(async (image) => {
                    const imageRef = ref(storage, image.url);
                    await deleteObject(imageRef)
                })
            )
        }

        await deleteDoc(websiteRef)

        return NextResponse.json({msg : "Website and associated images deleted succesfully"})

    } catch (error) {
        
        console.log('PRODUCT_DELETE', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const GET = async (req : Request, {params} : {params : {storeId : string, websiteId : string}}) => {
    try {
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if(!params.websiteId){
            return new NextResponse("Website Id is missing", {status: 400})  
        }

        const website = (
            (await getDoc(doc(db, "stores", params.storeId, "websites", params.websiteId))).data() as Website
        )
        
        return NextResponse.json(website)
    } catch (error) {
        console.log('PRODUCT_GET', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
} 
