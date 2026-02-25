import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
