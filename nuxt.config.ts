// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/app.scss"],
  ssr: false,
  modules: ["@pinia/nuxt"],
});
