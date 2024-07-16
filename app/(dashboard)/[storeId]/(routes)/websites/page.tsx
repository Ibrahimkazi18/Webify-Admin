import { collection, doc, getDocs } from "firebase/firestore"
import { format } from "date-fns"

import { db } from "@/lib/firebase"
import { WebsiteCardProps } from "./components/client"
import { formatter } from "@/lib/utils"
import WebsiteClient from "./components/client"
import { Website } from "@/types-db"
import filterProducts from "@/actions/getWebsites"

const WebsitesPage = async ({params} : {params : { storeId : string}}) => {

  const websitesData = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "websites")
    )
  ).docs.map(doc => doc.data()) as Website[]

  const featured = await filterProducts(websitesData)

  const formattedWebsites : WebsiteCardProps[] = websitesData.map(
    (item) => ({
      id : item.id,
      name : item.name,
      price : formatter.format(item.price),
      url : item.url,
      owner : item.owner,
      ownerId : item.ownerId,
      category : item.category,
      images : item.images,
      isFeatured : item.isFeatured,
      createdAt : item.createdAt ? format(item.createdAt.toDate(), "MMMM do, yyyy") : ""
    })
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <WebsiteClient data={formattedWebsites} />
        </div>
    </div>
  )
}

export default WebsitesPage