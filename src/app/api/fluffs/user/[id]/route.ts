import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FluffsPage, getFluffDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fluffs = await prisma.fluff.findMany({
      where: { userId: id },
      include: getFluffDataInclude(loggedInUser.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = fluffs.length > pageSize ? fluffs[pageSize].id : null;

    const data: FluffsPage = {
      fluffs: fluffs.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
