
ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS thumb_path text,
  ADD COLUMN IF NOT EXISTS thumb_url text;
