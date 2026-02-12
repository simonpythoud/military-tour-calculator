import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  if (mode === 'production') {
    plugins.push({
      name: 'html-csp',
      transformIndexHtml(html) {
        return html.replace(
          '<head>',
          `<head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.tile.openstreetmap.org; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self';">`
        );
      },
    });
  }

  return {
    plugins,
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'build'
    }
  };
})
