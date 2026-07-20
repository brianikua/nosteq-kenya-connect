import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { hydrateFromDB } from "@/lib/contentStore";
import Index from "./pages/Index";
import CaseStudy from "./pages/CaseStudy";
import PortfolioPage from "./pages/PortfolioPage";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import Admin, {
  AdminOverview,
  AdminCustomers,
  AdminSubscriptions,
  AdminBilling,
  AdminUsage,
  AdminSLA,
  AdminKYC,
  AdminContent,
  AdminMediaLibrary,
  AdminUsersPage,
  AdminAuditLogs,
} from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => { void hydrateFromDB(); }, []);
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminOverview />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            <Route path="billing" element={<AdminBilling />} />
            <Route path="usage" element={<AdminUsage />} />
            <Route path="sla" element={<AdminSLA />} />
            <Route path="kyc" element={<AdminKYC />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="media" element={<AdminMediaLibrary />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};


export default App;
