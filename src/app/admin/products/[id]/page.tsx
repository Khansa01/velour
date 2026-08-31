"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const EditProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from("Product").select("*").eq("id", id).single();
      setProduct(data);
      if (data?.imageUrl) setImagePreview(data.imageUrl);
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    let imageUrl = product.imageUrl;
    if (imageFile) {
      const uploadForm = new FormData();
      uploadForm.append("file", imageFile);
      const res = await fetch("/api/upload", { method: "POST", body: uploadForm });
      const { url } = await res.json();
      imageUrl = url;
    }

    const { error } = await supabase
      .from("Product")
      .update({
        brand: form.get("brand"),
        name: form.get("name"),
        price: Number(form.get("price")),
        category: form.get("category"),
        description: form.get("description"),
        badge: form.get("badge") || null,
        bgColor: form.get("bgColor") || null,
        imageUrl,
      })
      .eq("id", id);

    setLoading(false);
    if (!error) router.push("/admin");
  };

  const handleDelete = async () => {
    await supabase.from("Product").delete().eq("id", id);
    router.push("/admin");
  };

  const inputClass =
    "bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c] w-full";

  if (!product)
    return (
      <main className="px-16 py-12 bg-[#1a1a1a] min-h-screen text-[#a89a80]">
        Loading...
      </main>
    );

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Admin</p>
      <h1 className="font-serif text-3xl text-white mb-8">Edit Product</h1>

      <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
        <input name="brand" defaultValue={product.brand} placeholder="Brand" required className={inputClass} />
        <input name="name" defaultValue={product.name} placeholder="Product Name" required className={inputClass} />
        <input name="price" type="number" defaultValue={product.price} placeholder="Price" required className={inputClass} />
        <input name="category" defaultValue={product.category ?? ""} placeholder="Category" className={inputClass} />
        <input name="badge" defaultValue={product.badge ?? ""} placeholder="Badge" className={inputClass} />
        <input name="bgColor" defaultValue={product.bgColor ?? ""} placeholder="Background color/gradient" className={inputClass} />
        <textarea name="description" defaultValue={product.description ?? ""} placeholder="Description" rows={4} className={inputClass} />

        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] tracking-[2px] uppercase text-[#a89a80]">Product Image</label>
          {imagePreview && (
            <div className="h-40 rounded-lg overflow-hidden">
              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-[#a89a80] text-sm file:mr-4 file:py-2 file:px-4 file:border file:border-[rgba(201,168,124,0.2)] file:bg-[#222] file:text-[#c9a87c] file:text-xs file:tracking-widest file:uppercase cursor-pointer"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-6 py-3 border border-red-500 text-red-400 text-xs tracking-[2px] uppercase hover:bg-red-500 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#222] border border-[rgba(201,168,124,0.2)] rounded-xl p-8 max-w-sm w-full mx-4">
            <h2 className="font-serif text-xl text-white mb-2 text-center">Delete Product?</h2>
            <p className="text-[#a89a80] text-sm mb-6 text-center">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-[rgba(201,168,124,0.2)] text-[#a89a80] text-xs tracking-[2px] uppercase hover:border-[#c9a87c] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 text-white text-xs tracking-[2px] uppercase hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditProductPage;