import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { RiErrorWarningLine } from "react-icons/ri";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "destructive" | "primary";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  variant = "destructive",
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center sm:text-left sm:flex-row sm:items-start gap-4">
        <div
          className={`p-3 rounded-full shrink-0 ${
            variant === "destructive"
              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
        >
          <RiErrorWarningLine className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          variant={variant}
          onClick={onConfirm}
          isLoading={isLoading}
          className="w-full sm:w-auto"
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
