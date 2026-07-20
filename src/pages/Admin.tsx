import { lazy, Suspense } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Repeat,
  Receipt,
  Activity,
  ShieldCheck,
  FileCheck2,
  FileText,
  Shield,
  ScrollText,
  Images,
  ArrowLeft,
  LogOut,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  superadminOnly?: boolean;
  editorOnly?: boolean;
  adminAndUp?: boolean;
};

const navItems: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/customers", label: "Customers", icon: UsersIcon },
  { to: "/admin/subscriptions", label: "Subscriptions", icon: Repeat },
  { to: "/admin/billing", label: "Billing", icon: Receipt },
  { to: "/admin/usage", label: "Usage", icon: Activity },
  { to: "/admin/sla", label: "Uptime / SLA", icon: ShieldCheck },
  { to: "/admin/kyc", label: "KYC Queue", icon: FileCheck2 },
  { to: "/admin/content", label: "Content CMS", icon: FileText },
  { to: "/admin/media", label: "Media Library", icon: Images },
  { to: "/admin/users", label: "Web Users", icon: Shield, superadminOnly: true },
  { to: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText, adminAndUp: true },
];

const Admin = () => {
  const { user, isAdmin, isSuperadmin, role, loading, signOut } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const visibleNav = navItems.filter((item) => {
    if (item.superadminOnly && !isSuperadmin) return false;
    if (item.adminAndUp && !(role === "admin" || role === "superadmin")) return false;
    // editors: only Content CMS
    if (role === "editor" && item.to !== "/admin/content") return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card hidden md:flex flex-col">
        <div className="h-16 px-6 flex items-center border-b border-border">
          <span className="font-heading text-lg font-bold gradient-text">Nosteq IaaS</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <div className="px-3 text-xs text-muted-foreground truncate" title={user.email ?? ""}>
            {user.email}
          </div>
          <div className="px-3 text-xs">
            <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wider">
              {role}
            </span>
          </div>
          <a href="/" className="block">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to site
            </Button>
          </a>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border h-14 flex items-center justify-between px-4">
        <span className="font-heading font-bold gradient-text">Nosteq IaaS</span>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 md:pt-0 pt-14">
        <div className="p-6 md:p-8 max-w-7xl">
          <Suspense fallback={<p className="text-muted-foreground">Loading module…</p>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

// Lazy children exported for the router
export const AdminOverview = lazy(() => import("./admin/Overview"));
export const AdminCustomers = lazy(() => import("./admin/Customers"));
export const AdminSubscriptions = lazy(() => import("./admin/Subscriptions"));
export const AdminBilling = lazy(() => import("./admin/Billing"));
export const AdminUsage = lazy(() => import("./admin/Usage"));
export const AdminSLA = lazy(() => import("./admin/SLA"));
export const AdminKYC = lazy(() => import("./admin/KYC"));
export const AdminContent = lazy(() => import("./admin/ContentCMS"));
export const AdminMediaLibrary = lazy(() => import("./admin/MediaLibrary"));
export const AdminUsersPage = lazy(() => import("./admin/UsersPage"));
export const AdminAuditLogs = lazy(() => import("./admin/AuditLogs"));

export default Admin;
