# HighLevel integration sources

Checked: **2026-10-29**. This is an editorial selection of verified connection options for a HighLevel-based GMG system, not an exhaustive app directory. Every catalog record links to a primary source from HighLevel or the connector vendor. No account has been connected and no live GMG package entitlement has been verified.

The official [HighLevel App Marketplace](https://marketplace.gohighlevel.com/) is the browse-all destination. Its public root was opened successfully and returned the title “App Marketplace | CRM Apps & Integrations”; it is a JavaScript application, so the research tool did not expose individual listings. The [HighLevel integration help index](https://help.gohighlevel.com/support/solutions/48000449584) supplied the starting documentation. Listing totals are deliberately omitted because the directory changes.

## Connection labels

- **Native:** The documented path uses built-in HighLevel settings, Social Planner, calendars, payment settings, workflow actions, or the provided SMTP connection. “Native” does not mean free, automatically enabled, or unrestricted.
- **Marketplace:** The documented route specifically installs an app through HighLevel App Marketplace. Google Lead Ads, Jobber, and Razorpay follow this route, even though HighLevel documents them.
- **Connector:** A separate automation service connects the systems. Zapier uses LeadConnector; Pabbly uses Lead Connector V2; Make has GoHighLevel modules. These require their own configuration and may require separate subscriptions.
- **Custom API:** Developer-built work using scoped private integrations or webhooks. This is a connection method rather than a named third-party app.

## Catalog and supporting documentation

The public description intentionally states one limited capability per entry. These links substantiate the capability and/or the setup route; the notes below identify important qualifications.

### Marketing & leads

| Connection | Route | Documented use | Primary source |
| --- | --- | --- | --- |
| Facebook Lead Ads | Native | Bring mapped Facebook lead form submissions into your CRM. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48000987779-facebook-lead-ad-integration) |
| Google Lead Ads | Marketplace | Capture submissions from connected Google Ads lead forms. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000006989-google-lead-ads-integration) |
| TikTok Lead Ads | Native | Sync TikTok lead form submissions for follow-up. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001223558-how-to-integrate-tiktok-lead-ads) |
| Instagram | Native | Schedule supported Instagram content from Social Planner. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063) |
| LinkedIn | Native | Publish supported posts to connected profiles and business pages. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063) |
| YouTube | Native | Plan and publish supported YouTube video content. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063) |
| Pinterest | Native | Schedule supported Pins through Social Planner. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063) |
| Threads | Native | Schedule supported Threads posts from one content calendar. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063) |
| Bluesky | Native | Create and schedule Bluesky posts alongside your other channels. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063) |
| Google Business Profile | Native | Manage connected Google reviews and reputation in your CRM. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001222899-how-to-integrate-google-business-profile-gbp-with-highlevel) |

### Messaging & email

| Connection | Route | Documented use | Primary source |
| --- | --- | --- | --- |
| Gmail | Native | Connect your Gmail inbox for two-way email sync. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001235216-connect-google-to-use-gmail-for-email) |
| Outlook Email | Native | Sync supported Outlook email conversations with your CRM. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001229663-two-way-email-sync-for-outlook) |
| WhatsApp | Native | Send and receive business messages in CRM conversations. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000002352-how-to-use-leadconnector-twilio-phone-number-for-whatsapp-business-account-) |
| Twilio | Native | Connect agency-managed Twilio numbers for calling and messaging. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001179177/) |
| Mailgun | Native | Send outgoing email through a connected verified Mailgun domain. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000008107-how-to-add-your-own-email-service-mailgun-in-agency) |
| SendGrid | Native | Send email through your SendGrid account using SMTP. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000007765-how-to-add-your-own-email-service-smtp-) |
| Amazon SES | Native | Use Amazon SES SMTP credentials for outbound email. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000007765-how-to-add-your-own-email-service-smtp-) |
| Postmark | Native | Use your Postmark SMTP service for outbound email. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000007765-how-to-add-your-own-email-service-smtp-) |

### Scheduling

