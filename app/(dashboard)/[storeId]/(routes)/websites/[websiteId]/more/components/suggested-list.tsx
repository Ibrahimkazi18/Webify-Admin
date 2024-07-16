"use client"

import { useParams } from "next/navigation"
import { Website } from "@/types-db"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { WebsiteCardProps } from "../../../components/client"
import { formatter } from "@/lib/utils"

interface SuggestedListProps {
    wesbite : Website[]
}

const SuggestedList = ({wesbite} : SuggestedListProps) => {

  const {websiteId, storeId} = useParams()

  const websites = wesbite.filter(item => item.id !== websiteId)

  const formattedWebsites : WebsiteCardProps[] = websites.map(
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
    })
  );

  return (
    <>
        <h2 className="text-3xl text-neutral-600 font-semibold">
            Related Websites
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-20 md:gap-x-4 md:gap-y-24 my-8 py-6 md:pt-16">
            <HoverEffect items={formattedWebsites} storeId={storeId}/>
        </div>
    </>
  )
}

export default SuggestedList