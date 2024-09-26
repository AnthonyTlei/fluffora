"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getFluffDataInclude } from "@/lib/types";
import { createFluffSchema } from "@/lib/validation";

export async function createFluff(data: { name: string }) {
  console.log(data);
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { name } = createFluffSchema.parse(data);

  const newFluff = await prisma.fluff.create({
    data: {
      name,
      userId: user.id,
      image:
        "https://images.unsplash.com/photo-1641085809270-71f722611ce1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBsdXNoaWV8ZW58MHx8MHx8fDA%3D",
    },
    include: getFluffDataInclude(user.id),
  });

  return newFluff;
}
