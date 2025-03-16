"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getFluffDataInclude } from "@/lib/types";
import { createFluffSchema } from "@/lib/validation";
import { createHash } from "crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export async function createFluff(formData: FormData) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const values = Object.fromEntries(formData.entries());
  const parsedTraits = values.traits ? JSON.parse(values.traits as string) : [];
  const { name, description, image, traits } = createFluffSchema.parse({
    ...values,
    traits: parsedTraits,
  });

  if (traits && traits.length > 5) {
    traits.slice(0, 5);
  }

  const existingFluff = await prisma.fluff.findFirst({
    where: {
      userId: user.id,
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (existingFluff) {
    throw new Error(
      `You already have a Fluff named "${name}". Please choose a different name.`,
    );
  }

  let imageUrl: string | null = null;

  if (image) {
    try {
      const hash = createHash("sha256").update(name).digest("hex").slice(0, 12);
      const fileType = image.type.split("/")[1];
      const fileName = `${user.id}_${hash}.${fileType}`;

      const key = `fluffs/${fileName}`;
      const fileBuffer = Buffer.from(await image.arrayBuffer());

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: fileBuffer,
        ContentType: image.type,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  }

  const newFluff = await prisma.fluff.create({
    data: {
      name,
      description,
      userId: user.id,
      image: imageUrl,
      traits: traits,
    },
    include: getFluffDataInclude(user.id),
  });

  return newFluff;
}

export async function updateFluff(
  id: string,
  data: {
    name: string;
    description?: string;
    traits?: string[];
    image?: string;
  },
) {
  try {
    const existingFluff = await prisma.fluff.findUnique({
      where: { id },
      select: { userId: true, name: true },
    });

    if (!existingFluff) {
      throw new Error("Fluff not found.");
    }

    const { user } = await validateRequest();
    if (!user || existingFluff.userId !== user.id) {
      throw new Error("Unauthorized.");
    }

    if (data.name && data.name !== existingFluff.name) {
      const nameExists = await prisma.fluff.findFirst({
        where: {
          userId: user.id,
          name: {
            equals: data.name,
            mode: "insensitive",
          },
        },
      });

      if (nameExists) {
        throw new Error(
          `You already have a Fluff named "${data.name}". Please choose a different name.`,
        );
      }
    }

    return await prisma.fluff.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating Fluff:", error);
    throw new Error("Failed to update Fluff.");
  }
}

export async function deleteFluff(id: string) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      throw new Error("Unauthorized.");
    }

    const fluff = await prisma.fluff.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!fluff) {
      throw new Error("Fluff not found.");
    }

    if (fluff.userId !== user.id) {
      throw new Error("Unauthorized.");
    }

    return await prisma.fluff.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting Fluff:", error);
    throw new Error("Failed to delete Fluff.");
  }
}
