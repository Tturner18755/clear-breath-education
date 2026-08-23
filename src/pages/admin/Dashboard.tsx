import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  supabase,
  supabaseConfigured,
  type BookingRequest,
  type BookingStatus,
} from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { site } from "@/config/site";
import { LogOut, RefreshCw, ExternalLink } from "lucide-react";

const STATUSES: BookingStatus[] = [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<BookingRequest[]>([]);
  const [selected, setSelected] = useState<BookingRequest | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setRows((data as BookingRequest[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin/login");
        return;
      }
      load();
    });
  }, [navigate, load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const saveSelected = async () => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase
      .from("booking_requests")
      .update({
        status: selected.status,
        paid: selected.paid,
        session_link: selected.session_link,
        admin_notes: selected.admin_notes,
      })
      .eq("id", selected.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Saved");
    load();
  };

  const newCount = rows.filter((r) => r.status === "new").length;
  const unpaidCount = rows.filter((r) => !r.paid && r.status !== "cancelled").length;

  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-navy">Admin not configured</h1>
        <p className="mt-3 text-muted-foreground">
          Add <code className="text-sm">VITE_SUPABASE_URL</code> and{" "}
          <code className="text-sm">VITE_SUPABASE_ANON_KEY</code> in Netlify
          environment variables, run the SQL schema, then create your admin user.
        </p>
        <Link to="/" className="mt-6 inline-block text-primary hover:underline">
          ← Back to site
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div>
            <p className="font-heading text-sm font-semibold text-navy">{site.name}</p>
            <p className="text-xs text-muted-foreground">Admin dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">Total requests</p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">{rows.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">New</p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">{newCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase text-muted-foreground">Unpaid (active)</p>
              <p className="mt-1 font-heading text-2xl font-bold text-navy">{unpaidCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Requests</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[70vh] space-y-2 overflow-y-auto p-3">
              {loading && <p className="p-3 text-sm text-muted-foreground">Loading…</p>}
              {!loading && rows.length === 0 && (
                <p className="p-3 text-sm text-muted-foreground">No booking requests yet.</p>
              )}
              {rows.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelected(r)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                    selected?.id === r.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-navy">{r.name}</p>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase">
                      {r.status}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.email}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                    {r.paid ? " · Paid" : " · Unpaid"}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {selected ? selected.name : "Select a request"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selected ? (
                <p className="text-sm text-muted-foreground">
                  Choose a request on the left to update status, payment, notes, or session link.
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl bg-muted/50 p-4 text-sm">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a className="text-primary hover:underline" href={`mailto:${selected.email}`}>
                        {selected.email}
                      </a>
                    </p>
                    <p className="mt-2">
                      <span className="font-medium">Preferred times:</span>
                      <br />
                      {selected.preferred_times}
                    </p>
                    <p className="mt-2">
                      <span className="font-medium">Topic:</span>
                      <br />
                      {selected.topic}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm"
                        value={selected.status}
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            status: e.target.value as BookingStatus,
                          })
                        }
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-input"
                          checked={selected.paid}
                          onChange={(e) =>
                            setSelected({ ...selected, paid: e.target.checked })
                          }
                        />
                        Marked as paid
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session_link">Session link (Calendly / Doxy)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="session_link"
                        value={selected.session_link || ""}
                        onChange={(e) =>
                          setSelected({ ...selected, session_link: e.target.value })
                        }
                        placeholder="https://..."
                      />
                      {selected.session_link && (
                        <a href={selected.session_link} target="_blank" rel="noopener noreferrer">
                          <Button type="button" variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Admin notes</Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      value={selected.admin_notes || ""}
                      onChange={(e) =>
                        setSelected({ ...selected, admin_notes: e.target.value })
                      }
                      placeholder="Internal notes only"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={saveSelected} disabled={saving}>
                      {saving ? "Saving…" : "Save changes"}
                    </Button>
                    <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Your education session — ${site.name}`)}`}>
                      <Button type="button" variant="secondary">
                        Email client
                      </Button>
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
