import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    role: true,
    messageCount: true,
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getFluffDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.FluffInclude;
}

export type FluffData = Prisma.FluffGetPayload<{
  include: ReturnType<typeof getFluffDataInclude>;
}>;

export interface FluffsPage {
  fluffs: FluffData[];
  nextCursor: string | null;
}
