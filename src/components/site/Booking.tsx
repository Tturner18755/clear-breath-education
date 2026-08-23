import { useState } from "react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";
import { supabase, supabaseConfigured } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  preferredTimes: z.string().min(5, "Please share preferred times"),
  topic: z.string().min(10, "Please describe what you'd like to discuss"),
});

type FormData = z.infer<typeof formSchema>;

export function Booking() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", preferredTimes: "", topic: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      if (supabaseConfigured) {
        const { error } = await supabase.from("booking_requests").insert({
          name: result.data.name,
          email: result.data.email,
          preferred_times: result.data.preferredTimes,
          topic: result.data.topic,
          status: "new",
          paid: false,
        });
        if (error) throw error;
      } else {
        await new Promise((r) => setTimeout(r, 600));
        console.warn("Supabase not configured — booking not persisted");
      }
      toast.success("Request received. We'll reply shortly with next steps.");
      setForm({ name: "", email: "", preferredTimes: "", topic: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const hasCalendly = Boolean(site.calendlyUrl);
  const hasStripe = Boolean(site.stripePaymentUrl);
  const hasDoxy = Boolean(site.doxyRoomUrl);

  return (
    <section id="booking" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">Book an education session</h2>
          <p className="mt-4 text-lg text-muted-foreground">Tell us a bit about what you'd like to learn. We'll confirm a time and send next steps. All sessions are educational coaching only.</p>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
          {hasCalendly ? (
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe src={site.calendlyUrl} title="Schedule a session" className="h-[700px] w-full" />
            </div>
          ) : (
            <Card className="border-border/80 shadow-sm">
              <CardHeader><CardTitle className="text-xl">Request a session</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" aria-invalid={!!errors.name} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={!!errors.email} />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTimes">Preferred times</Label>
                    <Textarea id="preferredTimes" name="preferredTimes" value={form.preferredTimes} onChange={handleChange} placeholder="e.g. Weekday mornings, or specific dates that work for you" rows={3} aria-invalid={!!errors.preferredTimes} />
                    {errors.preferredTimes && <p className="text-sm text-destructive">{errors.preferredTimes}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">What would you like to discuss?</Label>
                    <Textarea id="topic" name="topic" value={form.topic} onChange={handleChange} placeholder="Equipment type, topics, or questions you'd like covered" rows={4} aria-invalid={!!errors.topic} />
                    {errors.topic && <p className="text-sm text-destructive">{errors.topic}</p>}
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={submitting}>{submitting ? "Sending…" : "Send request"}</Button>
                </form>
              </CardContent>
            </Card>
          )}
          {(hasStripe || hasDoxy) && (
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {hasStripe && <a href={site.stripePaymentUrl} target="_blank" rel="noopener noreferrer"><Button variant="secondary">Pay for session</Button></a>}
              {hasDoxy && <a href={site.doxyRoomUrl} target="_blank" rel="noopener noreferrer"><Button variant="outline">Join video session</Button></a>}
            </div>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">Prefer email? <a href={`mailto:${site.email}`} className="font-medium text-primary underline-offset-4 hover:underline">{site.email}</a></p>
        </div>
      </div>
    </section>
  );
}
