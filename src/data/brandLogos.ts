// Official brand artwork for the integrations directory.
// Resolvable brands use the brand-icon CDN (single-color official SVGs);
// brands without a published icon fall back to a tinted monogram badge.
// `color` is each brand's official brand hex, used only as a subtle accent.

const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/";
const icon = (slug: string) => `${CDN}${slug}.svg`;

export type BrandLogo = {
  /** CDN svg url for the official logo, or undefined to render a monogram. */
  src?: string;
  /** Official brand color used as a subtle accent / monogram fill. */
  color: string;
};

export const brandLogos: Record<string, BrandLogo> = {
  // Marketing & leads
  "facebook-lead-ads": { src: icon("facebook"), color: "#0866FF" },
  "google-lead-ads": { src: icon("googleads"), color: "#4285F4" },
  "tiktok-lead-ads": { src: icon("tiktok"), color: "#010101" },
  instagram: { src: icon("instagram"), color: "#E4405F" },
  linkedin: { src: icon("linkedin"), color: "#0A66C2" },
  youtube: { src: icon("youtube"), color: "#FF0000" },
  pinterest: { src: icon("pinterest"), color: "#BD081C" },
  threads: { src: icon("threads"), color: "#010101" },
  bluesky: { src: icon("bluesky"), color: "#0285FF" },
  "google-business-profile": { color: "#34A853" }, // no published icon -> monogram

  // Messaging & email
  gmail: { src: icon("gmail"), color: "#EA4335" },
  "outlook-email": { src: icon("microsoftoutlook"), color: "#0078D4" },
  whatsapp: { src: icon("whatsapp"), color: "#25D366" },
  twilio: { src: icon("twilio"), color: "#F22F46" },
  mailgun: { src: icon("mailgun"), color: "#F06B66" },
  sendgrid: { src: icon("sendgrid"), color: "#22D3A6" },
  "amazon-ses": { src: icon("amazonaws"), color: "#FF9900" },
  postmark: { color: "#FFDE00" }, // no published icon -> monogram

  // Scheduling
  "google-calendar": { src: icon("googlecalendar"), color: "#4285F4" },
  "outlook-calendar": { src: icon("microsoftoutlook"), color: "#0078D4" },
  "icloud-calendar": { src: icon("icloud"), color: "#3693F3" },
  zoom: { src: icon("zoom"), color: "#0B5CFF" },
  "microsoft-teams": { src: icon("microsoftteams"), color: "#6264A7" },
  calendly: { src: icon("calendly"), color: "#006BFF" },

  // Payments
  stripe: { src: icon("stripe"), color: "#635BFF" },
  paypal: { src: icon("paypal"), color: "#003087" },
  square: { src: icon("square"), color: "#3E4348" },
  "authorize-net": { color: "#0073AA" }, // no published icon -> monogram
  nmi: { color: "#2F7BBD" }, // no published icon -> monogram
  adyen: { src: icon("adyen"), color: "#0ABF53" },
  razorpay: { src: icon("razorpay"), color: "#0C2451" },

  // Commerce & operations
  shopify: { src: icon("shopify"), color: "#7AB55C" },
  woocommerce: { src: icon("woocommerce"), color: "#96588A" },
  quickbooks: { src: icon("quickbooks"), color: "#2CA01C" },
  jobber: { color: "#7DB00E" }, // no published icon -> monogram
  "google-drive": { src: icon("googledrive"), color: "#4285F4" },

  // Automation
  zapier: { src: icon("zapier"), color: "#FF4F00" },
  make: { src: icon("make"), color: "#6D00CC" },
  "pabbly-connect": { color: "#00A652" }, // no published icon -> monogram
  slack: { src: icon("slack"), color: "#4A154B" },
  "google-sheets": { src: icon("googlesheets"), color: "#34A853" },
  "custom-api": { color: "#7885F7" }, // custom -> monogram
};

export const brandFor = (slug: string): BrandLogo =>
  brandLogos[slug] ?? { color: "#72E4D4" };
