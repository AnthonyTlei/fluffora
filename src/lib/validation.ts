import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createFluffSchema = z.object({
  name: requiredString,
});

export type CreateFluffValues = z.infer<typeof createFluffSchema>;
