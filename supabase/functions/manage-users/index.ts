import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller is superadmin
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await userClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check superadmin
    const { data: roleCheck } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "superadmin")
      .maybeSingle();

    if (!roleCheck) {
      return new Response(JSON.stringify({ error: "Superadmin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "list") {
      // List all users with their roles and profiles
      const { data: { users }, error } = await adminClient.auth.admin.listUsers();
      if (error) throw error;

      const { data: roles } = await adminClient.from("user_roles").select("*");
      const { data: profiles } = await adminClient.from("profiles").select("*");

      const enriched = users.map((u: any) => {
        const role = roles?.find((r: any) => r.user_id === u.id);
        const profile = profiles?.find((p: any) => p.user_id === u.id);
        return {
          id: u.id,
          email: u.email,
          full_name: profile?.full_name || "",
          role: role?.role || "user",
          status: profile?.status || "active",
          created_at: u.created_at,
          banned: u.banned_until ? new Date(u.banned_until) > new Date() : false,
        };
      });

      return new Response(JSON.stringify({ users: enriched }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "create") {
      const { email, password, full_name, role } = body;
      if (!email || !password || !full_name || !role) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!["admin", "editor"].includes(role)) {
        return new Response(JSON.stringify({ error: "Invalid role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (createErr) throw createErr;

      await adminClient.from("user_roles").insert({ user_id: newUser.user.id, role });
      await adminClient.from("profiles").insert({ user_id: newUser.user.id, full_name, status: "active" });

      return new Response(JSON.stringify({ success: true, user_id: newUser.user.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update") {
      const { user_id, full_name, role, status } = body;
      if (!user_id) {
        return new Response(JSON.stringify({ error: "Missing user_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Cannot change own role
      if (user_id === caller.id && role) {
        return new Response(JSON.stringify({ error: "Cannot change your own role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (full_name !== undefined || status !== undefined) {
        const updates: Record<string, string> = {};
        if (full_name !== undefined) updates.full_name = full_name;
        if (status !== undefined) updates.status = status;
        await adminClient.from("profiles").update(updates).eq("user_id", user_id);
      }

      if (role && ["admin", "editor"].includes(role)) {
        await adminClient.from("user_roles").update({ role }).eq("user_id", user_id);
      }

      // Ban/unban for suspend
      if (status === "suspended") {
        await adminClient.auth.admin.updateUserById(user_id, {
          ban_duration: "876000h", // ~100 years
        });
      } else if (status === "active") {
        await adminClient.auth.admin.updateUserById(user_id, {
          ban_duration: "none",
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const { user_id } = body;
      if (!user_id) {
        return new Response(JSON.stringify({ error: "Missing user_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (user_id === caller.id) {
        return new Response(JSON.stringify({ error: "Cannot delete your own account" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await adminClient.from("profiles").delete().eq("user_id", user_id);
      await adminClient.from("user_roles").delete().eq("user_id", user_id);
      await adminClient.auth.admin.deleteUser(user_id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
