import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface EditDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;

  open: boolean;
  setOpen: (open: boolean) => void;
}

export function EditDialog({
  trigger,
  children,
  title,
  description,

  open,
  setOpen,
}: EditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
