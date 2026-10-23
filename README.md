# Winet Solution Enterprise — Website

Static, code-first HTML website, with six core site sections, six dedicated service pages and three editable article pages. This branch keeps the existing homepage layout while applying a shared design system to new sections.

## Local preview
Open `index.html` in a browser, or use `python3 -m http.server 8000` and visit http://localhost:8000.

## SEO
Each new page has a page-specific title, description, canonical URL and structured data. Update sitemap.xml when adding or removing pages. Canonicals assume final hosting at https://winet.com.my/ and should be changed for any permanent domain change. Submit the sitemap in Google Search Console after deployment. Verification is not yet completed; use the Search Console HTML meta verification token or DNS record provided by Google. Avoid publishing misleading testimonials, client projects or addresses.

## Articles
Copy an HTML page in `insights/`, edit its heading, canonical URL, metadata and article copy, then add a link to `insights.html` and `sitemap.xml`. Publish factual, original business material; verify it before release. Ad placeholders only appear in article pages when deliberately enabled.

## Ads / analytics
Edit `assets/measurement.js` after obtaining the actual GA4 measurement ID and AdSense article ad unit ID. Both are DISABLED by default, and no ad or GA4 third-party request is made until configured. Review required consent notices, cookie rules and AdSense policies before enabling. Article ad container is hidden unless enabled, preventing accidental blank blocks elsewhere. Avoid Auto Ads if consistent corporate layout is the priority.

## Contact form
The contact page prepares a `mailto:` draft; it does NOT transmit or store a server-side enquiry. `generate_lead` describes an email-draft intent event, not a confirmed submission. Install a secure backend with validation and spam prevention before claiming form submissions are delivered or counted as confirmed leads.

## Release QA checklist
Review at 320, 375, 390, 768, 1024 and 1440 px; test text at 200% zoom, keyboard focus, menu links, form validity, external image availability, hero LCP, CLS, and reduced-motion settings. Run mobile/desktop Lighthouse after deployment and confirm 404-free links, Google Search Console coverage and consented analytics data. Target LCP <=2.5s, INP <=200ms and CLS <=0.1 (field thresholds, not achieved test scores). Hosted sample photos should be replaced with licensed, locally optimized WebP or AVIF before production. Temporary logo requires replacement with official Winet asset.

## Deployment
GitHub Pages deploys from the configured branch/root. Using `winet.com.my` canonical URLs does not automatically point DNS to GitHub Pages. Review the branch PR before merging.
