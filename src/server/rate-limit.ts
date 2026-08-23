const hits = new Map<string, number>();

export function checkRateLimit(email: string): { ok: true } | { ok: false; message: string } {
  const key = email.trim().toLowerCase();
  const now = Date.now();
  const last = hits.get(key);
  if (last && now - last < 60_000) {
    return {
      ok: false,
      message: "Please wait a minute before submitting another request.",
    };
  }
  hits.set(key, now);
  return { ok: true };
}
