import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { PageHero, SectionHead, CTASection } from "@/components/sections";
import {
  integrations,
  integrationCategories,
  marketplaceUrl,
  integrationsCheckedDate,
} from "@/data/integrations";
import { brandFor } from "@/data/brandLogos";

function BrandBadge({ slug }: { slug: string }) {
  const brand = brandFor(slug);
  const style = { "--brand-color": brand.color } as React.CSSProperties;
  if (brand.src) {
    return (
      <span className="int-brand" style={style}>
        <img
          src={brand.src}
          alt=""
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }
  // Monogram fallback for brands without a published icon.
  const initials = slug
    .split("-")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="int-brand int-brand-monogram" style={style}>
      <span className="mono">{initials}</span>
    </span>
  );
}

const routeNotes = [
  {
    name: "Native",
    body: "Built-in HighLevel settings, calendars, Social Planner, SMTP, or workflow actions. Native describes the setup route; accounts, permissions, usage fees, and premium action charges may still apply.",
  },
  {
    name: "Marketplace",
    body: "Install an app through HighLevel App Marketplace. App availability, permissions, installation requirements, and any subscription fees vary by provider.",
  },
  {
    name: "Connector",
    body: "A separate automation service such as Zapier, Make, or Pabbly connects your tools. Configuration and a separate subscription may be required.",
  },
  {
    name: "Custom API",
    body: "Developer-built connections using scoped private integrations or webhooks. We scope implementation, permissions, maintenance, and costs around your workflow.",
  },
];

export default function Integrations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const query = search.trim().toLowerCase();
  const results = integrations.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      [
        item.name,
        item.description,
        item.connection,
        integrationCategories.find((group) => group.slug === item.category)
          ?.name,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
  );
  return (
    <div>
      <PageHero
        simple
        eyebrow="Integrations"
        title={
          <>
            Your tools.
            <br />
            <span className="text-primary">One connected workflow.</span>
          </>
        }
        lead="Explore connection options for lead sources, conversations, calendars, payments, and the tools your team already uses."
        primaryCta={{
          label: "Plan my integrations",
          to: "/contact?service=integrations",
        }}
        secondaryCta={{ label: "Explore our services", to: "/services" }}
      />
      <section className="section-gmg" aria-labelledby="directory-title">
        <div className="container-gmg">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow">The connected business</span>
            <h2 id="directory-title" className="text-3xl md:text-4xl font-bold">
              Explore {integrations.length} connection options.
            </h2>
            <p className="lead-gmg mt-4">
              Search by app or browse a category. Each connection links to
              official documentation for its supported capability and setup
              route.
            </p>
          </div>
          <div className="card-gmg mb-8">
            <div className="grid md:grid-cols-[1fr_300px_auto] items-end gap-5">
              <div>
                <label
                  htmlFor="integration-search"
                  className="block text-sm font-semibold mb-2"
                >
                  Search integrations
                </label>
                <div className="relative">
                  <Search
                    aria-hidden="true"
                    className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground"
                  />
                  <input
                    id="integration-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Try Stripe, calendars, messaging…"
                    aria-controls="integration-results"
                    className="w-full h-12 rounded-xl border border-border bg-background pl-12 pr-4"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="integration-category"
                  className="block text-sm font-semibold mb-2"
                >
                  Category
                </label>
                <select
                  id="integration-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  aria-controls="integration-results"
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                >
                  <option value="all">All connections</option>
                  {integrationCategories.map((group) => (
                    <option key={group.slug} value={group.slug}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                className="btn-outline-gmg min-h-12"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
              >
                Reset filters
              </button>
            </div>
          </div>
          <p
            className="text-sm text-muted-foreground mb-6"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {results.length
              ? `${results.length} of ${integrations.length} connection options`
              : "No integrations match your search and category. Try another search or reset the filters."}
          </p>
          <div
            id="integration-results"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {results.map((item) => (
              <article className="card-gmg flex flex-col" key={item.slug}>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <BrandBadge slug={item.slug} />
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
                    {item.connection}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {
                    integrationCategories.find(
                      (group) => group.slug === item.category,
                    )?.name
                  }
                </p>
                <h3 className="text-xl font-bold mb-3">{item.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
                  {item.description}
                </p>
                <a
                  className="text-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Official details for ${item.name} (opens in a new tab)`}
                >
                  Official details{" "}
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-gmg bg-secondary/30">
        <div className="container-gmg">
          <SectionHead
            eyebrow="Know the connection route"
            title="The right setup for your workflow."
            subtitle="These are connection options, not integrations already enabled or included in every GMG package."
          />
          <div className="grid md:grid-cols-2 gap-5">
            {routeNotes.map((route) => (
              <article className="card-gmg" key={route.name}>
                <h3 className="text-lg font-bold mb-3">{route.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {route.body}
                </p>
              </article>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Availability depends on provider, region, vendor accounts,
            permissions, plan tiers, and supported actions. Third-party
            subscriptions, message or phone charges, payment processing, and
            implementation costs may apply. Slack and Google Sheets use premium
            workflow actions; additional execution charges or a Workflow Pro
            plan may apply. We confirm each requested connection during
            onboarding.
          </p>
          <div className="mt-12">
            <SectionHead
              eyebrow="Beyond this directory"
              title="Explore the wider app ecosystem."
              subtitle={`This is a researched editorial snapshot, checked ${integrationsCheckedDate}. The live HighLevel Marketplace contains the wider, changing app catalog.`}
            />
            <a
              className="btn-outline-gmg"
              href={marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse HighLevel Marketplace{" "}
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
      <CTASection
        title="Let’s connect the right pieces."
        body="Bring your current tools and the process you want to improve. We’ll help map a practical connection plan."
        primaryLabel="Plan my integrations"
        primaryTo="/contact?service=integrations"
      />
    </div>
  );
}
