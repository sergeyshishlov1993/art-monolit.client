// https://nuxt.com/docs/api/configuration/nuxt-config
import { isProduction } from "std-env";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/app.scss"],
  ssr: true,

  modules: ["@pinia/nuxt", "nuxt-lazy-load"],

  app: {
    head: {
      link: [
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.s",
          color: "#5bbad5",
        },

        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },

        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      google_analytics_id: "AW-16457131804",
      production_mode: Boolean(isProduction),
    },
  },
});
