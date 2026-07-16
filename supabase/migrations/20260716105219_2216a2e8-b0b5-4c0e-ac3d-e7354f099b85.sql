
-- 1. Restrict EXECUTE on SECURITY DEFINER helper functions
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_superadmin(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin_or_superadmin(uuid) FROM PUBLIC, anon;
-- authenticated keeps EXECUTE on the role-check helpers because RLS policies invoke them;
-- add an internal guard so callers can only query their own role.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
      AND (_user_id = auth.uid() OR auth.jwt() ->> 'role' = 'service_role')
  )
$$;

CREATE OR REPLACE FUNCTION public.is_superadmin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'superadmin'
      AND (_user_id = auth.uid() OR auth.jwt() ->> 'role' = 'service_role')
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_superadmin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','superadmin')
      AND (_user_id = auth.uid() OR auth.jwt() ->> 'role' = 'service_role')
  )
$$;

-- 2. Explicit restrictive policies on user_roles preventing privilege escalation
CREATE POLICY "Only admins may insert roles"
ON public.user_roles AS RESTRICTIVE
FOR INSERT TO authenticated
WITH CHECK (public.is_admin_or_superadmin(auth.uid()));

CREATE POLICY "Only admins may update roles"
ON public.user_roles AS RESTRICTIVE
FOR UPDATE TO authenticated
USING (public.is_admin_or_superadmin(auth.uid()))
WITH CHECK (public.is_admin_or_superadmin(auth.uid()));

CREATE POLICY "Only admins may delete roles"
ON public.user_roles AS RESTRICTIVE
FOR DELETE TO authenticated
USING (public.is_admin_or_superadmin(auth.uid()));

-- 3. Profiles: allow each user to create and update their own profile row
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
