import tailwindcss from "@tailwindcss/vite";

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2025-07-15",
  modules: [
    "nuxt-security"
  ],
  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true
    }
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "La Popotte à Gros Papa - Artisan Traiteur à Prades",
      htmlAttrs: {
        lang: "fr",
      },
      meta: [
        {
          name: "description",
          content: "Aurélien Malugani, artisan traiteur à Prades (Ardèche). 25 ans d'expériences : portage de repas fait maison à domicile et traiteur événementiel (mariages, réceptions)."
        }
      ],
      link: [
        { rel: "preconnect", href: "https://googleapis.com" },
        { rel: "preconnect", href: "https://gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://googleapis.com/css2?family=Open+Sans:ital,wght@0,400..700;1,400..700&family=Pirata+One&family=Playfair+Display;ital,wght@0,600..800;1,600..800&display=swap"
        }
      ]
    },
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: isDev ? 'unsafe-none' : 'require-corp',
      crossOriginOpenerPolicy: isDev ? 'unsafe-none' : 'same-origin',
      strictTransportSecurity: {
        maxAge: 31536000, // 1 an (Standard)
        includeSubdomains: true,
        preload: true,
      },
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "script-src": isDev
        ? ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'", "http://localhost:3000", "ws://localhost:3000", "blob:"]
        : ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'", "'wasm-unsafe-eval'"],
        "script-src-attr": isDev
        ? ["'unsafe-inline'"]
        : ["'self'", "data:", "'nonce-{{nonce}}'"],
        "img-src": ["'self'", "data:", "https://unsplash.com"],
        "upgrade-insecure-requests": !isDev,
      },
    },
  },
  devtools: { enabled: true },
});