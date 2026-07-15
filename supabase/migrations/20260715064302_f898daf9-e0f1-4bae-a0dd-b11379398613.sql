
-- Helper: admin-or-superadmin check
CREATE OR REPLACE FUNCTION public.is_admin_or_superadmin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','superadmin')
  )
$$;

-- =========================
-- customers
-- =========================
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_name text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  kyc_status text NOT NULL DEFAULT 'pending', -- pending|approved|rejected
  status text NOT NULL DEFAULT 'active',      -- active|suspended
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage customers" ON public.customers
  FOR ALL TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE TRIGGER trg_customers_updated_at BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- subscriptions
-- =========================
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  plan_tier text NOT NULL,                    -- starter|growth|enterprise|custom
  bandwidth_mbps integer NOT NULL DEFAULT 0,
  monthly_price_kes numeric(12,2) NOT NULL DEFAULT 0,
  billing_cycle text NOT NULL DEFAULT 'monthly', -- monthly|quarterly|annual
  status text NOT NULL DEFAULT 'trial',       -- trial|active|past_due|cancelled
  activated_at timestamptz,
  next_billing_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage subscriptions" ON public.subscriptions
  FOR ALL TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- invoices
-- =========================
CREATE TABLE public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  invoice_number text NOT NULL UNIQUE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  amount_kes numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'unpaid',      -- unpaid|paid|overdue|void
  issued_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
GRANT ALL ON public.invoices TO service_role;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage invoices" ON public.invoices
  FOR ALL TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE TRIGGER trg_invoices_updated_at BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- usage_records
-- =========================
CREATE TABLE public.usage_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  gb_used numeric(12,2) NOT NULL DEFAULT 0,
  peak_mbps integer NOT NULL DEFAULT 0,
  cap_percent numeric(5,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.usage_records TO authenticated;
GRANT ALL ON public.usage_records TO service_role;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage usage" ON public.usage_records
  FOR ALL TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE TRIGGER trg_usage_updated_at BEFORE UPDATE ON public.usage_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- sla_incidents
-- =========================
CREATE TABLE public.sla_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  duration_minutes integer NOT NULL DEFAULT 0,
  impact text NOT NULL DEFAULT 'partial',     -- partial|full|degraded
  credit_kes numeric(12,2) NOT NULL DEFAULT 0,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sla_incidents TO authenticated;
GRANT ALL ON public.sla_incidents TO service_role;
ALTER TABLE public.sla_incidents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage sla" ON public.sla_incidents
  FOR ALL TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE TRIGGER trg_sla_updated_at BEFORE UPDATE ON public.sla_incidents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================
-- kyc_applications
-- =========================
CREATE TABLE public.kyc_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  id_doc_url text NOT NULL DEFAULT '',
  cert_url text NOT NULL DEFAULT '',
  kra_pin_url text NOT NULL DEFAULT '',
  address_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',     -- pending|approved|rejected
  reviewer_id uuid,
  review_notes text NOT NULL DEFAULT '',
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kyc_applications TO authenticated;
GRANT ALL ON public.kyc_applications TO service_role;
ALTER TABLE public.kyc_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage kyc" ON public.kyc_applications
  FOR ALL TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE TRIGGER trg_kyc_updated_at BEFORE UPDATE ON public.kyc_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
