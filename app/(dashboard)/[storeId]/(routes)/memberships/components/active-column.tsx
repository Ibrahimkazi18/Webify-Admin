"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type MembershipsColumn = {
    id : string,
    userId : string,
    plan : string,
    totalAmount : string,
    duration : number,
    startDate?: string,
    endDate ?: string,
}

export const activeColumns: ColumnDef<MembershipsColumn>[] = [
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
    accessorKey: "startDate",
    header: "Start-Date",
  },
  {
    accessorKey: "endDate",
    header: "End-Date"
  },
]
