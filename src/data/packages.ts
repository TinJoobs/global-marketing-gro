// Pricing transcribed from the client photo. Source: GMG-website/docs/pricing-source.md.
export const packages = [
  {
    "slug": "launch",
    "name": "Launch",
    "tagline": "Automate the follow-up.",
    "monthly": 597,
    "setup": 1997,
    "popular": false,
    "features": [
      "Full GoHighLevel CRM build on your branded sub-account",
      "Missed-call text-back, review automation & instant lead capture",
      "Two-way texting & email connected to your lead sources",
      "Onboarding strategy call + 30 days of post-launch support"
    ]
  },
  {
    "slug": "growth",
    "name": "Growth",
    "tagline": "The system, plus a person who runs it.",
    "monthly": 1697,
    "setup": 2997,
    "popular": true,
    "features": [
      "Everything in Launch",
      "1 dedicated, trained offshore Virtual Assistant (Philippines-based)",
      "Weekly check-ins + monthly performance reporting",
      "VA recruiting, vetting & backup coverage included"
    ]
  },
  {
    "slug": "scale",
    "name": "Scale",
    "tagline": "Hand off the operations. Keep the relationships.",
    "monthly": 3497,
    "setup": 4997,
    "popular": false,
    "features": [
      "Everything in Growth",
      "2nd dedicated VA, or 1 niche specialist VA",
      "Monthly strategy call with a fractional Ops Lead",
      "Paid ad campaign setup & management (Facebook/Instagram)"
    ]
  }
];

export const addonBoosts = [
  {
    "slug": "va",
    "name": "VA Boost",
    "monthly": 1497,
    "spend_extra": false
  },
  {
    "slug": "ads",
    "name": "Ads Boost",
    "monthly": 497,
    "spend_extra": true
  },
  {
    "slug": "reputation",
    "name": "Reputation Boost",
    "monthly": 297,
    "spend_extra": false
  },
  {
    "slug": "ops",
    "name": "Ops Boost",
    "monthly": 497,
    "spend_extra": false
  }
];

export const pricingTerms = {
  "annual_discount_percent": 10,
  "minimum_months": 3,
  "setup_due": "Setup fees always billed at signing.",
  "annual_note": "Pay annually and save 10% on every plan.",
  "target_audience": "Built for teams already investing $500+/month in lead generation, ads, or a growing admin hire.",
  "custom_note": "Custom pricing available for multi-location teams and enterprise needs."
};
