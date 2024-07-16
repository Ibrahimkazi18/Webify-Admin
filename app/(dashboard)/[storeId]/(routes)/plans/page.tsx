import { collection, doc, getDocs } from "firebase/firestore"
import { format } from "date-fns"

import { db } from "@/lib/firebase"
import { SubscriptionPlan } from "@/types-db"
import { SubscribtionPlanColumn } from "./components/columns"
import { formatter } from "@/lib/utils"
import MembershipClient from "./components/client"


const RequestPage = async ({params} : {params : { storeId : string}}) => {

  const requestsData = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "subscribtion-plans")
    )
  ).docs.map(doc => doc.data()) as SubscriptionPlan[]

  const formattedRequest : SubscribtionPlanColumn[] = requestsData.map(
    (item) => ({
      id : item.id,
      name : item.name,
      description : item.description,
      price : formatter.format(item.price),
      createdAt : item.createdAt ? format(item.createdAt.toDate(), "MMMM do, yyyy") : ""
    })
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <MembershipClient data={formattedRequest} />
        </div>
    </div>
  )
}

export default RequestPage