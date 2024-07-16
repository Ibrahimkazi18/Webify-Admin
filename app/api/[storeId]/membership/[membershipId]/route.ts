import getUser from "@/actions/getUser";
import { db } from "@/lib/firebase";
import { Membership, User } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { addMonths } from "date-fns";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
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

        const {userId, plan, duration, totalAmount} = body;

        const users = await getUser()

        const user = users.find(item => item.email === userId)

        const startDate = new Date();
        const endDate = addMonths(startDate, duration)

        console.log(endDate)

        if(!userId){
            return new NextResponse("Membership userId is missing", {status: 400})  
        }
        
        if(!plan){
            return new NextResponse("Membership plan is missing", {status: 400})  
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
                        member : true,
                        membership : {
                          plan,
                          duration,
                          totalAmount,
                          startDate: startDate,
                          endDate: endDate,
                          status: "Active",
                        },
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
    
            const membershipData = {
                userId,
                plan,
                duration,
                totalAmount,
                startDate: startDate,
                endDate: endDate,
                status: "Active",
            }
            
            const membershipRef = await addDoc(
                collection(db, "stores", params.storeId, "memberships"), 
                membershipData
            )
            
            const id = membershipRef.id;
            
            await updateDoc(doc(db, "stores", params.storeId, "memberships", id), {
                ...membershipData,
                id,
                updatedAt: serverTimestamp()
            })
            return NextResponse.json({id, ...membershipData, userData}, {headers: corsHeaders})
        }


    } catch (error) {
        console.log('MEMBERSHIP_POST', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const GET = async (req : Request, {params} : {params : {storeId : string}}, email : string) => {

      try {
    if (!params.storeId) {
      return new NextResponse("Missing parameters", { status: 400 });
    }

    const users = await getUser()

    const user = users.find(item => item.email === email)

    if(user){

        const userRef = doc(db, "stores", params.storeId, "users", user.id);
        const userDoc = await getDoc(userRef);
    
        if (!userDoc.exists()) {
          return new NextResponse("User not found", { status: 404 });
        }
    
        if(user.membership){

            const membershipRef = doc(db, "stores", params.storeId, "memberships", user.membership.id);
            const membershipDoc = await getDoc(membershipRef);
        
            if (!membershipDoc.exists()) {
              return new NextResponse("Membership not found", { status: 404 });
            }
        
            const membershipData = membershipDoc.data();
            return NextResponse.json(membershipData);
        }
    }

  } catch (error) {
    console.log('GET_MEMBERSHIP_ERROR', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 


export const DELETE = async (req : Request, {params} : {params : {storeId : string, membershipId : string}}) => {
    try {
        const {userId} = auth()

        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }
  
        if(!userId){
            return new NextResponse("User Id is missing", {status: 400})  
        }
  
        const membershipRef = doc(db, "stores", params.storeId, "membership-requests", params.membershipId)
        
        await deleteDoc(membershipRef)
  
        return NextResponse.json({msg : "Size Deleted"}, {headers: corsHeaders})
  
    } catch (error) {
        
        console.log('SIZE_DELETE', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
  }  