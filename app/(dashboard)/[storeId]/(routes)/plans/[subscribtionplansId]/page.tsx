import { db } from "@/lib/firebase"
import { SubscriptionPlan} from "@/types-db"
import { doc, getDoc } from "firebase/firestore"
import SubscriptionPlanForm from "./components/membership-form"


const ProductPage = async ({params} : {params : {storeId : string, subscribtionplansId : string}}) => {

  const subscribtionplan = (await getDoc(doc(db, "stores", params.storeId, "subscribtion-plans", params.subscribtionplansId))).data() as SubscriptionPlan

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SubscriptionPlanForm
              initialData={subscribtionplan} 
            />
        </div>
    </div>
  )
}

export default ProductPage