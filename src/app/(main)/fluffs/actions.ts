"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FluffData, getFluffDataInclude } from "@/lib/types";

export async function getFluff(id: string) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return null;
    }

    const fluff = await prisma.fluff.findUnique({
      where: { id: id },
      include: getFluffDataInclude(loggedInUser.id),
    });

    if (!fluff) {
      return null;
    }

    return fluff;
  } catch (error) {
    console.error("Error fetching fluff:", error);
    return null;
  }
}
