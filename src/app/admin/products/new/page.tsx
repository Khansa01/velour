"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { convertToWebp } from "@/lib/convertToWebp";

const NewProductPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    let imageUrl = null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const webpBlob = await convertToWebp(imageFile);
      const fileName = `${uuidv4()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, webpBlob, { contentType: "image/webp" });
      if (!uploadError) {
        const { data } = supabase.storage.from("products").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from("Product").insert({
      id: uuidv4(),
      slug: form.get("slug"),
      brand: form.get("brand"),
      name: form.get("name"),
      price: Number(form.get("price")),
      category: form.get("category"),
      description: form.get("description"),
      badge: form.get("badge") || null,
      bgColor: form.get("bgColor") || null,
      imageUrl,
    });

    setLoading(false);
    if (!error) router.push("/admin");
  };

  const inputClass = "bg-[#222] border border-[rgba(201,168,124,0.2)] text-white text-sm px-4 py-3 rounded-lg placeholder:text-[#a89a80] focus:outline-none focus:border-[#c9a87c] w-full";

  return (
    <main className="px-6 md:px-16 py-12 bg-[#1a1a1a] min-h-screen">
      <p className="text-[13px] tracking-[3px] uppercase text-[#a89a80] mb-2">Admin</p>
      <h1 className="font-serif text-3xl text-white mb-8">Add Product</h1>

      <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-4">
        <input name="brand" placeholder="Brand" required className={inputClass} />
        <input name="name" placeholder="Product Name" required className={inputClass} />
        <input name="slug" placeholder="Slug (e.g. creme-de-la-mer)" required className={inputClass} />
        <input name="price" type="number" placeholder="Price" required className={inputClass} />
        <input name="category" placeholder="Category" className={inputClass} />
        <input name="badge" placeholder="Badge (NEW, SALE, etc)" className={inputClass} />
        <input name="bgColor" placeholder="Background color/gradient" className={inputClass} />
        <textarea name="description" placeholder="Description" rows={4} className={inputClass} />

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

        <button
          type="submit"
          disabled={loading}
          className="py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </main>
  );
};

export default NewProductPage;