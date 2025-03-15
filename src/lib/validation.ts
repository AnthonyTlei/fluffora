import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");
const optionalString = z.string().trim();

const imageSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Invalid image file",
  )
  .refine(
    (file) => !file || file.size < 1024 * 1024 * 8,
    "File must be less than 8MB",
  );

export const createFluffSchema = z.object({
  name: requiredString,
  description: optionalString,
  image: imageSchema.optional(),
});

export type CreateFluffValues = z.infer<typeof createFluffSchema>;
