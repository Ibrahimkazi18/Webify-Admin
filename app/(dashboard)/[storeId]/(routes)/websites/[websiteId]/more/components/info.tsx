"use client"

import { Button } from "@/components/ui/button"
import { DollarSign, Globe, Mail, User } from "lucide-react"
import { WebsiteCardProps } from "../../../components/client"
import Link from "next/link"
import CellAction from "../../../components/cell-action"

interface InfoProps {
    website : WebsiteCardProps
}

const Info = ({website} : InfoProps) => {

  return (
    <div>
        <h1 className="text-3xl font-bold flex items-center justify-between">{website.name} <CellAction data={website}/></h1>

        <div className="mt-3 flex items-end justify-between">
            <p>
                {website.createdAt || "No Description" }
            </p>
        </div>

        <div className="w-full flex items-center justify-start gap-2 flex-wrap px-2 mt-8">
            {website.category && (
                <div className="rounded-md bg-blue-500/20 px-3 py-2 text-base font-semibold flex items-center gap-2">
                    {website.category}
                </div>
            )}
        </div>

        <div className="w-full grid grid-cols-4 my-12">
            <div className="col-span-1 space-y-8">
                <p className="text-lg flex items-center font-semibold"><DollarSign className="w-5 h-5  mr-2"/> Price</p>
                <p className="text-lg flex items-center font-semibold"><User className="w-5 h-5  mr-2"/> Owner</p>
                <p className="text-lg flex items-center font-semibold"><Mail className="w-5 h-5  mr-2"/> Email</p>
            </div>

            <div className="col-span-3 space-y-8">
                <p className="text-xl font-bold">₹{website.price}</p>
                <p className="text-xl font-bold">{website.owner}</p>                
                <p className="text-xl font-bold">{website.ownerId}</p>                
            </div>
        </div>

        <Link href={website.url}>
            <Button onClick={() => {}} className="w-full py-6 text-xl font-semibold flex items-center justify-center gap-3">
                <Globe className="w-5 h-5" />
                Visit
            </Button>
        </Link>
    </div>
  )
}

export default Info