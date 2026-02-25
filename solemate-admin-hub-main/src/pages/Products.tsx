import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Product } from "@/data/mockData";

const statusMap: Record<string, { label: string; className: string }> = {
  active: { label: "Actif", className: "bg-success/20 text-success border-success/30" },
  draft: { label: "Brouillon", className: "bg-muted text-muted-foreground border-border" },
  out_of_stock: { label: "Rupture", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
        const response = await fetch(`${baseUrl}/api/products`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des produits");
        }

        const data = (await response.json()) as Product[];
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produits</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} produits dans votre catalogue</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </Button>
      </div>

      <div className="animate-fade-in rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Produit</TableHead>
              <TableHead className="text-muted-foreground">Catégorie</TableHead>
              <TableHead className="text-muted-foreground">Prix</TableHead>
              <TableHead className="text-muted-foreground">Stock</TableHead>
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-border">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <span className="font-medium text-foreground">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{product.category}</TableCell>
                <TableCell className="text-foreground">{product.price.toLocaleString()} FCFA</TableCell>
                <TableCell className="text-foreground">{product.stock}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusMap[product.status]?.className}>
                    {statusMap[product.status]?.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default Products;
