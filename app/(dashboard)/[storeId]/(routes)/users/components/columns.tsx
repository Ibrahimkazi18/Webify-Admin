"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import CellAction from "./cell-actions"
import { cn } from "@/lib/utils"
import { Website } from "@/types-db"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
    id : string,
    name : string,
    email : string,
    websiteCount : number,
    websites : Website[],
    request : boolean,
    member : boolean, 
    createdAt?: string,
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "email",
    header : "Email"
  },
  {
    accessorKey: "websiteCount",
    header : "Websites Count"
  },
  {
    accessorKey: "member",
    header : "Member",
    cell : ({row}) => {
      const { member } = row.original

      return (
        <p className={cn(member ? "text-emerald-500" : "text-red-500")}>{member ? "Yes" : "No"}</p>
      )
    }
  },
  {
    accessorKey: "request",
    header : "Request",
    cell : ({row}) => {
      const { request } = row.original

      return (
        <p className={cn(request ? "text-emerald-500" : "text-red-500")}>{request ? "Yes" : "No"}</p>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    id : "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
