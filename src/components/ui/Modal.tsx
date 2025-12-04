import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: ModalSize;
  className?: string;
}
const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  className = "",
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in"
      style={{ animationDuration: "0.2s" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-card rounded-lg shadow-xl w-full
          flex flex-col
          max-h-[90vh]
          ${sizeClasses[size]}
          ${className}
        `}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer "
              aria-label="Cerrar modal"
            >
              <RiCloseLine className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}
