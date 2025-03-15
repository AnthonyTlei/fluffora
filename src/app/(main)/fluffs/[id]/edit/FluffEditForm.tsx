"use client";

import { FluffData } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFluffSchema, CreateFluffValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import {
  deleteFluff,
  updateFluff,
} from "@/app/(main)/users/[id]/fluffs/actions";
import Image from "next/image";

export default function EditFluffForm({ fluff }: { fluff: FluffData }) {
  const [traits, setTraits] = useState<string[]>(fluff.traits || []);
  const [traitError, setTraitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(fluff);

  const form = useForm<CreateFluffValues>({
    resolver: zodResolver(createFluffSchema),
    defaultValues: {
      name: fluff.name,
      description: fluff.description || "",
      traits: fluff.traits || [],
    },
  });

  function handleAddTrait(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.value.trim();

      if (!value) return;
      if (traits.includes(value)) {
        setTraitError("This trait is already added.");
        return;
      }
      if (traits.length >= 5) {
        setTraitError("You can add up to 5 traits.");
        return;
      }

      setTraits([...traits, value]);
      form.setValue("traits", [...traits, value]);
      setTraitError(null);
      event.currentTarget.value = "";
    }
  }

  function handleRemoveTrait(trait: string) {
    const updatedTraits = traits.filter((t) => t !== trait);
    setTraits(updatedTraits);
    form.setValue("traits", updatedTraits);
    setTraitError(null);
  }

  async function onSubmit(values: CreateFluffValues) {
    setLoading(true);

    try {
      await updateFluff(fluff.id, {
        name: values.name,
        description: values.description,
        traits,
      });

      router.push(`/`);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this Fluff?")) return;

    setLoading(true);
    try {
      await deleteFluff(fluff.id);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="h-full w-full max-w-3xl space-y-6 rounded-lg bg-card p-6 text-primary shadow-lg">
      <div className="flex h-[25%] flex-col items-center text-center">
        {fluff.image && (
          <div className="relative h-48 w-48">
            <Image
              src={fluff.image!}
              width={200}
              height={200}
              alt="Fluff"
              className="aspect-square w-full rounded-sm"
            />
          </div>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-[60%] max-h-[60%] flex-col justify-between space-y-4"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fluff&apos;s Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Update your fluff's description here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="traits"
              render={() => (
                <FormItem>
                  <FormLabel>Traits (Max 5)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Type a trait and press Enter..."
                      onKeyDown={handleAddTrait}
                    />
                  </FormControl>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {traits.map((trait, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-sm"
                      >
                        {trait}
                        <button
                          type="button"
                          onClick={() => handleRemoveTrait(trait)}
                          className="ml-1 text-gray-600 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  {traitError && (
                    <p className="mt-1 text-xs text-red-500">{traitError}</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <LoadingButton type="submit" variant="default" loading={loading}>
                Update
              </LoadingButton>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancel
              </Button>
            </div>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
