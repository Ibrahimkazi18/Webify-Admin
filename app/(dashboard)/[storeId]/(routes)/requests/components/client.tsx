"use client"

import Heading from "@/components/heading"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

import { RequestColumn, columns } from "./columns"
import ApiList from "@/components/api-list"

interface RequestClientProps  {
  data : RequestColumn[]
}

const RequestClient = ({ data } : RequestClientProps ) => {


  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Requests (${data.length})`} description="Manage requests for your store"/>
        </div>

        <Separator />

        <DataTable columns={columns} data={data} searchKey="name" />

        <Heading title="API" description="API calls for requests"/>
        <Separator />
        <ApiList entityName="requests" entityNameId="requestId"/>
    </>
  )
}

export default RequestClient