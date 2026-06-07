import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

// vite-plugin-prerender@1.0.8 ships a broken ESM build (it calls require()
// inside an .mjs). This project is "type": "module", so a normal import hits
// that broken file — load the working CommonJS build explicitly instead.
const require = createRequire(import.meta.url)
const vitePrerender = require('vite-plugin-prerender')
const Renderer = vitePrerender.PuppeteerRenderer

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      // Single-route SPA (see src/main.jsx — only path="/").
      routes: ['/'],
      postProcess(renderedRoute) {
        // The app adds `.js-ready` to <html> at runtime (it ran inside Puppeteer
        // during prerender), which would disable the flash guard in the served
        // HTML. Strip it so the guard is active until real JS runs. Also stamp a
        // build marker that confirms the page was prerendered.
        renderedRoute.html = renderedRoute.html
          .replace(/\s+class="js-ready"/g, '')
          .replace('<head>', '<head>\n    <meta name="prerendered" content="true" />')
        return renderedRoute
      },
      renderer: new Renderer({
        // The desktop intro (LaptopZoom) only mounts page content after a user
        // gesture (Space/scroll). Force a mobile viewport (<=768px) so the
        // app's `isMobile` path renders ALL content immediately — otherwise the
        // crawler snapshot would capture only the intro video.
        defaultViewport: { width: 600, height: 900, isMobile: true },
        // Wait until the hero actually exists before capturing.
        renderAfterElementExists: '.hero',
        headless: true,
        // The bundled (old) Puppeteer's Chromium download is unavailable here,
        // so use the system Chrome. Override via PUPPETEER_EXECUTABLE_PATH.
        executablePath:
          process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',
        // Required for Chromium in sandboxed/CI environments.
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      }),
    }),
  ],
  server: { port: 5173, host: true },
})
