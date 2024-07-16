import { collection, doc, getDocs } from "firebase/firestore"
import { format } from "date-fns"

import { db } from "@/lib/firebase"
import { User } from "@/types-db"
import { UserColumn } from "./components/columns"
import ProductClient from "./components/client"


const UsersPage = async ({params} : {params : { storeId : string}}) => {

  const productsdata = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "users")
    )
  ).docs.map(doc => doc.data()) as User[]

  const formattedUsers : UserColumn[] = productsdata.map(
    (item) => ({
      id : item.id,
      name : item.name,
      email : item.email,
      websiteCount : item.websiteCount,
      request : item.request,
      member : item.member,
      websites : item.websites,
      createdAt : item.createdAt ? format(item.createdAt.toDate(), "MMMM do, yyyy") : ""
    })
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductClient data={formattedUsers} />
        </div>
    </div>
  )
}

export default UsersPage