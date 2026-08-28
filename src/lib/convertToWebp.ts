import sharp from "sharp";

export const convertToWebp = async (file: File): Promise<Blob> => {
  const buffer = await file.arrayBuffer();
  const webpBuffer = await sharp(Buffer.from(buffer))
    .webp({ quality: 80 })
    .toBuffer();
  return new Blob([webpBuffer], { type: "image/webp" });
};