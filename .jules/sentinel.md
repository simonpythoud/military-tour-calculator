## 2024-05-22 - CSP Injection for Static Deployments
**Vulnerability:** Missing Content Security Policy (CSP) headers on static hosting platforms (like GitHub Pages) which don't support server-side headers.
**Learning:** `vercel.json` headers only protect Vercel deployments. Static builds need CSP meta tags.
**Prevention:** Injected a strict CSP meta tag into `index.html` during the Vite production build using a custom plugin in `vite.config.ts`. This ensures CSP is present regardless of the hosting platform.

## 2025-05-22 - DoS Risk with Spread Syntax
**Vulnerability:** `Math.min(...largeArray)` caused a stack overflow when processing large GPX files (e.g., >100k points), leading to a client-side Denial of Service.
**Learning:** JS spread syntax has a hard limit on arguments (typically ~65k). Processing user-supplied arrays with spread syntax is risky.
**Prevention:** Replaced spread syntax with manual loops or `reduce` for min/max calculations on potentially large datasets.
