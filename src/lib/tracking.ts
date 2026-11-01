/**
 * Canonical CRM form-tracking helper for Global Marketing Group.
 * Used the form-tracking skill. Fires external form submissions to the
 * connected CRM so leads land in the right location and join the visit session.
 */

type StandardTrackingFieldKey = string;
type RegisteredCustomFieldId = string;
type TrackingCustomField = { value?: unknown; label: string };
type TrackingFileField = { file?: File; label: string };
type TrackingImageDataField = { dataUrl?: string; label: string };

export const TRACKING_ID = "tk_43f08e8d16d64be996b6f6a5db488272";
export const LOCATION_ID = "6b9ZFpsH6Pv0R2iaasp8";
export const PROJECT_ID = "1778597036474054298";

const ENDPOINT = "https://backend.leadconnectorhq.com/external-tracking/events";

/** Reuse the published site's analytics session so the submission joins the
 *  visit's page views; fall back to a fresh id when it is absent or unreadable
 *  (document.cookie throws in a sandboxed iframe). */
const getTrackingSessionId = () => {
  try {
    const sid = document.cookie.match(
      /(?:^|;\s*)__vibe_sid=([0-9a-f-]{36})(?:;|$)/,
    )?.[1];
    if (sid) return sid;
  } catch {
    /* sandboxed iframe — fall through */
  }
  return crypto.randomUUID();
};

export const postTrackingEvent = async (
  trackingPayload: Record<string, unknown> & {
    formData: Record<StandardTrackingFieldKey, unknown>;
    formLabels: Record<StandardTrackingFieldKey, string>;
  },
  options: {
    customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
    fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
    imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
  } = {},
) => {
  const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
  const eventPayload = {
    ...trackingPayload,
    formData: { ...trackingPayload.formData },
    formLabels: { ...trackingPayload.formLabels },
  };
  const body = new FormData();

  for (const [key, field] of Object.entries(customFields)) {
    if (field.value === undefined) continue;
    eventPayload.formData[key] = field.value;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(imageDataFields)) {
    const dataUrl = field.dataUrl;
    if (!dataUrl) continue;
    if (!dataUrl.startsWith("data:image/")) {
      throw new Error("Image data field must be a data:image/* base64 string");
    }
    eventPayload.formData[key] = dataUrl;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(fileFields)) {
    const file = field.file;
    if (!file) continue;
    if (file.size > 50 * 1024 * 1024) {
      throw new Error("File must be 50 MB or smaller");
    }
    eventPayload.formData[key] = {
      filename: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    };
    eventPayload.formLabels[key] = field.label;
    body.append(key, file, file.name);
  }

  for (const key of Object.keys(eventPayload.formData)) {
    eventPayload.formLabels[key] ||= key;
  }

  body.append("event", JSON.stringify(eventPayload));

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { version: "2021-07-28" },
    body,
  });
  if (!response.ok) throw new Error("Submission was not accepted");
};

/** Build the common tracking payload shared by every form. */
export const buildTrackingPayload = (
  formId: string,
  formName: string,
  formData: Record<string, unknown> = {},
  formLabels: Record<string, string> = {},
) => ({
  type: "external_form_submission" as const,
  timestamp: Date.now(),
  formId,
  formData,
  formLabels,
  url: window.location.href,
  title: document.title,
  path: window.location.pathname,
  userAgent: navigator.userAgent,
  trackingId: TRACKING_ID,
  locationId: LOCATION_ID,
  sessionId: getTrackingSessionId(),
  properties: {
    deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop",
    source: "ai_studio",
    projectId: PROJECT_ID,
    formName,
  },
});

/** Shared analytics session id — reuses the published site's __vibe_sid cookie
 *  so a booking joins the same visit session; falls back to a fresh id when the
 *  cookie is absent or unreadable (e.g. sandboxed iframe). Reused by the booking
 *  helper so calendar submissions are attributed to the same visit as page views. */
export const getSessionId = getTrackingSessionId;
