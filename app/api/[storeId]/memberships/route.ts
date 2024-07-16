import { db } from "@/lib/firebase";
import { Membership } from "@/types-db";
import { collection, doc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req : Request, {params} : {params : {storeId : string}}) => {

    try {
      if (!params.storeId) {
        return new NextResponse("Missing parameters", { status: 400 });
      }
    
      const membershipData = (await getDocs(
          collection(doc(db, "stores", params.storeId), "memberships")
      )).docs.map(doc => doc.data()) as Membership[]

    return NextResponse.json(membershipData)
        
} catch (error) {
  console.log('GET_MEMBERSHIP_ERROR', error);
  return new NextResponse("Internal Server Error", { status: 500 });
}
} 