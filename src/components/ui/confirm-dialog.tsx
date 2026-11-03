import { useState } from "react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirmation",
  text = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmDialogProps) => {
  const [open, setOpen] = useState(isOpen);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        className="bg-card rounded-lg border border-border p-6 sm:p-8 shadow-xl max-w-sm w-full transform scale-90 origin-center transition-all duration-200"
        style={{
          transform: open ? "scale(1)" : "scale(0.95)",
        }}
      >
        <h3 className="text-lg font-medium text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6">{text}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="rounded-md px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-md px-4 py-2 text-sm font-medium text-white transition bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};