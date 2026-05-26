import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
console.log("check tt", SUPABASE_URL, SUPABASE_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

const bucketName = "test-bucket";
export const uploadImage = async (image: File) => {
  console.log("tt", image);

  const timestamp = Date.now();
  const name = image.name;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`${timestamp}-${name}`, image, { cacheControl: "3600" });
  if (!data) throw new Error(error.message);
  return supabase.storage.from(bucketName).getPublicUrl(`${timestamp}-${name}`)
    .data.publicUrl;
};

export const deleteImage = (url: string) => {
  const image = url.split("/").pop();
  if (!image) {
    throw new Error("image is undefined");
  }
  return supabase.storage.from(bucketName).remove([image]);
};
