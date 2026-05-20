import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * VITE CONFIG
 * ------------------------------------------------------------------
 * The VitePWA plugin is what makes the app work offline. It generates
 * a service worker that precaches the app shell (HTML/JS/CSS) and all
 * bundled assets. Because the question bank is imported as JS, it gets
 * bundled and cached automatically — no extra work needed.
 *
 * registerType 'autoUpdate' means a new version installs quietly in
 * the background; the student always has a working copy meanwhile.
 *
 * KEY POINT FOR YOUR DEMO: after `npm run build` and `npm run preview`,
 * load the app once, then go offline (DevTools > Network > Offline)
 * and reload. It still works. That is the moment to capture on video.
 */
export default defineConfig({
  // Use a relative base so the app works on any static host /
  // sub-path (GitHub Pages, Netlify, etc.).
  base: '/adaptive-math/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Adaptive Math — Learn Anywhere',
        short_name: 'Adaptive Math',
        description: 'Adaptive math practice that works with or without internet.',
        theme_color: '#0d3b66',
        background_color: '#fdf6e3',
        display: 'standalone',
        start_url: '/adaptive-math/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Precache every built asset so nothing needs the network.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
});
