import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    // Check if any admin already exists
    const { data: existingAdmins } = await supabase
      .from("user_roles")
      .select("id")
      .eq("role", "admin")
      .limit(1);

    if (existingAdmins && existingAdmins.length > 0) {
      toast.error("Admin account already exists. Please use the login page.");
      navigate("/admin/login");
      setLoading(false);
      return;
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      toast.error("Failed to create account");
      setLoading(false);
      return;
    }

    // Assign admin role
    const { error: roleError } = await supabase
      .from("user_roles")
      .insert({ user_id: data.user.id, role: "admin" });

    if (roleError) {
      toast.error("Account created but failed to assign admin role. Contact support.");
      setLoading(false);
      return;
    }

    toast.success("Admin account created! Redirecting to dashboard...");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Setup</h1>
            <p className="text-muted-foreground text-sm mt-1">Create your admin account (one-time setup)</p>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <Input type="email" placeholder="admin@syntaxitsolution.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <Input type="password" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Admin Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