| Connection | Route | Documented use | Primary source |
| --- | --- | --- | --- |
| Google Calendar | Native | Sync appointments and check connected calendars for conflicts. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000002369-integrating-google-with-highlevel-calendars) |
| Outlook Calendar | Native | Connect Microsoft calendars to sync bookings and availability. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000002371) |
| iCloud Calendar | Native | Check iCloud events to block unavailable booking times. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000002370-icloud-how-to-integrate-icloud-with-highlevel-calendars) |
| Zoom | Native | Generate meeting links for supported appointment calendars. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001179593-zoom-integration-for-users-calendar-bookings) |
| Microsoft Teams | Native | Generate Teams meeting links for supported appointment types. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000003443-microsoft-teams-integration-for-calendars) |
| Calendly | Native | Import selected Calendly bookings to trigger CRM follow-up. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000002373-integrate-calendly-with-highlevel-calendars) |

### Payments

| Connection | Route | Documented use | Primary source |
| --- | --- | --- | --- |
| Stripe | Native | Connect Stripe to collect payments on supported sales channels. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48000981400-how-to-connect-stripe-to-your-sub-account) |
| PayPal | Native | Accept PayPal payments across supported checkout channels. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000006075) |
| Square | Native | Accept one-time and subscription payments through Square. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000003314-how-to-connect-and-use-square-payment-processor-in-highlevel) |
| Authorize.net | Native | Process card payments for supported invoices and order forms. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001231144-authorize-net-integration-for-processing-payments) |
| NMI | Native | Collect card payments through a connected NMI merchant account. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001235741-how-to-set-up-the-nmi-integration-) |
| Adyen | Native | Process credit and debit cards on supported sales channels. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000007032-how-to-set-up-the-adyen-integration-) |
| Razorpay | Marketplace | Accept payments through the installable Razorpay payment app. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000002559-how-to-integrate-razorpay-within-the-crm) |

### Commerce & operations

| Connection | Route | Documented use | Primary source |
| --- | --- | --- | --- |
| Shopify | Native | Import and sync selected store customers, products, and orders. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001203620-how-to-use-the-shopify-integration-with-your-account) |
| WooCommerce | Native | Import and sync supported store orders, contacts, and products. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000004052-how-to-integrate-woocommerce-with-e-commerce-stores) |
| QuickBooks | Native | Import supported contacts and invoices from QuickBooks. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001153903-setting-up-quickbooks-integration) |
| Jobber | Marketplace | Sync supported Jobber client fields with CRM contacts. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005429-how-to-integrate-jobber-with-highlevel) |
| Google Drive | Native | Access Google Drive files through Media Storage. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000004190-google-drive-integration-in-media-storage) |

### Automation

