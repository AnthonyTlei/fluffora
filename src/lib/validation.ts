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

const traitsSchema = z
  .array(z.string().trim().min(1, "Trait cannot be empty"))
  .max(5, "You can add up to 5 traits")
  .optional();

export const createFluffSchema = z.object({
  name: requiredString,
  description: optionalString,
  image: imageSchema.optional(),
  traits: traitsSchema,
});

export type CreateFluffValues = z.infer<typeof createFluffSchema>;
