"use client";
import { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAuth } from "@/features/auth/useAuth";

export type Post = {
  id: number;
  title: string;
  content: string;
  categoryId?: number;
  category?: { id: number; name: string } | null;
};

export default function PostPage() {
  const [data, setData] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/posts");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setIsEditMode(false);
    setEditingId(null);
    setSelectedCategoryId(null);
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(post.id);
    setSelectedCategoryId(post.categoryId ?? post.category?.id ?? null);
    setIsEditMode(true);
    setDialogOpen(true);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!user) {
      alert("User belum siap");
      return;
    }

    try {
      const body = {
        title,
        content,
        categoryId: selectedCategoryId,
        authorId: user.id,
      };

      if (isEditMode && editingId) {
        await api.patch(`/posts/${editingId}`, body);
      } else {
        await api.post(`/posts`, body);
      }

      resetForm();
      setDialogOpen(false);
      fetchPosts();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal menyimpan post");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold"> Halaman Post</h1>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => resetForm()}>
              Tambah Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Post" : "Tambah Post"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Ubah nama post berikut."
                  : "Isi form berikut untuk menambahkan post baru."}
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Judul Post</Label>
                <Input
                  id="name-1"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul post"
                />
              </Field>
              <Field>
                <Label htmlFor="content-1">Isi Post</Label>
                <Textarea
                  id="content-1"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Masukkan isi post"
                />
              </Field>
              <Field>
                <Label htmlFor="category-1">Kategori</Label>
                <Select
                  value={
                    selectedCategoryId != null ? String(selectedCategoryId) : ""
                  }
                  onValueChange={(v) =>
                    setSelectedCategoryId(v !== "" ? Number(v) : null)
                  }
                >
                  <SelectTrigger id="category-1" className="mt-2 w-full">
                    <SelectValue placeholder="-- Pilih Kategori --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  ref={dialogCloseRef}
                  variant="outline"
                  onClick={() => resetForm()}
                >
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <DataTable columns={columns(fetchPosts, handleEdit)} data={data} />
    </>
  );
}
