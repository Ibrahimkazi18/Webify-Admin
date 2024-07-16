"use client"

import Heading from "@/components/heading"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

import { SubscribtionPlanColumn, columns } from "./columns"
import ApiList from "@/components/api-list"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

interface MembershipClientProps  {
  data : SubscribtionPlanColumn[]
}

const MembershipClient = ({ data } : MembershipClientProps ) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Plans (${data.length})`} description="Customize plans for your store"/>
            <Button onClick={() => router.push(`/${params.storeId}/plans/create`)}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
            </Button>
        </div>

        <Separator />

        <DataTable columns={columns} data={data} searchKey="name" />

        <Heading title="API" description="API calls for plans"/>
        <Separator />
        <ApiList entityName="plans" entityNameId="planId"/>
    </>
  )
}

export default MembershipClient