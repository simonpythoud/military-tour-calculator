## 2024-05-22 - CSP Injection for Static Deployments
**Vulnerability:** Missing Content Security Policy (CSP) headers on static hosting platforms (like GitHub Pages) which don't support server-side headers.
**Learning:** `vercel.json` headers only protect Vercel deployments. Static builds need CSP meta tags.
**Prevention:** Injected a strict CSP meta tag into `index.html` during the Vite production build using a custom plugin in `vite.config.ts`. This ensures CSP is present regardless of the hosting platform.
