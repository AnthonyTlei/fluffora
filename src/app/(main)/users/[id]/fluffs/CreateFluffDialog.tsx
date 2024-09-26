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

interface CreateFluffDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateFluffDialog({
  open,
  onClose,
}: CreateFluffDialogProps) {
  const form = useForm<CreateFluffValues>({
    resolver: zodResolver(createFluffSchema),
    defaultValues: {
      name: "",
    },
  });

  function handleOpenChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  async function onSubmit(values: CreateFluffValues) {}

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
            <DialogFooter className="flex gap-2">
              <LoadingButton
                variant="default"
                onClick={() => {}}
                loading={false}
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
