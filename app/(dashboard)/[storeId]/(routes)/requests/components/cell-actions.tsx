"use client"

import { useParams, useRouter } from "next/navigation"
import { RequestColumn } from "./columns"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CheckSquare, CloudCog, CloudUpload, Copy, Edit, MoreVertical, PauseCircle, Trash } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps {
    data : RequestColumn
}

const CellAction = ({ data } : CellActionProps) => {

  const router = useRouter()
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onCopy = (id : string) => {
    navigator.clipboard.writeText(id)
    toast.success("Request Id Copied to Clipboard")
  }
 
  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/${params.storeId}/requests/${data.id}`);
      

      toast.success("Request Removed")
      router.refresh()
      router.push(`/${params.storeId}/requests`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
        setOpen(false)
    }
  }

  const onUpdate = async (data : any) => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/${params.storeId}/requests/${data.id}`, data);
      

      toast.success("Request Updated")
      router.refresh()
      router.push(`/${params.storeId}/requests`)

    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        router.refresh()
        setIsLoading(false)
        setOpen(false)
    }
  }

  return (
    <>
        <AlertModal
            isOpen={open}
            onClose={() => {setOpen(false)}}
            onConfirm={onDelete}
            loading={isLoading}
        />

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

                <DropdownMenuItem onClick={() => onUpdate({id : data.id, status : "On Hold"})}>
                    <PauseCircle className="h-4 w-4 mr-2"/>
                    On Hold
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onUpdate({id : data.id, status : "Building"})}>
                    <CloudCog className="h-4 w-4 mr-2"/>
                    Building
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onUpdate({id : data.id, status : "Deploying"})}>
                    <CloudUpload className="h-4 w-4 mr-2"/>
                    Deploying
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onUpdate({id : data.id, status : "Completed"})}>
                    <CheckSquare className="h-4 w-4 mr-2"/>
                    Completed
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default CellAction