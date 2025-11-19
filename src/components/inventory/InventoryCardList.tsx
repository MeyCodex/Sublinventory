import { InventoryCard } from "@/components/inventory/InventoryCard";
import type { SupplyWithCategory } from "@/schemas/inventorySchema";

interface InventoryCardListProps {
  supplies: SupplyWithCategory[];
  onEdit: (supply: SupplyWithCategory) => void;
  onDelete: (supply: SupplyWithCategory) => void;
}

export function InventoryCardList({
  supplies,
  onEdit,
  onDelete,
}: InventoryCardListProps) {
  return (
    <>
      {supplies && supplies.length > 0 ? (
        supplies.map((supply) => (
          <InventoryCard
            key={supply.id}
            supply={supply}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="bg-card p-6 rounded-lg shadow-md text-center text-muted-foreground">
          No se encontraron insumos.
        </div>
      )}
    </>
  );
}
