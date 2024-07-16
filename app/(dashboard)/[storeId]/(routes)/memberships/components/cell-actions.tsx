"use client"

import { useParams, useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, MoreVertical,  PlusSquare } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { MembershipRequestColumn } from "./request-column"

interface CellActionProps {
    data : MembershipRequestColumn
}

const CellAction = ({ data } : CellActionProps) => {

  const router = useRouter()
  const params = useParams()

  const onCopy = (id : string) => {
    navigator.clipboard.writeText(id)
    toast.success("Subscribtion Id Copied to Clipboard")
  }
 
  const handlePost = async (data : any) => {
    try {

      await axios.post(`/api/${params.storeId}/membership/${data.id}`, data);
      
      await axios.delete(`/api/${params.storeId}/membership/${data.id}`)

      toast.success("Membership Added")
      router.refresh()
      router.push(`/${params.storeId}/memberships`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
    }
  }


  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-8 w-8 p-0">
                    <span className="sr-only">Open</span>
                    <MoreVertical className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="h-4 w-4 mr-2"/>
                    Copy Id
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => handlePost(data)}>
                    <PlusSquare className="h-4 w-4 mr-2"/>
                    Add
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default CellAction