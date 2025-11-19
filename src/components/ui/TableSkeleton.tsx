import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

export function TableSkeleton() {
  const skeletonRows = Array(5).fill(0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre Insumo</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Stock (Actual/Mín)</TableHead>
          <TableHead>Precio Compra</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skeletonRows.map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="h-4 bg-border rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-border rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-border rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-border rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-border rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 ml-auto bg-border rounded animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
