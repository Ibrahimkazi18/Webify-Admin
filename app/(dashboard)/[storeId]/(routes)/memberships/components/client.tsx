"use client"

import Heading from "@/components/heading"
import { DataTable } from "@/components/ui/data-table"
import { Separator } from "@/components/ui/separator"

import ApiList from "@/components/api-list"
import { MembershipRequestColumn, columns } from "./request-column"
import { MembershipsColumn, activeColumns } from "./active-column"

interface MembershipClientProps  {
  data : MembershipRequestColumn[],
  membership : MembershipsColumn[],
}

const MembershipClient = ({ data, membership } : MembershipClientProps ) => {

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Active Membership(${membership.length})`} description="All active membership of webify"/>
        </div>

        <Separator />

        <DataTable columns={activeColumns} data={membership} searchKey="plans" />

        <Separator/>

        <div className="flex items-center justify-between pt-4">
            <Heading title={`Membership Requests (${data.length})`} description="All requests for membership of webify"/>
        </div>

        <Separator />

        <DataTable columns={columns} data={data} searchKey="plans" />

        <Heading title="API" description="API calls for memberships"/>
        <Separator />
        <ApiList entityName="memberships" entityNameId="membershipId"/>
    </>
  )
}

export default MembershipClient