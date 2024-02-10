import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.useAnalytics("google-gtag", {
    id: "AW-16457131804",
  });
});
