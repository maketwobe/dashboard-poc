# Architectural & Security Guidelines

## Dashboard PoC: Zero-Trust Implementation

This document details the architectural decisions and security measures implemented to transform this vanilla JavaScript dashboard into a robust Proof of Concept (PoC).

### 1. Zero-Trust Security Strategy for GitHub Pages

**Context:** GitHub Pages exclusively hosts static files. Storing the Meta API `accessToken` directly in `meta-api.js` is a critical vulnerability, exposing the token to the public internet via the browser's developer tools or source code scraping.

**Implementation (Static PoC State):**
To adhere to the principle of "No Hardcoded Secrets" while maintaining a purely static structure, the application evaluates credentials dynamically via purely client-side runtime injection:
- The `app.js` module now features an initialization gate. 
- If credentials are not present, an authenticated configuration modal interrupts the initialization.
- The credentials are mathematically extracted into the ephemeral `sessionStorage` scope.
- **Why `sessionStorage` over `localStorage`?** `sessionStorage` ensures that the keys are deleted immediately upon closing the tab/window. This drastically shrinks the attack surface against physical access or persistent Cross-Site Scripting (XSS).

### 2. SRE Observability: Structured Logging

A significant shift in debugging relies on structured, deterministically parsed log payloads.
- Replaced standard string interpolations in `console.log()`/`error()`.
- Implemented `Logger.info()`, `Logger.warn()`, and `Logger.error()` in `meta-api.js` and `AppLogger` in `app.js`.
- Error and state changes execute strictly standard JSON payloads containing variables: `timestamp`, `level`, `component`, `message`, and any supplementary objects in `{ context }`.

### 3. DOM Security Rules (CSP)

A robust Content Security Policy (CSP) tag intercepts cross-site scripting attack vectors automatically:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://graph.facebook.com; img-src 'self' data:;">
```
This strictly defines allowable domains (`cdn.jsdelivr.net`, `graph.facebook.com`, google fonts).

### 4. Integration Integrity (UI/UX)

The visualizations engine (`charts.js`) was present in the codebase but abandoned. This has been remediated:
- Injected explicitly linked `Chart.js` CDN tags.
- Hooked the rendering logic dynamically onto successful authentication logic inside `app.js`.
- Generated isolated Canvas nodes under restricted styling grids without breaking existing flex constraints.

### 5. Target Architecture for Scalable Production

The current `sessionStorage` setup acts cleanly as a rapid PoC. However, for an unmanaged production release (where end-users do not interact with tokens), the architecture MUST adopt a secure backend relay acting securely between the static dashboard and the third-party providers.

**Target Flow (Recommended Next Steps):**
1. **Frontend Migration:** React/Vite or Next.js (Hosted on Google Cloud Run or Firebase Hosting).
2. **Gateway:** GCP Cloud Run service (or Google API Gateway) exposed externally.
3. **Secret Store:** GCP Secret Manager explicitly keeping the raw Graph API Token.
4. **Operations:** User loads Dashboard -> Frontend requests statistics from GCP endpoint -> GCP authenticates (via ADC/IAM) -> GCP queries Meta API -> GCP constructs aggregations -> Clean JSON sent to Dashboard. 
