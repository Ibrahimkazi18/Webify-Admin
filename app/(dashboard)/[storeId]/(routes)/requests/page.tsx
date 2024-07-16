import { collection, doc, getDocs } from "firebase/firestore"
import { format } from "date-fns"

import { db } from "@/lib/firebase"
import { Requests } from "@/types-db"
import { RequestColumn } from "./components/columns"
import RequestClient from "./components/client"


const RequestPage = async ({params} : {params : { storeId : string}}) => {

  const requestsData = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "requests")
    )
  ).docs.map(doc => doc.data()) as Requests[]

  const formattedRequest : RequestColumn[] = requestsData.map(
    (item) => ({
      id : item.id,
      name : item.name,
      email : item.email,
      member : item.member,
      type : item.type,
      status : item.status,
      createdAt : item.createdAt ? format(item.createdAt.toDate(), "MMMM do, yyyy") : ""
    })
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <RequestClient data={formattedRequest} />
        </div>
    </div>
  )
}

export default RequestPage