"use client"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import ApiList from "@/components/api-list"
import { HoverEffect } from "@/components/ui/card-hover-effect"

export interface WebsiteCardProps {
    id : string,
    name : string,
    url : string,
    ownerId : string, 
    owner : string,
    category : string,
    price : string,
    images : {url : string}[], 
    isFeatured: boolean,
    createdAt?: string,
}

interface WebsiteClientProps  {
  data : WebsiteCardProps[]
}

const WebsiteClient = ({ data } : WebsiteClientProps ) => {

  const params = useParams()
  const router = useRouter()
  const length = data.length
  

  return (
    <>
        <div className="flex items-center justify-between">
            <Heading title={`Websites (${length})`} description="Manage websites for your store"/>
            <Button onClick={() => router.push(`/${params.storeId}/websites/create`)}>
                <Plus className="h-4 w-4 mr-2"/>
                Add New
            </Button>
        </div>

        <Separator />

        <div className="max-w-6xl mx-auto px-8">
          <HoverEffect items={data} storeId={params.storeId}/>
        </div>

    

        <Heading title="API" description="API calls for websites"/>
        <Separator />
        <ApiList entityName="websites" entityNameId="websiteId"/>
    </>
  )
}

export default WebsiteClient