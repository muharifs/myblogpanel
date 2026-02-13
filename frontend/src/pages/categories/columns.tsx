"use client";
import api from "@/lib/axios";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Category = {
  id: number;
  name: string;
};

export const columns = (
  refresh: () => void,
  onEdit: (category: Category) => void,
): ColumnDef<Category>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      const handleDelete = async () => {
        if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
          try {
            await api.delete(`/categories/${category.id}`);
            refresh();
          } catch (error) {
            console.error("Error deleting category:", error);
            alert("Gagal menghapus kategori");
          }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onEdit(category)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit Kategori
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Hapus Kategori
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
