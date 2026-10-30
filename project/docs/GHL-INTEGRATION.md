# GHL Integration and Publishing Guide

## 1. Choose how to publish

**External static hosting:** upload the `website/` contents. Keep all shared assets in their original directories. Alternatively, publish the self-contained files from `standalone/` together.

**GHL website builder:** create each page using the paths in `SEO-PAGE-MAP.csv`. Add one full-width section, one full-width row, and one Custom HTML element. Set the section and row padding to zero. Paste the corresponding file from `ghl-blocks/` into the element's code editor. Do not add another global header or footer on top of the included one.

The fragments have styles scoped to `#gmg-site`. Use only one fragment per page. Publish and test the actual page, not only the builder canvas. If your page builder restricts large inline images or code size, use the shared-asset version and host the images, CSS, and JavaScript at public HTTPS URLs, or upload approved assets into GHL and update the image references.

Do not paste a complete `standalone/` document into a nested Custom HTML element. Use the matching `ghl-blocks/` file instead.

## 2. Add the consultation form

Create the form in your GHL sub-account under Sites > Forms. Open its integration options, select an inline layout, and copy its complete embed code.

**Recommended method:** open `contact.html` and find:

```html
<!-- GHL_CONTACT_EMBED_START -->
```

The actual start comment also includes setup guidance. Inside the `#ghl-contact-slot` wrapper, replace the preview notice and disabled form with your complete GHL iframe and helper script. Remove `data-widget="contact"` from that wrapper when using a manually pasted embed so the automatic widget loader does not replace it. Keep the outer `form-shell` for the page's styling.

Do not place a GHL iframe inside the disabled preview `fieldset`. Replace the preview, not just its button.

**Configuration method:** copy the public `src` URL from the iframe and set:

```js
forms: {
  contact: 'YOUR_PUBLIC_HTTPS_GHL_FORM_URL',
  careers: ''
}
```

For the shared-asset edition, edit `website/assets/gmg-config.js` once. For the standalone and GHL-block editions, edit their inline `GMG_CONFIG` block. Rebuilding from the source after editing the shared config updates all editions.

The URL loader supports a basic iframe with fixed, scrollable height. If your generated embed includes a helper script, set `embedHelperScript` to the script's public HTTPS URL copied from your actual GHL code. Where GHL provides additional or multiple scripts, prefer pasting the complete native embed.

Default contact iframe height: 1180 pixels. Adjust `widgetHeights.contact` after testing the actual form. The website cannot directly restyle the contents of a cross-origin iframe, so style the form in GHL using the same navy and teal colors.

## 3. Create the document's consultation fields

The included preview follows the supplied document:

| Form label | Suggested destination |
| --- | --- |
| Full Name | Native contact name fields, or GHL's Full Name field |
| Business Name | Approved business/company contact field |
| Email Address | Native Email |
| Phone Number | Native Phone |
| Website | Approved website field |
| Industry | Contact custom field |
| Service of Interest | Contact custom field |
| What is your biggest business challenge? | Long-text contact custom field |
| How many hours of VA support do you need? | Contact custom field |
| Preferred contact method | Contact custom field |
| Preferred consultation date | Date custom field, not a confirmed appointment |

Use these service choices: Sales Growth System, Virtual Assistant Services, CRM and Automation, Both Sales Growth System and VA Support.

These are field-mapping suggestions, not automatically created field IDs. Create and map the actual fields in your sub-account. Review any required communication consent and privacy disclosures with the responsible business owner before using email or SMS automation. Do not precheck a marketing consent box.

## 4. Add the calendar

In GHL, open Calendars > Calendar Settings. Use the calendar's three-dot menu > Share > Embed Code and copy the provided code.

In `book-a-call.html`, find `GHL_CALENDAR_EMBED_START`. Replace the preview inside `#ghl-calendar-slot` with the complete embed. Remove `data-widget="calendar"` from that wrapper when using the manually pasted method.

Or configure public calendar URLs:

```js
calendars: {
  strategy: 'YOUR_PUBLIC_HTTPS_STRATEGY_CALENDAR_URL',
  salesGrowth: 'YOUR_OPTIONAL_SALES_ASSESSMENT_CALENDAR_URL',
  virtualAssistant: 'YOUR_OPTIONAL_VA_CALENDAR_URL'
}
```

