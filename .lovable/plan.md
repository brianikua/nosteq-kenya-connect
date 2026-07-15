
## Vision

Reposition Nosteq Networks as **"Internet-as-a-Service, engineered like fintech"** — connectivity delivered with the reliability, transparency, and account-management polish of a modern financial platform. The public site sells IaaS plans; the admin dashboard becomes the operator control plane running the business.

Since no new company name was provided, we keep **Nosteq Networks** and layer a new tagline: *"Internet-as-a-Service. Fintech-grade reliability."* (Easy to rename later.)

---

## Part 1 — Public site reframe

Rewrite copy, hero, services and packages to speak the IaaS + fintech language, without deleting existing infrastructure services (they become the "how we deliver" story underneath the IaaS product).

- **Hero**: "Internet-as-a-Service for banks, fintechs & modern businesses" + trust stats (uptime %, SLA credit %, MRR-style badges).
- **Product tiers (replaces current Packages)**: Starter IaaS / Growth IaaS / Enterprise IaaS / Custom — each with bandwidth, SLA %, support tier, monthly price, and a "Subscribe" CTA that opens the onboarding/KYC flow.
- **Services section** stays but reframed as *"Infrastructure powering our IaaS"* (Fiber, CCTV, Data Center, ServerRoomMasters, etc. — unchanged data, new heading + intro).
- **New sections**: "Uptime you can bank on" (live-feel SLA numbers), "Transparent billing" (fintech-style invoice mockup), "KYC & onboarding in 24 hrs".
- **Navbar**: add *Pricing*, *Uptime*, *Login* (routes to `/admin/login` for now → customer portal later).
- Fonts / colors stay on the current Plus Jakarta + DM Sans + blue/maroon system (already fintech-appropriate).

## Part 2 — Admin as fintech IaaS control plane

Restructure `/admin` into a sidebar-driven operator dashboard with these modules:

```text
┌────────────────────────────────────────────────────────┐
│ Sidebar         │  Overview                            │
│  • Overview     │  ┌─────────┬─────────┬─────────┐    │
│  • Customers    │  │  MRR    │ Active  │ Uptime  │    │
│  • Subscriptions│  │ KES 1.2M│  Subs   │ 99.94%  │    │
│  • Billing      │  └─────────┴─────────┴─────────┘    │
│  • Usage        │  Recent signups · SLA incidents      │
│  • Uptime / SLA │  Revenue trend · Churn               │
│  • KYC Queue    │                                      │
│  • Content CMS  │  (existing site-content editor       │
│  • Web Users    │   moved under "Content CMS")         │
│  • Settings     │                                      │
└────────────────────────────────────────────────────────┘
```

Module scope for this build:

1. **Overview** — KPI cards (MRR, active subs, avg uptime, KYC pending), recent activity feed.
2. **Customers** — table of end-customers (business name, contact, KYC status, plan, MRR, status). Create/edit/suspend.
3. **Subscriptions** — assign a plan to a customer, set billing cycle, activation date, status (trial/active/past-due/cancelled).
4. **Billing** — invoices per customer (number, period, amount, status paid/unpaid/overdue), mark-as-paid action, download stub. This is an operator ledger — no real payment processor yet (that's a follow-up decision).
5. **Usage metering** — per-subscription bandwidth used (GB), peak Mbps, data-cap %, manual entry + CSV import stub; chart per customer.
6. **Uptime & SLA** — per-customer uptime %, incident log (start, end, duration, impact), auto-computed SLA credit owed.
7. **KYC queue** — pending applications with business docs checklist (ID, cert of incorporation, KRA PIN, proof of address); approve / reject with reason.
8. **Content CMS** — existing site content editor, unchanged, just relocated in the sidebar.
9. **Web Users** — existing superadmin-only editor management, unchanged.

Superadmin sees everything. Admin sees everything except Web Users. Editor sees only Content CMS.

## Part 3 — Data model (new tables, all with RLS + GRANTs)

```text
customers          → business_name, contact_name, email, phone, kyc_status, status
subscriptions      → customer_id, plan_tier, bandwidth_mbps, monthly_price_kes,
                     billing_cycle, status, activated_at, next_billing_at
invoices           → subscription_id, invoice_number, period_start, period_end,
                     amount_kes, status, issued_at, paid_at
usage_records      → subscription_id, period_start, period_end,
                     gb_used, peak_mbps, cap_percent
sla_incidents      → subscription_id, started_at, ended_at, duration_minutes,
                     impact, credit_kes
kyc_applications   → customer_id, id_doc_url, cert_url, kra_pin_url, address_url,
                     status, reviewer_id, review_notes, reviewed_at
```

RLS: only `authenticated` users with role `admin` or `superadmin` can read/write; `editor` has no access. `service_role` full access for edge functions. Every table gets standard `id`, `created_at`, `updated_at` + update-trigger.

## Part 4 — Not in this build (call out and defer)

- Real payment processor (Stripe/Paddle/M-Pesa) integration — needs a separate decision.
- Automated uptime probes — SLA numbers are operator-entered for now.
- End-customer self-service portal — admin-only management first; portal is phase 2.
- Automated invoice PDF generation & email delivery — deferred.

## Technical notes

- Frontend: new sidebar shell `AdminLayout.tsx`, module pages under `src/pages/admin/`, shared `AdminSidebar.tsx`, KPI/table primitives reused from shadcn.
- Reuse existing `useAdminAuth` for gating; extend it to expose role for module-level visibility.
- Migration adds the 6 tables above with RLS + GRANTs in one call; no changes to existing `profiles` / `user_roles`.
- Public-site copy changes are localized to `Hero.tsx`, `Packages.tsx`, `Services.tsx` (heading + intro), `About.tsx` (positioning line), plus a new `UptimePromise.tsx` section on the home page.
- No brand assets regenerated (keeps credit cost low). We can swap imagery later.

Delivery order once approved: (1) DB migration, (2) admin shell + Overview + Customers, (3) Subscriptions + Billing, (4) Usage + SLA + KYC modules, (5) public site copy reframe.
