import { collection, doc, getDocs } from "firebase/firestore"
import { format } from "date-fns"

import { db } from "@/lib/firebase"
import { Membership, MembershipRequest} from "@/types-db"
import { formatter } from "@/lib/utils"
import MembershipClient from "./components/client"
import { MembershipRequestColumn } from "./components/request-column"
import { MembershipsColumn } from "./components/active-column"

export const revalidate = 0

const MembershipPage = async ({params} : {params : { storeId : string}}) => {

  const membershipRequestsData = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "membership-requests")
    )
  ).docs.map(doc => doc.data()) as MembershipRequest[]

  const formattedRequest : MembershipRequestColumn[] = membershipRequestsData.map(
    (item) => ({
      id : item.id,
      userId : item.userId,
      plan : item.plan,
      totalAmount : item.totalAmount,
      duration : item.duration,
      createdAt : item.createdAt ? format(item.createdAt.toDate(), "MMMM do, yyyy") : ""
    })
  );

  const membershipData = (
    await getDocs(
      collection(doc(db, "stores", params.storeId), "memberships")
    )
  ).docs.map(doc => doc.data()) as Membership[]

  const formattedMemberships : MembershipsColumn[] = membershipData.map(
    (item) => ({
      id : item.id,
      userId : item.userId,
      plan : item.plan,
      totalAmount : formatter.format(item.totalAmount),
      duration : item.duration,
      startDate : item.startDate ? format(item.startDate.toDate(), "MMMM do, yyyy") : "" ,
      endDate : item.endDate ? format(item.endDate.toDate(), "MMMM do, yyyy") : "" ,
    })
  );

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <MembershipClient data={formattedRequest} membership={formattedMemberships} />
        </div>
    </div>
  )
}

export default MembershipPage