import { Package, ShoppingCart, LayoutDashboard, Users, Settings, LogOut, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/products", icon: Package, label: "Produits" },
  { to: "/orders", icon: ShoppingCart, label: "Commandes" },
  { to: "/customers", icon: Users, label: "Clients" },
  { to: "/analytics", icon: TrendingUp, label: "Analytique" },
  { to: "/settings", icon: Settings, label: "Paramètres" },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="font-serif text-xl font-bold tracking-wide text-foreground">
          NOIR<span className="font-light text-primary">STEPS</span>
        </span>
        <span className="ml-1 rounded bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
