import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase.auth.admin.updateUserById(
    "89795844-c2a0-4358-aa5d-3856a5f3b06d",
    { password: "Kinuste19" }
  );

  return new Response(JSON.stringify({ success: !error, error: error?.message }), {
    headers: { "Content-Type": "application/json" },
  });
});
