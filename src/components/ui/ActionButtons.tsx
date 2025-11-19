import { RiPencilLine, RiDeleteBinLine, RiEyeLine } from "react-icons/ri";

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ActionButtons({
  onView,
  onEdit,
  onDelete,
  className = "",
}: ActionButtonsProps) {
  return (
    <div className={`flex items-center justify-end ${className}`}>
      {onView && (
        <button
          onClick={onView}
          className="p-2 text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer"
          aria-label="Ver"
        >
          <RiEyeLine className="h-5 w-5" />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          aria-label="Editar"
        >
          <RiPencilLine className="h-5 w-5" />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="p-2 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
          aria-label="Eliminar"
        >
          <RiDeleteBinLine className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
