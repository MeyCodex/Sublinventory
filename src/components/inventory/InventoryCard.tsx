import type { SupplyWithCategory } from "@/schemas/inventorySchema";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { AccordionItem } from "@/components/ui/AccordionItem";

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-start text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold text-foreground text-right">{value}</span>
  </div>
);

interface InventoryCardProps {
  supply: SupplyWithCategory;
  onEdit: (supply: SupplyWithCategory) => void;
  onDelete: (supply: SupplyWithCategory) => void;
}

export function InventoryCard({
  supply,
  onEdit,
  onDelete,
}: InventoryCardProps) {
  const stockColor =
    supply.quantity <= supply.minimum_stock
      ? "text-destructive"
      : "text-green-600";

  const stockDisplay = (
    <>
      <span className={stockColor}>{supply.quantity}</span>
      <span className="text-muted-foreground"> / {supply.minimum_stock}</span>
    </>
  );

  return (
    <AccordionItem title={supply.name}>
      <div className="space-y-3">
        <DetailRow label="Stock (Actual/Mín)" value={stockDisplay} />
        <DetailRow label="Unidad" value={supply.measurement_unit} />
        <DetailRow label="Precio compra" value={`$${supply.purchase_price}`} />
        <DetailRow label="Proveedor" value={supply.supplier || "N/A"} />
        <ActionButtons
          onEdit={() => onEdit(supply)}
          onDelete={() => onDelete(supply)}
          className="justify-center border-t border-border pt-2 mt-3"
        />
      </div>
    </AccordionItem>
  );
}
