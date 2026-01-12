// https://nuxt.com/docs/api/configuration/nuxt-config
import { isProduction } from "std-env";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/app.scss"],
  ssr: true,

    ignore: ["functions/**/*"],
    vite: {
        server: {
            watch: {
                ignored: ["**/functions/**", "**/node_modules/**"],
            },
        },
    },

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

      script: [
          {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5NLD2FPG');`,

          tagPosition: 'head',
        },
      ],

      noscript: [
        {
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`, // <-- ЗАМЕНИТЕ НА ВАШ ID
          tagPosition: 'bodyOpen',
        }
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
