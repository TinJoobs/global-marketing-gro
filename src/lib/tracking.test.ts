import { afterEach, describe, expect, it, vi } from "vitest";
import { postTrackingEvent } from "./tracking";

const payload = { formId: "application", formData: { email: "test@example.invalid" }, formLabels: { email: "Email" } };
afterEach(() => vi.unstubAllGlobals());

describe("tracking submissions", () => {
  it("returns a pending promise until the server accepts the unchanged multipart event", async () => {
    let accept!: (response: Response) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>((resolve) => { accept = resolve; })));
    const result = postTrackingEvent(payload, { customFields: { field123: { value: "experience", label: "Experience" } } });
    expect(result).toBeInstanceOf(Promise);
    const [, request] = vi.mocked(fetch).mock.calls[0];
    expect(request?.headers).toEqual({ version: "2021-07-28" });
    expect(JSON.parse((request?.body as FormData).get("event") as string)).toEqual({
      formId: "application", formData: { email: "test@example.invalid", field123: "experience" },
      formLabels: { email: "Email", field123: "Experience" },
    });
    accept(new Response(null, { status: 202 }));
    await expect(result).resolves.toBeUndefined();
    expect(payload.formData).toEqual({ email: "test@example.invalid" });
  });

  it.each(["http", "network"])("rejects on %s failure", async (kind) => {
    vi.stubGlobal("fetch", kind === "http" ? vi.fn().mockResolvedValue(new Response(null, { status: 500 })) : vi.fn().mockRejectedValue(new Error("offline")));
    await expect(postTrackingEvent(payload)).rejects.toThrow();
  });
});
