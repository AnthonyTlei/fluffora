import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FluffData, FluffsPage, getFluffDataInclude } from "@/lib/types";
import { Fluff } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fluff = await prisma.fluff.findUnique({
      where: { id: id },
      include: getFluffDataInclude(loggedInUser.id),
    });

    if (!fluff) {
      return Response.json({ error: "Fluff not found" }, { status: 404 });
    }

    return Response.json(fluff);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
