import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import {
  RiErrorWarningLine,
  RiCheckLine,
  RiInformationLine,
} from "react-icons/ri";

type ConfirmationVariant = "destructive" | "success" | "warning" | "info";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: ConfirmationVariant;
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
  if (!isOpen) return null;

  const iconClasses = {
    destructive: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    success:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    warning:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  };

  const IconComponent = () => {
    switch (variant) {
      case "destructive":
        return <RiErrorWarningLine className="h-7 w-7" />;
      case "success":
        return <RiCheckLine className="h-7 w-7" />;
      case "warning":
      case "info":
        return <RiInformationLine className="h-7 w-7" />;
      default:
        return <RiErrorWarningLine className="h-7 w-7" />;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 animate-fade-in backdrop-blur-sm"
      style={{ animationDuration: "0.2s" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm transform overflow-hidden rounded-xl bg-card p-6 text-left shadow-2xl transition-all border border-border"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className={`mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconClasses[variant]}`}
          >
            <IconComponent />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold leading-6 text-foreground">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          {variant !== "success" && (
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {cancelText}
            </Button>
          )}

          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "primary"}
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Procesando..."
            className="w-full sm:w-auto"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
