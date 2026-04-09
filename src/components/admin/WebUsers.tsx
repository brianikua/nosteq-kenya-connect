import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Ban, Trash2, Copy, RefreshCw, Check } from "lucide-react";

interface WebUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
  created_at: string;
}

const generatePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
  let pw = "";
  for (let i = 0; i < 14; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
};

const WebUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<WebUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<WebUser | null>(null);
  const [copied, setCopied] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState<string>("editor");
  const [formPassword, setFormPassword] = useState("");
  const [formStatus, setFormStatus] = useState("active");
  const [saving, setSaving] = useState(false);

  const invoke = useCallback(async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("manage-users", { body });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await invoke({ action: "list" });
      setUsers(data.users || []);
    } catch (err: any) {
      toast({ title: "Error loading users", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  }, [invoke, toast]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleCreate = async () => {
    if (!formName.trim() || !formEmail.trim() || !formPassword.trim()) {
      toast({ title: "Missing fields", description: "All fields are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await invoke({ action: "create", email: formEmail.trim(), password: formPassword, full_name: formName.trim(), role: formRole });
      toast({ title: "Success", description: `User ${formName} created successfully` });
      setShowAdd(false);
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleEdit = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await invoke({ action: "update", user_id: selectedUser.id, full_name: formName.trim(), role: formRole, status: formStatus });
      toast({ title: "Updated", description: `User updated successfully` });
      setShowEdit(false);
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleSuspendToggle = async (u: WebUser) => {
    const newStatus = u.status === "active" ? "suspended" : "active";
    try {
      await invoke({ action: "update", user_id: u.id, status: newStatus });
      toast({ title: newStatus === "suspended" ? "Suspended" : "Activated", description: `${u.full_name || u.email} is now ${newStatus}` });
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await invoke({ action: "delete", user_id: selectedUser.id });
      toast({ title: "Deleted", description: `User removed successfully` });
      setShowDelete(false);
      fetchUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const openAdd = () => {
    setFormName(""); setFormEmail(""); setFormRole("editor"); setFormPassword(generatePassword());
    setCopied(false);
    setShowAdd(true);
  };

  const openEdit = (u: WebUser) => {
    setSelectedUser(u);
    setFormName(u.full_name); setFormRole(u.role); setFormStatus(u.status);
    setShowEdit(true);
  };

  const openDelete = (u: WebUser) => {
    setSelectedUser(u);
    setShowDelete(true);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(formPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      superadmin: "bg-primary/20 text-primary",
      admin: "bg-blue-500/20 text-blue-400",
      editor: "bg-amber-500/20 text-amber-400",
    };
    return <Badge className={colors[role] || "bg-muted text-muted-foreground"}>{role}</Badge>;
  };

  const statusBadge = (status: string) => (
    <Badge className={status === "active" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}>
      {status}
    </Badge>
  );

  return (
    <div className="max-w-5xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Web Users</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
              </Button>
              <Button size="sm" onClick={openAdd}>
                <Plus className="w-4 h-4 mr-1" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No users found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.full_name || "—"}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{roleBadge(u.role)}</TableCell>
                    <TableCell>{statusBadge(u.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(u.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {u.role !== "superadmin" && (
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(u)} title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleSuspendToggle(u)} title={u.status === "active" ? "Suspend" : "Activate"}>
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => openDelete(u)} title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new web platform user</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Full Name *</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="John Doe" className="mt-1" />
            </div>
            <div>
              <Label>Email Address *</Label>
              <Input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="user@company.com" className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={formRole} onValueChange={setFormRole}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Password</Label>
              <div className="flex gap-2 mt-1">
                <Input value={formPassword} onChange={(e) => setFormPassword(e.target.value)} className="font-mono" />
                <Button variant="outline" size="icon" onClick={copyPassword} title="Copy password">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setFormPassword(generatePassword()); setCopied(false); }}>
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Copy the password before saving — it won't be shown again.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={saving}>{saving ? "Creating..." : "Create User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={formRole} onValueChange={setFormRole}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={formStatus} onValueChange={setFormStatus}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEdit(false)}>Cancel</Button>
            <Button onClick={handleEdit} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{selectedUser?.full_name || selectedUser?.email}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>{saving ? "Deleting..." : "Delete User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebUsers;
