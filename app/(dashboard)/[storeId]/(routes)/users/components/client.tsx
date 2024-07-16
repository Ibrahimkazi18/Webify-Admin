"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { UserColumn, columns } from "./columns"
import ApiList from "@/components/api-list"

interface UserClientProps  {
  data : UserColumn[]
}

const UserClient = ({ data } : UserClientProps ) => {

  const params = useParams()
  const router = useRouter()

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Users (${data.length})`} description="Manage users for your store"/>
        </div>

        <Separator />

        <DataTable columns={columns} data={data} searchKey="name" />

        <Heading title="API" description="API calls for users"/>
        <Separator />
        <ApiList entityName="users" entityNameId="userId"/>
    </>
  )
}

export default UserClient