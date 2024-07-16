
import { db } from "@/lib/firebase";
import { MembershipRequest } from "@/types-db";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
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

        if(!userId){
            return new NextResponse("Membership userId is missing", {status: 400})  
        }
        
        if(!plan){
            return new NextResponse("Membership plan is missing", {status: 400})  
        }
        
        if(!params.storeId){
            return new NextResponse("Store Id is missing", {status: 400})  
        }
    
        const membershipData = {
            userId,
            plan,
            duration,
            totalAmount,
            createdAt : serverTimestamp(),
        }
        
        const membershipRef = await addDoc(
            collection(db, "stores", params.storeId, "membership-requests"), 
            membershipData
        )
        
        const id = membershipRef.id;
        
        await updateDoc(doc(db, "stores", params.storeId, "membership-requests", id), {
            ...membershipData,
            id,
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({id, ...membershipData}, {headers: corsHeaders})
        

    } catch (error) {
        console.log('MEMBERSHIP_POST', error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}   


export const GET = async (req : Request, {params} : {params : {storeId : string}}) => {

      try {
        if (!params.storeId) {
          return new NextResponse("Missing parameters", { status: 400 });
        }
      
        const membershipData = (await getDocs(
            collection(doc(db, "stores", params.storeId), "membership-requests")
        )).docs.map(doc => doc.data()) as MembershipRequest[]
  
      return NextResponse.json(membershipData)
          
  } catch (error) {
    console.log('GET_MEMBERSHIP_ERROR', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 

export const DELETE = async (req : Request, {params} : {params : {storeId : string}}) => {
  try {
      const {membershipId} = await req.json() 
      
      if(!params.storeId){
          return new NextResponse("Store Id is missing", {status: 400})  
      }

      if(!membershipId){
          return new NextResponse("Size Id is missing", {status: 400})  
      }

      const userRef = doc(db, "stores", params.storeId, "membership-requests", membershipId)
      
      await deleteDoc(userRef)

      return NextResponse.json({msg : "Size Deleted"}, {headers: corsHeaders})

  } catch (error) {
      
      console.log('SIZE_DELETE', error)
      return new NextResponse("Internal Server Error", {status: 500})
  }
}   