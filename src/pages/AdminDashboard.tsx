import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  LayoutDashboard, MessageSquare, Search, LogOut, Trash2, Eye,
  Mail, Phone, Briefcase, Clock, CheckCircle, AlertCircle, Archive,
} from "lucide-react";
import { toast } from "sonner";

type InquiryStatus = "new" | "in_progress" | "completed" | "archived";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<InquiryStatus, { label: string; color: string; icon: React.ElementType }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 border-blue-200", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  completed: { label: "Completed", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  archived: { label: "Archived", color: "bg-muted text-muted-foreground border-border", icon: Archive },
};

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading, signOut } = useAdminAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load inquiries");
      return;
    }
    setInquiries((data as Inquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchInquiries();

    // Realtime subscription
    const channel = supabase
      .channel("admin-inquiries")
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_inquiries" }, () => {
        fetchInquiries();
        toast.info("New inquiry received!");
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  const updateStatus = async (id: string, status: InquiryStatus) => {
    const { error } = await supabase
      .from("contact_inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
      return;
    }
    toast.success(`Status updated to ${statusConfig[status].label}`);
    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => prev ? { ...prev, status } : null);
    }
  };

  const deleteInquiry = async (id: string) => {
    const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete inquiry");
      return;
    }
    toast.success("Inquiry deleted");
    setSelectedInquiry(null);
    fetchInquiries();
  };

  const filtered = inquiries.filter((i) => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.service.toLowerCase().includes(search.toLowerCase()) ||
      i.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    in_progress: inquiries.filter((i) => i.status === "in_progress").length,
    completed: inquiries.filter((i) => i.status === "completed").length,
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Bar */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Inquiries", value: stats.total, icon: MessageSquare, color: "text-primary" },
            { label: "New", value: stats.new, icon: AlertCircle, color: "text-blue-600" },
            { label: "In Progress", value: stats.in_progress, icon: Clock, color: "text-amber-600" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-green-600" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No inquiries found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inquiry) => {
                  const sc = statusConfig[inquiry.status];
                  return (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium text-foreground">{inquiry.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">{inquiry.email}</TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">{inquiry.service}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${sc.color}`}>
                          <sc.icon className="h-3 w-3" />
                          {sc.label}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedInquiry(inquiry)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteInquiry(inquiry.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Name</div>
                  <div className="font-medium text-foreground">{selectedInquiry.name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Date</div>
                  <div className="font-medium text-foreground">
                    {new Date(selectedInquiry.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline text-sm">
                  {selectedInquiry.email}
                </a>
              </div>
              {selectedInquiry.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${selectedInquiry.phone}`} className="text-primary hover:underline text-sm">
                    {selectedInquiry.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{selectedInquiry.service}</span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Message</div>
                <div className="bg-muted rounded-lg p-3 text-sm text-foreground whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {(["new", "in_progress", "completed", "archived"] as InquiryStatus[]).map((s) => {
                    const sc = statusConfig[s];
                    return (
                      <Button
                        key={s}
                        variant={selectedInquiry.status === s ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateStatus(selectedInquiry.id, s)}
                      >
                        <sc.icon className="h-3 w-3 mr-1" />
                        {sc.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