| Connection | Route | Documented use | Primary source |
| --- | --- | --- | --- |
| Zapier | Connector | Connect apps through the official LeadConnector Zapier app. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000005109-how-to-connect-a-highlevel-sub-account-with-zapier) |
| Make | Connector | Build scenarios using supported GoHighLevel modules in Make. | [Official documentation](https://apps.make.com/highlevel?hl=en-US) |
| Pabbly Connect | Connector | Connect lead workflows through Pabbly Lead Connector V2. | [Official documentation](https://www.pabbly.com/auto-sync-digital-marketing-leads-to-gohighlevel-in-real-time/) |
| Slack | Native | Send workflow messages to Slack users and channels. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001238247-guide-to-slack-workflow-action) |
| Google Sheets | Native | Create, find, and update spreadsheet rows from workflows. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/48001238162) |
| Custom API & webhooks | Custom API | Build scoped connections for your own tools and workflows. | [Official documentation](https://help.gohighlevel.com/support/solutions/articles/155000003054-private-integrations-everything-you-need-to-know) |

## Limits to preserve in website copy and implementation

- These are available connection options, not a promise that every app, setup service, feature, premium execution, message, phone number, processing fee, or connector subscription is included in GMG pricing. Scope each requested connection during onboarding. Vendor accounts, permissions, supported countries, plan tiers, and usage charges can affect availability.
- Social Planner supports the listed social channels, but content types and analytics vary. The catalog describes publishing rather than claiming universal messaging, comments, or ad management. Facebook also has supported social publishing through the same [Social Planner setup documentation](https://help.gohighlevel.com/support/solutions/articles/155000005063). TikTok lead capture and [TikTok messaging](https://help.gohighlevel.com/support/solutions/articles/155000006620-integrate-tiktok-messaging) are separate connection flows; messaging is not implied by lead ads setup.
- Google Business Profile's original Google chat was discontinued in July 2024. The [GBP integration guide](https://help.gohighlevel.com/support/solutions/articles/48001222899-how-to-integrate-google-business-profile-gbp-with-highlevel) has broad messaging language but explicitly acknowledges this in its FAQ. The catalog therefore promises review management only.
- Gmail and Outlook connections sync supported personal conversations. They should not be presented as a blanket replacement for bulk email infrastructure.
- Mailgun's documented path is an agency email-service connection using its API key and a verified sending domain. SendGrid, Amazon SES, and Postmark use the built-in third-party SMTP route; this does not imply access to every LC Email deliverability tool. See [SMTP service limitations](https://help.gohighlevel.com/support/solutions/articles/155000007765-how-to-add-your-own-email-service-smtp-).
- Twilio is an agency-managed phone integration, not an app that every sub-account can independently enable. LC Phone and agency-owned Twilio are different configurations. WhatsApp is a separately configured business messaging service with vendor onboarding and billing requirements.
- Calendar sync is per user and requires correct calendar permissions. [iCloud documentation](https://help.gohighlevel.com/support/solutions/articles/155000002370-icloud-how-to-integrate-icloud-with-highlevel-calendars) describes linked calendar writes but calls its incoming mode “Default Sync (One-Way Sync)”; it does not create guest contacts, and blocked slots have additional limits. The public sentence only promises availability blocking.
- Teams requires a work or school account and supported calendar types. Zoom dynamic links also depend on calendar type. Calendly imports are one-way, must be edited in Calendly, and require Standard, Teams, or Enterprise; Free and Essentials are not supported according to the linked guide.
- Payment support differs by sales surface, recurring-payment type, region, and merchant approval. The [official provider/method matrix](https://help.gohighlevel.com/support/solutions/articles/155000006075) is the central product-area reference. Adyen's [specific guide](https://help.gohighlevel.com/support/solutions/articles/155000007032-how-to-set-up-the-adyen-integration-) documents card-only support and geographic restrictions. Razorpay explicitly uses Marketplace installation. Do not claim every gateway works for every HighLevel feature.
- Some official payment articles retain older restrictions that differ from the newer provider matrix. The catalog avoids detailed per-surface promises; confirm the intended transaction flow in the current product before implementation. HighLevel's [pricing page](https://www.gohighlevel.com/pricing) also names all seven included providers, but is not used alone to infer an installation route.
- Shopify and WooCommerce data syncing depends on enabled import/sync options. Do not describe their connections as unrestricted two-way store management. Jobber requires agency installation, allows one active HighLevel sub-account per Jobber account, and does not sync all custom fields, notes, or attachments. QuickBooks is described conservatively as an import path because synced fields and direction vary by object.
- Slack and Google Sheets are built-in **premium workflow actions**. Additional execution charges or an applicable Workflow Pro plan may apply. Their “Native” labels identify the route only.
- Make's official documentation currently requires creating a custom app in HighLevel Marketplace for its OAuth connection. Pabbly examples using old v1 API keys should not be treated as the recommended modern route; the included source uses Lead Connector V2. New custom integrations should use scoped private tokens or OAuth, as described by [HighLevel private integrations](https://help.gohighlevel.com/support/solutions/articles/155000003054-private-integrations-everything-you-need-to-know).

## Verification scope

The selected official pages were opened or returned by the browser search tool during research. The two files are static and make no network requests at runtime. Structural verification checks importability, unique slugs, category membership, allowed route labels, required fields, HTTPS URLs, monogram length, and color format. It does not authenticate to provider accounts, purchase apps, test sync behavior, or verify GMG-specific entitlements.
