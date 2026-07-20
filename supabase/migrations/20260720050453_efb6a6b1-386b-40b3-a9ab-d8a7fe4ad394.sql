
-- Media library table
CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  path text NOT NULL UNIQUE,
  url text NOT NULL,
  mime_type text,
  size_bytes bigint,
  width int,
  height int,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.media_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "media_assets public read" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "media_assets admin insert" ON public.media_assets FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE POLICY "media_assets admin update" ON public.media_assets FOR UPDATE TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()))
  WITH CHECK (public.is_admin_or_superadmin(auth.uid()));
CREATE POLICY "media_assets admin delete" ON public.media_assets FOR DELETE TO authenticated
  USING (public.is_admin_or_superadmin(auth.uid()));

CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON public.media_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for the media-library bucket
CREATE POLICY "media-library public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'media-library');
CREATE POLICY "media-library admin insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media-library' AND public.is_admin_or_superadmin(auth.uid()));
CREATE POLICY "media-library admin update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media-library' AND public.is_admin_or_superadmin(auth.uid()));
CREATE POLICY "media-library admin delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media-library' AND public.is_admin_or_superadmin(auth.uid()));
