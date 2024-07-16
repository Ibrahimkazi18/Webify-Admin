"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import CellAction from "./cell-action"
import { useState } from "react"
import { listAll } from "firebase/storage"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubscribtionPlanColumn = {
    id : string,
    name : string,
    price : string,
    description : string,
    createdAt?: string,
}


export const columns: ColumnDef<SubscribtionPlanColumn>[] = [
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
    accessorKey: "description",
    header : "Decription",
    cell : ({row}) => {
        const {description} = row.original
        const list = description.split('.').map(item => item.trim()).filter(item => item);

        return (
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
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
