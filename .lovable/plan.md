
## Goal

Everything visible on the public site becomes fully manageable (create, edit, delete) from `/admin`, backed by Lovable Cloud so changes sync across every visitor and device instantly.

## Sections brought under admin control

- Hero (badge, headings, subheading, stats)
- Services (list — add/edit/delete each card, icon, tagline, description, features, benefits, technologies, use cases, gallery images)
- Home Packages & Business Packages (list — add/edit/delete, mark popular)
- FAQ categories and questions (list — add/edit/delete)
- About (story paragraphs, stats, testimonials — add/edit/delete)
- Contact (phone, email, address, hours)
- Media gallery (add/edit/delete image or video items with category)
- Portfolio / Projects (add/edit/delete case studies)
- Footer (tagline, columns, links, socials, copyright)
- Navbar links

## How it works

- One `site_content` table with `(section_key TEXT PRIMARY KEY, data JSONB, updated_at, updated_by)`.
- Public site reads with the anon key — everyone sees the same content, no login needed.
- Writes restricted to `admin`/`superadmin` via RLS using existing `is_admin_or_superadmin()` function.
- Every write is written to `admin_audit_logs` (section, actor, before/after summary).
- Frontend content loader (`src/lib/contentStore.ts`) rewritten to fetch from the DB with a React Query cache; falls back to hardcoded defaults on first load so the site never renders empty.
- One-time seeder pushes the current default content into the DB on first admin visit.

## Admin UI

Under `/admin/content` (existing route), replace the current single editor with a tabbed layout:

```
Content
├── Hero
├── Services         [+ Add service]  list with edit/delete row actions
├── Packages         Home / Business tabs, each with add/edit/delete
├── FAQs             categories + questions, add/edit/delete
├── About            story paragraphs, stats, testimonials
├── Contact          simple form
├── Media            grid with add/edit/delete, image upload
├── Portfolio        add/edit/delete case studies with images
├── Footer           columns + links editor
└── Navbar           link editor
```

Every list has inline "Add", "Edit" (dialog), "Delete" (confirm) actions. Save writes to the DB and invalidates the cache so the public site updates on next paint.

## Technical details

**Database**
- New table `public.site_content` with GRANT SELECT to anon, full CRUD to authenticated, admin-only via RLS policies calling `is_admin_or_superadmin(auth.uid())`.
- New storage bucket `site-media` (public read) for uploaded images used across Hero/Media/Portfolio/Services galleries.

**Data shape** — one JSONB row per section, e.g.
```text
site_content
  hero          -> { badge, heading[], subheading, stats[] }
  services      -> [ { slug, iconName, title, badge, tagline, description, features[], benefits[], technologies[], useCases[], gallery[] } ]
  packages_home -> [ { name, speed, price, description, features[], popular } ]
  packages_biz  -> [ ... ]
  faqs          -> [ { category, questions:[{question, answer}] } ]
  about         -> { story[], stats[], testimonials[] }
  contact       -> { phone, email, address, hours[] }
  media         -> [ { id, type, src, thumbnail?, title, description, category, date } ]
  projects      -> [ { id, title, client, summary, images[], ... } ]
  footer        -> { tagline, columns[], socials[], copyright }
  navbar        -> { links:[{label, href}] }
```

**Frontend**
- `src/lib/contentStore.ts`: replace localStorage getters with a `useSiteContent(section)` React Query hook and a `saveSection(section, data)` mutation.
- Components (`Hero`, `Services`, `Packages`, `FAQ`, `About`, `Contact`, `MediaGallery`, `Portfolio`, `Footer`, `Navbar`) switch from static/local to the hook. Loading states use existing skeletons.
- Admin content page becomes `src/pages/admin/content/*` — one small editor file per section, sharing a common `ListEditor` component for repeating items.
- Image uploads go through the new `site-media` bucket; returned public URL is stored in the JSONB.

**Audit**
- Every save from the admin editors calls a small shared helper that writes an entry to `admin_audit_logs` with `action = 'content.update'`, `target_table = 'site_content'`, `record_id = section_key`, and diff-style metadata.

## Delivery order (single build)

1. Migration: `site_content` table + policies + grants + storage bucket + seed defaults.
2. `contentStore` rewrite + `useSiteContent` hook + upload helper.
3. Rewire public components to consume the hook.
4. New admin content editors (Hero, Services, Packages, FAQs, About, Contact, Media, Portfolio, Footer, Navbar).
5. Audit logging on all saves.
6. Verify with Playwright: log in, edit each section, confirm the public route reflects the change.

## Out of scope

- Multi-language content, draft/publish workflow, and per-user content revisions (can be added later).
- Redesigning any section — visuals stay the same, only the data source changes.
