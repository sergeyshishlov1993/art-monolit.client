<template>
  <div>
    <TheHeader />

    <div class="container">
      <NuxtPage />
      <icon-shevron
        class="shevron"
        v-if="showScrollToTop"
        @click="scrollToTop"
      />
    </div>

    <the-footer />
  </div>
</template>

<script setup>
import TheHeader from "~/components/Block/TheHeader";
import IconShevron from "./assets/icon/IconShevron.vue";
import TheFooter from "~/components/Block/TheFooter";

import useScrollToTop from "./utils/useScrollToTop";

const { showScrollToTop, scrollToTop } = useScrollToTop();

useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=AW-16514962201",
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16514962201');
      `,
      type: "text/javascript",
    },
  ],

  meta: [
    {
      name: "google-site-verification",
      content: "x3lktmFtn_dq-e5JemJe2aVqSQs3F8t5ttEtM_Lio9k",
    },
  ],
});
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
  position: relative;
}
.shevron {
  position: fixed;
  top: 600px;
  right: 25px;
  fill: rgba(130, 100, 45, 1);
  z-index: 15;
}
@media screen and (min-width: 1440px) {
  .container {
    min-width: 100%;
  }
}
</style>
