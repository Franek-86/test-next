import * as z from "zod";

export const productsSchema = z.object({
  name: z.string().min(2, { message: "qualcosa mon ha funzionato!!" }),
  company: z.string().refine((i) => i.length > 2, {
    error: "company length",
  }),
  description: z.string().refine(
    (i) =>
      // console.log("aaaa", i.split(" ").join("").length, i.split(" ").join(""));

      i.split(" ").join("").length > 5 && i.split(" ").join("").length < 1500,
    {
      error: "descrizione troppo corta o troppo lunga",
    },
  ),
  // clerkId: z.string().optional(),
  // image: z.string().optional(),
  price: z.coerce.number().int().positive(),
  featured: z.coerce.boolean().default(false),
});

export const imageSchema = z.object({
  image: validateImage(),
});

function validateImage() {
  const imageSize = 1024 * 1024;
  const imageType = ["image"];
  return z
    .instanceof(File)
    .refine(
      (file) =>
        // if (!file) {
        //   console.log("file is falsy", file);
        // }
        // if (file.size >= imageSize) {
        //   console.log("this is file result: indeed it is bigger then limit");
        //   console.log(
        //     "test size uploaded",
        //     file.size,
        //     "test size limit",
        //     imageSize,
        //   );
        // }

        !file || file.size <= imageSize,
      "image size too big",
    )
    .refine(
      (file) => !file || imageType.some((i) => file.type.startsWith(i)),
      "not an image",
    );
}
