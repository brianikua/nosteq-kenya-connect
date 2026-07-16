import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuditLog {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  target_user_id: string | null;
  target_email: string | null;
  details: Record<string, unknown>;
  created_at: string;
}

const actionBadge = (action: string) => {
  const map: Record<string, string> = {
    "user.create": "bg-green-500/20 text-green-500",
    "user.delete": "bg-red-500/20 text-red-500",
    "user.suspend": "bg-orange-500/20 text-orange-500",
    "user.activate": "bg-blue-500/20 text-blue-400",
    "user.role_change": "bg-purple-500/20 text-purple-400",
    "user.profile_update": "bg-muted text-muted-foreground",
  };
  return <Badge className={map[action] || "bg-muted text-muted-foreground"}>{action}</Badge>;
};

const AuditLogs = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast({ title: "Error loading audit logs", description: error.message, variant: "destructive" });
    } else {
      setLogs((data as AuditLog[]) || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const filtered = logs.filter((l) => {
    if (actionFilter !== "all" && l.action !== actionFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        (l.actor_email ?? "").toLowerCase().includes(q) ||
        (l.target_email ?? "").toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Audit Logs</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Record of every administrative action taken on the platform.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Recent activity</CardTitle>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Search actor, target, action..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All actions</SelectItem>
                  <SelectItem value="user.create">User created</SelectItem>
                  <SelectItem value="user.delete">User deleted</SelectItem>
                  <SelectItem value="user.suspend">User suspended</SelectItem>
                  <SelectItem value="user.activate">User activated</SelectItem>
                  <SelectItem value="user.role_change">Role changed</SelectItem>
                  <SelectItem value="user.profile_update">Profile updated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No audit entries found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(l.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">{l.actor_email || "—"}</TableCell>
                    <TableCell>{actionBadge(l.action)}</TableCell>
                    <TableCell className="text-sm">{l.target_email || "—"}</TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground max-w-md truncate" title={JSON.stringify(l.details)}>
                      {Object.keys(l.details || {}).length ? JSON.stringify(l.details) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
