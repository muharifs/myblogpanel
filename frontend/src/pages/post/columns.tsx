"use client";
import api from "@/lib/axios";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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

const truncate = (text: string, max: number) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export type Post = {
  id: number;
  title: string;
  category: { id: number; name: string } | null;
  content: string;
  author: { id: number; name: string } | null;
};

export const columns = (
  refresh: () => void,
  onEdit: (post: Post) => void,
): ColumnDef<Post>[] => [
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
    header: "Judul",
    accessorKey: "title",
    cell: ({ row }) => truncate(row.original.title, 40),
  },
  {
    header: "Kategori",
    cell: ({ row }) => row.original.category?.name || "-",
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => truncate(row.original.content, 50),
  },
  {
    header: "Author",
    cell: ({ row }) => row.original.author?.name || "-",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const post = row.original;

      const handleDelete = async () => {
        if (confirm("Apakah Anda yakin ingin menghapus post ini?")) {
          try {
            await api.delete(`/posts/${post.id}`);
            refresh();
          } catch (error) {
            console.error("Error deleting post:", error);
            alert("Gagal menghapus post");
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
            <DropdownMenuItem className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <a href="/" target="_blank">
                View ke Halaman Blog
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(post)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit Post
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Hapus Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
