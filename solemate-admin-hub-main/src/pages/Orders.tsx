import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import type { Order } from "@/data/mockData";

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-warning/20 text-warning border-warning/30" },
  confirmed: { label: "Confirmée", className: "bg-primary/20 text-primary border-primary/30" },
  shipped: { label: "Expédiée", className: "bg-accent/20 text-accent border-accent/30" },
  delivered: { label: "Livrée", className: "bg-success/20 text-success border-success/30" },
  cancelled: { label: "Annulée", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
        const response = await fetch(`${baseUrl}/api/orders`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des commandes");
        }

        const data = (await response.json()) as Order[];
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Commandes</h1>
        <p className="mt-1 text-sm text-muted-foreground">{orders.length} commandes au total</p>
      </div>

      <div className="animate-fade-in rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">N° Commande</TableHead>
              <TableHead className="text-muted-foreground">Client</TableHead>
              <TableHead className="text-muted-foreground">Articles</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-border">
                <TableCell className="font-medium text-primary">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{order.items}</TableCell>
                <TableCell className="font-medium text-foreground">{order.total.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusMap[order.status]?.className}>
                    {statusMap[order.status]?.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default Orders;
