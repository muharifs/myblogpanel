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
import { Label } from "@/components/ui/label";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export type Category = {
  id: number;
  name: string;
};

export default function CategoryPage() {
  const [data, setData] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setEditingId(category.id);
    setIsEditMode(true);
    setDialogOpen(true);
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      if (isEditMode && editingId) {
        await api.patch(`/categories/${editingId}`, { name });
      } else {
        await api.post("/categories", { name });
      }

      resetForm();
      setDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Kategori Halaman</h1>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => resetForm()}>
              Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Kategori" : "Tambah Kategori"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Ubah nama kategori berikut."
                  : "Isi form berikut untuk menambahkan kategori baru."}
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Nama Kategori</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama kategori"
                />
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
                {loading ? "Menyimpan..." : "Simpan Kategori"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      <DataTable columns={columns(fetchCategories, handleEdit)} data={data} />
    </>
  );
}
