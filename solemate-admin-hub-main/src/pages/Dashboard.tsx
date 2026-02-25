import { useEffect, useState } from "react";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import StatCard from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { Order } from "@/data/mockData";

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-warning/20 text-warning border-warning/30" },
  confirmed: { label: "Confirmée", className: "bg-primary/20 text-primary border-primary/30" },
  shipped: { label: "Expédiée", className: "bg-accent/20 text-accent border-accent/30" },
  delivered: { label: "Livrée", className: "bg-success/20 text-success border-success/30" },
  cancelled: { label: "Annulée", className: "bg-destructive/20 text-destructive border-destructive/30" },
};

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

        const [statsRes, ordersRes] = await Promise.all([
          fetch(`${baseUrl}/api/admin/stats`),
          fetch(`${baseUrl}/api/orders`),
        ]);

        if (!statsRes.ok || !ordersRes.ok) {
          throw new Error("Erreur lors du chargement des données du tableau de bord");
        }

        const statsData = await statsRes.json();
        const ordersData = (await ordersRes.json()) as Order[];

        setStats({
          totalRevenue: statsData.totalRevenue ?? 0,
          totalOrders: statsData.totalOrders ?? 0,
          totalProducts: statsData.totalProducts ?? 0,
        });
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const recentOrders = orders.slice(0, 5);

  const revenueData = [
    { month: "Total", revenue: stats.totalRevenue },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted-foreground">Bienvenue sur votre espace administrateur NOIRSTEPS</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} title="Revenus du mois" value="0 FCFA" change="--" changeType="neutral" />
        <StatCard icon={ShoppingCart} title="Commandes" value="0" change="--" changeType="neutral" />
        <StatCard icon={Package} title="Produits actifs" value="0" change="--" changeType="neutral" />
        <StatCard icon={TrendingUp} title="Taux de conversion" value="0%" change="--" changeType="neutral" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="animate-fade-in rounded-lg border border-border bg-card p-6 lg:col-span-2" style={{ animationDelay: "0.1s" }}>
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Revenus mensuels</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 8% 20%)" />
              <XAxis dataKey="month" stroke="hsl(30 10% 50%)" fontSize={12} />
              <YAxis stroke="hsl(30 10% 50%)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(30 8% 12%)",
                  border: "1px solid hsl(30 8% 20%)",
                  borderRadius: "8px",
                  color: "hsl(38 25% 88%)",
                }}
                formatter={(value: number) => [`${value.toLocaleString()} FCFA`, "Revenus"]}
              />
              <Bar dataKey="revenue" fill="hsl(38 45% 62%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent orders */}
        <div className="animate-fade-in rounded-lg border border-border bg-card p-6" style={{ animationDelay: "0.2s" }}>
          <h2 className="mb-4 font-serif text-lg font-semibold text-foreground">Commandes récentes</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.id} · {order.items} article{order.items > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{order.total.toLocaleString()} F</p>
                  <Badge variant="outline" className={statusMap[order.status]?.className}>
                    {statusMap[order.status]?.label}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
