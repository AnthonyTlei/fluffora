import { useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useCreateFluffMutation } from "./mutations";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface CreateFluffDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateFluffDialog({
  open,
  onClose,
}: CreateFluffDialogProps) {
  const mutation = useCreateFluffMutation();

  const form = useForm<CreateFluffValues>({
    resolver: zodResolver(createFluffSchema),
    defaultValues: {
      name: "",
      description: "",
      traits: [],
    },
  });

  const [traits, setTraits] = useState<string[]>([]);
  const [traitError, setTraitError] = useState<string | null>(null);

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

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
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);
    formData.append("traits", JSON.stringify(traits));

    mutation.mutate(formData, {
      onSuccess: () => {
        form.reset();
        setTraits([]);
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="bg-card text-primary opacity-100"
      >
        <DialogHeader>
          <DialogTitle>Add a Fluff</DialogTitle>
          <DialogDescription>Customize your new friend!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                      placeholder="Type your fluff's description here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Fluff&apos;s Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fieldValues}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
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
                      className="w-full"
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

            <DialogFooter className="flex gap-2">
              <LoadingButton
                variant="default"
                onClick={() => {}}
                loading={mutation.isPending}
              >
                Create
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
