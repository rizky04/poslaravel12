"use client"

import { Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState } from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
import { parse } from "path"

export const columns: ColumnDef<Product>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "product_code",
    header: "Code Product",
  },
  {
    accessorKey: "name",
    header: "Name Product",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell:({row}) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat("id-ID", 
        { style: "currency", currency: "IDR"}).format(price);
      return formatted
    }
  },
  {
    accessorKey: "selling_price",
    header: "Selling Price",
    cell:({row}) => {
      const selling_price = parseFloat(row.getValue('selling_price'))
      const formatted = new Intl.NumberFormat("id-ID",{
         style: "currency", 
         currency: "IDR"
        }).format(selling_price);
      return formatted
    }
  },
   {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell:({row}) => row.original.category.name
  },
  
  
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const product = row.original
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        const onDelete = () => {
            router.delete(route('product.destroy', product.id), {
                onSuccess: () => {
                    toast.success('product deleted successfully')
                },
                onError: () => {
                    toast.error('Failed to delete product')
                },
            })
            setIsDialogOpen(false)
        }
        return (
          <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {router.visit(route('product.edit', product.id))}}
              >
               Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setTimeout(() => {setIsDialogOpen(true)}, 100)}}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure delete product {product.name} ?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </>
        )
      },
  },
]
