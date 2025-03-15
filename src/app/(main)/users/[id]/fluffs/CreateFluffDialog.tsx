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
    },
  });

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  async function onSubmit(values: CreateFluffValues) {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);

    mutation.mutate(formData, {
      onSuccess: () => {
        form.reset();
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
                      placeholder="Type your store description here."
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
