import { db } from "@/lib/firebase"
import { Website } from "@/types-db"
import { doc, getDoc } from "firebase/firestore"
import WebsiteForm from "./_components/product-form"



const ProductPage = async ({params} : {params : {storeId : string, websiteId : string}}) => {

  const website = (await getDoc(doc(db, "stores", params.storeId, "websites", params.websiteId))).data() as Website

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <WebsiteForm 
              initialData={website} 
            />
        </div>
    </div>
  )
}

export default ProductPage