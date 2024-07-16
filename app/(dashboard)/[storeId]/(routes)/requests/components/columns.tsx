"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import CellAction from "./cell-actions"
import { cn } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RequestColumn = {
    id : string,
    name : string,
    email : string,
    member : boolean,
    type : string, 
    status : string, 
    createdAt?: string,
}

export const columns: ColumnDef<RequestColumn>[] = [
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
    accessorKey: "type",
    header : "Type"
  },
  {
    accessorKey: "status",
    header : "Status"
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
