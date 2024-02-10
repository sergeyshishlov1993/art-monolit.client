import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(() => {
  const { gtagId } = useRuntimeConfig().public;

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.dataLayer = window.dataLayer || [];

  gtag("js", new Date());
  gtag("config", gtagId);

  // Используйте document для добавления скриптов в head
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  script.async = true;
  document.head.appendChild(script);
});
