"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import CellAction from "./cell-actions"

export type MembershipRequestColumn = {
    id : string,
    userId : string,
    plan : string,
    totalAmount : number,
    duration : number,
    createdAt?: string,
}


export const columns: ColumnDef<MembershipRequestColumn>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User-Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "plan",
    header: "Plan"
  },
  {
    accessorKey: "duration",
    header: "Duration"
  },
  {
    accessorKey: "totalAmount",
    header: "Total-Amount"
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
