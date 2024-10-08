// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  alias: {
    "@": resolve(__dirname, "/"),
  },

  css: [
    "~/assets/main.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
    "animate.css/animate.min.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,

  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "nuxt-server-utils",
    "@nuxt/ui",
    "nuxt-swiper",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "search",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },
});