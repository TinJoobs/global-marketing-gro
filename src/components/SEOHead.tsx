import { Helmet } from "react-helmet-async";

export type SeoHeadProps = {
  /** Page <title> (≤60 chars recommended). */
  title: string;
  /** Meta description (≤160 chars recommended). */
  description: string;
  /** Canonical URL for the page (absolute). */
  canonical: string;
  /** Open Graph / Twitter share image (absolute or root-relative URL). */
  ogImage?: string;
  /** When true, adds <meta name="robots" content="noindex,nofollow">. */
  noIndex?: boolean;
  /** Optional JSON-LD structured data object rendered as a <script type="application/ld+json">. */
  schemaJson?: Record<string, unknown>;
};

const SITE_NAME = "Global Marketing Group";
const TWITTER_HANDLE = "@glomarkgroup";

/**
 * Centralized SEO head manager. Renders all per-page meta tags via
 * react-helmet-async so they are SSR/prerender-friendly and never duplicated.
 * Use at the top of every page, before the main content.
 */
export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
  schemaJson,
}: SeoHeadProps) {
  const ogImageResolved = ogImage || "/assets/images/social-preview.jpg";
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageResolved} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageResolved} />

      {schemaJson && (
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
      )}
    </Helmet>
  );
}

export default SEOHead;
