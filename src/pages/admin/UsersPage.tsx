import WebUsers from "@/components/admin/WebUsers";

const UsersPage = () => (
  <div className="space-y-4">
    <div>
      <h2 className="font-heading text-3xl font-bold">Web Users</h2>
      <p className="text-muted-foreground">Manage editors, admins and other superadmins.</p>
    </div>
    <WebUsers />
  </div>
);

export default UsersPage;
