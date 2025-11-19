import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { ActionButtons } from "@/components/ui/ActionButtons";
import type { SupplyWithCategory } from "@/schemas/inventorySchema";

interface InventoryTableProps {
  supplies: SupplyWithCategory[];
  onEdit: (supply: SupplyWithCategory) => void;
  onDelete: (supply: SupplyWithCategory) => void;
}

export function InventoryTable({
  supplies,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre insumo</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Stock (Actual/Mín)</TableHead>
          <TableHead>Precio Compra</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {supplies && supplies.length > 0 ? (
          supplies.map((supply) => (
            <TableRow key={supply.id}>
              <TableCell className="font-medium">{supply.name}</TableCell>
              <TableCell>{supply.category_name}</TableCell>
              <TableCell>
                <span
                  className={
                    supply.quantity <= supply.minimum_stock
                      ? "text-destructive font-semibold"
                      : "text-green-600 font-semibold"
                  }
                >
                  {supply.quantity}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  / {supply.minimum_stock}
                  {supply.measurement_unit !== "unidades" &&
                    ` (${supply.measurement_unit})`}
                </span>
              </TableCell>
              <TableCell>${supply.purchase_price}</TableCell>
              <TableCell>{supply.supplier || "N/A"}</TableCell>
              <TableCell className="text-right">
                <ActionButtons
                  onEdit={() => onEdit(supply)}
                  onDelete={() => onDelete(supply)}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="h-24 text-center text-muted-foreground"
            >
              No se encontraron insumos.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