Specialized calendars fall back to `strategy` if their URL is blank. An empty setup remains an inactive preview.

Routing behavior:

- `?service=virtual-assistant` uses the VA calendar.
- `?service=sales-growth`, `crm-automation`, `appointment-setting`, or `lead-follow-up` uses the Sales Growth calendar.
- Other values use the general strategy calendar.

The service query changes the visible booking topic and calendar selection. It does not automatically populate your GHL custom fields inside a cross-origin form. Configure field prefilling separately if required by your chosen widget.

Default calendar iframe height: 920 pixels. Keep the scrollable iframe and fallback link, or use the official resizing helper included with your embed. Check actual availability, time zones, owner assignment, confirmations, reminders, cancellation, and rescheduling within GHL.

## 5. Keep recruitment separate

`careers.html` has a separate `GHL_CAREERS_EMBED_START` slot and `forms.careers` configuration. Use a dedicated recruitment form and workflow. Do not place applicants into the client-sales follow-up workflow.

The careers page describes areas of interest, not confirmed job openings. Confirm recruitment wording before sharing it publicly.

## 6. Widget privacy behavior

`clickToLoadWidgets: true` is the default. A configured widget appears behind a Load button so an external provider is not contacted until the visitor chooses to continue.

To load the widget immediately, set this option to `false` only after reviewing your privacy and consent setup. Manually pasted native embeds load according to their own code; the configuration gate does not control them.

No analytics or advertising code is preinstalled. `forwardCampaignParameters` is `false` by default. Enabling it forwards only utm_source, utm_medium, utm_campaign, utm_content, and utm_term from the current page to internal links and configured widgets. It does not save attribution to your CRM by itself. Test attribution with the actual published form and contact records.

## 7. Configure routes and SEO

Shared and standalone pages use `.html` links by default. GHL blocks already contain route mappings such as:

```js
routes: {
  'index.html': '/',
  'sales-growth-system.html': '/sales-growth-system',
  'virtual-assistant-services.html': '/virtual-assistant-services',
  'contact.html': '/contact',
  'book-a-call.html': '/book-a-call'
}
```

The complete map is in `ghl-route-map.json`. Change the map to your actual published paths. URL query parameters and anchor fragments are preserved. Route rewriting requires JavaScript. For a no-JavaScript-friendly GHL deployment, replace the HTML href values with your actual slugs before publishing.

Set each page's title, description, social image, canonical URL, and robots setting in the GHL SEO controls using `SEO-PAGE-MAP.csv`. The full HTML editions have these tags already, but their canonical URLs and sitemap default to the external static `.html` version. Update them to the final domain and URL format before launch. GHL builder fragments do not inject document-level SEO tags.

The supplied `sitemap.xml` is for the static edition. Exclude drafts, thank-you pages, and the 404 utility page. Configure your host's error-document behavior separately; the existence of `404.html` does not itself cause an HTTP 404 status.

## 8. Submission and booking behavior

Configure the actual GHL form's success action or redirect after a successful submission. `thank-you.html` is a visual confirmation-page layout only. Do not redirect to it from a custom button without a successful form submission.

Test one real consultation submission, one real booking, and one recruitment submission in the correct sub-account. Confirm the expected contact record, custom fields, workflow enrollment, ownership, internal notifications, and consent behavior. No workflow or account changes have been made by the website build.

## Official references

- HighLevel: Embedding HighLevel Forms on Non-HighLevel Websites
  https://help.gohighlevel.com/support/solutions/articles/155000004524-embedding-highlevel-forms-on-non-highlevel-websites
- HighLevel: Embedding HighLevel Calendars using HTML Code
  https://help.gohighlevel.com/support/solutions/articles/48000982201-embedding-highlevel-calendars-using-html-code
- HighLevel: How to Use Embedding Options for Forms
  https://help.gohighlevel.com/support/solutions/articles/155000004538-how-to-use-embedding-options-for-forms-triggers-layouts-and-deactivation-settings-explained

Reviewed September 8, 2026. The account's currently generated embed code is the authority for its exact iframe attributes and scripts.
