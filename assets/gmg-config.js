/* GLOBAL MARKETING GROUP | OWNER CONFIGURATION
 * Use PUBLIC GHL share/embed URLs only. Never put API keys or private tokens here.
 * For the standalone HTML copies, edit this same block inside each HTML file.
 * Native GHL embeds can also replace the marked widget slots directly.
 */
window.GMG_CONFIG = {
  siteUrl: 'https://glomarkgroup.com',
  contactEmail: '', // Add the approved business email. Hidden until configured.
  contactPhone: '', // Add the approved display number. Hidden until configured.
  contactPhoneHref: '', // Example: tel:+13175551234
  forms: {
    contact: '', // GHL Sites > Forms > Integrate > inline iframe src URL
    careers: '' // Separate recruitment form URL. Do not reuse the client form.
  },
  calendars: {
    strategy: '', // General strategy calendar iframe src or public booking URL
    salesGrowth: '', // Optional assessment calendar; falls back to strategy
    virtualAssistant: '' // Optional VA calendar; falls back to strategy
  },
  widgetHeights: { contact: 1180, careers: 1050, calendar: 920 },
  // Visitor explicitly loads the third-party widget. No tracker is preloaded.
  clickToLoadWidgets: true,
  // Disabled by default. Enable only after approving the privacy/consent setup.
  forwardCampaignParameters: false,
  // Optional helper URL copied from your actual GHL embed code.
  // Native iframes work without it; content remains scrollable at a fixed height.
  embedHelperScript: '',
  // One place to change page URLs when moving from .html files to GHL slugs.
  // Example: { 'sales-growth-system.html': '/sales-growth-system' }
  routes: {}
};
