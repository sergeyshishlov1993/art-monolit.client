// https://nuxt.com/docs/api/configuration/nuxt-config
import { isProduction } from "std-env";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/app.scss"],
  ssr: false,
  modules: ["@pinia/nuxt", "nuxt-lazy-load"],

  app: {
    head: {
      link: [
        {
          rel: "mask-icon",
          // href: "/safari-pinned-tab.svg",
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

      meta: [
        {
          name: "msapplication-TileColor",
          content: "#da532c",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },

        {
          name: "description",
          content:
            "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
        },

        {
          name: "keywords",
          content:
            "купить мраморные и гранитные памятники, памятники Запорожье, гранитные памятники, купить гранитный памятник в Запорожье, красивые надгробные памятники, качественые надгробные памятники в запорожье, памятники под ключ, памятники под ключ в запорожье, одинарные памятники, двойные памятники,одинарные памятники в Запорожье , двойные памятники в Запорожье, бюджетыне гранитные памятники в запорожье купить, пам'ятники для військових, пам'ятники для військових купити в запоріжжі, памятники гранитные запорожье, гранитная ваза купить в запорожье, гранитные памятники запорожье, памятники из мрамора запорожье, гранитные памятники запорожье цена, памятники на кладбище святого николая запорожье цены  ",
        },

        {
          hid: "og:title",
          property: "og:title",
          content: "АРТ - МОНОЛІТ",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/assets/img/mainBg.webp",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "/assets/img/mainBg.webp",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "АРТ - МОНОЛІТ",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "виготовлення і встановлення пам'ятників в Запоріжжі, изготовление и установка памятников в городе Запорожье, пам'ятники по доступним цінам , памятники по доступным ценам, встановлення пам'ятника під ключ, установка памятников под ключ, Заказать гранитный памятник в Запорожье",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/assets/img/mainBg.webp",
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: "/assets/img/mainBg.webp",
        },
      ],
      title: "АРТ - МОНОЛІТ",
    },
  },

  runtimeConfig: {
    public: {
      google_analytics_id: "AW-16457131804", // Убедитесь, что здесь указан правильный идентификатор Google Analytics
      production_mode: Boolean(isProduction), // Предполагая, что isProduction - это переменная, определяющая режим продакшн
    },
  },
});
